const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
    router: path.resolve(
      __dirname,
      "src/components/shared/spa-router-component.js",
    ),
    footer: path.resolve(__dirname, "src/components/shared/footer-mock.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "images/[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.json$/,
        loader: "json-loader",
        type: "javascript/auto",
        include: path.resolve(__dirname, "src/data"),
      },
    ],
  },
  resolve: {
    alias: {
      Fonts: path.resolve(__dirname, "src/fonts"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Tesla App",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};
