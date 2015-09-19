/* global JSON */

var _ = require('underscore');
var Fluxlike = require('fluxlike');

var AppActionTypes = require('../AppActionTypes.js');

var ContributorStore;

var _contributors;

// Set the initial state
_setInitialState();

/**
 * Sets the initial state of the store
 */
function _setInitialState() {
  _contributors = {};
}

function _serialize () {
  return JSON.stringify(_contributors);
}

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

ContributorStore = _.extend({}, Fluxlike.Store, {
  getContributors: function () {
    return _.toArray(_contributors);
  }
});

// Register with serializer
Fluxlike.Serializer.register('ContributorStore', _serialize, _deserialize);

// Register callback with dispatcher and save dispatchToken
ContributorStore.dispatchToken = Fluxlike.Dispatcher.register(function (action) {
  switch (action.type) {
    case AppActionTypes.RECEIVE_RAW_CONTRIBUTORS:
      _mergeContributors(action.rawContributors);
      ContributorStore.emitChange();
      break;

    case Fluxlike.ActionTypes.RESET:
      _setInitialState();
      ContributorStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = ContributorStore;
