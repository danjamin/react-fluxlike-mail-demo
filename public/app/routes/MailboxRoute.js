define(function (require) {
  'use strict';

  var React = require('react'),
    MailboxActionCreators = require('app/actions/MailboxActionCreators'),
    MessageActionCreators = require('app/actions/MessageActionCreators'),
    AppActionCreators = require('app/actions/AppActionCreators'),
    DefaultTemplate = require('jsx!app/templates/DefaultTemplate'),
    MessagesView = require('jsx!app/views/MessagesView');

  return function (mailboxId, messageId) {
    // parse params
    mailboxId = parseInt(mailboxId, 10);
    messageId = parseInt(messageId, 10);

    MailboxActionCreators.selectMailbox(mailboxId);
    MessageActionCreators.selectMessage(messageId ? messageId : 0);

    MailboxActionCreators.load();
    MessageActionCreators.loadMessagesInMailbox(mailboxId);

    AppActionCreators.setTemplate(DefaultTemplate);
    AppActionCreators.setTemplateOptions({
      showSidePanel: true,
      ContentView: React.createElement(MessagesView)
    });
  };
});
