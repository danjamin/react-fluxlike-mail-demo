import React from 'react/addons';
import {Table} from 'react-bootstrap';
import {Router} from 'fl-router';

import MessageActionCreators from '../actions/MessageActionCreators.js';
import MessageStore from '../stores/MessageStore.js';
import MailboxStore from '../stores/MailboxStore.js';
import MessageRow from '../components/MessageRow.js';
import Message from '../components/Message.js';

var PureRenderMixin = React.addons.PureRenderMixin;

function getStateFromStores () {
  var mailboxId = MailboxStore.getSelectedMailboxId();
  var messageId = MessageStore.getSelectedMessageId();

  return {
    mailboxId: mailboxId,
    messageId: messageId,
    messages: MessageStore.getMessagesInMailbox(mailboxId),
    selectedMailbox: MailboxStore.getMailboxById(mailboxId),
    selectedMessage: MessageStore.getMessageById(messageId)
  };
}

export default React.createClass({
  displayName: 'MessagesView',

  mixins: [PureRenderMixin],

  getInitialState: function () {
    return getStateFromStores();
  },

  componentWillMount: function () {
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

    messageRows = [];

    // TODO: every link should ultimately be an A tag

    this.state.messages.forEach(function (message) {
      // this way, less re-renders since the bool of isSelected
      // hasn't changed for some of the rows where as messageId
      // is changing more often!
      var isSelected = this.state.messageId === message.get('id');

      messageRows.push(
        <MessageRow key={message.id}
          message={message}
          isSelected={isSelected}
          handleRowClick={this.handleRowClick} />
      );
    }.bind(this));

    messagesTable = (
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {messageRows}
        </tbody>
      </Table>
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

  handleBackToBoxClick: function (e) {
    e.preventDefault();

    Router.linkTo('mailbox', [this.state.mailboxId]);
  },

  handleRowClick: function (message) {
    Router.linkTo('message', [this.state.mailboxId, message.id]);
  },

  handleMessageDelete: function (messageId) {
    MessageActionCreators.deleteMessage(messageId);

    Router.linkTo('mailbox', [this.state.mailboxId]);
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});
