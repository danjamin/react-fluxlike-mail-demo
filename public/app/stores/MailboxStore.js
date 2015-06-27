define(function (require) {
  'use strict';

  var _ = require('underscore'),
    Immutable = require('immutable'),
    Store = require('fl-store')['default'],
    AppDispatcher = require('app/dispatcher/AppDispatcher'),
    ActionTypes = require('app/ActionTypes'),
    MailboxRecord = require('app/records/MailboxRecord');

  var MailboxStore;

  var _mailboxes = new Immutable.Map(),
    _selectedMailboxId = 0;

  /**
   * Merges rawMailboxes with the private _mailboxes Immutable map
   * @param array rawMailboxes Array of raw JS objects representing mailboxes
   */
  function _mergeMailboxes(rawMailboxes) {
    _mailboxes = _mailboxes.withMutations(function (map) {
      rawMailboxes.forEach(function (rawMailbox) {
        map.update(rawMailbox.id, function (oldMailbox) {
          return oldMailbox ? oldMailbox.merge(rawMailbox) :
            new MailboxRecord(rawMailbox);
        });
      });
    });
  }

  /**
   * Decrements the count of messages in a mailbox record
   * @param number mailboxId the id of the mailbox to decrement
   */
  function _decrementCount(mailboxId) {
    _mailboxes = _mailboxes.updateIn(
      [mailboxId, 'count'],
      function (count) {
        return count > 0 ? count - 1 : count;
      }
    );
  }

  /**
   * Increments the count of messages in a mailbox record
   * @param number mailboxId the id of the mailbox to increment
   */
  function _incrementCount(mailboxId) {
    _mailboxes = _mailboxes.updateIn(
      [mailboxId, 'count'],
      function (count) {
        return !count || count < 0 ? 1 : count + 1;
      }
    );
  }

  /**
   * Selects a mailbox by id -- this is expected to represent which mailbox
   * is currently selected in the UI.
   * @param number mailboxId The new mailboxId to mark as selected
   */
  function _selectMailbox(mailboxId) {
    _selectedMailboxId = mailboxId;
  }

  MailboxStore = _.extend({}, Store, {
    getSelectedMailboxId: function () {
      return _selectedMailboxId;
    },

    /**
     * Gets the mailboxes Immutable.Map reference.
     * @return {Immutable.Map}
     */
    getMailboxes: function () {
      return _mailboxes;
    },

    /**
     * Gets a specific immutable mailbox record by id.
     * @return {undefined | MailboxRecord} undefined if not found
     */
    getMailboxById: function (mailboxId) {
      if (mailboxId) {
        return _mailboxes.get(mailboxId);
      }
    }
  });

  // Register callback with dispatcher and save dispatchToken
  MailboxStore.dispatchToken = AppDispatcher.register(function (action) {
    switch (action.type) {
      case ActionTypes.RECEIVE_RAW_MAILBOXES:
        _mergeMailboxes(action.rawMailboxes);
        MailboxStore.emitChange();
        break;

      case ActionTypes.SELECT_MAILBOX:
        _selectMailbox(action.mailboxId);
        MailboxStore.emitChange();
        break;

      case ActionTypes.DELETE_MESSAGE:
        _decrementCount(action.message.get('mailboxId'));
        MailboxStore.emitChange();
        break;

      case ActionTypes.UNDO_DELETE_MESSAGE:
        _incrementCount(action.message.get('mailboxId'));
        MailboxStore.emitChange();
        break;

      default:
        // do nothing
    }
  });

  return MailboxStore;
});
