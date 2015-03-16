var MailboxStore = require('../stores/MailboxStore');

var _prefix = 'Mail';
var _separator = ' | ';

module.exports = {
  resetTitle: function () {
    document.title = _prefix;
  },

  setTitleAsLoading: function () {
    document.title = _prefix + _separator + 'Loading...';
  },

  setTitleByMailboxId: function (mailboxId) {
    var mailbox = MailboxStore.getMailboxById(mailboxId);

    if (mailbox) {
      document.title = _prefix + _separator + mailbox.name +
        (mailbox.count ? ' (' + mailbox.count + ')' : '');
    } else {
      this.setTitleAsLoading();
    }
  }
};
