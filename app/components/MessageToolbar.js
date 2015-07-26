import React from 'react';
import {Glyphicon, ButtonGroup, Button} from 'react-bootstrap';

import MessageRecord from '../records/MessageRecord.js';
import Pull from './Pull.js';

export default React.createClass({
  displayName: 'MessagesToolbar',

  propTypes: {
    // required
    message: React.PropTypes.instanceOf(MessageRecord).isRequired,

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

  shouldComponentUpdate: function (nextProps) {
    return nextProps.message !== this.props.message;
  },

  render: function () {
    return (
      <Pull direction='right'>
        <ButtonGroup>
          <Button onClick={this.handleDelete}>
            <Glyphicon glyph="trash" />
          </Button>
        </ButtonGroup>
      </Pull>
    );
  },

  handleDelete: function () {
    this.props.onDelete(this.props.message.id);
  }
});
