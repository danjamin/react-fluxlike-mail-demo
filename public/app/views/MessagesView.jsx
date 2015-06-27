define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    RouteActions = require('fl-router').RouteActions,
    MessageActions = require('app/actions/MessageActions'),
    MessageStore = require('app/stores/MessageStore'),
    MailboxStore = require('app/stores/MailboxStore'),
    MessageRow = require('jsx!app/components/MessageRow'),
    Message = require('jsx!app/components/Message'),
    Loading = require('jsx!app/components/Loading');

  var Table = ReactBootstrap.Table,
    PureRenderMixin = React.addons.PureRenderMixin;

  function getStateFromStores () {
    var mailboxId = MailboxStore.getMailboxId();
    var messageId = MessageStore.getMessageId();

    return {
      mailboxId: mailboxId,
      messageId: messageId,
      messages: MessageStore.getMessagesInMailbox(mailboxId),
      selectedMessage: MessageStore.getMessageById(messageId),
      isLoading: MessageStore.getIsLoadingByMailboxId(mailboxId)
    };
  }

  return React.createClass({
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

      if (this.state.isLoading) {
        return (
          <Loading />
        );
      }

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

      selectedMessage = this.state.selectedMessage ?
        (<Message message={this.state.selectedMessage} onDelete={this.handleMessageDelete} />) :
        '';

      return (
        <div>
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

          <p>
            {selectedMessage}
          </p>
        </div>
      );
    },

    handleRowClick: function (message) {
      RouteActions.linkTo('message', {
        mailboxId: this.state.mailboxId,
        messageId: message.id
      });
    },

    handleMessageDelete: function (messageId) {
      MessageActions.deleteMessageById(messageId);
    },

    _onChange: function () {
      this.setState(getStateFromStores());
    }
  });
});
