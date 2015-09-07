/* global require, module */

var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var compileSass = require('broccoli-sass');
var autoprefixer = require('broccoli-autoprefixer');

var publicTree,
  styleTree;
//  fontTree;

// public
publicTree = new funnel('public');

// styles
styleTree = compileSass(['styles'], 'app.scss', 'app.css');
styleTree = autoprefixer(styleTree);

// fonts
//fontTree = new funnel('node_modules/bootstrap/dist', {
  //srcDir: 'fonts',
  //destDir: 'fonts'
//});

module.exports = mergeTrees([publicTree, styleTree /*, fontTree*/]);
