<template>
  <input v-model="valueByUnit" type="number" step="any">
</template>

<script>
export default {
  props: ['value', 'unit'],
  computed: {
    valueByUnit: {
      get () { return this.value / this.unit.multiplier },
      set (value) { this.$emit('input', value * this.unit.multiplier) }
    }
  }
}
</script>
