var API = require('../services/APIService');
var MessageStore = require('../stores/MessageStore');

function _fetchMessagesInMailbox(mailboxId) {
  return API.get('/mailbox/' + mailboxId + '/messages')
    .then(function (res) {
      // leave as plain array
      return res.messages ? res.messages : [];
    });
}

module.exports = {
  loadMessagesInMailbox: function (mailboxId) {
    MessageStore.setPrimitives({isLoading: true});

    return _fetchMessagesInMailbox(mailboxId)
      .then(function (messages) {
        MessageStore.setPrimitives({isLoading: false});
        MessageStore.mergeMessages(messages);
        return messages;
      });
  },

  changeSelection: function (messageId) {
    MessageStore.setPrimitives({messageId});
  }
};
