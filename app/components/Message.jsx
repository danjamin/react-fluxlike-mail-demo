var React = require('react');

var MessageToolbar = require('./MessageToolbar');
var MessageRecord = require('../records/MessageRecord');

module.exports = React.createClass({
  displayName: 'Message',

  propTypes: {
    message: React.PropTypes.instanceOf(MessageRecord).isRequired
  },

  shouldComponentUpdate: function (nextProps) {
    return nextProps.message !== this.props.message;
  },

  render: function () {
    return (
      <div>
        <hr />
        <MessageToolbar message={this.props.message} />
        <h2>{this.props.message.subject}</h2>
        <p>
          <span>From:</span> {this.props.message.from},
          <span> To:</span> {this.props.message.to}
        </p>
        <p>{this.props.message.body}</p>
      </div>
    );
  }
});
