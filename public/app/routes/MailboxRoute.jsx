define(function (require) {
  'use strict';

  var React = require('react'),
    AppStore = require('app/stores/AppStore'),
    MailboxesView = require('jsx!app/views/MailboxesView'),
    MessagesView = require('jsx!app/views/MessagesView'),
    MailboxActions = require('app/actions/MailboxActions'),
    MessageActions = require('app/actions/MessageActions');

  return function (mailboxId, messageId) {
    // parse params
    mailboxId = parseInt(mailboxId, 10);
    messageId = parseInt(messageId, 10);

    // Set sync state
    MailboxActions.changeSelection(mailboxId);
    MessageActions.changeSelection(messageId ? messageId : 0);

    // Start async
    MailboxActions.load({onlyIfStale: true});
    MessageActions.loadMessagesInMailbox(mailboxId, {onlyIfStale: true});

    // Set views
    AppStore.setState({
      sidePanel: <MailboxesView />,
      content: <MessagesView />
    });
  };
});
