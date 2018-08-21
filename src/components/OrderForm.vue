<template>
  <div v-if="isEditMode">
    <ol class="items">
      <window-view v-for="(item, id) in items" :value="item" @input="storeItem(id, $event)" :key="id" :path="['item', id]" :unit="unit" :exportView="false" @remove="removeItem(id)"></window-view>
      <li>
        <form @submit.prevent="newItem">
          <input id="new-item-name" v-model.trim="newItemName" autocapitalize="none" class="window-name">
          <button id="new-item">Add</button>
        </form>
      </li>
    </ol>

    <div v-if="hasItems" class="grand-total">
      total: <input placeholder="total" :value="total.toFixed(2)" readonly>
    </div>

    <center class="controls" >
      <select v-model="unitName" id="select-unit">
        <option v-for="(_, name) in units" :key="name" :value="name">{{ name }}</option>
      </select>

      <select v-model="debug">
        <option :key="false" :value="false">normal</option>
        <option :key="true" :value="true">debug</option>
      </select>

      <select v-model="mode">
        <option :key="'edit'" :value="'edit'">edit</option>
        <option :key="'confirmation'" :value="'confirmation'">confirmation</option>
      </select>
    </center>

    <div :style="debug ? '' : 'display: none'">
      <table>
        <tr>
          <th v-for="value in exportedData" :key="value.name">{{ value.name }}</th>
        </tr>
        <window-view v-for="(item, id) in items" :value="item" @input="storeItem(id, $event)" :key="id" :path="['item', id]" :unit="unit" :exportView="true"></window-view>
      </table>
    </div>
  </div>
  <confirmation v-else :items="windowItems" :total="total" />
</template>

<script>
import QueryState from '@/mixins/querystate'
import Confirmation from './Confirmation'
import WindowView, {exportedData} from './WindowView'
import Window from './Window'
const R = require('ramda')

export default {
  components: { WindowView, Confirmation },
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
    mode: {
      get () {
        return this.qget(['mode']) || 'edit'
      },
      set (value) {
        return this.qset(['mode'], value)
      }
    },

    isEditMode () {
      return this.mode === 'edit'
    },

    hasItems () {
      return Object.keys(this.items).length !== 0
    },

    items () {
      return this.qget(['item']) || {}
    },

    windowItems () {
      return R.map(item => Object.assign(new Window(), item), this.items)
    },

    total () {
      return R.sum(R.pluck('total', R.values(this.windowItems)))
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
  width: 5em;
}

input.window-name {
  width: 10em;
}

input[type="number"] {
  width: 3em;
}

ol.items > li, .controls {
  margin-top: 1rem;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
