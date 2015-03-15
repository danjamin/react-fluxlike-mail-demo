var React = require('react/addons');
var {Nav, NavItem} = require('react-bootstrap');

var MailboxStore = require('../stores/MailboxStore');
var MailboxRecord = require('../records/MailboxRecord');
var router = require('../router').router;

var PureRenderMixin = React.addons.PureRenderMixin;

function getStateFromStores () {
  return {
    mailboxId: MailboxStore.getPrimitive('mailboxId'),
    mailboxes: MailboxStore.getMailboxes() // Immutable.Map
  };
}

module.exports = React.createClass({
  displayName: 'MailboxesView',

  mixins: [PureRenderMixin],

  getInitialState: function () {
    return getStateFromStores();
  },

  componentWillMount: function () {
    MailboxStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MailboxStore.removeChangeListener(this._onChange);
  },

  handleClick: function (id) {
    // TODO: link-to or something better here??
    // TODO: should be an <a>
    router.navigate('box/' + id, {trigger: true});
  },

  render: function () {
    var mailboxes = [];

    // be careful here, if using .map() you will result in
    // an immutable iterable that react does not natively support
    this.state.mailboxes.forEach(function (mailbox, mailboxId) {
      function handleClick() {
        this.handleClick(mailboxId);
      }

      mailboxes.push(
        <NavItem key={mailboxId} eventKey={mailboxId} href="#"
            onSelect={handleClick.bind(this)}>
          <MailboxRow mailbox={mailbox} />
        </NavItem>
      );
    }.bind(this));

    return (
      <Nav bsStyle="pills" stacked activeKey={this.state.mailboxId}>
        {mailboxes}
      </Nav>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});

// Private React Component
var MailboxRow = (function () {
  var React = require('react');
  var {Badge} = require('react-bootstrap');
  var Pull = require('../components/Pull');

  return React.createClass({
    displayName: 'MailboxRow',

    propTypes: {
      mailbox: React.PropTypes.instanceOf(MailboxRecord).isRequired
    },

    /**
     * Implementing this hook in components when using Immutable
     * data should yield significant performance boosts during potential
     * re-renders that don't need to happen.
     */
    shouldComponentUpdate: function (nextProps) {
      return nextProps.mailbox !== this.props.mailbox;
    },

    render: function () {
      var badge;

      if (this.props.mailbox.get('count')) {
        badge = (
          <Pull direction="right">
            <Badge>{this.props.mailbox.get('count')}</Badge>
          </Pull>
        );
      }
      return (
        <div>
          {badge}
          {this.props.mailbox.get('name')}
        </div>
      );
    }
  });
})();
