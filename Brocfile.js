/* global __dirname, require, module */

var broccoliTrees = require('./app/lib/fl-base/broccoliTrees.js');

module.exports = broccoliTrees({
  root: __dirname
});
