require('dotenv').config();
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js',
  mode: process.env.ENV || 'production',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  }
};
