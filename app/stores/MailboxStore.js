var React = require('react') // required by inline JSX
var _ = require('underscore')
var Store = require('./Store')

var CHANGE_EVENT = 'change'
var _mailboxes = []

module.exports = _.extend(Store, {
  getMailboxes: function () {
    return _mailboxes
  },

  setMailboxes: function (mailboxes) {
    _mailboxes = mailboxes
    this.emitChange()
  }
})
