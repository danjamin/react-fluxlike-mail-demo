import React from 'react';

import AppActionCreators from '../actions/AppActionCreators.js';
import ContributorsActionCreators from '../actions/ContributorsActionCreators.js';
import ContributorsView from '../views/ContributorsView.js';

// returns array of promises
export default function () {
  var promise;

  promise = ContributorsActionCreators.load();

  AppActionCreators.setTemplateOptions({
    showSidePanel: false,
    ContentView: React.createElement(ContributorsView)
  });

  return promise;
}
