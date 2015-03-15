var React = require('react');

var AppStore = require('../stores/AppStore');

var MailboxesView = require('../views/MailboxesView');
var MessagesView = require('../views/MessagesView');

var DocumentTitleHandler = require('../handlers/DocumentTitleHandler');
var MailboxHandler = require('../handlers/MailboxHandler');
var MessageHandler = require('../handlers/MessageHandler');

var _currentMailboxId = 0;

module.exports =  function (mailboxId, messageId) {
  // parse params
  mailboxId = parseInt(mailboxId, 10);
  messageId = parseInt(messageId, 10);

  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<MessagesView />)
  });

  // Set data
  DocumentTitleHandler.setTitleByMailboxId(mailboxId);

  // update the last mailbox fetched
  _currentMailboxId = mailboxId;
  MailboxHandler.load().then(function (mailboxes) {
    // only respond to last mailbox
    if (_currentMailboxId === mailboxId) {
      DocumentTitleHandler.setTitleByMailboxId(mailboxId);
    }

    return mailboxes;
  });

  MailboxHandler.changeSelection(mailboxId);
  MessageHandler.changeSelection(messageId ? messageId : 0);
  MessageHandler.loadMessagesInMailbox(mailboxId);
};
