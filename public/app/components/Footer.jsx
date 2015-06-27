define(function (require) {
  'use strict';

  var React = require('react');

  return React.createClass({
    displayName: 'Footer',

    shouldComponentUpdate: function () {
      return false;
    },

    render: function () {
      return (
        <div></div>
      );
    }
  });
});
