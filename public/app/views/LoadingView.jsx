define(function (require) {
  'use strict';

  var React = require('react'), 
    Loading = require('jsx!app/components/Loading');

  return React.createClass({
    displayName: 'LoadingView',

    shouldComponentUpdate: function () {
      return false;
    },

    render: function () {
      return (
        <div>
          <Loading />
        </div>
      );
    }
  });
});
