var React = require('react')

var AppStore = require('../stores/AppStore.react')
var MailboxStore = require('../stores/MailboxStore')
var MessageStore = require('../stores/MessageStore')
var MailboxesView = require('../views/MailboxesView.react')
var MessagesView = require('../views/MessagesView.react')
var API = require('../services/APIService')

var uuid

module.exports =  function (mailboxId) {
  mailboxId = parseInt(mailboxId, 10)

  uuid = API.uuid.generate()

  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<MessagesView />)
  })

  // Trigger data fetches
  MailboxStore.setState({mailboxId})
  MessageStore.setState({isLoading: true})

  API.get('/mailboxes.json')
    .then(function(mailboxes) {
      MailboxStore.setState({mailboxes})
      return mailboxes
    })

  API.get('/box/' + mailboxId + '/messages.json', {uuid})
    .then(function(messages) {
      if (API.uuid.isMatch(uuid, messages)) { // optional
        MessageStore.setState({isLoading: false}, {isSilent: true})
        MessageStore.setMessagesInMailbox(mailboxId, messages)
      }
      return messages
    })
}
