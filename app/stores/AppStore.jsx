var React = require('react'); // required by inline JSX
var assign = require('object-assign');

var Store = require('./Store');
var HeaderPartial = require('../views/partials/HeaderPartial');
var FooterPartial = require('../views/partials/FooterPartial');

module.exports = assign({}, Store, {
  state: {
    header: (<HeaderPartial />),
    sidePanel: null,
    content: null,
    footer: (<FooterPartial />)
  }
});
