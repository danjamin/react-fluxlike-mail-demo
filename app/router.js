var Backbone = require('backbone')

var router = new Backbone.Router()

var start

start = function () {
  router
    .route('', 'index')
    //.route('box/:id', 'mailbox')

  router
    .on('route:index', require('./routes/Index.react'))
    //.on('route:mailbox', require('./routes/Mailbox.react'))

  Backbone.history.start({
    pushState: false, root: "/"
  })
}

module.exports = {
  router: router,
  start: start
}
