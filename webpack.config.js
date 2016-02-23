/* eslint-disable */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const nesting = require('postcss-nesting');

module.exports = {
  context: __dirname,
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/assets',
    filename: 'app.bundle.js',
  },

  devtool: '#source-map',
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    root: __dirname + '/src',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      screwIe8: true,
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('app.bundle.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
      }
    ],
  },
  postcss: [
    nesting(),
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
};
