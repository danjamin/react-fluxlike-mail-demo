import Dispatcher from './Dispatcher.js';
import ActionTypes from './ActionTypes.js';

export default {
  setTemplate: function (template) {
    Dispatcher.dispatch({
      type: ActionTypes.SET_TEMPLATE,
      template: template
    });
  },

  clearSelectedItems: function () {
    Dispatcher.dispatch({
      type: ActionTypes.CLEAR_SELECTED_ITEMS
    });
  },

  resetStores: function () {
    Dispatcher.dispatch({
      type: ActionTypes.RESET
    });
  }
};
