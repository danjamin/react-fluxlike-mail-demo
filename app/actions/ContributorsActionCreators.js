import API from 'fl-api-service';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../ActionTypes.js';

function _fetchContributors(owner, repo) {
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contributors';
  return API.GET(url);
}

export default {
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
