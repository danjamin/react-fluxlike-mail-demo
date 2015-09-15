import React from 'react';
import {Router, ActionCreators} from 'fluxlike';

import MailboxActionCreators from '../actions/MailboxActionCreators.js';
import MessageActionCreators from '../actions/MessageActionCreators.js';
import MessagesView from '../views/MessagesView.js';
import DefaultTemplate from '../templates/DefaultTemplate.js';

var transitionTo = Router.Router.transitionTo;

// returns array of promises
export default function (mailboxId, messageId) {
  var promises = [];

  // default to inbox, and transition to mailbox with proper
  // mailboxId when not originally defined
  if (!mailboxId) {
    mailboxId = 1;
    transitionTo("mailbox", [mailboxId]);
  }

  // parse params
  mailboxId = parseInt(mailboxId, 10);
  messageId = parseInt(messageId, 10);

  MailboxActionCreators.selectMailbox(mailboxId);
  MessageActionCreators.selectMessage(messageId ? messageId : 0);

  promises.push(MailboxActionCreators.load());
  promises.push(MessageActionCreators.loadMessagesInMailbox(mailboxId));

  ActionCreators.setTemplate(
    <DefaultTemplate>
      <MessagesView />
    </DefaultTemplate>
  );

  return promises;
}
