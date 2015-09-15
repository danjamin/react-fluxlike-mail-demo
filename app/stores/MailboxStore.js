/* global JSON */

import _ from 'underscore';
import {Store} from 'fl-store';
import {Dispatcher, Serializer, ActionTypes} from 'fluxlike';

import AppActionTypes from '../AppActionTypes.js';

var MailboxStore;

var _mailboxes,
  _selectedMailboxId;

// Set the initial state
_setInitialState();

/**
 * Sets the initial state of the store
 */
function _setInitialState() {
  _mailboxes = {};
  _selectedMailboxId = null;
}

function _serialize() {
  return JSON.stringify({
    selectedMailboxId: _selectedMailboxId,
    mailboxes: _mailboxes
  });
}

function _deserialize(serializedData) {
  var raw = JSON.parse(serializedData);
  _selectedMailboxId = raw.selectedMailboxId;
  _mailboxes = raw.mailboxes;
}

/**
 * Merges rawMailboxes with the private _mailboxes
 * @param array rawMailboxes Array of raw JS objects representing mailboxes
 */
function _mergeMailboxes(rawMailboxes) {
  rawMailboxes.forEach(function (rawMailbox) {
    _mailboxes[rawMailbox.id] = rawMailbox;
  });
}

/**
 * Decrements the count of messages in a mailbox record
 * @param number mailboxId the id of the mailbox to decrement
 */
function _decrementCount(mailboxId) {
  var mailbox = _mailboxes[mailboxId];

  if (mailbox && mailbox.count > 0) {
    --mailbox.count;
  }
}

/**
 * Increments the count of messages in a mailbox record
 * @param number mailboxId the id of the mailbox to increment
 */
function _incrementCount(mailboxId) {
  var mailbox = _mailboxes[mailboxId];

  if (mailbox) {
    mailbox.count = mailbox.count < 0 ? 1 : mailbox.count + 1;
  }
}

/**
 * Selects a mailbox by id -- this is expected to represent which mailbox
 * is currently selected in the UI.
 * @param number mailboxId The new mailboxId to mark as selected
 */
function _selectMailbox(mailboxId) {
  _selectedMailboxId = mailboxId;
}

/**
 * Clears the selected mailbox
 */
function _clearSelectedMailbox() {
  _selectedMailboxId = null;
}

MailboxStore = _.extend({}, Store, {

  getSelectedMailboxId: function () {
    return _selectedMailboxId;
  },

  /**
   * Gets the mailboxes
   * @return array
   */
  getMailboxes: function () {
    return _.toArray(_mailboxes);
  },

  /**
   * Gets a specific immutable mailbox record by id.
   * @return {undefined | MailboxRecord} undefined if not found
   */
  getMailboxById: function (mailboxId) {
    if (mailboxId) {
      return _mailboxes[mailboxId];
    }
  }
});

// Register with serializer
Serializer.register('MailboxStore', _serialize, _deserialize);

// Register callback with dispatcher and save dispatchToken
MailboxStore.dispatchToken = Dispatcher.register(function (action) {
  switch (action.type) {
    case AppActionTypes.RECEIVE_RAW_MAILBOXES:
      _mergeMailboxes(action.rawMailboxes);
      MailboxStore.emitChange();
      break;

    case AppActionTypes.SELECT_MAILBOX:
      _selectMailbox(action.mailboxId);
      MailboxStore.emitChange();
      break;

    case AppActionTypes.DELETE_MESSAGE:
      _decrementCount(action.message.mailboxId);
      MailboxStore.emitChange();
      break;

    case AppActionTypes.UNDO_DELETE_MESSAGE:
      _incrementCount(action.message.mailboxId);
      MailboxStore.emitChange();
      break;

    case ActionTypes.CLEAR_SELECTED_ITEMS:
      _clearSelectedMailbox();
      MailboxStore.emitChange();
      break;

    case ActionTypes.RESET:
      _setInitialState();
      MailboxStore.emitChange();
      break;

    default:
      // do nothing
  }
});

export default MailboxStore;
