import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionTypes from '../ActionTypes.js';

export default {
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
  },

  clearSelectedItems: function () {
    AppDispatcher.dispatch({
      type: ActionTypes.CLEAR_SELECTED_ITEMS
    });
  },

  restoreDefaultTemplateAndOptions: function () {
    AppDispatcher.dispatch({
      type: ActionTypes.RESTORE_DEFAULT_TEMPLATE_AND_OPTIONS
    });
  }
};
