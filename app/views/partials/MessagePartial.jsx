var React = require('react');

var MessageRecord = require('../../records/MessageRecord');

module.exports = React.createClass({
  displayName: 'MessagePartial',

  propTypes: {
    message: React.PropTypes.instanceOf(MessageRecord).isRequired
  },

  shouldComponentUpdate: function (nextProps) {
    return nextProps.message !== this.props.message;
  },

  render: function () {
    var message = this.props.message;

    return (
      <div>
        <hr />
        <h2>{message.subject}</h2>
        <p>
          <span>From:</span> {message.from},
          <span> To:</span> {message.to}
        </p>
        <p>{message.body}</p>
      </div>
    );
  }
});
