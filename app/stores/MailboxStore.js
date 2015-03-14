var _ = require('underscore')

var Store = require('./Store')

module.exports = _.extend({}, Store, {
  state: {
    mailboxes: [],
    mailboxId: 0
  },

  getMailboxById: function (mailboxId) {
    if (!mailboxId) {
      return null
    }

    return _.findWhere(this.get('mailboxes'), {id: mailboxId})
  }
})
