/* global process, __dirname */

import React from 'react';
import express from 'express';
import fs from 'fs';
import {Router} from 'fl-router';

import bootstrap from './app/bootstrap.js';
import AppActionCreators from './app/actions/AppActionCreators.js';
import AppView from './app/views/AppView.js';

var app = express(),
  PORT = 5000;

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

// init the app
bootstrap.init(true /*isServerSide*/);

// Deliver index.html with pre-rendered content
// catch all route!
app.get('*', function (req, res) {
  var url = req.path.substr(1);

  console.log('serving url', url);

  res.setHeader("Cache-Control", "no-cache");

  fs.readFile('./public/index.html', 'utf8', function(err, data) {
    var content = '',
      serializedData = '""';

    try {
      AppActionCreators.resetStores();
      Router.linkToURL(url).then(function () {
        try {
          content = React.renderToString(React.createElement(AppView));
          serializedData = bootstrap.getSerializedData();
        } catch (e) {
          console.error(e);
        } finally {
          _send();
        }
      })['catch'](function (e) {
        console.error(e);
        _send();
      });
    } catch (e) {
      res.sendStatus(404);
      console.error(e);
    }

    function _send () {
      data = data.replace('{{content}}', content);
      data = data.replace('{{data}}', serializedData);
      res.send(data);
    }
  });
});

// Export app to be used externally
export default app;
