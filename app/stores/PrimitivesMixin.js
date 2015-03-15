function _pruneInvalid(state) {
  var invalidKeys = [];

  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      // delete invalid prop
      if (!_isPrimitive(state[key])) {
        delete state[key];
        invalidKeys.push(key);
      }
    }
  }

  return invalidKeys;
}

function _isPrimitive(value) {
  return typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'string';
}

function _isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function _setProp(state, key, newValue) {
  var oldValue;
  var hasChanged = false;

  // ensure updating a key that exists
  if (state.hasOwnProperty(key)) {
    oldValue = state[key];

    // ensure same type
    if (typeof newValue !== typeof oldValue) {
      console.error('Primitive with key "' + key + '" must be set to a ' +
        'value with the same type.  Expected "' + (typeof oldValue) +
        '" but received "' + (typeof newValue) + '"');

    // ensure value has changed
    } else if (oldValue !== newValue) {
      state[key] = newValue;
      hasChanged = true;
    }
  } else {
    console.error('Tried to set unknown primitive property "' + key + '"');
  }

  return hasChanged;
}

module.exports = function(state) {
  // Some initial scoped validation
  (function () {
    var invalidKeys = _pruneInvalid(state);

    invalidKeys.forEach(function (key) {
      console.error('Failed to initialize property "' +
        key + '" as it is not a primitive. `null` and `undefined` are ' +
        'not considered primitives');
    });
  })();

  return {
    getPrimitive: function (key) {
      if (state.hasOwnProperty(key)) {
        return state[key];
      } else {
        console.error('Tried to get unknown primitive property "' + key + '"');
      }
    },

    setPrimitives: function (newState) {
      var hasChanged = false;
      var propChanged;

      if (_isObject(newState)) {
        for (var key in newState) {
          if (newState.hasOwnProperty(key)) {
            propChanged = _setProp(state, key, newState[key]);

            // Track if at least one prop has changed
            if (!hasChanged && propChanged) {
              hasChanged = true;
            }
          }
        }
      } else {
        console.error('Primitives.setPrimitives expects an object');
      }

      if (hasChanged && typeof this.emitChange === 'function') {
        this.emitChange();
      }
    }
  };
};
