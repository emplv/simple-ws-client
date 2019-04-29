const webpack = require("webpack");
const path = require("path");
const APP_DIR = path.resolve(__dirname, "src/js");
const BUILD_DIR = path.resolve(__dirname, "public/js");
const config = {
  entry: {
    app: APP_DIR + "/index.tsx"
  },
  output: {
    path: BUILD_DIR,
    filename: "app.js",
    publicPath: "/js/",
    chunkFilename: "app.[name].js?v=[chunkhash]"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: APP_DIR,
        loader: "ts-loader"
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        include: APP_DIR,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
module.exports = function(env, argv) {
  if (argv.mode === "production") {
    const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

    config.plugins = [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        },
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              test: /(\.js(\?.*)?)|(\.ts(x?))$/i
            })
          ]
        }
      })
    ];
  } else if (argv.mode === "development") {
    config.devtool = "source-map";
  }
  return config;
};
