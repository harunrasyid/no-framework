const path = require("path");
const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const IS_DEV = (process.env.NODE_ENV = "DEVELOPMENT");

const appDir = path.join(__dirname, "app");
const assetsDir = path.join(__dirname, "assets");
const stylesDir = path.join(__dirname, "styles");
const nodeDir = "node_modules";

module.exports = {
  entry: [path.join(appDir, "index.js"), path.join(stylesDir, "index.scss")],

  resolve: {
    modules: [appDir, assetsDir, stylesDir, nodeDir],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./assets",
          to: "",
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpe?g|svg|woff2?|fnt|webp|mp4)$/,
        loader: "file-loader",
        options: {
          name(file) {
            return "[name].[hash].[ext]";
          },
        },
      },
      {
        test: /\.(glsl|frag|vert)$/i,
        loader: "raw-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/i,
        loader: "glslify-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
