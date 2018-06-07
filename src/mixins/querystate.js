const R = require('ramda')

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
  action.call(this.$router, {query: query})
}

export default {
  beforeCreate: function () {
    const methods = { qget, qset, qdel }
    this.$options.methods = R.merge(this.$options.methods || {}, methods)
  }
}
