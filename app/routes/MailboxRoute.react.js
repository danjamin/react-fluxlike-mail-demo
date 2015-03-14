var React = require('react')

var AppStore = require('../stores/AppStore.react')
var MailboxStore = require('../stores/MailboxStore')
var MessageStore = require('../stores/MessageStore')
var MailboxesView = require('../views/MailboxesView.react')
var MessagesView = require('../views/MessagesView.react')
var MailboxService = require('../services/MailboxService')
var MessageService = require('../services/MessageService')

var _currentMailboxId = 0

function _setDocumentTitle(mailboxId) {
  var mailbox = MailboxStore.getMailboxById(mailboxId)

  if (mailbox) {
    document.title = 'Mail | ' + mailbox.name +
      (mailbox.count ? ' (' + mailbox.count + ')' : '')
  } else {
    document.title = 'Mail | Loading...'
  }
}

module.exports =  function (mailboxId, messageId) {
  mailboxId = parseInt(mailboxId, 10)
  messageId = parseInt(messageId, 10)

  // Set title right away when possible
  _setDocumentTitle(mailboxId)

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

  // update the last mailbox fetched
  _currentMailboxId = mailboxId
  MailboxService.pullMailboxes().then(function (mailboxes) {
    // only respond to last mailbox
    if (_currentMailboxId === mailboxId) {
      _setDocumentTitle(mailboxId)
    }

    return mailboxes
  })

  MessageStore.setState({messageId}, {isSilent: true})
  MessageService.pullMessagesInMailbox(mailboxId)
}
