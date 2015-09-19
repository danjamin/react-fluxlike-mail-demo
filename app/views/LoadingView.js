var React = require('react');

var Loading = require('../components/Loading.js');

module.exports = React.createClass({
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
