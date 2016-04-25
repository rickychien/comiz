'use strict'

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const config = require('./webpack.config')

const compiler = webpack(config)
const app = express()
const port = 3990

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}))

app.use(webpackHotMiddleware(compiler))

app.get('/api/*', (req, res) => {
  // Imitate RESTful API pattern
  let path = req.path
  path = /\/comics\/[\d]+(\/episodes)?/.test(path) ? `${path}/data` : path
  res.sendFile(`${__dirname}/src${path}`)
})

app.get('/assets/*', (req, res) => {
  res.sendFile(`${__dirname}/src/${req.path}`)
})

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`)
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('==> Open up http://localhost:%s/ in your browser.', port)
  }
})
