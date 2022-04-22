/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const srcDir = path.resolve(__dirname, "src", "client");
const distDir = path.resolve(__dirname, "dist");

module.exports = {
  mode: "development",
  entry: path.resolve(srcDir, "index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(distDir),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // want set to true by default
          },
        },
      },

      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'typings-for-css-modules-loader',
      //       options: {
      //         modules: true,
      //         namedExport: true,
      //         camelCase: true,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, "index.html"),
      inject: "body",
    }),
    new NodePolyfillPlugin(),
  ],
};
