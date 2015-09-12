/* global require, module */

var fs = require('fs');
var _ = require('underscore');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var compileSass = require('broccoli-sass');
var autoprefixer = require('broccoli-autoprefixer');

function _folderExists(path) {
  var stats;

  try {
    stats = fs.lstatSync(path);
    return stats.isDirectory();
  } catch (e) {
    return false;
  }
}

function _buildPublicTree(root) {
  var path = root + '/public',
    publicTree;

  if (_folderExists(path)) {
    publicTree = new funnel(path);
  }

  return publicTree;
}

function _buildStyles(root, input, output) {
  var path = root + '/styles',
    styleTree;

  if (_folderExists(path)) {
    styleTree = compileSass([path], input, output);
    // TODO: allow external config of autoprefixer
    styleTree = autoprefixer(styleTree);
  }

  return styleTree;
}

module.exports = function (config) {
  var allTrees = [];

  // extract options
  var options = _.extendOwn({
    root: '',
    styleInput: 'app.scss',
    styleOutput: 'app.css'
  }, config);

  allTrees.push(_buildPublicTree(options.root)); // public
  allTrees.push(_buildStyles(options.root, options.styleInput, options.styleOutput)); // styles

  return mergeTrees(_.compact(allTrees));
};
