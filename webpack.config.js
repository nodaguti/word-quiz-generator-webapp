const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
                    'last 2 versions',
                    'not ie <= 11',
                    'not ie_mob <= 11',
                  ],
                },
//                modules: false,
                exclude: ['transform-async-to-generator']
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

  plugins: (() => {
    const isDev = process.env.NODE_ENV === 'development';
    const plugins = [
      new ExtractTextPlugin('app.bundle.css'),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `'${process.env.NODE_ENV || 'production'}'`,
        },
      }),
    ];
    const prodPlugins = [
      new webpack.optimize.UglifyJsPlugin({
        screwIe8: true,
        comments: false,
        sourceMap: true,
      }),
    ];

    return isDev ? plugins : plugins.concat(prodPlugins);
  })(),
};
