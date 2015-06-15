define(function (require) {
  'use strict';

  var RSVP = require('rsvp');

  var _config,
    METADATA_KEY = '__API_metadata__';

  _config = {
    endPoint: '/'
  };

  var _requestJSON = function (method, path, bodyObject) {
    // relative starts with '/'
    var url = path[0] === '/' ? _config.endPoint + path : path;

    var xhr;
    var promise;

    promise = new RSVP.Promise(function (resolve, reject) {
      if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
      } else if (window.ActiveXObject) { // IE
        try {
          xhr = new window.ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
          try {
            xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
          } catch (err) {}
        }
      }

      if (!xhr) {
        throw new Error('Unable to make AJAX requests in this browser');
      }

      xhr.onreadystatechange = handler;
      xhr.open(method, url);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      if (bodyObject) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(window.JSON.stringify(bodyObject));
      }

      function handler() {
        var response;

        try {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              response = window.JSON.parse(xhr.responseText);
              response[METADATA_KEY] = {
                xhr: xhr
              };
              resolve(response);
            } else {
              reject(xhr);
            }
          }
        } catch (e) {
          reject(e);
        }
      }
    });

    return promise;
  };

  return {
    METADATA_KEY: METADATA_KEY,

    config: {
      setEndpoint: function (endPoint) {
        _config.endPoint = endPoint;
      }
    },

    get: function (path) {
      return _requestJSON('GET', path, null);
    },

    post: function (path, bodyObject) {
      return _requestJSON('POST', path, bodyObject);
    },

    put: function (path, bodyObject) {
      return _requestJSON('PUT', path, bodyObject);
    },

    'delete': function (path) {
      return _requestJSON('DELETE', path, null);
    },

    patch: function (path, bodyObject) {
      return _requestJSON('PATCH', path, bodyObject);
    },

    resolve: function (data) {
      return new RSVP.Promise(function (resolve, reject) {
        resolve(data);
      });
    },

    reject: function (reason) {
      return new RSVP.Promise(function (resolve, reject) {
        reject(reason);
      });
    }
  };
});
