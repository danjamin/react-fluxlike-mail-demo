var assign = require('object-assign');
var Immutable = require('immutable');

var MessageRecord = require('../records/MessageRecord');
var Store = require('./Store');
var primitivesMixin = require('./PrimitivesMixin');

var _messages = new Immutable.Map();

var Primitives = primitivesMixin({
  messageId: 0
});

module.exports = assign({}, Store, Primitives, {
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
  },

  /**
   * Merges an array of raw message objects and returns the resulting
   * immutable messages map.  Only emits a change when a change has
   * occurred.
   *
   * @param {array} messages The array of raw message objects to be merged
   * @return {Immutable.Map} The resulting immutable map. Note: if nothing
   *   changes, will return reference to the previous Immutable.Map.
   */
  mergeMessages: function(messages) {
    var resultingMessages = _messages.withMutations(function (map) {
      messages.forEach(function (newMessage) {
        map.update(newMessage.id, function (oldMessage) {
          return oldMessage ? oldMessage.merge(newMessage) :
            new MessageRecord(newMessage);
        });
      });
    });

    if (resultingMessages !== _messages) {
      _messages = resultingMessages;
      this.emitChange();
    }

    return _messages;
  }
});
