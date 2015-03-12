var _ = require('underscore')
var Messages = require('../collections/Messages')

module.exports = function (app) {
  app.delete('/api/messages/:messageId', function (req, res) {
    var _messages = Messages.messages
    var messageId = parseInt(req.params.messageId, 10)
    var idx = _.findWhere(_messages, {'id': messageId})

    if (idx) {
      _messages.splice(idx, 1)
      res.send({ success: true })
    } else {
      res.status(404).end()
    }
  })
}
