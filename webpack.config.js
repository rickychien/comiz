const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      './src/index.jsx',
      'webpack-hot-middleware/client',
    ],
  },
  output: {
    path: `${__dirname}/static/`,
    filename: '[name].js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      DEBUG: `"${process.env.DEBUG}"`,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-1', 'stage-2'],
          env: {
            development: {
              presets: ['react-hmre'],
            },
          },
        },
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.woff2?|\.ttf|\.eot|\.svg$/,
        loader: 'url',
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
}
