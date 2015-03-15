var React = require('react'); // required by inline JSX
var assign = require('object-assign');

var Store = require('./Store');
var HeaderPartial = require('../views/partials/HeaderPartial');
var FooterPartial = require('../views/partials/FooterPartial');

var _state = {
  header: (<HeaderPartial />),
  sidePanel: null,
  content: null,
  footer: (<FooterPartial />)
};

module.exports = assign({}, Store, {
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
