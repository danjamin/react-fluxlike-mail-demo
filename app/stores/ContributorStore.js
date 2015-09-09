import _ from 'underscore';
import {Store} from 'fl-store';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../ActionTypes.js';

var ContributorStore;

var _contributors = {};

 /**
 * Merges rawContributors with the private _contributors
 * @param array rawContributors Array of raw JS objects representing contributors
 */
function _mergeContributors(rawContributors) {
  var contributor;

  rawContributors.forEach(function (rawContributor) {
    contributor = {
      id: rawContributor.id,
      login: rawContributor.login,
      avatar_url: rawContributor.avatar_url,
      html_url: rawContributor.html_url
    };

    _contributors[rawContributors.id] = contributor;
  });
}

ContributorStore = _.extend({}, Store, {
  getContributors: function () {
    var contributorsArr = [];

    for (var key in _contributors) {
      contributorsArr.push(_contributors[key]);
    }

    return contributorsArr;
  }
});

// Register callback with dispatcher and save dispatchToken
ContributorStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_RAW_CONTRIBUTORS:
      _mergeContributors(action.rawContributors);
      ContributorStore.emitChange();
      break;

    default:
      // do nothing
  }
});

export default ContributorStore;
