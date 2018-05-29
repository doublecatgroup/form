const R = require('ramda')

export function normalizeEntry (entry) {
  const path = Array.isArray(entry.path) ? entry.path : [entry.path]
  return R.assoc('path', path, entry)
}

function normalizeEntries (entries) {
  return R.map(normalizeEntry, entries)
}

function qget (path) {
  return R.path(path, this.$route.query)
}

function qset (path, value, replace = false) {
  modifyQuery.call(this, R.assocPath(path, value), replace)
}

function qdel (path, replace = false) {
  modifyQuery.call(this, R.dissocPath(path), replace)
}

function modifyQuery (fn, replace) {
  const query = fn(this.$route.query)
  const action = replace ? this.$router.replace : this.$router.push
  action.call(this.$router, {path: '/', query: query})
}

export default {
  beforeCreate: function () {
    const methods = { qget, qset, qdel }
    this.$options.methods = R.merge(this.$options.methods || {}, methods)
    const fn = this.$options.qdata
    if (fn) {
      const computed = {}
      const entries = normalizeEntries(fn.call(this.$options.propsData))
      for (const name in entries) {
        const entry = entries[name]
        const get = () => qget.call(this, entry.path)
        const set = R.curry(qset)(entry.path)
        computed[name] = { get, set }
        if (get() === undefined) {
          set.call(this, entry.def, true)
        }
      }
      this.$options.computed = R.merge(this.$options.computed || {}, computed)
    }
  }
}
