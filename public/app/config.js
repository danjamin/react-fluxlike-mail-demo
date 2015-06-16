/*global requirejs */
define(function (require) {
  'use strict';

  var API = require('fl-api-service');

  // Configure the API service
  API.config.setEndpoint('/api');

  // bring in the app
  requirejs(['jsx!app/App']);
});
