/* global require, module, process, __dirname */
'use strict';

var express = require('express');
var app = express();
var bindControllers = require('express-bind-controllers');
var PORT = 5000;

// Set the port
app.set('port', process.env.PORT || PORT);
app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'));
});

// Setup /public access
app.use(express['static'](__dirname + '/public/'));

// Bind controllers
bindControllers(app, __dirname + '/fixture-api/controllers');

// Export app to be used externally
module.exports = app;
