var API = require('./APIService')
var MessageStore = require('../stores/MessageStore')

module.exports = {
  fetchMessagesInMailbox: function (mailboxId) {
    return API.get('/mailbox/' + mailboxId + '/messages')
      .then(function (res) {
        return res.messages ? res.messages : []
      })
  },

  pullMessagesInMailbox: function (mailboxId) {
    MessageStore.setState({isLoading: true})

    return this.fetchMessagesInMailbox(mailboxId)
      .then(function (messages) {
        MessageStore.setState({isLoading: false}, {isSilent: true})
        MessageStore.setMessagesInMailbox(mailboxId, messages)
        return messages
      })
  }
}
