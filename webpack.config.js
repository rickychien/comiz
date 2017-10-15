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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'SERVER_URL': JSON.stringify((process.env.SERVER === '1') ?
          'https://atecomic.wcpan.me' : ''),
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|svg|png|ttf|eot|jpe?g|woff2?)$/,
        use: 'url-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]_[local]__[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
}
