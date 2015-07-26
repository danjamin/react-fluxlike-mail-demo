import React from 'react/addons';
import {RouteStore, LinkTo} from 'fl-router';

import MailboxStore from '../stores/MailboxStore.js';
import MailboxRow from '../components/MailboxRow.js';

var PureRenderMixin = React.addons.PureRenderMixin;

function getStateFromStores () {
  return {
    mailboxId: MailboxStore.getSelectedMailboxId(),
    mailboxes: MailboxStore.getMailboxes(), // Immutable.Map
    activeURL: RouteStore.getURL()
  };
}

export default React.createClass({
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

  render: function () {
    var mailboxes;

    mailboxes = [];

    // be careful here, if using .map() you will result in
    // an immutable iterable that react does not natively support
    this.state.mailboxes.forEach(function (mailbox, mailboxId) {
      mailboxes.push(
        <li key={mailboxId}>
          <LinkTo route='mailbox' params={[mailboxId]} activeURL={this.state.activeURL}>
            <MailboxRow mailbox={mailbox} />
          </LinkTo>
        </li>
      );
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
