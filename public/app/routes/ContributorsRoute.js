define(function (require) {
  'use strict';

  var React = require('react'),
    AppActionCreators = require('app/actions/AppActionCreators'),
    ContributorsActionCreators = require('app/actions/ContributorsActionCreators'),
    ContributorsView = require('jsx!app/views/ContributorsView');

  return function () {
    ContributorsActionCreators.load();

    AppActionCreators.setTemplateOptions({
      showSidePanel: false,
      ContentView: React.createElement(ContributorsView)
    });
  };
});
