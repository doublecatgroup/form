<template>
  <span>
    <select v-model="key">
      <option v-for="(value, key) in fixations" :key="key" :value="key"> {{ value.name }}</option>
    </select>
    <template v-if="key != 'none'">
      <label>unit priceS$<show-modifications-input placeholder="price" type="number" v-model.number="price" step="any" :original="fixations[value.key].price"/></label>
      <select v-model="mounting">
        <option v-for="(value, key) in mountings" :key="key" :value="key"> {{ value }}</option>
      </select>
    </template>
  </span>
</template>

<script>
import ShowModificationsInput from '@/components/ShowModificationsInput'
const R = require('ramda')

const fixations = {
  none: {
    name: 'None',
    price: 0
  },
  track: {
    name: 'Track',
    price: 10
      },
  double track: {
    name: 'Double Track',
    price: 20
  },
  rod: {
    name: 'Rod',
    price: 26
    },
  double rod: {
    name: 'Double Rod',
    price: 52
  }
}

const mountings = {
  ceiling: 'Ceiling',
  wall: 'Wall'
}

export default {
  components: { ShowModificationsInput },

  props: ['value'],

  data () {
    return {
      fixations,
      mountings
    }
  },
  computed: {
    key: {
      get () { return this.value.key },
      set (value) {
        this.$emit('input', R.merge(this.value, {key: value, price: this.fixations[value].price}))
      }
    },
    price: {
      get () { return this.value.price },
      set (value) {
        this.$emit('input', R.assoc('price', value, this.value))
      }
    },
    mounting: {
      get () { return this.value.mounting },
      set (value) {
        this.$emit('input', R.assoc('mounting', value, this.value))
      }
    }
  }
}
</script>
