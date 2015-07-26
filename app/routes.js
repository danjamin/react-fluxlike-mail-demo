import MailboxRoute from './routes/MailboxRoute.js';
import ContributorsRoute from './routes/ContributorsRoute.js';

// WARNING: do not add an initial "/" in your paths!
export default {
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
