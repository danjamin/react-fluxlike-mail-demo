var RSVP = require('rsvp')

// TODO: from config file
var endPoint = '/fixtures'

var _requestJSON = function (method, path, bodyObject) {
  // relative starts with '/'
  var url = path[0] === '/' ? endPoint + path : path

  return new RSVP.Promise(function (resolve, reject) {
    var httpRequest

    if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest()
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP")
      } catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
      }
    }

    if (!httpRequest) {
      throw new Error('Unable to make AJAX requests in this browser')
    }

    httpRequest.onreadystatechange = handler
    httpRequest.open(method, url)
    httpRequest.setRequestHeader("Accept", "application/json")
    httpRequest.send()

    if (bodyObject) {
      httpRequest.setRequestHeader("Content-Type", "application/json")
      httpRequest.send(JSON.stringify(bodyObject))
    }

    function handler() {
      try {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            // TODO: remove this artificial dampener
            setTimeout(function() {
              resolve(JSON.parse(httpRequest.responseText))
            }, 300)
          } else {
            reject(httpRequest)
          }
        }
      } catch (e) {
        reject(e)
      }
    }
  })
}

module.exports = {
  get: function (path) {
    return _requestJSON('GET', path)
  },

  post: function (path, bodyObject) {
    return _requestJSON('POST', path, bodyObject)
  },

  put: function (path, bodyObject) {
    return _requestJSON('PUT', path, bodyObject)
  },

  'delete': function (path) {
    return _requestJSON('DELETE', path)
  },

  patch: function (path, bodyObject) {
    return _requestJSON('PATCH', path, bodyObject)
  }
}
