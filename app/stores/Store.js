var _ = require('underscore')
var EventEmitter = require('events').EventEmitter

var CHANGE_EVENT = 'change'

function setProp (key, value) {
  if (this.state.hasOwnProperty(key)) {
    this.state[key] = value
  } else {
    throw new Error('Tried to set unknown property on a Store')
  }
}

function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

module.exports = _.extend({}, EventEmitter.prototype, {
  state: {},

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  get: function (key) {
    if (this.state.hasOwnProperty(key)) {
      return this.state[key]
    } else {
      throw new Error('Tried to get unknown state property from a Store')
    }
  },

  setState: function (newState) {
    if (isObject(newState)) {
      for (key in newState) {
        if (newState.hasOwnProperty(key)) {
          setProp.call(this, key, newState[key])
        }
      }
    } else {
      throw new Error('Store.set() not called properly')
    }

    this.emitChange()
  }
})
