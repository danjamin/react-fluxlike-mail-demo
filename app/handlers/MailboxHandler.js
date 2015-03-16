var API = require('../services/APIService');
var MailboxStore = require('../stores/MailboxStore');

var _lastFetched = -1;

function _fetchMailboxes() {
  return API.get('/mailboxes')
    .then(function(res) {
      // leave this as plain object or array at this point
      return res.mailboxes ? res.mailboxes : [];
    });
}

module.exports = {
  load: function (options) {
    var doFetch = true;

    if (options && options.onlyIfStale) {
      doFetch = _lastFetched === -1;
    }

    if (doFetch) {
      MailboxStore.setPrimitives({isLoading: true});
      _lastFetched = (new Date()).getTime();
      return _fetchMailboxes()
        .then(function (mailboxes) {
          MailboxStore.setPrimitives({isLoading: false});
          MailboxStore.mergeMailboxes(mailboxes);
          return mailboxes;
        });
    } else {
      return API.resolve(MailboxStore.getMailboxes());
    }
  },

  changeSelection: function (mailboxId) {
    MailboxStore.setPrimitives({mailboxId});
  }
};
