import React from 'react';

import Pull from './Pull.js';

export default React.createClass({
  displayName: 'MessagesToolbar',

  propTypes: {
    // required
    message: React.PropTypes.object.isRequired,

    // optional
    onDelete: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      onDelete: function (messageId) {
        console.warn('Not handling onDelete() in MessageToolbar component');
      }
    };
  },

  render: function () {
    return (
      <Pull direction='right'>
        <button onClick={this.handleDelete}>
          Delete
        </button>
      </Pull>
    );
  },

  handleDelete: function () {
    this.props.onDelete(this.props.message.id);
  }
});
