define(function (require) {
  'use strict';

  var React = require('react'),
    _ = require('underscore'),
    Store = require('fl-store')['default'],
    AppDispatcher = require('app/dispatcher/AppDispatcher'),
    ActionTypes = require('app/ActionTypes'),
    DefaultTemplate = require('jsx!app/templates/DefaultTemplate'),
    LoadingView = require('jsx!app/views/LoadingView');

  var AppStore;

  var _template = DefaultTemplate,
    _templateOptions = {
      showSidePanel: false,
      ContentView: React.createElement(LoadingView)
    },
    _isHeaderVisible = true,
    _isFooterVisible = true;

  function _setTemplate(template) {
    _template = template;
  }

  function _setTemplateOptions(templateOptions) {
    // replace/add all options from the templateOptions
    for (var name in templateOptions) {
      if (templateOptions.hasOwnProperty(name)) {
        _templateOptions[name] = templateOptions[name];
      }
    }
  }

  AppStore = _.extend({}, Store, {
    getTemplate: function () {
      return _template;
    },

    getTemplateOptions: function () {
      return _templateOptions;
    },

    isHeaderVisible: function () {
      return _isHeaderVisible;
    },

    isFooterVisible: function () {
      return _isFooterVisible;
    }
  });

  // Register callback with dispatcher and save dispatchToken
  AppStore.dispatchToken = AppDispatcher.register(function (action) {
    switch (action.type) {
      case ActionTypes.SET_TEMPLATE:
        _setTemplate(action.template);
        AppStore.emitChange();
        break;

      case ActionTypes.SET_TEMPLATE_OPTIONS:
        _setTemplateOptions(action.options);
        AppStore.emitChange();
        break;

      default:
        // do nothing
    }
  });

  return AppStore;
});
