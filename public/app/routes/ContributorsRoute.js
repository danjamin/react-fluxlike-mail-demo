define(function (require) {
  'use strict';

  var React = require('react'),
    DefaultTemplate = require('jsx!app/templates/DefaultTemplate'),
    AppActionCreators = require('app/actions/AppActionCreators'),
    ContributorsActionCreators = require('app/actions/ContributorsActionCreators'),
    ContributorsView = require('jsx!app/views/ContributorsView');

  return function () {
    ContributorsActionCreators.load({onlyIfStale: true});
    AppActionCreators.setTemplate(DefaultTemplate);
    AppActionCreators.setTemplateOptions({
      showSidePanel: false,
      ContentView: React.createElement(ContributorsView)
    });
  };
});
