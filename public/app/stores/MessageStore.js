define(function (require) {
  'use strict';

  var _ = require('underscore'),
    Immutable = require('immutable'),
    MessageRecord = require('app/records/MessageRecord'),
    Store = require('fl-store')['default'],
    AppDispatcher = require('app/dispatcher/AppDispatcher'),
    ActionTypes = require('app/ActionTypes');

  var MessageStore;

  var _messages = new Immutable.Map(),
    _messageId = 0;

  /**
   * Merges rawMessages with the private _messages Immutable map
   * @param array rawMessages Array of raw JS objects representing messages
   */
  function _mergeMessages(rawMessages) {
    _messages = _messages.withMutations(function (map) {
      rawMessages.forEach(function (rawMessage) {
        map.update(rawMessage.id, function (oldMessage) {
          return oldMessage ? oldMessage.merge(rawMessage) :
            new MessageRecord(rawMessage);
        });
      });
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
   * Deletes a message by id.
   * @param number messageId
   */
  function _deleteMessage(messageId) {
    if (messageId) {
       _messages = _messages['delete'](messageId);
    }
  }

  MessageStore = _.extend({}, Store, {
    getSelectedMessageId: function () {
      return _messageId;
    },

    /**
     * Gets all the immutable message records in a given mailbox as
     * an immutable iterable.
     *
     * @param {number} mailboxId The mailboxId to filter by
     * @return {Immutable.Iterable}
     */
    getMessagesInMailbox: function(mailboxId) {
      if (!mailboxId) {
        return new Immutable.Map();
      } else {
        return _messages.filter(function (record, messageId) {
          return record.get('mailboxId') === mailboxId;
        });
      }
    },

    /**
     * Gets a specific immutable message record by id.
     * @return {undefined | MessageRecord} undefined if not found
     */
    getMessageById: function (messageId) {
      if (messageId) {
        return _messages.get(messageId);
      }
    }
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

      case ActionTypes.DELETE_MESSAGE:
        _deleteMessage(action.message.get('id'));
        MessageStore.emitChange();
        break;

      case ActionTypes.UNDO_DELETE_MESSAGE:
        _mergeMessages([action.message]);
        MessageStore.emitChange();
        break;

      default:
        // do nothing
    }
  });

  return MessageStore;
});
