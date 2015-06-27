define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap');

  var Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem;

  return React.createClass({
    displayName: 'Header',

    shouldComponentUpdate: function () {
      return false;
    },

    render: function () {
      return (
        <Navbar brand={<a href="#/">Flux-like Mail</a>}>
          <Nav>
            <NavItem eventKey={1} href='#/contributors'>Contributors</NavItem>
          </Nav>
        </Navbar>
      );
    }
  });
});
