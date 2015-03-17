var React = require('react');
var {Grid, Row, Col} = require('react-bootstrap');

var AppStore = require('./stores/AppStore');
var router = require('./router');

var HeaderPartial = require('./views/partials/HeaderPartial');
var FooterPartial = require('./views/partials/FooterPartial');
var DocumentTitleView = require('./views/DocumentTitleView');

function getStateFromStores() {
  return {
    showHeader: AppStore.get('showHeader'),
    showFooter: AppStore.get('showFooter'),
    sidePanel: AppStore.get('sidePanel'),
    content: AppStore.get('content')
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
    // TODO: incorporate layout?
    var header;
    var footer;

    if (this.state.showHeader) {
      header = (
        <header>
          <HeaderPartial />
        </header>
      );
    }

    if (this.state.showFooter) {
      footer = (
        <footer>
          <FooterPartial />
        </footer>
      );
    }

    return (
      <div>
        {header}

        <main className='clearfix'>
          <Grid>
            <Row>
              <Col md={2}>{this.state.sidePanel}</Col>
              <Col md={10}>{this.state.content}</Col>
            </Row>
          </Grid>
        </main>

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

// Start routing
router.start();
