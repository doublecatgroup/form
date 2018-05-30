<template>
  <div>
    <input v-model.trim="name" autocapitalize="none">

    <label>width: <input :id="idFor('width')" type="number" v-model.number="widthByUnit" step="any"></label>

    <label>drop:  <input type="number" v-model.number="drop" step="0.1"></label>
    <label>ratio: <input type="number" v-model.number="ratio" step="0.1"></label>

    <select v-model="fabricKeyModel">
      <option v-for="(value, key) in fabrics" :key="key" :value="key">{{ value.name }}</option>
    </select>

    <select v-model="designKey">
      <option v-for="(value, key) in fabric.designs" :key="key" :value="key">{{ `${value.name} (${value.color})` }}</option>
    </select>

    <img class="fabric" :src="`/static/${fabricKey}/${designKey}.png`" :alt="design.name" height="64" width="64">

    <select v-model="heading">
      <option v-for="(value, name) in headings" :key="name" :value="name"> {{ value.en }}</option>
    </select>

    <label>price: <input type="number" v-model.number="price" step="any" :class="price == fabric.price ? '' : 'modified'"></label>
    <label>total: <input :id="idFor('total')" type="number" v-model.number="total" step="any" readonly></label>
    <button :id="idFor('remove')" @click="$emit('remove')">Remove</button>
  </div>
</template>

<script>
import QueryState from '@/mixins/querystate'
const R = require('ramda')
const sprintf = require('sprintf-js').sprintf

const defaults = {
  name: null,
  width: 254,
  drop: 270,
  fabricKey: 'bolove',
  designKey: '18',
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

function mkDesign (designNo, designName, key, design) {
  return {
    no: sprintf(designNo, key),
    name: sprintf(designName, key),
    color: design.color
  }
}

export function mkFabric (fabric) {
  return {
    name: fabric.name,
    price: fabric.price,
    designs: R.mapObjIndexed((design, key, _) => mkDesign(fabric.designNo, fabric.designName, key, design), fabric.designs)
  }
}

const fabrics = R.map(mkFabric, {
  bolove: {
    name: 'BoLove',
    price: 26,
    designName: 'P%s',
    designNo: 'TH305-%s',
    designs: {
      '18': {color: 'blue'},
      '19': {color: 'grey'},
      '21': {color: 'red'},
      '22': {color: 'purple'}
    }
  },
  chenille: {
    name: 'Chenille',
    price: 30,
    designName: '%s',
    designNo: '018-%s',
    designs: {
      '12': {color: 'brown'},
      '19': {color: 'red'},
      '23': {color: 'green'}
    }
  }
})

export default {
  mkFabric,

  props: ['path', 'unit'],
  mixins: [QueryState],

  data () {
    return {
      headings,
      fabrics
    }
  },

  qdata () {
    return R.mapObjIndexed((value, key, obj) => { return {path: R.append(key, this.path), def: value} }, defaults)
  },

  methods: {
    idFor (name) {
      return R.prepend(name, this.path).join('-')
    }
  },

  computed: {
    fabricKeyModel: {
      get () { return this.fabricKey },
      set (value) {
        this.fabricKey = value
        this.designKey = R.keys(this.fabric.designs)[0]
        this.price = this.fabric.price
      }
    },
    fabric () {
      return this.fabrics[this.fabricKey]
    },
    design () {
      return this.fabric.designs[this.designKey]
    },
    total () {
      return this.width * this.ratio * this.price / 100
    },
    widthByUnit: {
      get () { return this.width / this.unit.multiplier },
      set (value) { this.width = value * this.unit.multiplier }
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

img.fabric {
  vertical-align: bottom;
  height: 1.12em;
  width: 1.12em;
}

.modified {
  color: #ff0000;
}
</style>
