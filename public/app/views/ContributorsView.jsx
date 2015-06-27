define(function (require) {
  'use strict';

  var React = require('react'),
    ContributorStore = require('app/stores/ContributorStore');

  var PureRenderMixin = React.addons.PureRenderMixin;

  function getStateFromStores () {
    return {
      contributors: ContributorStore.getContributors() // Immutable.Map
    };
  }

  return React.createClass({
    displayName: 'ContributorsView',

    mixins: [PureRenderMixin],

    getInitialState: function () {
      return getStateFromStores();
    },

    componentWillMount: function () {
      ContributorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
      ContributorStore.removeChangeListener(this._onChange);
    },

    render: function () {
      var contributors = [];

      // be careful here, if using .map() you will result in
      // an immutable iterable that react does not natively support
      this.state.contributors.forEach(function (contributor, contributorId) {
        contributors.push(
          <li key={contributor.get('id')}>
            <a target='_blank' href={contributor.get('html_url')}>
              <img src={contributor.get('avatar_url')} /><br />
              {contributor.get('login')}
            </a>
          </li>
        );
      });

      return (
        <ul className='contributors'>
          {contributors}
        </ul>
      );
    },

    _onChange: function () {
      this.setState(getStateFromStores());
    }
  });
});
