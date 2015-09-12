import React from 'react/addons';

import ContributorStore from '../stores/ContributorStore.js';

function getStateFromStores () {
  return {
    contributors: ContributorStore.getContributors()
  };
}

export default React.createClass({
  displayName: 'ContributorsView',

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    ContributorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ContributorStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var contributors = this.state.contributors.map(function (contributor) {
      return <li key={contributor.id}>
        <a target='_blank' href={contributor.html_url}>
          <img src={contributor.avatar_url} /><br />
          {contributor.login}
        </a>
      </li>;
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
