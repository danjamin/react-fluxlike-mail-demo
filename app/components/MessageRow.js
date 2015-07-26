import React from 'react';
import classNames from 'classnames';

import MessageRecord from '../records/MessageRecord.js';

export default React.createClass({
  displayName: 'MessageRow',

  propTypes: {
    message: React.PropTypes.instanceOf(MessageRecord).isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    handleRowClick: React.PropTypes.func
  },

  handleRowClick: function () {
    if (typeof this.props.handleRowClick === 'function') {
      this.props.handleRowClick(this.props.message);
    }
  },

  /**
   * Implementing this hook in components when using Immutable
   * data should yield significant performance boosts during potential
   * re-renders that don't need to happen.
   */
  shouldComponentUpdate: function (nextProps) {
    return nextProps.isSelected !== this.props.isSelected ||
      nextProps.message !== this.props.message;
  },

  render: function () {
    var classes = classNames({
      'table-highlight': this.props.isSelected
    });

    return (
      <tr className={classes} onClick={this.handleRowClick}>
        <td>{this.props.message.from}</td>
        <td>{this.props.message.to}</td>
        <td>{this.props.message.subject}</td>
      </tr>
    );
  }
});
