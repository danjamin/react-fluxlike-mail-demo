define(function (require) {
  'use strict';

  var _ = require('underscore'),
    Store = require('fl-store')['default'];

  var _state = {
    showHeader: true,
    showFooter: false,
    sidePanel: null,
    content: null
  };

  return _.extend({}, Store, {
    setState: function(newState) {
      for (var key in newState) {
        if (newState.hasOwnProperty(key)) {
          if (_state.hasOwnProperty(key)) {
            _state[key] = newState[key];
          }
        }
      }

      this.emitChange();
    },

    get: function(key) {
      if (_state.hasOwnProperty(key)) {
        return _state[key];
      }
    }
  });
});
