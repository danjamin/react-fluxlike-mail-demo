import React from 'react';

export default React.createClass({
  displayName: 'IndexView',

  shouldComponentUpdate: function () {
    return false;
  },

  render: function () {
    return (
      <div>
        Um, this is awkward ... select a mailbox
      </div>
    );
  }
});
