<template>
  <tr v-if="exportView">
    <td v-for="value in exportedData" :key="value.name">{{ value.value }}</td>
  </tr>
  <li v-else :id="path.join('-')" class="item">

    <input v-model.trim="name" autocapitalize="none">

    <fixation v-model="fixation"/>

    <input-by-unit :unit="unit" v-model.number="width" placeholder="width" />
    <input-by-unit :unit="unit" v-model.number="drop" placeholder="drop" />

    <fabric v-model="fabric"/>

    <input type="number" v-model.number="ratio" step="0.1" placeholder="ratio" />
    <select v-model="heading">
      <option v-for="(value, name) in headings" :key="name" :value="name"> {{ value.en }}</option>
    </select>

    <input placeholder="total" :value="windowItem.total.toFixed(2)" readonly>
    <button name="remove" @click="$emit('remove')">Remove</button>
  </li>
</template>

<script>
import Window from './Window'
import Fixation from './Fixation.vue'
import Fabric from './Fabric.vue'
import InputByUnit from './InputByUnit'
const R = require('ramda')

const properties = Object.getOwnPropertyNames(new Window())

const headings = {
  deepPleat: { cn: '四脚勾', en: 'Deep Pleat' },
  doublePleat: { cn: '韩折', en: 'Double Pleat' },
  eylet: { cn: '打孔', en: 'Eyelet' },
  tabTop: { cn: '吊带', en: 'Tab Top' },
  rodPocket: { cn: '穿杆', en: 'Rod Pocket' }
}

export const exportedData = [
  {
    name: 'window',
    value () { return this.name }
  },
  {
    name: 'fabric',
    value () { return this.fabric.key }
  },
  {
    name: 'design',
    value () { return this.fabric.no }
  },
  {
    name: 'color',
    value () { return this.fabric.color }
  },
  {
    name: 'width',
    value () { return this.width / 100 }
  },
  {
    name: 'height',
    value () { return this.drop / 100 }
  },
  {
    name: 'ratio',
    value () { return this.ratio }
  },
  {
    name: 'heading',
    value () {
      const heading = this.headings[this.heading]
      return `${heading.cn} (${heading.en})`
    }
  },
  {
    name: 'material usage',
    value () { return this.windowItem.materialUsage }
  }
]

export default {
  components: { InputByUnit, Fixation, Fabric },

  exportedData,

  props: ['path', 'unit', 'exportView', 'value'],

  data () {
    return {
      headings
    }
  },

  computed: {
    ...R.map(key => {
      return {
        get () {
          return this.windowItem[key]
        },
        set (value) {
          this.$emit('input', R.assoc(key, value, this.value))
        }
      }
    }, R.zipObj(properties, properties)
    ),

    windowItem () {
      return Object.assign(new Window(), this.value)
    },

    exportedData () {
      return R.map(v => { return {name: v.name, value: v.value.call(this)} }, exportedData)
    }
  }
}
</script>

<style>

.item {
  margin-top: 1rem;
}

label {
  white-space:nowrap;
}

.item option {
  width: 5rem;
}

label {
  font-size: 0.5rem;
}
</style>