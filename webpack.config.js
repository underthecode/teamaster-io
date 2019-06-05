const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// module.exports = env => {
//   const currentPath = path.join(__dirname);
//   const basePath = currentPath + '/.env';
//   const envPath = basePath + '.' + env.ENVIRONMENT;
//   const finalPath = fs.existsSync(envPath) ? envPath : basePath;
//   const fileEnv = dotenv.config({ path: finalPath }).parsed;

//   console.log('envPath', envPath);
//   console.log('finalPath', finalPath);
//   console.log('fileEnv', fileEnv);

//   const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
//     prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
//     return prev;
//   }, {});

//   return {
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
  plugins: [new webpack.DefinePlugin(envKeys)]
};
// };
