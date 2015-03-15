var assign = require('object-assign');

var Store = require('./Store');
var primitivesMixin = require('./PrimitivesMixin');

var Primitives = primitivesMixin({
  showHeader: true,
  showFooter: false
});

var _state = {
  sidePanel: null,
  content: null
};

module.exports = assign({}, Store, Primitives, {
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
