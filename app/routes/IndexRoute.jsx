var React = require('react');

var AppStore = require('../stores/AppStore');

var MailboxesView = require('../views/MailboxesView');
var IndexView = require('../views/IndexView');

var MailboxActions = require('../actions/MailboxActions');

module.exports =  function () {
  // Set sync state
  MailboxActions.changeSelection(0);

  // Start async
  MailboxActions.load({onlyIfStale: true});

  // Set views
  AppStore.setState({
    sidePanel: (<MailboxesView />),
    content: (<IndexView />)
  });
};
