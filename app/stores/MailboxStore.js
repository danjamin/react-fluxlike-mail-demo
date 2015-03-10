var _ = require('underscore')

var Store = require('./Store')

module.exports = _.extend({}, Store, {
  state: {
    mailboxes: [],
    mailboxId: 0
  }
})
