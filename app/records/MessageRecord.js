var record = require('immutable').Record;

module.exports = record({
  id: null,
  mailboxId: null,
  from: '',
  to: '',
  subject: '',
  body: ''
});
