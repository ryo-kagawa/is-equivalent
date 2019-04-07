const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = (env) => ({
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
});

const developmentConfig = (env) => ({
  devtool: "source-map",
  entry: [path.join(__dirname, "test/js/test.js")],
  output: {
    filename: "index.js",
    libraryTarget: "umd",
    path: path.join(__dirname, "./"),
    sourceMapFilename: "index.map"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      minify: false,
      template: path.join(__dirname, "test/index.html")
    })
  ]
});

const browserConfig = (env) => ({
  entry: path.join(__dirname, "src/isEquivalent.js"),
  output: {
    filename: "index.js",
    library: "isEquivalent",
    libraryExport: "default",
    libraryTarget: "window",
    path: path.join(__dirname, "browser")
  }
});

const importConfig = (env) => ({
  entry: path.join(__dirname, "src/isEquivalent.js"),
  output: {
    filename: "index.js",
    library: "isEquivalent",
    libraryTarget: "umd",
    path: path.join(__dirname)
  }
});

module.exports = (env = {}, argv) => {
  env.isDevelopment = argv.mode === "development";

  return Object.assign(
    {},
    baseConfig(env),
    env.isDevelopment && developmentConfig(env),
    env.isBrowser && browserConfig(env),
    env.isImport && importConfig(env)
  );
};
