define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    MailboxStore = require('app/stores/MailboxStore'),
    Router = require('fl-router').Router,
    MailboxRow = require('jsx!app/components/MailboxRow');

  var Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    PureRenderMixin = React.addons.PureRenderMixin;

  function getStateFromStores () {
    return {
      mailboxId: MailboxStore.getSelectedMailboxId(),
      mailboxes: MailboxStore.getMailboxes() // Immutable.Map
    };
  }

  return React.createClass({
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
      Router.linkTo('mailbox', {mailboxId: id});
    },

    render: function () {
      var mailboxes;

      mailboxes = [];

      // be careful here, if using .map() you will result in
      // an immutable iterable that react does not natively support
      this.state.mailboxes.forEach(function (mailbox, mailboxId) {
        mailboxes.push(
          <NavItem key={mailboxId} eventKey={mailboxId} href="#"
              onSelect={this.handleClick.bind(this, mailboxId)}>
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
});
