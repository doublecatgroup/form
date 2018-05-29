<template>
  <div>
    <input v-model="name" autocapitalize="none">

    <label>width: <input :id="idFor('width')" type="number" v-model.number="widthByUnit" step="any"></label>

    <label>drop:  <input type="number" v-model.number="drop" step="0.1"></label>
    <label>ratio: <input type="number" v-model.number="ratio" step="0.1"></label>

    <select v-model="heading">
      <option v-for="(value, name) in headings" :key="name" :value="name"> {{ value.en }}</option>
    </select>

    <label>price: <input type="number" v-model.number="price" step="any"></label>
    <label>total: <input :id="idFor('total')" type="number" v-model.number="total" step="any" readonly></label>
    <button :id="idFor('remove')" @click="$emit('remove')">Remove</button>
  </div>
</template>

<script>
import QueryState from '@/mixins/querystate'
const R = require('ramda')

const defaults = {
  name: null,
  width: 254,
  drop: 270,
  heading: 'deepPleat',
  ratio: 2,
  price: 26
}

const headings = {
  deepPleat: { cn: '四脚勾', en: 'Deep Pleat' },
  doublePleat: { cn: '韩折', en: 'Double Pleat' },
  eylet: { cn: '打孔', en: 'Eyelet' },
  tabTop: { cn: '吊带', en: 'Tab Top' },
  rodPocket: { cn: '穿杆', en: 'Rod Pocket' }
}

export default {
  props: ['path', 'unit'],
  mixins: [QueryState],

  qdata () {
    return R.mapObjIndexed((value, key, obj) => { return {path: R.append(key, this.path), def: value} }, defaults)
  },

  methods: {
    idFor (name) {
      return R.prepend(name, this.path).join('-')
    }
  },

  computed: {
    total () {
      return this.width * this.ratio * this.price / 100
    },
    widthByUnit: {
      get () { return this.width / this.unit.multiplier },
      set (value) { this.width = value * this.unit.multiplier }
    },
    headings () {
      return headings
    }
  }
}
</script>

<style>
input {
  width: 5rem;
}

label {
  font-size: 0.5rem;
}
</style>
