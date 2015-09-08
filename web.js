/* global require, module, process, __dirname */
'use strict';

var express = require('express');
var fs = require('fs');
var app = express();
var bindControllers = require('express-bind-controllers');
var PORT = 5000;

var bootstrap = require('./_transpiled/bootstrap.js');

if (!process.env.BUILD_DIR || !process.env.BUILD_JS_DIR) {
  console.log('Please specify the BUILD_DIR and BUILD_JS_DIR environment variables');
  process.exit(1);
}

// Set the port
app.set('port', process.env.PORT || PORT);
app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'));
});

// Setup /public access
app.use(express['static'](__dirname + '/' + process.env.BUILD_DIR + '/'));
app.use(express['static'](__dirname + '/' + process.env.BUILD_JS_DIR + '/'));

// Bind controllers
bindControllers(app, __dirname + '/fixture-api/controllers', true);

// init the app
bootstrap.init(true /*isServerSide*/);

// Deliver index.html with pre-rendered React main
// isomorphic app -- engage
app.get('/bob', function (req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store");

  fs.readFile('./public/index.html', 'utf8', function(err, data) {
    var React = require('react');
    var AppView = require('./_transpiled/views/AppView.js');
    var Router = require('fl-router').Router;
    var content;

    Router.linkToURL('contributors').then(function () {
      try {
        content = React.renderToString(React.createElement(AppView, null, null));
        data = data.replace('{{content}}', content);
        data = data.replace('{{data}}', bootstrap.getSerializedData());
        res.send(data);
      } catch (e) {
        console.error(e);
        data = data.replace('{{content}}', '');
        data = data.replace('{{data}}', '');
        res.send(data);
      }
    })['catch'](function (e) {
      console.error(e);
      data = data.replace('{{content}}', '');
      data = data.replace('{{data}}', '');
      res.send(data);
    });
  });
});

// Export app to be used externally
module.exports = app;
