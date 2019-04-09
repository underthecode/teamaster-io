const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/src/index.jsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/env',
              {
                useBuiltIns: 'entry',
                corejs: 3
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'client/dist/'),
    publicPath: './client/dist/',
    filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'client/dist/'),
  //   port: 5000,
  //   publicPath: 'http://localhost:5000/dist/',
  //   hotOnly: true
  // },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
