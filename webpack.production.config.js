var path = require("path");
var webpack = require("webpack");
const config = require("./webpack.config.js");

module.exports = {
  ...config,
  mode: "production",
  output: {
    publicPath: "/dist/",
    path: path.join(__dirname, "dist"),
    filename: "[name].build.js"
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
