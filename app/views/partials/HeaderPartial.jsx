var React = require('react');
var {Navbar} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'HeaderPartial',

  shouldComponentUpdate: function () {
    return false;
  },

  render: function () {
    return (
      <Navbar brand='Flux-like Mail'>
      </Navbar>
    );
  }
});
