define(function (require) {
  'use strict';

  var API = require('fl-api-service'),
    MailboxStore = require('app/stores/MailboxStore');

  var _lastFetched = -1;

  function _fetchMailboxes() {
    return API.GET('/mailboxes').then(function(res) {
      // leave this as plain object or array at this point
      return res.mailboxes ? res.mailboxes : [];
    });
  }

  return {
    load: function (options) {
      var doFetch = true;

      if (options && options.onlyIfStale) {
        doFetch = _lastFetched === -1;
      }

      if (!doFetch) {
        return;
      }

      MailboxStore.setIsLoading(true);

      _lastFetched = (new Date()).getTime();

      _fetchMailboxes().then(function (mailboxes) {
        MailboxStore.setIsLoading(false);
        MailboxStore.mergeMailboxes(mailboxes);
        return mailboxes;
      });
    },

    changeSelection: function (mailboxId) {
      MailboxStore.setMailboxId(mailboxId);
    }
  };
});
