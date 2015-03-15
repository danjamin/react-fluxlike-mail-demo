var Backbone = require('backbone');

var router = new Backbone.Router();

var start;

start = function () {
  router
    .route('', 'index')
    .route('box/:mailboxId', 'mailbox')
    .route('box/:mailboxId/message/:messageId', 'mailbox');

  router
    .on('route:index', require('./routes/IndexRoute'))
    .on('route:mailbox', require('./routes/MailboxRoute'));

  Backbone.history.start({
    pushState: false, root: "/"
  });
};

module.exports = {
  router: router,
  start: start
};
