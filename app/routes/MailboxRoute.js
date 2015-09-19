var React = require('react');
var Fluxlike = require('fluxlike');

var MailboxActionCreators = require('../actions/MailboxActionCreators.js');
var MessageActionCreators = require('../actions/MessageActionCreators.js');
var MessagesView = require('../views/MessagesView.js');
var DefaultTemplate = require('../templates/DefaultTemplate.js');

// returns array of promises
module.exports = function (mailboxId, messageId) {
  var promises = [];

  // default to inbox, and transition to mailbox with proper
  // mailboxId when not originally defined
  if (!mailboxId) {
    mailboxId = 1;
    Fluxlike.Router.transitionTo("mailbox", [mailboxId]);
  }

  // parse params
  mailboxId = parseInt(mailboxId, 10);
  messageId = parseInt(messageId, 10);

  MailboxActionCreators.selectMailbox(mailboxId);
  MessageActionCreators.selectMessage(messageId ? messageId : 0);

  promises.push(MailboxActionCreators.load());
  promises.push(MessageActionCreators.loadMessagesInMailbox(mailboxId));

  Fluxlike.ActionCreators.setTemplate(
    <DefaultTemplate>
      <MessagesView />
    </DefaultTemplate>
  );

  return promises;
};
