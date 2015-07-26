import React from 'react';

import MessageToolbar from './MessageToolbar.js';
import MessageRecord from '../records/MessageRecord.js';

export default React.createClass({
  displayName: 'Message',

  propTypes: {
    // required
    message: React.PropTypes.instanceOf(MessageRecord).isRequired,

    // optional
    onDelete: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      onDelete: function (messageId) {
        console.warn('Not handling onDelete() in Message component');
      }
    };
  },

  shouldComponentUpdate: function (nextProps) {
    return nextProps.message !== this.props.message;
  },

  render: function () {
    return (
      <div>
        <hr />
        <MessageToolbar message={this.props.message} onDelete={this.handleDelete} />
        <h2>{this.props.message.subject}</h2>
        <p>
          <span>From:</span> {this.props.message.from},
          <span> To:</span> {this.props.message.to}
        </p>
        <p>{this.props.message.body}</p>
      </div>
    );
  },

  handleDelete: function (messageId) {
    this.props.onDelete(messageId);
  }
});
