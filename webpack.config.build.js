const { merge } = require("webpack-merge");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "public"),
  },
  plugins: [new CleanWebpackPlugin()],
});
