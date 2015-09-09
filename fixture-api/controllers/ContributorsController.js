/* global module, require */

var Contributors = require('../collections/Contributors');

module.exports = function (app) {
  app.get('/api/contributors', function (req, res) {
    var _contributors = Contributors.contributors;
    res.send(_contributors);
  });
};
