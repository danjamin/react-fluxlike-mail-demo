var Fluxlike = require('fluxlike');

module.exports = function (_isServerSide) {
  // Configure the API service
  Fluxlike.API.config.setDomain('http://localhost:5001');
  Fluxlike.API.config.setEndpoint('/api');
};
