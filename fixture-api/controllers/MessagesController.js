var _ = require('underscore')
var Messages = require('../collections/Messages')

module.exports = function (app) {
  app.delete('/api/messages/:messageId', function (req, res) {
    var _messages = Messages.messages
    var messageId = parseInt(req.params.messageId, 10)
    var idx = _.findIndex(_messages, function (message) {
      return message.id === messageId
    })

    if (idx !== -1) {
      _messages.splice(idx, 1)
      res.send({ success: true })
    } else {
      res.status(404).end()
    }
  })
}
