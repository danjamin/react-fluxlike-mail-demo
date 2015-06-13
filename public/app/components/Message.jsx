define(function (require) {
  'use strict';

  var React = require('react'),
    MessageToolbar = require('jsx!app/components/MessageToolbar'),
    MessageRecord = require('app/records/MessageRecord');

  return React.createClass({
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
});
