/*global requirejs */
define(function (require) {
  'use strict';

  var API = require('app/services/APIService');

  // Configure the API service
  API.config.setEndpoint('/api');

  // bring in the app
  requirejs(['jsx!app/App']);
});
