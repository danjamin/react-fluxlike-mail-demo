import React from 'react';
import {LinkTo} from 'fl-router';

import MessageRecord from '../records/MessageRecord.js';

export default React.createClass({
  displayName: 'MessageRow',

  propTypes: {
    // required
    message: React.PropTypes.instanceOf(MessageRecord).isRequired,

    // optional
    mailboxId: React.PropTypes.number.isRequired,
    activeURL: React.PropTypes.string.isRequired
  },

  /**
   * Implementing this hook in components when using Immutable
   * data should yield significant performance boosts during potential
   * re-renders that don't need to happen.
   */
  shouldComponentUpdate: function (nextProps) {
    return nextProps.mailboxId !== this.props.mailboxId ||
      nextProps.activeURL !== this.props.activeURL ||
      nextProps.message !== this.props.message;
  },

  render: function () {
    return (
      <LinkTo className='table-row'
          activeURL={this.props.activeURL}
          route="message"
          params={[this.props.mailboxId, this.props.message.get('id')]}>
        <div className='table-cell'>{this.props.message.from}</div>
        <div className='table-cell'>{this.props.message.to}</div>
        <div className='table-cell'>{this.props.message.subject}</div>
      </LinkTo>
    );
  }
});
