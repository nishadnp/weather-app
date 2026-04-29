// webpack.prod.js

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map", // Helpful for debugging production errors
  output: {
    filename: "[name].[contenthash].js", // Cache busting for performance
  },
  optimization: {
    splitChunks: { chunks: "all" },
    runtimeChunk: "single",
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env) // Ensures process.env is available in production
    })
  ],
});