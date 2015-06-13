define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap');

  var Navbar = ReactBootstrap.Navbar;

  return React.createClass({
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
});
