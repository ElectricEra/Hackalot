var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: path.resolve(__dirname, './build')
  },
  devServer: {
    contentBase: path.resolve(__dirname, './build'),
  },
  module:  {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?importLoaders=1?sourceMap', 'sass-loader?sourceMap'],
        exclude: ['node_modules']
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      }
    ]
  }
};
