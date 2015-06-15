define(function (require) {
  'use strict';

  var record = require('immutable').Record;

  return record({
    id: null,
    mailboxId: null,
    from: '',
    to: '',
    subject: '',
    body: ''
  });
});
