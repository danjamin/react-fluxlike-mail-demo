var _ = require('underscore')

var Store = require('./Store')

module.exports = _.extend({}, Store, {
  state: {
    isLoading: false,

    // "private" state
    '.messages': {} // '.' prefix means visible but shouldn't be used directly
  },

  setMessagesInMailbox: function(mailboxId, messages) {
    var current = this.get('.messages')
    current[mailboxId] = messages

    this.setState({
      '.messages': current
    }, {force: true})
  },

  getMessagesInMailbox: function(mailboxId) {
    var messages = this.get('.messages')
    if (messages.hasOwnProperty(mailboxId)) {
      return messages[mailboxId]
    } else {
      return []
    }
  }
})
