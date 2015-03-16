var React = require('react');
var {
  Glyphicon,
  ButtonGroup,
  Button
} = require('react-bootstrap');

var MessageRecord = require('../records/MessageRecord');
var MessageHandler = require('../handlers/MessageHandler');
var Pull = require('./Pull');

module.exports = React.createClass({
  displayName: 'MessagesToolbar',

  propTypes: {
    message: React.PropTypes.instanceOf(MessageRecord).isRequired
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
    MessageHandler.deleteMessageById(this.props.message.id);
  }
});
