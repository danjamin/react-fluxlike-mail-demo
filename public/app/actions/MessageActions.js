define(function (require) {
  'use strict';

  var API = require('fl-api-service'),
    MessageStore = require('app/stores/MessageStore'),
    MailboxStore = require('app/stores/MailboxStore');

  var _lastFetchedByMailboxId = {};

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

  return {
    loadMessagesInMailbox: function (mailboxId, options) {
      var doFetch = true;

      if (options && options.onlyIfStale) {
        if (_lastFetchedByMailboxId.hasOwnProperty(mailboxId)) {
          doFetch = _lastFetchedByMailboxId[mailboxId] === -1;
        }
      }

      if (!doFetch) {
        return;
      }

      MessageStore.setIsLoadingByMailboxId(mailboxId, true);

      _lastFetchedByMailboxId[mailboxId] = (new Date()).getTime();

      _fetchMessagesInMailbox(mailboxId).then(function (messages) {
        MessageStore.setIsLoadingByMailboxId(mailboxId, false);
        MessageStore.mergeMessages(messages);
        return messages;
      });
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

      _deleteMessage(messageId).then(function(success) {
        if (!success) {
          _undo();
        }
      })['catch'](function (xhr) {
        _undo();
      });
    }
  };
});
