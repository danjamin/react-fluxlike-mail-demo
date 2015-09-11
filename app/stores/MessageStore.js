/* global JSON */

import _ from 'underscore';
import {Store} from 'fl-store';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../ActionTypes.js';

var MessageStore;

var _messages,
  _messageId;

/**
 * Sets the initial state of the store
 */
(function _setInitialState() {
  _messages = {};
  _messageId = null;
})();

/**
 * Merges rawMessages with the private _messages
 * @param array rawMessages Array of raw JS objects representing messages
 */
function _mergeMessages(rawMessages) {
  rawMessages.forEach(function (rawMessage) {
    _messages[rawMessage.id] = rawMessage;
  });
}

/**
 * Selects a message by id -- this is expected to represent which message
 * is currently selected in the UI.
 * @param number messageId
 */
function _selectMessage(messageId) {
  _messageId = messageId;
}

/**
 * Clears selected message
 */
function _clearSelectedMessage() {
  _messageId = null;
}

/**
 * Deletes a message by id.
 * @param number messageId
 */
function _deleteMessage(messageId) {
  if (messageId) {
    delete _messages[messageId];
  }
}

MessageStore = _.extend({}, Store, {
  serialize: function () {
    return JSON.stringify({
      messageId: _messageId,
      messages: _messages
    });
  },

  deserialize: function (serializedData) {
    var raw = JSON.parse(serializedData);
    _messageId = raw.messageId;
    _messages = raw.messages;
  },

  getSelectedMessageId: function () {
    return _messageId;
  },

  /**
   * Gets all the immutable message records in a given mailbox as
   * an immutable iterable.
   *
   * @param number mailboxId The mailboxId to filter by
   * @return array
   */
  getMessagesInMailbox: function(mailboxId) {
    var messages = [];

    if (mailboxId) {
      messages = _.where(_messages, {mailboxId: mailboxId});
    }

    return messages;
  },

  /**
   * Gets a specific immutable message record by id.
   * @return {undefined | MessageRecord} undefined if not found
   */
  getMessageById: function (messageId) {
    if (messageId) {
      return _messages[messageId];
    }
  },

});

// Register callback with dispatcher and save dispatchToken
MessageStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _mergeMessages(action.rawMessages);
      MessageStore.emitChange();
      break;

    case ActionTypes.SELECT_MESSAGE:
      _selectMessage(action.messageId);
      MessageStore.emitChange();
      break;

    case ActionTypes.CLEAR_SELECTED_ITEMS:
      _clearSelectedMessage();
      MessageStore.emitChange();
      break;

    case ActionTypes.DELETE_MESSAGE:
      _deleteMessage(action.message.id);
      MessageStore.emitChange();
      break;

    case ActionTypes.UNDO_DELETE_MESSAGE:
      _mergeMessages([action.message]);
      MessageStore.emitChange();
      break;

    case ActionTypes.RESET:
      _setInitialState();
      MessageStore.emitChange();
      break;

    default:
      // do nothing
  }
});

export default MessageStore;
