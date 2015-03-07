var express = require('express')
var app = express()
var PORT = 5000

// Set the port
app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'))
})

// Setup /public access
app.use(express['static'](__dirname + '/dist/'))

// Export app to be used externally
module.exports = app
