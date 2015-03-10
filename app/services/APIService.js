var RSVP = require('rsvp')

// TODO: from config file
var endPoint = '/fixtures'

var METADATA_KEY = '__API_metadata__'
var COUNTER_MAX = 5000 // should be safe from overlap
var _uuidCounter = 0

var _requestJSON = function (method, path, bodyObject, options) {
  // relative starts with '/'
  var url = path[0] === '/' ? endPoint + path : path

  var xhr
  var promise

  promise = new RSVP.Promise(function (resolve, reject) {
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) { // IE
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP")
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
      }
    }

    if (!xhr) {
      throw new Error('Unable to make AJAX requests in this browser')
    }

    xhr.onreadystatechange = handler
    xhr.open(method, url)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.send()

    if (bodyObject) {
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.send(JSON.stringify(bodyObject))
    }

    function handler() {
      var response

      try {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // TODO: remove this artificial dampener
            setTimeout(function() {
              response = JSON.parse(xhr.responseText)
              response[METADATA_KEY] = {
                xhr: xhr,
                method: method,
                path: path,
                options: options,
                uuid: options && options.uuid ? options.uuid : null
              }
              resolve(response)
            }, 300)
          } else {
            reject(xhr)
          }
        }
      } catch (e) {
        reject(e)
      }
    }
  })

  return promise
}

// e.g.
// var uuid = APIService.uuid.generate()
// var options = {
//   uuid: uuid
// }
//
module.exports = {
  METADATA_KEY: METADATA_KEY,

  uuid: {
    generate: function () {
      // loop back around if we hit 0
      if (_uuidCounter === COUNTER_MAX) {
        _uuidCounter = 0
      }

      return ++_uuidCounter
    },

    isMatch: function (uuid, response) {
      var metadata = response[METADATA_KEY]
      return metadata.uuid === uuid
    }
  },

  get: function (path, options) {
    return _requestJSON('GET', path, null, options)
  },

  post: function (path, bodyObject, options) {
    return _requestJSON('POST', path, bodyObject, options)
  },

  put: function (path, bodyObject, options) {
    return _requestJSON('PUT', path, bodyObject, options)
  },

  'delete': function (path, options) {
    return _requestJSON('DELETE', path, null, options)
  },

  patch: function (path, bodyObject, options) {
    return _requestJSON('PATCH', path, bodyObject, options)
  }
}
