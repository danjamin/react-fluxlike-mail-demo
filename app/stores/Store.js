var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var PRIVATE_PREFIX = '.';

function setProp (key, value, force) {
  if (this.state.hasOwnProperty(key)) {
    if (key[0] === PRIVATE_PREFIX && !force) {
      console.warn('Tried to set private state directly "' + key +
        '". If doing so safely, use {force: true} option');
    } else {
      this.state[key] = value;
    }
  } else {
    console.error('Tried to set unknown property on a Store');
  }
}

function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

module.exports = assign({}, EventEmitter.prototype, {
  state: {},

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function (key) {
    if (this.state.hasOwnProperty(key)) {
      return this.state[key];
    } else {
      console.error('Tried to get unknown state property from a Store');
    }
  },

  // e.g. options = { isSilent: true, force: true }
  setState: function (newState, options) {
    var isSilent = false;
    var force = false;

    if (isObject(options)) {
      isSilent = options.hasOwnProperty('isSilent') && options.isSilent;
      force = options.hasOwnProperty('force') && options.force;
    }

    if (isObject(newState)) {
      for (var key in newState) {
        if (newState.hasOwnProperty(key)) {
          setProp.call(this, key, newState[key], force);
        }
      }
    } else {
      console.error('Store.set() not called properly');
    }

    if (!isSilent) {
      this.emitChange();
    }
  }
});
