import React from 'react';
import {Router} from '../lib/fl-base/fl-base.js';

var {RouteStore, LinkTo} = Router;

function getStateFromStores () {
  return {
    activeURL: RouteStore.getURL()
  };
}

export default React.createClass({
  displayName: 'HeaderView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    RouteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    RouteStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <ul className='navbar'>
        <li className='navbar-item'>
          <h3>Flux-like Mail</h3>
        </li>
        <li className='navbar-item'>
          <LinkTo route='contributors' activeURL={this.state.activeURL}>
            Contributors
          </LinkTo>
        </li>
      </ul>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});
