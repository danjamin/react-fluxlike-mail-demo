define(function (require) {
  'use strict';

  var React = require('react');

  return React.createClass({
    displayName: 'FooterPartial',

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
