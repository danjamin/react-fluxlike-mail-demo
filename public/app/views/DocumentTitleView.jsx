define(function (require) {
  'use strict';

  var React = require('react'),
    RouteStore = require('fl-router').RouteStore,
    MailboxStore = require('app/stores/MailboxStore');

  var PureRenderMixin = React.addons.PureRenderMixin;

  function getStateFromStores () {
    var mailboxId = MailboxStore.getSelectedMailboxId();

    return {
      mailbox: MailboxStore.getMailboxById(mailboxId), // MailboxRecord
      routeName: RouteStore.getRouteName()
    };
  }

  return React.createClass({
    displayName: 'DocumentTitleView',

    mixins: [PureRenderMixin],

    getInitialState: function () {
      return getStateFromStores();
    },

    componentWillMount: function () {
      RouteStore.addChangeListener(this._onChange);
      MailboxStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
      RouteStore.removeChangeListener(this._onChange);
      MailboxStore.removeChangeListener(this._onChange);
    },

    render: function () {
      // Note: this is not actually rendering to the DOM
      // instead it updates the document.title property directly
      var count,
        title = 'Mail';

      switch (this.state.routeName) {
        case 'mailbox':
        case 'message':
          if (this.state.mailbox) {
            count = this.state.mailbox.get('count') ? ' (' +
              this.state.mailbox.get('count') + ')' : '';

            title = title + ' | ' + this.state.mailbox.get('name') + count;
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
});
