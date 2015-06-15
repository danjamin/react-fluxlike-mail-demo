define(function (require) {
  'use strict';

  var React = require('react');

  return React.createClass({
    displayName: 'Loading',

    propTypes: {
      copy: React.PropTypes.string
    },

    shouldComponentUpdate: function (nextProps) {
      return nextProps.copy !== this.props.copy;
    },

    render: function () {
      var copy = this.props.copy ? this.props.copy : 'Loading';

      return (
        <div className='loading rotating'>{copy} &hellip;</div>
      );
    }
  });
});
