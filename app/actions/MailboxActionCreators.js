var Fluxlike = require('fluxlike');

var AppActionTypes = require('../AppActionTypes.js');

function _fetchMailboxes() {
  return Fluxlike.API.GET('/mailboxes').then(function(res) {
    // leave this as plain object or array at this point
    return res.mailboxes ? res.mailboxes : [];
  });
}

module.exports = {
  // return a promise
  load: function () {
    return _fetchMailboxes().then(function (rawMailboxes) {
      Fluxlike.Dispatcher.dispatch({
        type: AppActionTypes.RECEIVE_RAW_MAILBOXES,
        rawMailboxes: rawMailboxes
      });

      return rawMailboxes;
    });
  },

  selectMailbox: function (mailboxId) {
    Fluxlike.Dispatcher.dispatch({
      type: AppActionTypes.SELECT_MAILBOX,
      mailboxId: mailboxId
    });
  }
};
