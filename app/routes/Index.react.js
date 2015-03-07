var React = require('react')

var AppStore = require('../stores/AppStore.react')
var MailboxesView = require('../views/MailboxesView.react')
var IndexView = require('../views/IndexView.react')

module.exports =  function () {
  AppStore.setSidePanel(
    <MailboxesView />
  )

  AppStore.setContent(
    <IndexView />
  )
}
