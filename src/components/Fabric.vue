<template>
  <span>
    <select v-model="fabricKey" class="fabric">
      <option v-for="(value, key) in fabrics" :key="key" :value="key">{{ value.name }}</option>
    </select>

    <select v-model="designKey" class="design">
      <option v-for="(value, key) in fabric.designs" :key="key" :value="key">{{ `${value.name} (${value.value.color})` }}</option>
    </select>

    <img class="design" :src="`/static/${value.key}/${value.design}.png`" :alt="value.no" height="64" width="64">

    <input class="color" :value="value.color" readonly>
    <input class="design-no" :value="value.no" readonly>

    <label>price: <input class="price" type="number" v-model.number="price" step="any" :class="price == fabric.price ? '' : 'modified'"></label>
  </span>
</template>

<script>
const R = require('ramda')
const sprintf = require('sprintf-js').sprintf

export function mkFabric (key, fabric) {
  return {
    key: key,
    name: fabric.name,
    price: fabric.price,
    designs: R.mapObjIndexed((design, key, _) => {
      return {
        name: sprintf(fabric.designNameTemplate, key),
        value: {
          design: key,
          no: sprintf(fabric.designNoTemplate, key),
          color: design.color
        }
      }
    }, fabric.designs)
  }
}

const fabrics = R.mapObjIndexed((value, key, _) => mkFabric(key, value), {
  bolove: {
    name: 'BoLove',
    price: 26,
    designNameTemplate: 'P%s',
    designNoTemplate: 'TH305-%s',
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
    designNameTemplate: '%s',
    designNoTemplate: '018-%s',
    designs: {
      '12': {color: 'brown'},
      '19': {color: 'red'},
      '23': {color: 'green'}
    }
  }
})

export default {
  mkFabric,

  props: ['value'],

  data () {
    return {
      fabrics
    }
  },
  computed: {
    fabricKey: {
      get () { return this.value.key },
      set (value) {
        const fabric = this.fabrics[value]
        const designKey = R.keys(fabric.designs)[0]
        const design = fabric.designs[designKey]
        this.$emit('input', R.merge(design.value, { key: value, price: fabric.price }))
      }
    },
    designKey: {
      get () { return this.value.design },
      set (value) {
        const design = this.fabric.designs[value]
        this.$emit('input', R.merge(this.value, design.value))
      }
    },

    price: {
      get () { return this.value.price },
      set (value) {
        this.$emit('input', R.assoc('price', value, this.value))
      }
    },

    fabric () {
      return this.fabrics[this.value.key]
    }
  }
}
</script>

<style>
img.design {
  vertical-align: bottom;
  height: 1.12em;
  width: 1.12em;
}

.modified {
  color: #ff0000;
}
</style>
