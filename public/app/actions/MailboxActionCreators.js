define(function (require) {
  'use strict';

  var API = require('fl-api-service'),
    AppDispatcher = require('app/dispatcher/AppDispatcher'),
    ActionTypes = require('app/ActionTypes');

  function _fetchMailboxes() {
    return API.GET('/mailboxes').then(function(res) {
      // leave this as plain object or array at this point
      return res.mailboxes ? res.mailboxes : [];
    });
  }

  return {
    load: function () {
      _fetchMailboxes().then(function (rawMailboxes) {
        AppDispatcher.dispatch({
          type: ActionTypes.RECEIVE_RAW_MAILBOXES,
          rawMailboxes: rawMailboxes
        });

        return rawMailboxes;
      });
    },

    selectMailbox: function (mailboxId) {
      AppDispatcher.dispatch({
        type: ActionTypes.SELECT_MAILBOX,
        mailboxId: mailboxId
      });
    }
  };
});
