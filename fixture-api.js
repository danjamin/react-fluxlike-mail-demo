/* global require, module, process, __dirname */
'use strict';

var express = require('express');
var app = express();
var bindControllers = require('express-bind-controllers');
var PORT = 5001;

// Set the port
app.set('port', process.env.PORT || PORT);
app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'));
});

// Allow cross origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Bind controllers
bindControllers(app, __dirname + '/fixture-api/controllers', true);

// Export app to be used externally
module.exports = app;
