import React from 'react';

import RootStore from './RootStore.js';

function getStateFromStores() {
  return {
    template: RootStore.getTemplate()
  };
}

export default React.createClass({
  displayName: 'RootView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    RootStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    RootStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return this.state.template;
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});
