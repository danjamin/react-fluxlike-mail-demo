var React = require('react')

module.exports = React.createClass({
  displayName: 'Loading',

  propTypes: {
    copy: React.PropTypes.string
  },

  render: function () {
    var copy = this.props.copy ? this.props.copy : 'Loading'

    return (
      <div className='loading rotating'>{copy}</div>
    )
  }
})
