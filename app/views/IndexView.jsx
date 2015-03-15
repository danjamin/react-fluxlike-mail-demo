var React = require('react');

module.exports = React.createClass({
  displayName: 'Index',

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
