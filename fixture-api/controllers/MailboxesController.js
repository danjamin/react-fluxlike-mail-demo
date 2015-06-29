/* global module, require */

var _ = require('underscore');
var Messages = require('../collections/Messages');

module.exports = function (app) {
  app.get('/api/mailboxes', function (req, res) {
    var _messages = Messages.messages;

    res.send({
      mailboxes: [
        {
          "id": 1,
          "name": "Inbox",
          "count": _.where(_messages, {'mailboxId': 1}).length
        },
        {
          "id": 2,
          "name": "Outbox",
          "count": _.where(_messages, {'mailboxId': 2}).length
        },
        {
          "id": 3,
          "name": "Archive",
          "count": _.where(_messages, {'mailboxId': 3}).length
        }
      ]
    });
  });

  app.get('/api/mailbox/:mailboxId/messages', function (req, res) {
    var _messages = Messages.messages;
    var mailboxId = parseInt(req.params.mailboxId, 10);
    var messages = _.where(_messages, {'mailboxId': mailboxId});

    res.send({ messages: messages });
  });
};
