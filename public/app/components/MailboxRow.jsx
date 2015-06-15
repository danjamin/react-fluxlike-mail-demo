define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    MailboxRecord = require('app/records/MailboxRecord'),
    Pull = require('jsx!app/components/Pull');

  var Badge = ReactBootstrap.Badge;

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
});
