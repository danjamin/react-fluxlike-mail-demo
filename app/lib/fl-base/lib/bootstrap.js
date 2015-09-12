/* global __serializedData__ */

import React from 'react';

import {Router} from './Router.js';
import ActionCreators from './ActionCreators.js';
import Serializer from './Serializer.js';
import RootView from './RootView.js';

var _alreadyInit = false;
var _isServerSide = false;

export default {
  init: function (routes, configFn, isServerSide) {
    if (_alreadyInit) {
      return;
    }

    _isServerSide = isServerSide;
    _alreadyInit = true;

    configFn(_isServerSide);

    if (!_isServerSide && typeof __serializedData__ === 'object') {
      Serializer.deserialize(__serializedData__);
    }

    // register beforeEach route callback
    Router.beforeEach(function (name) {
      ActionCreators.clearSelectedItems();
    });

    // Start routing
    Router.start(routes, {
      pushState: true,
      root: '/',
      isServerSide: isServerSide
    });

    if (!_isServerSide) {
      // Render app into DOM (client side)
      React.render(
        <RootView />,
        document.getElementById('app')
      );
    }
  },

  getSerializedData: function () {
    var data = {};

    if (!_isServerSide) {
      return data;
    }

    return Serializer.serialize();
  }
};
