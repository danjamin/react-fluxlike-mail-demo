define(function (require) {
  'use strict';

  var IndexRoute = require('app/routes/IndexRoute'),
    MailboxRoute = require('app/routes/MailboxRoute'),
    ContributorsRoute = require('app/routes/ContributorsRoute');

  // WARNING: do not add an initial "/" in your paths!
  return {
    index: {
      path: '',
      route: IndexRoute
    },

    mailbox: {
      path: 'box/:mailboxId',
      route: MailboxRoute
    },

    message: {
      path: 'box/:mailboxId/message/:messageId',
      route: MailboxRoute
    },

    contributors: {
      path: 'contributors',
      route: ContributorsRoute
    }
  };
});
