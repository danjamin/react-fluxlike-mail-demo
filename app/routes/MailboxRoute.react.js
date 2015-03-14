var React = require('react')

var AppStore = require('../stores/AppStore.react')
var MailboxStore = require('../stores/MailboxStore')
var MessageStore = require('../stores/MessageStore')
var MailboxesView = require('../views/MailboxesView.react')
var MessagesView = require('../views/MessagesView.react')
var MailboxService = require('../services/MailboxService')
var MessageService = require('../services/MessageService')

module.exports =  function (mailboxId, messageId) {
  mailboxId = parseInt(mailboxId, 10)
  messageId = parseInt(messageId, 10)

  if (!messageId) {
    messageId = 0
  }

  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<MessagesView />)
  })

  // Trigger data fetches
  MailboxStore.setState({mailboxId})
  MailboxService.pullMailboxes()

  MessageStore.setState({messageId}, {isSilent: true})
  MessageService.pullMessagesInMailbox(mailboxId)
}
