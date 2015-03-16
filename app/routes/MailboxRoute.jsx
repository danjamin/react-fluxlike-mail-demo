var React = require('react');

var AppStore = require('../stores/AppStore');

var MailboxesView = require('../views/MailboxesView');
var MessagesView = require('../views/MessagesView');

var DocumentTitleActions = require('../actions/DocumentTitleActions');
var MailboxActions = require('../actions/MailboxActions');
var MessageActions = require('../actions/MessageActions');

var _currentMailboxId = 0;

module.exports =  function (mailboxId, messageId) {
  // parse params
  mailboxId = parseInt(mailboxId, 10);
  messageId = parseInt(messageId, 10);

  // Set sync state
  DocumentTitleActions.setTitleByMailboxId(mailboxId);
  MailboxActions.changeSelection(mailboxId);
  MessageActions.changeSelection(messageId ? messageId : 0);

  // Start async
  // update the last mailbox fetched
  _currentMailboxId = mailboxId;
  MailboxActions.load({onlyIfStale: true}).then(function (mailboxes) {
    // only respond to last mailbox
    if (_currentMailboxId === mailboxId) {
      DocumentTitleActions.setTitleByMailboxId(mailboxId);
    }

    return mailboxes;
  });

  MessageActions.loadMessagesInMailbox(mailboxId, {onlyIfStale: true});

  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<MessagesView />)
  });
};
