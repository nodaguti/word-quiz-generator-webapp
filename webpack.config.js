const { DefinePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,

  entry: path.join(__dirname, 'src', 'index.jsx'),

  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'app.bundle.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
    ],

    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          babelrc: false,

          // babel configurations
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: [
                    'last 1 version',
                    'not ie <= 11',
                    'not ie_mob <= 11',
                  ],
                },
                modules: false,
                exclude: ['transform-async-to-generator'],
                debug: true,
              },
            ],
            'react',
          ],
          plugins: [
            'transform-object-rest-spread',
            'transform-class-properties',
            'async-to-promises',
            'transform-runtime',
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('app.bundle.css'),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new BabiliPlugin({
      mangle: { topLevel: true },
    }),
  ],
};
