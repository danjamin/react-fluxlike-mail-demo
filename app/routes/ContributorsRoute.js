import React from 'react';
import {ActionCreators} from '../lib/fl-base/fl-base.js';

import ContributorsActionCreators from '../actions/ContributorsActionCreators.js';
import DefaultTemplate from '../templates/DefaultTemplate.js';
import ContributorsView from '../views/ContributorsView.js';

// returns array of promises
export default function () {
  var promise;

  promise = ContributorsActionCreators.load();

  ActionCreators.setTemplate(
    <DefaultTemplate showSidePanel={false}>
      <ContributorsView />
    </DefaultTemplate>
  );

  return promise;
}
