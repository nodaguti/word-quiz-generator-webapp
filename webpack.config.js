/* eslint-disable max-len */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const nesting = require('postcss-nesting');

module.exports = {
  context: __dirname,
  entry: './src/index.jsx',
  output: {
    path: `${__dirname}/assets`,
    filename: 'app.bundle.js',
  },

  devtool: '#source-map',
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    root: `${__dirname}/src`,
  },
  plugins: (() => {
    const isDev = process.env.NODE_ENV === 'development';
    const plugins = [
      new ExtractTextPlugin('app.bundle.css'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `'${process.env.NODE_ENV || 'production'}'`,
      }),
    ];
    const prodPlugins = [
      new webpack.optimize.UglifyJsPlugin({
        screwIe8: true,
        compress: {
          warnings: false,
        },
      }),
    ];

    return isDev ? plugins : plugins.concat(prodPlugins);
  })(),
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
      },
    ],
  },
  postcss: [
    nesting(),
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
};
