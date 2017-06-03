const path = require("path");
const destinationPath = path.resolve('./public/');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin(`styles.css`);

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  cache: true,
  context: __dirname,
  entry: './assets/js/index',

  output: {
    path: destinationPath,
    filename: "bundle.js",
  },

  plugins: [extractCSS],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-object-rest-spread']
        }
      },
      {
          test: require.resolve('react'),
          use: [{
              loader: 'expose-loader',
              options: 'React'
          }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        })
      }
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  }
};
