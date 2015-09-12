import React from 'react/addons';
import {Router} from '../lib/fl-base/fl-base.js';

import MessageActionCreators from '../actions/MessageActionCreators.js';
import MessageStore from '../stores/MessageStore.js';
import MailboxStore from '../stores/MailboxStore.js';
import MessageRow from '../components/MessageRow.js';
import Message from '../components/Message.js';

var {RouteStore} = Router;

function getStateFromStores () {
  var mailboxId = MailboxStore.getSelectedMailboxId();
  var messageId = MessageStore.getSelectedMessageId();

  return {
    activeURL: RouteStore.getURL(),
    mailboxId: mailboxId,
    messageId: messageId,
    messages: MessageStore.getMessagesInMailbox(mailboxId),
    selectedMailbox: MailboxStore.getMailboxById(mailboxId),
    selectedMessage: MessageStore.getMessageById(messageId)
  };
}

export default React.createClass({
  displayName: 'MessagesView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    MessageStore.addChangeListener(this._onChange);
    MailboxStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MessageStore.removeChangeListener(this._onChange);
    MailboxStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var messageRows;
    var selectedMessage;
    var messagesTable;

    messageRows = this.state.messages.map(function (message) {
      return <MessageRow key={message.id}
          mailboxId={this.state.mailboxId}
          message={message}
          activeURL={this.state.activeURL} />;
    }.bind(this));

    messagesTable = (
      <div className='table'>
        <div className='table-row'>
          <div className='table-head'>From</div>
          <div className='table-head'>To</div>
          <div className='table-head'>Subject</div>
        </div>
        {messageRows}
      </div>
    );

    selectedMessage = this.state.selectedMessage ?
      <Message message={this.state.selectedMessage} onDelete={this.handleMessageDelete} /> : null;

    return (
      <div>
        {messagesTable}
        {selectedMessage}
      </div>
    );
  },

  handleMessageDelete: function (messageId) {
    // TODO: disable delete button during pending state?
    MessageActionCreators.deleteMessage(messageId).then(function() {
      Router.linkTo('mailbox', [this.state.mailboxId]);
    }.bind(this));
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});
