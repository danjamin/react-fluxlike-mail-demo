var React = require('react');

var AppStore = require('../stores/AppStore');

var MailboxesView = require('../views/MailboxesView');
var IndexView = require('../views/IndexView');

var DocumentTitleHandler = require('../handlers/DocumentTitleHandler');
var MailboxHandler = require('../handlers/MailboxHandler');

module.exports =  function () {
  // Set sync state
  DocumentTitleHandler.resetTitle();
  MailboxHandler.changeSelection(0);

  // Start async
  MailboxHandler.load({onlyIfStale: true});

  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<IndexView />)
  });
};
