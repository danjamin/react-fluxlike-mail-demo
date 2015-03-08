var React = require('react')

var AppStore = require('../stores/AppStore.react')
var MailboxStore = require('../stores/MailboxStore')
var MessageStore = require('../stores/MessageStore')
var MailboxesView = require('../views/MailboxesView.react')
var MessagesView = require('../views/MessagesView.react')
var APIService = require('../services/APIService')

module.exports =  function (mailboxId) {
  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<MessagesView />)
  })

  // Trigger data fetches
  APIService.get('/mailboxes.json').then(function(mailboxes) {
    MailboxStore.setState({mailboxes})
  })

  MessageStore.setState({isLoading: true})
  APIService.get('/box/' + mailboxId + '/messages.json').then(function(messages) {
    MessageStore.setState({
      isLoading: false,
      messages
    })
  })
}
