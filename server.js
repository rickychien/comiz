var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var express = require('express')
var config = require('./webpack.config')

var port = 3990

var compiler = webpack(config)
var app = express()

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

app.use(webpackHotMiddleware(compiler))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/*', function(req, res) {
  // Imitate restful API pattern
  var path = req.path
  path = /\/comics\/[\d]+(\/episodes)?/.test(path) ? path + '/data' : path
  res.sendFile(__dirname + '/src' + path)
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Open up http://localhost:%s/ in your browser.', port)
  }
})
