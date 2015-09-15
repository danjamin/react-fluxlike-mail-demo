import API from 'fl-api-service';
import {Dispatcher} from 'fluxlike';

import AppActionTypes from '../AppActionTypes.js';
import MessageStore from '../stores/MessageStore.js';

function _fetchMessagesInMailbox(mailboxId) {
  var url = '/mailbox/' + mailboxId + '/messages';

  return API.GET(url).then(function (res) {
    // leave as plain array
    return res.messages ? res.messages : [];
  });
}

function _deleteMessage(messageId) {
  var url = '/messages/' + messageId;

  return API.DELETE(url).then(function (res) {
    return res.hasOwnProperty('success') ?
      res.success : false;
  });
}

export default {
  // return a promise
  loadMessagesInMailbox: function (mailboxId) {
    return _fetchMessagesInMailbox(mailboxId).then(function (rawMessages) {
      Dispatcher.dispatch({
        type: AppActionTypes.RECEIVE_RAW_MESSAGES,
        rawMessages: rawMessages
      });

      return rawMessages;
    });
  },

  selectMessage: function (messageId) {
    Dispatcher.dispatch({
      type: AppActionTypes.SELECT_MESSAGE,
      messageId: messageId
    });
  },

  deleteMessage: function (messageId) {
    var message;

    if (!messageId) {
      return;
    }

    // get message before it is deleted
    // this way the underlying implementation in the store doesn't matter here
    // e.g. mark deleted with flag vs. actually remove from data set
    message = MessageStore.getMessageById(messageId);

    // if we can't find the message, then there is nothing to delete
    // so get out now
    if (!message) {
      return;
    }

    Dispatcher.dispatch({
      type: AppActionTypes.DELETE_MESSAGE,
      message: message
    });

    function _undo(reason) {
      Dispatcher.dispatch({
        type: AppActionTypes.UNDO_DELETE_MESSAGE,
        message: message,
        reason: reason
      });
    }

    return _deleteMessage(messageId).then(function(success) {
      if (!success) {
        _undo('Oops, an unexpected error occurred.  Please try again later.');
      }
    })['catch'](function (xhr) {
      // todo: better error message handling
      _undo('Unable to delete the message.');
    });
  }
};
