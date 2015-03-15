var React = require('react');
var {Table} = require('react-bootstrap');

var router = require('../router').router;
var MessageStore = require('../stores/MessageStore');
var MessageRecord = require('../records/MessageRecord');
var MailboxStore = require('../stores/MailboxStore');
var Loading = require('../components/Loading');
var MessagePartial = require('./partials/MessagePartial');

function getStateFromStores () {
  var mailboxId = MailboxStore.getPrimitive('mailboxId');
  var messageId = MessageStore.getPrimitive('messageId');

  return {
    mailboxId,
    messageId,
    isLoading: MessageStore.getPrimitive('isLoading'),
    messages: MessageStore.getMessagesInMailbox(mailboxId),
    selectedMessage: MessageStore.getMessageById(messageId)
  };
}

module.exports = React.createClass({
  displayName: 'MessagesView',

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

  handleRowClick: function (message) {
    router.navigate('box/' + this.state.mailboxId +
      '/message/' + message.id, {trigger: true});
  },

  render: function () {
    var messageRows;
    var selectedMessage;

    if (this.state.isLoading && !this.state.messages.count()) {
      return (
        <Loading />
      );
    }

    messageRows = [];

    this.state.messages.forEach(function (message) {
      messageRows.push(
        <MessageRow key={message.id}
          message={message}
          selectedMessageId={this.state.messageId}
          handleRowClick={this.handleRowClick} />
      );
    }.bind(this));

    selectedMessage = this.state.selectedMessage ?
      (<MessagePartial message={this.state.selectedMessage} />) :
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

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});

// Private React Component
var MessageRow = (function () {
  var React = require('react/addons');
  var cx = React.addons.classSet;

  return React.createClass({
    displayName: 'Message',

    propTypes: {
      message: React.PropTypes.instanceOf(MessageRecord).isRequired,
      selectedMessageId: React.PropTypes.number,
      handleRowClick: React.PropTypes.func
    },

    handleRowClick: function () {
      if (typeof this.props.handleRowClick === 'function') {
        this.props.handleRowClick(this.props.message);
      }
    },

    /**
     * Implementing this hook in components when using Immutable
     * data should yield significant performance boosts during potential
     * re-renders that don't need to happen.
     */
    shouldComponentUpdate: function (nextProps) {
      return nextProps.selectedMessageId !== this.props.selectedMessageId ||
        nextProps.message !== this.props.message;
    },

    render: function () {
      var classes = cx({
        'table-highlight': this.props.selectedMessageId &&
          this.props.selectedMessageId === this.props.message.id
      });

      return (
        <tr className={classes} onClick={this.handleRowClick}>
          <td>{this.props.message.from}</td>
          <td>{this.props.message.to}</td>
          <td>{this.props.message.subject}</td>
        </tr>
      );
    }
  });
})();
