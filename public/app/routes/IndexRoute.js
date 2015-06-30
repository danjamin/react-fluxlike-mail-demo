define(function (require) {
  'use strict';

  var React = require('react'),
    DefaultTemplate = require('jsx!app/templates/DefaultTemplate'),
    AppActionCreators = require('app/actions/AppActionCreators'),
    MailboxActionCreators = require('app/actions/MailboxActionCreators'),
    IndexView = require('jsx!app/views/IndexView');

  return function () {
    MailboxActionCreators.selectMailbox(0);
    MailboxActionCreators.load();

    AppActionCreators.setTemplate(DefaultTemplate);
    AppActionCreators.setTemplateOptions({
      showSidePanel: true,
      ContentView: React.createElement(IndexView)
    });
  };
});
