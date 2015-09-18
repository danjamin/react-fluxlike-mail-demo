import React from 'react/addons';
import {RouteStore} from 'fluxlike';

import MailboxStore from '../stores/MailboxStore.js';

function getStateFromStores () {
  var mailboxId = MailboxStore.getSelectedMailboxId();

  return {
    mailbox: MailboxStore.getMailboxById(mailboxId), // MailboxRecord
    routeName: RouteStore.getRouteName()
  };
}

export default React.createClass({
  displayName: 'DocumentTitleView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    RouteStore.addChangeListener(this._onChange);
    MailboxStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    RouteStore.removeChangeListener(this._onChange);
    MailboxStore.removeChangeListener(this._onChange);
  },

  render: function () {
    if (typeof document === 'undefined') {
      return (null);
    }

    // Note: this is not actually rendering to the DOM
    // instead it updates the document.title property directly
    var count,
      title = 'Mail';

    switch (this.state.routeName) {
      case 'index':
      case 'mailbox':
      case 'message':
        if (this.state.mailbox) {
          count = this.state.mailbox.count ? ' (' +
            this.state.mailbox.count + ')' : '';

          title = title + ' | ' + this.state.mailbox.name + count;
        }
        break;
      case 'contributors':
        title = title + ' | Contributors';
        break;
    }

    document.title = title;

    return (null);
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});
