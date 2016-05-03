const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: [
      './src/index.jsx',
    ],
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'SERVER_URL': JSON.stringify('https://atecomic.wcpan.me'),
      }
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|png|ttf|eot|jpe?g|woff2?)$/,
        loader: 'url',
      },
      {
        test: /\.svg/,
        loader: 'svg-inline',
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]',
      },
    ],
  },
}
