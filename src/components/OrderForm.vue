<template>
  <div>
    <ol><window-view v-for="(item, id) in items" :value="item" @input="storeItem(id, $event)" :key="id" :path="['item', id]" :unit="unit" :exportView="false" @remove="removeItem(id)"></window-view></ol>

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
        <window-view v-for="(item, id) in items" :value="item" @input="storeItem(id, $event)" :key="id" :path="['item', id]" :unit="unit" :exportView="true"></window-view>
      </table>
    </div>
  </div>
</template>

<script>
import QueryState from '@/mixins/querystate'
import WindowView, {exportedData} from './WindowView'
const R = require('ramda')

export default {
  components: { WindowView },
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
      return this.qget(['item']) || {}
    },
    unit () {
      return {
        name: this.unitName,
        multiplier: this.units[this.unitName]
      }
    }
  },

  methods: {
    storeItem (id, ev) {
      this.qset(['item'], R.assoc(id, ev, this.items))
    },
    removeItem (id) {
      this.qdel(['item', id])
    },
    newItem () {
      var id = (Math.max(0, ...R.keys(this.items)) + 1).toString()
      this.storeItem(id, { name: this.newItemName })
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
