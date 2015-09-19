var React = require('react');
var Fluxlike = require('fluxlike');

var ContributorsActionCreators = require('../actions/ContributorsActionCreators.js');
var DefaultTemplate = require('../templates/DefaultTemplate.js');
var ContributorsView = require('../views/ContributorsView.js');

// returns array of promises
module.exports = function () {
  var promise;

  promise = ContributorsActionCreators.load();

  Fluxlike.ActionCreators.setTemplate(
    <DefaultTemplate showSidePanel={false}>
      <ContributorsView />
    </DefaultTemplate>
  );

  return promise;
};
