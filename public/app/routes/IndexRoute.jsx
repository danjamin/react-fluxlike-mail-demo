define(function (require) {
  'use strict';

  var React = require('react'),
    AppStore = require('app/stores/AppStore'),
    MailboxesView = require('jsx!app/views/MailboxesView'),
    IndexView = require('jsx!app/views/IndexView'),
    MailboxActions = require('app/actions/MailboxActions');

  return function () {
    // Set sync state
    MailboxActions.changeSelection(0);

    // Start async
    MailboxActions.load({onlyIfStale: true});

    // Set views
    AppStore.setState({
      sidePanel: <MailboxesView />,
      content: <IndexView />
    });
  };
});
