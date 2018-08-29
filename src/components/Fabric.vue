<template>
  <span>
    <select v-model="fabricKey" name="fabric">
      <option v-for="(value, key) in fabrics" :key="key" :value="key">{{ value.name }}</option>
    </select>

    <select v-model="designKey" name="design">
      <option v-for="(value, key) in designs" :key="key" :value="key">{{ value.name }}</option>
    </select>

    <img v-if="designKey !== 'custom'" class="design" :src="`/static/${value.key}/${value.design}.png`" height="64" width="64">

    <show-modifications-input placeholder="color" v-model="color" :original="design.value.color"/>
    <show-modifications-input placeholder="no" v-model="no" :original="design.value.no"/>
    <label>UnitPrice(S$): <show-modifications-input placeholder="price" type="number" v-model.number="price" step="any" :original="fabric.price"/></label>
  </span>
</template>

<script>
import ShowModificationsInput from '@/components/ShowModificationsInput'
const R = require('ramda')
const sprintf = require('sprintf-js').sprintf

export function mkFabric (key, fabric) {
  return {
    key: key,
    name: fabric.name,
    price: fabric.price,
    designs: R.mapObjIndexed((design, key, _) => {
      const args = R.merge({key}, design)
      return {
        name: sprintf(fabric.designNameTemplate, args),
        value: {
          design: key,
          no: sprintf(fabric.designNoTemplate, args),
          color: design.color
        }
      }
    }, fabric.designs)
  }
}

const fabrics = R.mapObjIndexed((value, key, _) => mkFabric(key, value), {
  custom: {
    name: '-',
    price: 26,
    designNameTemplate: '-',
    designNoTemplate: '',
    designs: {
      custom: {color: ''}
    }
  },
  bolove: {
    name: 'BoLove',
    price: 26,
    designNameTemplate: 'P%(key)s',
    designNoTemplate: 'TH305-%(key)02d',
    designs: {
      '18': {color: 'blue'},
      '19': {color: 'grey'},
      '21': {color: 'red'},
      '22': {color: 'purple'}
    }
  },
  Flower Linen: {
    name: 'Flower Linen',
    price: 26,
    designNameTemplate: '%(key)s',
    designNoTemplate: '花捻麻-%(key)s',
    designs: {
      '1': {color: 'beige'},
      '2': {color: 'brown'},
      '3': {color: 'grey'},
      '4': {color: 'green grey'}
      '5': {color: 'brown'},
      '6': {color: 'perple'},
      '7': {color: 'blue'},
      '8': {color: 'green'}
      '9': {color: 'blue'},
      '10': {color: 'dark red'},
      '11': {color: 'brown'},
      '12': {color: 'grey'}
      '13': {color: 'brown'},
      '14': {color: 'brown'},
      '15': {color: 'red'},
      '16': {color: 'beige'}
      '17': {color: 'blue'},
      '18': {color: 'grey'}
      '19': {color: 'dark grey'},
      '20': {color: 'red'},
      '21': {color: 'perple'},
      '22': {color: 'orenge'}
    }
  },
  chenille: {
    name: 'Chenille',
    price: 30,
    designNameTemplate: '%(key)s',
    designNoTemplate: '018-%(key)s',
    designs: {
      '12': {color: 'brown'},
      '19': {color: 'red'},
      '23': {color: 'green'}
    }
  }
})

export default {
  mkFabric,

  components: { ShowModificationsInput },

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
        const design = this.designs[value]
        this.$emit('input', R.merge(this.value, design.value))
      }
    },

    color: {
      get () { return this.value.color },
      set (value) {
        this.$emit('input', R.assoc('color', value, this.value))
      }
    },

    no: {
      get () { return this.value.no },
      set (value) {
        this.$emit('input', R.assoc('no', value, this.value))
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
    },

    designs () {
      return this.fabric.designs
    },

    design () {
      return this.designs[this.value.design]
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
</style>
