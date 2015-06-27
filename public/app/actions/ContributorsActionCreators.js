define(function (require) {
  'use strict';

  var API = require('fl-api-service'),
    AppDispatcher = require('app/dispatcher/AppDispatcher'),
    ActionTypes = require('app/ActionTypes');

  function _fetchContributors(owner, repo) {
    var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contributors';
    return API.GET(url);
  }

  return {
    load: function () {
      _fetchContributors('danjamin', 'react-fluxlike-mail-demo').then(function (rawContributors) {
        AppDispatcher.dispatch({
          type: ActionTypes.RECEIVE_RAW_CONTRIBUTORS,
          rawContributors: rawContributors
        });
        return rawContributors;
      });
    }
  };
});
