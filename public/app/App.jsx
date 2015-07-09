define(function (require) {
  'use strict';

  var React = require('react'),
    AppStore = require('app/stores/AppStore'),
    AppActionCreators = require('app/actions/AppActionCreators'),
    Router = require('fl-router').Router,
    routes = require('app/routes'),
    Header = require('jsx!app/components/header'),
    Footer = require('jsx!app/components/footer'),
    DocumentTitleView = require('jsx!app/views/DocumentTitleView');

  function getStateFromStores() {
    return {
      isHeaderVisible: AppStore.isHeaderVisible(),
      isFooterVisible: AppStore.isFooterVisible(),
      template: AppStore.getTemplate(),
      templateOptions: AppStore.getTemplateOptions()
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
            <Header />
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
        <div>
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

  // Start routing
  Router.start(routes, {
    pushState: false,
    root: '/'
  });

});
