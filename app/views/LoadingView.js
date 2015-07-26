import React from 'react';

import Loading from '../components/Loading.js';

export default React.createClass({
  displayName: 'LoadingView',

  shouldComponentUpdate: function () {
    return false;
  },

  render: function () {
    return (
      <div>
        <Loading />
      </div>
    );
  }
});
