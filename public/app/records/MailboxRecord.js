define(function (require) {
  'use strict';

  var record = require('immutable').Record;

  return record({
    id: null,
    name: '',
    count: 0
  });
});
