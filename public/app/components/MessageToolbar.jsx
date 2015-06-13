define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    MessageRecord = require('app/records/MessageRecord'),
    MessageActions = require('app/actions/MessageActions'),
    Pull = require('jsx!app/components/Pull');

  var Glyphicon = ReactBootstrap.Glyphicon,
    ButtonGroup = ReactBootstrap.ButtonGroup,
    Button = ReactBootstrap.Button;

  return React.createClass({
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
});
