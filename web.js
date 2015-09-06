/* global require, module, process, __dirname */
'use strict';

var express = require('express');
var app = express();
var bindControllers = require('express-bind-controllers');
var PORT = 5000;

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

// Export app to be used externally
module.exports = app;
