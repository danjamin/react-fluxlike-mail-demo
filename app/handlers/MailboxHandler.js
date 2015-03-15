var API = require('../services/APIService');
var MailboxStore = require('../stores/MailboxStore');

function _fetchMailboxes() {
  return API.get('/mailboxes')
    .then(function(res) {
      // leave this as plain object or array at this point
      return res.mailboxes ? res.mailboxes : [];
    });
}

module.exports = {
  load: function () {
    return _fetchMailboxes()
      .then(function (mailboxes) {
        // add to store
        MailboxStore.mergeMailboxes(mailboxes);
        return mailboxes;
      });
  },

  changeSelection: function (mailboxId) {
    MailboxStore.setPrimitives({mailboxId});
  }
};
