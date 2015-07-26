import React from 'react';
import _ from 'underscore';
import {Store} from 'fl-store';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../ActionTypes.js';
import DefaultTemplate from '../templates/DefaultTemplate.js';
import LoadingView from '../views/LoadingView.js';

var AppStore;

var _defaultTemplate = DefaultTemplate,
  _defaultTemplateOptions = {
    showSidePanel: true,
    ContentView: React.createElement(LoadingView)
  },
  _template = null,
  _templateOptions = {},
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

function _restoreDefaultTemplateAndOptions() {
  _setTemplate(_defaultTemplate);
  _setTemplateOptions(_defaultTemplateOptions);
}

_restoreDefaultTemplateAndOptions();

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

    case ActionTypes.RESTORE_DEFAULT_TEMPLATE_AND_OPTIONS:
      _restoreDefaultTemplateAndOptions();
      AppStore.emitChange();
      break;

    default:
      // do nothing
  }
});

export default AppStore;
