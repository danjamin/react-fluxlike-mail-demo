/* global JSON, __serializedData__ */

import React from 'react';
import {Router} from 'fl-router';

import AppView from './views/AppView.js';
import AppActionCreators from './actions/AppActionCreators.js';
import routes from './routes.js';
import config from './config.js';
import ContributorStore from './stores/ContributorStore.js';
import MailboxStore from './stores/MailboxStore.js';
import MessageStore from './stores/MessageStore.js';

var _alreadyInit = false;

export default {
  init: function (isServerSide) {
    if (_alreadyInit) {
      return;
    }

    _alreadyInit = true;

    config(isServerSide);

    if (!isServerSide) {
      // TODO do this more generically -- obviously
      ContributorStore.deserialize(__serializedData__.ContributorStore);
      MailboxStore.deserialize(__serializedData__.MailboxStore);
      MessageStore.deserialize(__serializedData__.MessageStore);
    }

    // register beforeEach route callback
    Router.beforeEach(function (name) {
      AppActionCreators.clearSelectedItems();
      AppActionCreators.restoreDefaultTemplateAndOptions();
    });

    // Start routing
    Router.start(routes, {
      pushState: true,
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
    var data = {};

    // TODO do this more generically obviously
    data.ContributorStore = ContributorStore.serialize();
    data.MailboxStore = MailboxStore.serialize();
    data.MessageStore = MessageStore.serialize();

    return JSON.stringify(data);
  }
};


