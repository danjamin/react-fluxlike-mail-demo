var React = require('react')

var AppStore = require('../stores/AppStore.react')
var MailboxStore = require('../stores/MailboxStore')
var MailboxesView = require('../views/MailboxesView.react')
var MessagesView = require('../views/MessagesView.react')
var MailboxService = require('../services/MailboxService')
var MessageService = require('../services/MessageService')

module.exports =  function (mailboxId) {
  mailboxId = parseInt(mailboxId, 10)

  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<MessagesView />)
  })

  // Trigger data fetches
  MailboxStore.setState({mailboxId})
  MailboxService.pullMailboxes()
  MessageService.pullMessagesInMailbox(mailboxId)
}
