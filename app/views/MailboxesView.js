var React = require('react/addons');
var Fluxlike = require('fluxlike');

var MailboxStore = require('../stores/MailboxStore.js');
var MailboxRow = require('../components/MailboxRow.js');

var LinkTo = Fluxlike.LinkTo;

function getStateFromStores () {
  return {
    mailboxId: MailboxStore.getSelectedMailboxId(),
    mailboxes: MailboxStore.getMailboxes(),
    activeURL: Fluxlike.RouteStore.getURL()
  };
}

module.exports = React.createClass({
  displayName: 'MailboxesView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    MailboxStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MailboxStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var mailboxes;

    mailboxes = this.state.mailboxes.map(function (mailbox) {
      return <li key={mailbox.id}>
        <LinkTo route='mailbox' params={[mailbox.id]} activeURL={this.state.activeURL}>
          <MailboxRow mailbox={mailbox} />
        </LinkTo>
      </li>;
    }.bind(this));

    return (
      <ul className='mailboxes'>
        {mailboxes}
      </ul>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});
