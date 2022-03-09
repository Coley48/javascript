const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  target: "web", // By default
  entry: {
    main: "./src/index.js",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js"],
    alias: {
      "@": "/src",
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "JavaScript Study",
      template: "./src/assets/index.html",
    }),
  ],
  devServer: {
    compress: true,
    port: 8000,
    open: true,
    hot: true,
  },
};
