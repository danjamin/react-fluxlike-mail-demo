var React = require('react');
var Fluxlike = require('fluxlike');

var LinkTo = Fluxlike.LinkTo;

function getStateFromStores () {
  return {
    activeURL: Fluxlike.RouteStore.getURL()
  };
}

module.exports = React.createClass({
  displayName: 'HeaderView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    Fluxlike.RouteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    Fluxlike.RouteStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <ul className='navbar'>
        <li className='navbar-item'>
          <h3>Flux-like Mail</h3>
        </li>
        <li className='navbar-item'>
          <LinkTo route='contributors' activeURL={this.state.activeURL}>
            Contributors
          </LinkTo>
        </li>
      </ul>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});
