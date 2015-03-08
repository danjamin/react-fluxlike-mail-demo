var _ = require('underscore')

var Store = require('./Store')

module.exports = _.extend({}, Store, {
  state: {
    isLoading: false,
    messages: []
  }
})
