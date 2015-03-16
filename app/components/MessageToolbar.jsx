var React = require('react');
var {
  Glyphicon,
  ButtonGroup,
  Button
} = require('react-bootstrap');

var MessageRecord = require('../records/MessageRecord');
var MessageActions = require('../actions/MessageActions');
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
    MessageActions.deleteMessageById(this.props.message.id);
  }
});
