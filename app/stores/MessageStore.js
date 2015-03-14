var _ = require('underscore')

var Store = require('./Store')

module.exports = _.extend({}, Store, {
  state: {
    isLoading: false,
    messageId: 0,

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
    var messages

    if (!mailboxId) {
      return []
    }

    messages = this.get('.messages')

    if (messages.hasOwnProperty(mailboxId)) {
      return messages[mailboxId]
    } else {
      return []
    }
  },

  getMessageInBoxById: function (mailboxId, messageId) {
    var messages

    if (!mailboxId || !messageId) {
      return null
    }

    messages = this.getMessagesInMailbox(mailboxId)

    return _.findWhere(messages, {id: messageId})
  }
})
