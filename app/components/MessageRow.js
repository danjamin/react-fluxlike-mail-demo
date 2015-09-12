import React from 'react';
import {Router} from '../lib/fl-base/fl-base.js';

var LinkTo = Router.LinkTo;

export default React.createClass({
  displayName: 'MessageRow',

  propTypes: {
    // required
    message: React.PropTypes.object.isRequired,

    // optional
    mailboxId: React.PropTypes.number.isRequired,
    activeURL: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <LinkTo className='table-row'
          activeURL={this.props.activeURL}
          route="message"
          params={[this.props.mailboxId, this.props.message.id]}>
        <div className='table-cell'>{this.props.message.from}</div>
        <div className='table-cell'>{this.props.message.to}</div>
        <div className='table-cell'>{this.props.message.subject}</div>
      </LinkTo>
    );
  }
});
