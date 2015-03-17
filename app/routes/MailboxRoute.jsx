var React = require('react');

var AppStore = require('../stores/AppStore');

var MailboxesView = require('../views/MailboxesView');
var MessagesView = require('../views/MessagesView');

var MailboxActions = require('../actions/MailboxActions');
var MessageActions = require('../actions/MessageActions');

module.exports =  function (mailboxId, messageId) {
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
    sidePanel: (<MailboxesView />),
    content: (<MessagesView />)
  });
};
