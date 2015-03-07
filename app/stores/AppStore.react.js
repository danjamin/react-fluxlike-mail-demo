var React = require('react') // required by inline JSX
var _ = require('underscore')

var Store = require('./Store')
var HeaderPartial = require('../views/partials/HeaderPartial.react')
var FooterPartial = require('../views/partials/FooterPartial.react')

var CHANGE_EVENT = 'change'

var _header = (<HeaderPartial />)
var _footer = (<FooterPartial />)

var _sidePanel
var _content


module.exports = _.extend(Store, {
  getHeader: function () {
    return _header
  },

  setHeader: function (header) {
    _header = header
    this.emitChange()
  },

  getSidePanel: function () {
    return _sidePanel
  },

  setSidePanel: function (sidePanel) {
    _sidePanel = sidePanel
    this.emitChange()
  },

  getContent: function () {
    return _content
  },

  setContent: function (content) {
    _content = content
    this.emitChange()
  },

  getFooter: function () {
    return _footer
  },

  setFooter: function (footer) {
    _footer = footer
    this.emitChange()
  }
})
