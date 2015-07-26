import React from 'react';

import AppActionCreators from '../actions/AppActionCreators.js';
import ContributorsActionCreators from '../actions/ContributorsActionCreators.js';
import ContributorsView from '../views/ContributorsView.js';

export default function () {
  ContributorsActionCreators.load();

  AppActionCreators.setTemplateOptions({
    showSidePanel: false,
    ContentView: React.createElement(ContributorsView)
  });
}
