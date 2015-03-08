require('../styles/messages.css')

var React = require('react')
var _ = require('underscore')

var MessageStore = require('../stores/MessageStore')
var Loading = require('../components/Loading.react')

function getStateFromStores () {
  return {
    isLoading: MessageStore.get('isLoading'),
    messages: MessageStore.get('messages')
  }
}

module.exports = React.createClass({
  displayName: 'MessagesView',

  getInitialState: function () {
    return getStateFromStores()
  },

  componentWillMount: function () {
    MessageStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    MessageStore.removeChangeListener(this._onChange)
  },

  render: function () {
    if (this.state.isLoading) {
      return (
        <Loading />
      )
    }

    var messages = _.map(this.state.messages, function (message) {
      return (
        <Message key={message.id} message={message} />
      )
    }.bind(this))

    return (
      <table className="messages">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {messages}
        </tbody>
      </table>
    )
  },

  _onChange: function () {
    console.log('Messages View _onChange')
    this.setState(getStateFromStores())
  }
})

// Private React Component
var Message = (function (React) {
  return React.createClass({
    displayName: 'Message',

    propTypes: {
      message: React.PropTypes.object.isRequired
    },

    render: function () {
      var message = this.props.message

      return (
        <tr>
          <td>{message.from}</td>
          <td>{message.to}</td>
          <td>{message.subject}</td>
        </tr>
      )
    }
  })
})(React)
