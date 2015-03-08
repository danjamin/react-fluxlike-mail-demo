var React = require('react') // required by inline JSX
var _ = require('underscore')

var Store = require('./Store')
var HeaderPartial = require('../views/partials/HeaderPartial.react')
var FooterPartial = require('../views/partials/FooterPartial.react')

module.exports = _.extend({}, Store, {
  state: {
    header: (<HeaderPartial />),
    sidePanel: null,
    content: null,
    footer: (<FooterPartial />)
  }
})
