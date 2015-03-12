var React = require('react')
var _ = require('underscore')
var {Nav, NavItem} = require('react-bootstrap')

var MailboxStore = require('../stores/MailboxStore')
var router = require('../router').router

function getStateFromStores () {
  return {
    mailboxId: MailboxStore.get('mailboxId'),
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
      function handleClick() {
        this.handleClick(mailbox.id)
      }

      return (
        <NavItem key={mailbox.id} eventKey={mailbox.id} href="#" onSelect={handleClick.bind(this)}>
          <Mailbox mailbox={mailbox} />
        </NavItem>
      )
    }.bind(this))

    return (
      <Nav bsStyle="pills" stacked activeKey={this.state.mailboxId}>
        {mailboxes}
      </Nav>
    )
  },

  _onChange: function () {
    this.setState(getStateFromStores())
  }
})

// Private React Component
var Mailbox = (function () {
  var React = require('react')
  var {Badge} = require('react-bootstrap')
  var Pull = require('../components/Pull.react')

  return React.createClass({
    displayName: 'Mailbox',

    propTypes: {
      mailbox: React.PropTypes.object.isRequired
    },

    render: function () {
      return (
        <div>
          <Pull direction="right">
            <Badge>{this.props.mailbox.count}</Badge>
          </Pull>

          {this.props.mailbox.name}
        </div>
      )
    }
  })
})()
