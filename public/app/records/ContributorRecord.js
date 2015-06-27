define(function (require) {
  'use strict';

  var record = require('immutable').Record;

  return record({
    id: null,
    login: '',
    avatar_url: '',
    html_url: ''
  });
});
