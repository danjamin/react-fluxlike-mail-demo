var React = require('react')

var AppStore = require('../stores/AppStore.react')
var MailboxStore = require('../stores/MailboxStore')
var MailboxesView = require('../views/MailboxesView.react')
var IndexView = require('../views/IndexView.react')
var API = require('../services/APIService')

module.exports =  function () {
  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<IndexView />)
  })

  // Trigger data fetch
  API.get('/mailboxes.json')
    .then(function(mailboxes) {
      MailboxStore.setState({
        mailboxes,
        mailboxId: 0
      })
      return mailboxes
    })
}
