/* global JSON */

export function Serializer() {
  this.items = {};
}

/**
 * Register with the serializer
 *
 * @param string name The name to register under
 * @param function serializeFn The serialization function being registered (no params required)
 * @param function deserializeFn The deserialization function -- is passed string serializedData
 */
Serializer.prototype.register = function (name, serializeFn, deserializeFn) {
  if (this.items.hasOwnProperty(name)) {
    console.warn(name + ' is already registered in the serializer');
    return;
  }

  this.items[name] = {
    serialize: serializeFn,
    deserialize: deserializeFn
  };
};

/**
 * Serialize the registered items.
 * @return string The serialized data
 */
Serializer.prototype.serialize = function () {
  var serializedData = {},
    key;

  // serialize all registered items
  for (key in this.items) {
    if (this.items.hasOwnProperty(key)) {
      serializedData[key] = this.items[key].serialize();
    }
  }

  return JSON.stringify(serializedData);
};

/**
 * Deserialize the registered items against the serializedData.
 * @param object The serialized data object (by key => value) where key should match a name in the items.
 */
Serializer.prototype.deserialize = function (serializedData) {
  var key;

  // deserialize all registered items
  for (key in serializedData) {
    if (serializedData.hasOwnProperty(key)) {
      if (this.items.hasOwnProperty(key)) {
        this.items[key].deserialize(serializedData[key]);
      }
    }
  }
};
