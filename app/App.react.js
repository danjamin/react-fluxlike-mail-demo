var React = require('react')
var Backbone = require('backbone')

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
          <div id="side-panel">
            {this.state.sidePanel}
          </div>
          <div id="content">
            {this.state.content}
          </div>
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
