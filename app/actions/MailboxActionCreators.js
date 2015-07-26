import API from 'fl-api-service';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../ActionTypes.js';

function _fetchMailboxes() {
  return API.GET('/mailboxes').then(function(res) {
    // leave this as plain object or array at this point
    return res.mailboxes ? res.mailboxes : [];
  });
}

export default {
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
