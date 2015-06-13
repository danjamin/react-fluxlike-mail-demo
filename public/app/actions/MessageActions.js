define(function (require) {
  'use strict';

  var API = require('app/services/APIService'),
    MessageStore = require('app/stores/MessageStore'),
    MailboxStore = require('app/stores/MailboxStore');

  var _lastFetchedByMailboxId = {};

  function _fetchMessagesInMailbox(mailboxId) {
    return API.get('/mailbox/' + mailboxId + '/messages')
      .then(function (res) {
        // leave as plain array
        return res.messages ? res.messages : [];
      });
  }

  function _deleteMessage(messageId) {
    return API['delete']('/messages/' + messageId)
      .then(function (res) {
        return res.hasOwnProperty('success') ?
          res.success : false;
      });
  }

  return {
    loadMessagesInMailbox: function (mailboxId, options) {
      var doFetch = true;

      if (options && options.onlyIfStale) {
        if (_lastFetchedByMailboxId.hasOwnProperty(mailboxId)) {
          doFetch = _lastFetchedByMailboxId[mailboxId] === -1;
        }
      }

      if (doFetch) {
        MessageStore.setIsLoadingByMailboxId(mailboxId, true);
        _lastFetchedByMailboxId[mailboxId] = (new Date()).getTime();
        return _fetchMessagesInMailbox(mailboxId)
          .then(function (messages) {
            MessageStore.setIsLoadingByMailboxId(mailboxId, false);
            MessageStore.mergeMessages(messages);
            return messages;
          });
      } else {
        return API.resolve(
          MessageStore.getMessagesInMailbox(mailboxId)
        );
      }
    },

    changeSelection: function (messageId) {
      MessageStore.setMessageId(messageId);
    },

    deleteMessageById: function (messageId) {
      var oldMessage;
      var mailboxId;

      if (!messageId) {
        return;
      }

      oldMessage = MessageStore.getMessageById(messageId);
      mailboxId = oldMessage.get('mailboxId');

      MessageStore.deleteMessageById(messageId);
      MailboxStore.decrementCountById(mailboxId);

      function _undo() {
        MessageStore.mergeMessages([oldMessage]);
        MailboxStore.incrementCountById(mailboxId);
      }

      return _deleteMessage(messageId).then(function(success) {
        if (!success) {
          _undo();
        }
      })['catch'](function (xhr) {
        _undo();
      });
    }
  };
});
