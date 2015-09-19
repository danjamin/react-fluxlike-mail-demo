var Fluxlike = require('fluxlike');

var AppActionTypes = require('../AppActionTypes.js');

function _fetchContributors(owner, repo) {
  //var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contributors';
  return Fluxlike.API.GET('/contributors');
}

module.exports = {
  // return a promise
  load: function () {
    return _fetchContributors('danjamin', 'react-fluxlike-mail-demo').then(function (rawContributors) {
      Fluxlike.Dispatcher.dispatch({
        type: AppActionTypes.RECEIVE_RAW_CONTRIBUTORS,
        rawContributors: rawContributors
      });
      return rawContributors;
    })['catch'](function (e) {
      console.warn(e);
      Fluxlike.Dispatcher.dispatch({
        type: AppActionTypes.RECEIVE_RAW_CONTRIBUTORS,
        rawContributors: []
      });
    });
  }
};
