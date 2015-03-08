require('../styles/mailboxes.css')

var React = require('react')
var _ = require('underscore')

var MailboxStore = require('../stores/MailboxStore')
var router = require('../router').router

function getStateFromStores () {
  return {
    mailboxes: MailboxStore.get('mailboxes')
  }
}

module.exports = React.createClass({
  displayName: 'MailboxesView',

  getInitialState: function () {
    return getStateFromStores()
  },

  componentWillMount: function () {
    MailboxStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    MailboxStore.removeChangeListener(this._onChange)
  },

  handleClick: function (id) {
    // TODO: link-to or something better here??
    // TODO: should be an <a>
    router.navigate('box/' + id, {trigger: true})
  },

  render: function () {
    var mailboxes = _.map(this.state.mailboxes, function (mailbox) {
      return (
        <Mailbox key={mailbox.id}
          handleClick={this.handleClick}
          mailbox={mailbox} />
      )
    }.bind(this))

    return (
      <ul className="mailboxes">{mailboxes}</ul>
    )
  },

  _onChange: function () {
    console.log('Mailboxes View _onChange')
    this.setState(getStateFromStores())
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
      this.props.handleClick(this.props.mailbox.id)
    },

    render: function () {
      var mailbox = this.props.mailbox

      return (
        <li onClick={this.handleClick}>
          <Pull direction="right">
            <Badge count={mailbox.count} />
          </Pull>

          {mailbox.name}
        </li>
      )
    }
  })
})(React)
