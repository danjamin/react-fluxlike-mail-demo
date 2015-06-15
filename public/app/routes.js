define(function (require) {
  'use strict';

  var IndexRoute = require('jsx!app/routes/IndexRoute'),
    MailboxRoute = require('jsx!app/routes/MailboxRoute');

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
    }
  };
});
