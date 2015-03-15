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
    displayName: 'MessageRow',

    propTypes: {
      message: React.PropTypes.instanceOf(MessageRecord).isRequired,
      isSelected: React.PropTypes.bool.isRequired,
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
      return nextProps.isSelected !== this.props.isSelected ||
        nextProps.message !== this.props.message;
    },

    render: function () {
      var classes = cx({
        'table-highlight': this.props.isSelected
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
