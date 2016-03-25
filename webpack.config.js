var webpack = require('webpack')
var hotMiddlewareScript = 'webpack-hot-middleware/client'

module.exports = {
  entry: {
    bundle: ['./index.js', 'webpack-hot-middleware/client']
  },
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.woff2?|\.ttf|\.eot|\.svg$/,
        loader: 'url'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}
