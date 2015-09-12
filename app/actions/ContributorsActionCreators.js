import API from 'fl-api-service';
import {Dispatcher} from '../lib/fl-base/fl-base.js';

import AppActionTypes from '../AppActionTypes.js';

function _fetchContributors(owner, repo) {
  //var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contributors';
  return API.GET('/contributors');
}

export default {
  // return a promise
  load: function () {
    return _fetchContributors('danjamin', 'react-fluxlike-mail-demo').then(function (rawContributors) {
      Dispatcher.dispatch({
        type: AppActionTypes.RECEIVE_RAW_CONTRIBUTORS,
        rawContributors: rawContributors
      });
      return rawContributors;
    })['catch'](function (e) {
      console.warn(e);
      Dispatcher.dispatch({
        type: AppActionTypes.RECEIVE_RAW_CONTRIBUTORS,
        rawContributors: []
      });
    });
  }
};
