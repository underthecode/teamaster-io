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
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: './client/dist/'
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "client/"),
    port: 5000,
    publicPath: "http://localhost:5000/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
