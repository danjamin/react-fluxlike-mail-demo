define(function (require) {
  'use strict';

  var _ = require('underscore'),
    Immutable = require('immutable'),
    Store = require('fl-store')['default'],
    AppDispatcher = require('app/dispatcher/AppDispatcher'),
    ActionTypes = require('app/ActionTypes'),
    ContributorRecord = require('app/records/ContributorRecord');

  var ContributorStore;

  var _contributors = new Immutable.Map();

   /**
   * Merges rawContributors with the private _contributors Immutable map
   * @param array rawContributors Array of raw JS objects representing contributors
   */
  function _mergeContributors(rawContributors) {
    _contributors = _contributors.withMutations(function (map) {
      rawContributors.forEach(function (rawContributor) {
        map.update(rawContributor.id, function (oldContributor) {
          return oldContributor ? oldContributor.merge(rawContributor) :
            new ContributorRecord(rawContributor);
        });
      });
    });
  }

  ContributorStore = _.extend({}, Store, {
    getContributors: function () {
      return _contributors;
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

  return ContributorStore;
});
