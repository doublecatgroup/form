<template>
  <div>
    <h1>{{ title }}</h1>
    <table class="confirmation">
      <tr>
        <th>Window</th>
        <th>Item</th>
        <th>Size (cm)</th>
        <th>Price (SGD)</th>
      </tr>
      <template v-for="(item, id) in items">
        <tr :key="id">
          <td>{{ item.name }}</td>
          <td>curtains</td>
          <td> {{ item.width }} x {{ item.drop }} </td>
          <td class="total">{{ item.curtainsTotal.toFixed(2) }}</td>
        </tr>
        <tr v-if="item.fixation.key != 'none'" :key="id + '-fixation'">
          <td>{{ item.name }}</td>
          <td> {{ item.fixation.key }} </td>
          <td> {{ item.width }} </td>
          <td class="total">{{ item.fixationTotal.toFixed(2) }}</td>
        </tr>
      </template>
      <tr>
        <th colspan="3">Total</th>
        <th class="total"> {{ total.toFixed(2) }} </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['items', 'total', 'mode'],
  computed: {
    title () {
      return this.mode === 'confirmation' ? 'Order Confirmation' : 'Quotation'
    }
  }
}
</script>

<style>
table.confirmation {
  text-align: left;
  width: 100%;

}

table.confirmation .total {
  text-align: right;
}
</style>
