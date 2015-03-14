var React = require('react')

var AppStore = require('../stores/AppStore.react')
var MailboxStore = require('../stores/MailboxStore')
var MailboxesView = require('../views/MailboxesView.react')
var IndexView = require('../views/IndexView.react')
var MailboxService = require('../services/MailboxService')

module.exports =  function () {
  document.title = 'Mail'

  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<IndexView />)
  })

  MailboxStore.setState({mailboxId: 0})
  MailboxService.pullMailboxes()
}
