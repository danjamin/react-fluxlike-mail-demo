var React = require('react/addons');

var MailboxStore = require('../stores/MailboxStore');

var PureRenderMixin = React.addons.PureRenderMixin;

function getStateFromStores () {
  var mailboxId = MailboxStore.getMailboxId();

  return {
    mailbox: MailboxStore.getMailboxById(mailboxId), // MailboxRecord
    isLoading: MailboxStore.getIsLoading()
  };
}

module.exports = React.createClass({
  displayName: 'DocumentTitleView',

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
    // Note: this is not actually rendering to the DOM
    // instead it updates the document.title property directly
    var count;

    if (this.state.isLoading || !this.state.mailbox) {
      document.title = 'Mail | Loading ...';
    } else {
      count = this.state.mailbox.get('count') ? ' (' +
        this.state.mailbox.get('count') + ')' : '';

      document.title = 'Mail | ' + this.state.mailbox.get('name') + count;
    }

    return (null);
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});
