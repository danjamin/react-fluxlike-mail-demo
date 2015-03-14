var React = require('react')

module.exports = React.createClass({
  displayName: 'MessagePartial',

  propTypes: {
    message: React.PropTypes.object.isRequired
  },

  render: function () {
    var message = this.props.message

    return (
      <div>
        <hr />
        <h2>{message.subject}</h2>
        <p>
          <span>From:</span> {message.from},&nbsp;
          <span>To:</span> {message.to}
        </p>
        <p>{message.body}</p>
      </div>
    )
  }
})
