var React = require('react')
var _ = require('underscore')
var {Table} = require('react-bootstrap')

var router = require('../router').router
var MessageStore = require('../stores/MessageStore')
var MailboxStore = require('../stores/MailboxStore')
var Loading = require('../components/Loading.react')
var MessagePartial = require('./partials/MessagePartial.react')

function getStateFromStores () {
  var mailboxId = MailboxStore.get('mailboxId')
  var messageId = MessageStore.get('messageId')

  return {
    mailboxId: mailboxId,
    isLoading: MessageStore.get('isLoading'),
    messages: MessageStore.getMessagesInMailbox(mailboxId),
    selectedMessage: MessageStore.getMessageInBoxById(mailboxId, messageId)
  }
}

module.exports = React.createClass({
  displayName: 'MessagesView',

  getInitialState: function () {
    return getStateFromStores()
  },

  componentWillMount: function () {
    MessageStore.addChangeListener(this._onChange)
    MailboxStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    MessageStore.removeChangeListener(this._onChange)
    MailboxStore.removeChangeListener(this._onChange)
  },

  handleRowClick: function (message) {
    router.navigate('box/' + this.state.mailboxId +
      '/message/' + message.id, {trigger: true})
  },

  render: function () {
    if (this.state.isLoading && !this.state.messages.length) {
      return (
        <Loading />
      )
    }

    var messageRows = _.map(this.state.messages, function (message) {
      return (
        <MessageRow key={message.id}
          message={message}
          selectedMessage={this.state.selectedMessage}
          handleRowClick={this.handleRowClick} />
      )
    }.bind(this))

    var selectedMessage = this.state.selectedMessage ?
      (<MessagePartial message={this.state.selectedMessage} />) :
      ''

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
    )
  },

  _onChange: function () {
    this.setState(getStateFromStores())
  }
})

// Private React Component
var MessageRow = (function () {
  var React = require('react/addons')
  var cx = React.addons.classSet

  return React.createClass({
    displayName: 'Message',

    propTypes: {
      message: React.PropTypes.object.isRequired,
      selectedMessage: React.PropTypes.object,
      handleRowClick: React.PropTypes.func
    },

    handleRowClick: function () {
      if (typeof this.props.handleRowClick === 'function') {
        this.props.handleRowClick(this.props.message)
      }
    },

    render: function () {
      var message = this.props.message
      var selectedMessage = this.props.selectedMessage
      var classes = cx({
        'table-highlight': selectedMessage && selectedMessage.id === message.id
      })

      return (
        <tr className={classes} onClick={this.handleRowClick}>
          <td>{message.from}</td>
          <td>{message.to}</td>
          <td>{message.subject}</td>
        </tr>
      )
    }
  })
})()
