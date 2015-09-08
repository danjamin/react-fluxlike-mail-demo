import React from 'react';
import {RouteStore} from 'fl-router';

import AppStore from '../stores/AppStore.js';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import DocumentTitleView from './DocumentTitleView.js';

function getStateFromStores() {
  return {
    isHeaderVisible: AppStore.isHeaderVisible(),
    isFooterVisible: AppStore.isFooterVisible(),
    template: AppStore.getTemplate(),
    templateOptions: AppStore.getTemplateOptions(),
    activeURL: RouteStore.getURL()
  };
}

export default React.createClass({
  displayName: 'AppView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
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
