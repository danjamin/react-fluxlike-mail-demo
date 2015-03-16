var assign = require('object-assign');
var Immutable = require('immutable');

var Store = require('./Store');
var primitivesMixin = require('./PrimitivesMixin');
var MailboxRecord = require('../records/MailboxRecord');

var _mailboxes = new Immutable.Map();

var Primitives = primitivesMixin({
  mailboxId: 0,
  isLoading: false
});

module.exports = assign({}, Store, Primitives, {
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
  },

  /**
   * Decrements the count of messages in a mailbox record
   * @return {Immutable.Map} The resulting immutable map. Note: if nothing
   *   changes, will return reference to the previous Immutable.Map.
   */
  decrementCountById: function (mailboxId) {
    var resultingMailboxes = _mailboxes.updateIn(
      [mailboxId, 'count'],
      function (count) {
        return count > 0 ? count - 1 : count;
      }
    );

    if (resultingMailboxes !== _mailboxes) {
      _mailboxes = resultingMailboxes;
      this.emitChange();
    }

    return _mailboxes;
  },

  /**
   * Increments the count of messages in a mailbox record
   * @return {Immutable.Map} The resulting immutable map. Note: if nothing
   *   changes, will return reference to the previous Immutable.Map.
   */
  incrementCountById: function (mailboxId) {
    var resultingMailboxes = _mailboxes.updateIn(
      [mailboxId, 'count'],
      function (count) {
        return !count || count < 0 ? 1 : count + 1;
      }
    );

    if (resultingMailboxes !== _mailboxes) {
      _mailboxes = resultingMailboxes;
      this.emitChange();
    }

    return _mailboxes;
  },

  /**
   * Merges an array of raw mailbox objects and returns the resulting
   * immutable mailboxes map.  Only emits a change when a change has
   * occurred.
   *
   * @param {array} mailboxes The array of raw mailbox objects to be merged
   * @return {Immutable.Map} The resulting immutable map. Note: if nothing
   *   changes, will return reference to the previous Immutable.Map.
   */
  mergeMailboxes: function (mailboxes) {
    var resultingMailboxes = _mailboxes.withMutations(function (map) {
      mailboxes.forEach(function (newMailbox) {
        map.update(newMailbox.id, function (oldMailbox) {
          return oldMailbox ? oldMailbox.merge(newMailbox) :
            new MailboxRecord(newMailbox);
        });
      });
    });

    if (resultingMailboxes !== _mailboxes) {
      _mailboxes = resultingMailboxes;
      this.emitChange();
    }

    return _mailboxes;
  }
});
