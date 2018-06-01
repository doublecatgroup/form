import Vue from 'vue'
import Router from 'vue-router'

import qs from 'qs'

import OrderForm from '@/components/OrderForm'

Vue.use(Router)

export default new Router({
  parseQuery (query) {
    return qs.parse(query, { parseArrays: false })
  },
  stringifyQuery (query) {
    return qs.stringify(query, { addQueryPrefix: true })
  },
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'OrderForm',
      component: OrderForm
    }
  ]
})
