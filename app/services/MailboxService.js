var API = require('./APIService')
var MailboxStore = require('../stores/MailboxStore')

module.exports = {
  fetchMailboxes: function () {
    return API.get('/mailboxes')
      .then(function(res) {
        return res.mailboxes ? res.mailboxes : []
      })
  },

  pullMailboxes: function () {
    return this.fetchMailboxes()
      .then(function (mailboxes) {
        MailboxStore.setState({mailboxes})
        return mailboxes
      })
  }
}
