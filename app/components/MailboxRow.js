var React = require('react');

module.exports = React.createClass({
  displayName: 'MailboxRow',

  propTypes: {
    mailbox: React.PropTypes.object.isRequired
  },

  render: function () {
    var badge;

    if (this.props.mailbox.count) {
      badge = (
        <span>({this.props.mailbox.count})</span>
      );
    }
    return (
      <div>
        {this.props.mailbox.name} {badge}
      </div>
    );
  }
});
