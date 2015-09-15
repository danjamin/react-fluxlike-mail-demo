import API from 'fl-api-service';
import {Dispatcher} from 'fluxlike';

import AppActionTypes from '../AppActionTypes.js';

function _fetchMailboxes() {
  return API.GET('/mailboxes').then(function(res) {
    // leave this as plain object or array at this point
    return res.mailboxes ? res.mailboxes : [];
  });
}

export default {
  // return a promise
  load: function () {
    return _fetchMailboxes().then(function (rawMailboxes) {
      Dispatcher.dispatch({
        type: AppActionTypes.RECEIVE_RAW_MAILBOXES,
        rawMailboxes: rawMailboxes
      });

      return rawMailboxes;
    });
  },

  selectMailbox: function (mailboxId) {
    Dispatcher.dispatch({
      type: AppActionTypes.SELECT_MAILBOX,
      mailboxId: mailboxId
    });
  }
};
