define(function (require) {
  'use strict';

  var RouteStore = require('app/stores/RouteStore');

  return {
    linkTo: function (name, params) {
      RouteStore.setRoute(name, params);
    }
  };
});
