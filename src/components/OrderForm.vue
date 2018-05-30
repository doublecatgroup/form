<template>
  <div>
    <window v-for="id in items" :key="id" :path="['item', id]" :unit="unit" @remove="qdel(['item', id])"></window>
    <form @submit.prevent="newItem">
      <input id="new-item-name" v-model.trim="newItemName" autocapitalize="none">
      <button id="new-item">Add</button>

      <select v-model="unitName" id="select-unit">
        <option v-for="(_, name) in units" :key="name" :value="name">{{ name }}</option>
      </select>
    </form>
  </div>
</template>

<script>
import QueryState from '@/mixins/querystate'
import window from './Window.vue'
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
      unitName: 'cm'
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
