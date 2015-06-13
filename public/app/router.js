define(function (require) {
  'use strict';

  var Backbone = require('backbone'),
    IndexRoute = require('jsx!app/routes/IndexRoute'),
    MailboxRoute = require('jsx!app/routes/MailboxRoute');

  var router,
    start;

  router = new Backbone.Router();

  start = function () {
    router
      .route('', 'index')
      .route('box/:mailboxId', 'mailbox')
      .route('box/:mailboxId/message/:messageId', 'mailbox');

    router
      .on('route:index', IndexRoute)
      .on('route:mailbox', MailboxRoute);

    Backbone.history.start({
      pushState: false,
      root: "/"
    });
  };

  return {
    router: router,
    start: start
  };
});
