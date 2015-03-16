var RSVP = require('rsvp');

// TODO: from config file
var endPoint = '/api';
var demoTimeout = 500;

var METADATA_KEY = '__API_metadata__';

var _requestJSON = function (method, path, bodyObject) {
  // relative starts with '/'
  var url = path[0] === '/' ? endPoint + path : path;

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
            setTimeout(function() {
              response = window.JSON.parse(xhr.responseText);
              response[METADATA_KEY] = {
                xhr: xhr
              };
              resolve(response);
            }, demoTimeout);
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

module.exports = {
  METADATA_KEY,

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
