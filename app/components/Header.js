import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default React.createClass({
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
