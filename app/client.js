var Fluxlike = require('fluxlike');

var config = require('./config.js');
var routes = require('./routes.js');

Fluxlike.bootstrap.init(routes, config, false);
