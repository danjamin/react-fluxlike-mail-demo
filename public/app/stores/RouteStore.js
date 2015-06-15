define(function (require) {
  'use strict';

  var _ = require('underscore'),
    Store = require('app/stores/Store');

  var _routeName,
    _routeParams;

  return _.extend({}, Store, {
    setRoute: function (name, params) {
      _routeName = name;
      _routeParams = params;
      this.emitChange();
    },

    getRouteName: function () {
      return _routeName;
    },

    getRouteParams: function () {
      return _routeParams;
    }
  });
});
