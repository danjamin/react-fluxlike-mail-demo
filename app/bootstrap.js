import React from 'react';
import {Router} from 'fl-router';

import AppView from './views/AppView.js';
import AppActionCreators from './actions/AppActionCreators.js';
import routes from './routes.js';
import config from './config.js';

var _alreadyInit = false;

export default {
  init: function (isServerSide) {
    if (_alreadyInit) {
      return;
    }

    _alreadyInit = true;

    config(isServerSide);

    // register beforeEach route callback
    Router.beforeEach(function (name) {
      AppActionCreators.clearSelectedItems();
      AppActionCreators.restoreDefaultTemplateAndOptions();
    });

    // Start routing
    Router.start(routes, {
      pushState: false,
      root: '/',
      isServerSide: isServerSide
    });

    if (!isServerSide) {
      // Render app into DOM (client side)
      React.render(
        <AppView />,
        document.getElementById('app')
      );
    }
  },

  getSerializedData: function () {
    return {test: 5};
  }
};


