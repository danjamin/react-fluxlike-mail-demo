require('../styles/mailboxes.css')

var React = require('react')
var _ = require('underscore')

var MailboxStore = require('../stores/MailboxStore')
var router = require('../router')

function getStateFromStores () {
  return {
    mailboxes: MailboxStore.getMailboxes()
  }
}

module.exports = React.createClass({
  displayName: 'Mailboxes',

  getInitialState: function () {
    return getStateFromStores()
  },

  handleClick: function (id) {
    console.log(router.router, id)
  },

  render: function () {
    var mailboxes = _.map(this.state.mailboxes, function (mailbox) {
      return (
        <Mailbox key={mailbox.get('id')}
          handleClick={this.handleClick}
          mailbox={mailbox} />
      )
    }.bind(this))

    return (
      <ul className="mailboxes">{mailboxes}</ul>
    )
  }
})

// Private React Component
var Mailbox = (function (React) {
  var Badge = require('../components/Badge.react')
  var Pull = require('../components/Pull.react')

  return React.createClass({
    displayName: 'Mailbox',

    propTypes: {
      mailbox: React.PropTypes.object.isRequired,
      handleClick: React.PropTypes.func
    },

    handleClick: function (e) {
      this.props.handleClick(this.props.mailbox.get('id'))
    },

    render: function () {
      var mailbox = this.props.mailbox

      return (
        <li onClick={this.handleClick}>
          <Pull direction="right">
            <Badge count={mailbox.get('count')} />
          </Pull>

          {mailbox.get('name')}
        </li>
      )
    }
  })
})(React)
