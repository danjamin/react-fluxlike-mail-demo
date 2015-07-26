import React from 'react';
import {LinkTo} from 'fl-router';

export default React.createClass({
  displayName: 'Header',

  propTypes: {
    activeURL: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <ul className='navbar'>
        <li className='navbar-item'>
          <h3>Flux-like Mail</h3>
        </li>
        <li className='navbar-item'>
          <LinkTo route='contributors' activeURL={this.props.activeURL}>
            Contributors
          </LinkTo>
        </li>
      </ul>
    );
  }
});
