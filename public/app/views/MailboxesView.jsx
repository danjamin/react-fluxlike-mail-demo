define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    MailboxStore = require('app/stores/MailboxStore'),
    RouteActions = require('app/actions/RouteActions'),
    Loading = require('jsx!app/components/Loading'),
    MailboxRow = require('jsx!app/components/MailboxRow');

  var Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    PureRenderMixin = React.addons.PureRenderMixin;

  function getStateFromStores () {
    return {
      mailboxId: MailboxStore.getMailboxId(),
      mailboxes: MailboxStore.getMailboxes(), // Immutable.Map
      isLoading: MailboxStore.getIsLoading()
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
      RouteActions.linkTo('mailbox', {mailboxId: id});
    },

    render: function () {
      var mailboxes;

      if (this.state.isLoading) {
        return (
          <Loading />
        );
      }

      mailboxes = [];

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
});
