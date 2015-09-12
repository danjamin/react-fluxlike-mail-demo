/* global process, __dirname */

import React from 'react';
import express from 'express';
import fs from 'fs';

import {Router} from './lib/Router.js';
import bootstrap from './lib/bootstrap.js';
import ActionCreators from './lib/ActionCreators.js';
import RootView from './lib/RootView.js';

export default function serve(routes, configFn, options) {
  var app = express(),
    PORT = options.port ? options.port : 5000,
    BUILD_DIR,
    BUILD_JS_DIR;

  if (!options.buildDir || !options.buildJSDir) {
    console.log('Please specify the buildDir and buildJSDir options');
    process.exit(1);
  }

  BUILD_DIR = options.buildDir;
  BUILD_JS_DIR = options.buildJSDir;

  // Set the port
  app.set('port', PORT);
  app.listen(app.get('port'), function () {
    console.log('Node app is running at localhost:' + app.get('port'));
  });

  // Setup /public access
  app.use(express['static'](BUILD_DIR));
  app.use(express['static'](BUILD_JS_DIR));

  // init the app
  bootstrap.init(routes, configFn, true /*isServerSide*/);

  // Deliver index.html with pre-rendered content
  // catch all route!
  app.get('*', function (req, res) {
    var url = req.path.substr(1);

    console.log('serving url', url ? url : '/');

    res.setHeader("Cache-Control", "no-cache");

    fs.readFile(__dirname + '/200.html', 'utf8', function(err, data) {
      var content = '',
        serializedData = '""';

      if (err) {
        console.error(err);
        res.sendStatus(500);
      }

      try {
        ActionCreators.resetStores();
        Router.linkToURL(url).then(function () {
          try {
            content = React.renderToString(React.createElement(RootView));
            serializedData = bootstrap.getSerializedData();
          } catch (e) {
            console.error(e, e.stack);
          } finally {
            _send();
          }
        })['catch'](function (e) {
          console.error(e, e.stack);
          _send();
        });
      } catch (e) {
        console.error(e, e.stack);
        res.sendStatus(404);
      }

      function _send () {
        data = data.replace('{{content}}', content);
        data = data.replace('{{data}}', serializedData);
        res.send(data);
      }
    });
  });
}
