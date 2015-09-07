import React from 'react';
import {Router, RouteStore} from 'fl-router';

import AppStore from './stores/AppStore.js';
import AppActionCreators from './actions/AppActionCreators.js';
import routes from './routes.js';
import Header from './components/header.js';
import Footer from './components/footer.js';
import DocumentTitleView from './views/DocumentTitleView.js';
import config from './config.js';

config();

function getStateFromStores() {
  return {
    isHeaderVisible: AppStore.isHeaderVisible(),
    isFooterVisible: AppStore.isFooterVisible(),
    template: AppStore.getTemplate(),
    templateOptions: AppStore.getTemplateOptions(),
    activeURL: RouteStore.getURL()
  };
}

var App = React.createClass({
  displayName: 'App',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentWillMount: function () {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var header,
      footer;

    if (this.state.isHeaderVisible) {
      header = (
        <header>
          <Header activeURL={this.state.activeURL} />
        </header>
      );
    }

    if (this.state.isFooterVisible) {
      footer = (
        <footer>
          <Footer />
        </footer>
      );
    }

    return (
      <div className='viewport vbox'>
        {header}

        <this.state.template {...this.state.templateOptions} />

        {footer}

        <DocumentTitleView />
      </div>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});

// Start routing
Router.start(routes, {
  pushState: false,
  root: '/'
});

// Render app into DOM
React.render(
  <App />,
  document.getElementById('app')
);

// register beforeEach route callback
Router.beforeEach(function (name) {
  AppActionCreators.clearSelectedItems();
  AppActionCreators.restoreDefaultTemplateAndOptions();
});

