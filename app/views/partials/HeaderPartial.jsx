var React = require('react');
var {Navbar} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'HeaderPartial',

  render: function () {
    return (
      <Navbar brand='Flux-like Mail'>
      </Navbar>
    );
  }
});
