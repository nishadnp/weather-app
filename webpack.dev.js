// webpack.dev.js

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    watchFiles: ["./src/**/*"],
  },
  plugins: [
    new Dotenv(), // Uses your local .env file
  ],
});