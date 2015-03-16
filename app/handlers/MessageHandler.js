var API = require('../services/APIService');
var MessageStore = require('../stores/MessageStore');
var _lastFetchedByMailboxId = {};

function _fetchMessagesInMailbox(mailboxId) {
  return API.get('/mailbox/' + mailboxId + '/messages')
    .then(function (res) {
      // leave as plain array
      return res.messages ? res.messages : [];
    });
}

module.exports = {
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
    MessageStore.setPrimitives({messageId});
  }
};
