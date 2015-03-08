var Backbone = require('backbone')

var router = new Backbone.Router()

var start

start = function () {
  router
    .route('', 'index')
    .route('box/:mailboxId', 'mailbox')

  router
    .on('route:index', require('./routes/IndexRoute.react'))
    .on('route:mailbox', require('./routes/MailboxRoute.react'))

  Backbone.history.start({
    pushState: false, root: "/"
  })
}

module.exports = {
  router: router,
  start: start
}
