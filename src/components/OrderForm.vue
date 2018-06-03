<template>
  <div>
    <ol><window v-for="id in items" :key="id" :path="['item', id]" :unit="unit" :exportView="false" @remove="qdel(['item', id])"></window></ol>

    <form class="controls" @submit.prevent="newItem">
      <input id="new-item-name" v-model.trim="newItemName" autocapitalize="none">
      <button id="new-item">Add</button>

      <select v-model="unitName" id="select-unit">
        <option v-for="(_, name) in units" :key="name" :value="name">{{ name }}</option>
      </select>

      <select v-model="debug">
        <option :key="false" :value="false">normal</option>
        <option :key="true" :value="true">debug</option>
      </select>
    </form>

    <div :style="debug ? '' : 'display: none'">
      <table>
        <tr>
          <th v-for="value in exportedData" :key="value.name">{{ value.name }}</th>
        </tr>
        <window v-for="id in items" :key="id" :path="['item', id]" :unit="unit" :exportView="true"></window>
      </table>
    </div>
  </div>
</template>

<script>
import QueryState from '@/mixins/querystate'
import window, {exportedData} from './Window.vue'
const R = require('ramda')

export default {
  components: { window },
  mixins: [QueryState],

  data () {
    return {
      newItemName: '',
      units: {
        m: 100,
        cm: 1,
        inch: 2.54
      },
      unitName: 'cm',
      debug: false,
      exportedData: exportedData
    }
  },

  computed: {
    items () {
      return R.keys(this.qget(['item']) || {})
    },
    unit () {
      return {
        name: this.unitName,
        multiplier: this.units[this.unitName]
      }
    }
  },

  methods: {
    newItem: function () {
      var id = Math.max(0, ...this.items) + 1
      this.qset(['item', id, 'name'], this.newItemName)
      this.newItemName = ''
    }
  }
}
</script>

<style>

input {
  width: 5rem;
}

.controls {
  margin-top: 1rem;
}

input:read-only {
    background-color: #EEF;
}
</style>
