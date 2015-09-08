import React from 'react';
import {Router} from 'fl-router';

import MailboxActionCreators from '../actions/MailboxActionCreators.js';
import MessageActionCreators from '../actions/MessageActionCreators.js';
import AppActionCreators from '../actions/AppActionCreators.js';
import MessagesView from '../views/MessagesView.js';

// returns array of promises
export default function (mailboxId, messageId) {
  var promises = [];

  // default to inbox, and transition to mailbox with proper
  // mailboxId when not originally defined
  if (!mailboxId) {
    mailboxId = 1;
    Router.transitionTo("mailbox", [mailboxId]);
  }

  // parse params
  mailboxId = parseInt(mailboxId, 10);
  messageId = parseInt(messageId, 10);

  MailboxActionCreators.selectMailbox(mailboxId);
  MessageActionCreators.selectMessage(messageId ? messageId : 0);

  promises.push(MailboxActionCreators.load());
  promises.push(MessageActionCreators.loadMessagesInMailbox(mailboxId));

  AppActionCreators.setTemplateOptions({
    ContentView: React.createElement(MessagesView)
  });

  return promises;
}
