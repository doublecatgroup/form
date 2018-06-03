<template>
  <input v-model="input" :class="input == original ? '' : 'modified'"/>
</template>

<script>
export default {
  props: ['value', 'original'],
  computed: {
    input: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  }
}
</script>

<style>
.modified {
  background-color: #FEE;
}
</style>
