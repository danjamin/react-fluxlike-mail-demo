/* global JSON */

import _ from 'underscore';
import {Store} from 'fl-store';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../ActionTypes.js';

var ContributorStore;

var _contributors;

/**
 * Sets the initial state of the store
 */
(function _setInitialState() {
  _contributors = {};
})();

function _deserialize(serializedData) {
  _contributors = JSON.parse(serializedData);
}

 /**
 * Merges rawContributors with the private _contributors
 * @param array rawContributors Array of raw JS objects representing contributors
 */
function _mergeContributors(rawContributors) {
  rawContributors.forEach(function (rawContributor) {
    _contributors[rawContributor.id] = {
      id: rawContributor.id,
      login: rawContributor.login,
      avatar_url: rawContributor.avatar_url,
      html_url: rawContributor.html_url
    };
  });
}

ContributorStore = _.extend({}, Store, {
  serialize: function () {
    return JSON.stringify(_contributors);
  },

  getContributors: function () {
    return _.toArray(_contributors);
  }
});

// Register callback with dispatcher and save dispatchToken
ContributorStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_RAW_CONTRIBUTORS:
      _mergeContributors(action.rawContributors);
      ContributorStore.emitChange();
      break;

    case ActionTypes.RESET:
      _setInitialState();
      ContributorStore.emitChange();
      break;

    case ActionTypes.RECEIVE_SERIALIZED_DATA:
      if (action.hasOwnProperty('ContributorStore')) {
        _deserialize(action.ContributorStore);
      }
      break;

    default:
      // do nothing
  }
});

export default ContributorStore;
