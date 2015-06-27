define(function (require) {
  'use strict';

  var AppDispatcher = require('app/dispatcher/AppDispatcher'),
    ActionTypes = require('app/ActionTypes');

  return {
    setTemplate: function (template) {
      AppDispatcher.dispatch({
        type: ActionTypes.SET_TEMPLATE,
        template: template
      });
    },

    setTemplateOptions: function (options) {
      AppDispatcher.dispatch({
        type: ActionTypes.SET_TEMPLATE_OPTIONS,
        options: options
      });
    }
  };
});
