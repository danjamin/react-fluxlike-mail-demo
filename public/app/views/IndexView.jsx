define(function (require) {
  'use strict';

  var React = require('react');

  return React.createClass({
    displayName: 'IndexView',

    shouldComponentUpdate: function () {
      return false;
    },

    render: function () {
      return (
        <div>
          Um, this is awkward ... select a mailbox
        </div>
      );
    }
  });
});
