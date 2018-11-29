const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const env = dotenv.config().parsed;

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
      entry: path.resolve(__dirname, 'client/index.js'),
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
      },
      resolve: {
        extensions: ['.jsx', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            test: /\.css/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin(envKeys)
      ],
    }
  };
  