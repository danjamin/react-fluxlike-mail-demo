var React = require('react')
var Backbone = require('backbone')
var {Grid, Row, Col} = require('react-bootstrap')

var AppStore = require('./stores/AppStore.react')
var router = require('./router')

function getStateFromStores() {
  return {
    header: AppStore.get('header'),
    sidePanel: AppStore.get('sidePanel'),
    content: AppStore.get('content'),
    footer: AppStore.get('footer')
  }
}

var App = React.createClass({
  displayName: 'App',

  getInitialState: function () {
    return getStateFromStores()
  },

  componentWillMount: function () {
    AppStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(this._onChange)
  },

  render: function () {
    // TODO: incorporate layout?
    return (
      <div>
        <header>{this.state.header}</header>
        <main className='clearfix'>
          <Grid>
            <Row>
              <Col md={2}>{this.state.sidePanel}</Col>
              <Col md={10}>{this.state.content}</Col>
            </Row>
          </Grid>
        </main>
        <footer>{this.state.footer}</footer>
      </div>
    )
  },

  _onChange: function () {
    console.log('App _onChange')
    this.setState(getStateFromStores())
  }
})

// Render app into DOM
React.render(
  <App />,
  document.getElementById('app')
)

// Start routing
router.start()
