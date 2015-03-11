var React = require('react')

module.exports = React.createClass({
  displayName: 'Pull',

  propTypes: {
    direction: React.PropTypes.string.isRequired
  },

  render: function () {
    var className = this.props.direction === 'right' ?
      'pull-right' : 'pull-left'

    return (
      <span className={className}>
        {this.props.children}
      </span>
    )
  }
})
