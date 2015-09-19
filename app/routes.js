var MailboxRoute = require('./routes/MailboxRoute.js');
var ContributorsRoute = require('./routes/ContributorsRoute.js');

// WARNING: do not add an initial "/" in your paths!
module.exports = {
  index: {
    path: '',
    route: MailboxRoute
  },

  mailbox: {
    path: 'box/:mailboxId',
    route: MailboxRoute
  },

  message: {
    path: 'box/:mailboxId/message/:messageId',
    route: MailboxRoute
  },

  contributors: {
    path: 'contributors',
    route: ContributorsRoute
  }
};
