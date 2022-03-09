const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    main: "./src/index.js",
  },
  output: {
    library: {
      name: "bundle",
      type: "umd",
    },
    filename: "[name].min.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "JavaScript Study",
      template: "./src/assets/index.html",
    }),
  ],
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
};
