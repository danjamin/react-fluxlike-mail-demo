define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    MessageRecord = require('app/records/MessageRecord'),
    Pull = require('jsx!app/components/Pull');

  var Glyphicon = ReactBootstrap.Glyphicon,
    ButtonGroup = ReactBootstrap.ButtonGroup,
    Button = ReactBootstrap.Button;

  return React.createClass({
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
});
