const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: [
      './src/index.jsx',
      'webpack-hot-middleware/client',
    ],
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'SERVER_URL': JSON.stringify((process.env.SERVER === '1') ?
          'https://atecomic.wcpan.me' : ''),
      }
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
