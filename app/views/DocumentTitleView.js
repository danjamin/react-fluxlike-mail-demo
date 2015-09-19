/* global document */

var React = require('react/addons');
var Fluxlike = require('fluxlike');

var MailboxStore = require('../stores/MailboxStore.js');

function getStateFromStores () {
  var mailboxId = MailboxStore.getSelectedMailboxId();

  return {
    mailbox: MailboxStore.getMailboxById(mailboxId),
    routeName: Fluxlike.RouteStore.getRouteName()
  };
}

module.exports = React.createClass({
  displayName: 'DocumentTitleView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    Fluxlike.RouteStore.addChangeListener(this._onChange);
    MailboxStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    Fluxlike.RouteStore.removeChangeListener(this._onChange);
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
