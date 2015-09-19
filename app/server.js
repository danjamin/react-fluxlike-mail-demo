var serve = require('fluxlike/serve.js');

var config = require('./config.js');
var routes = require('./routes.js');

serve(routes, config, {
  port: 5000
});
