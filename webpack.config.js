module.exports = {
  entry: {
    head: "./app/scripts/head.js",
    index: "./app/scripts/index.js"
  },
  output: {
    path: './app/scripts',
    filename: "[name].build.js"
  },
  module: {
    loaders: [
      {
        test: /\.(es6|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.(jpg|png)$/,
        loader: "url-loader"
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : "url-loader"
      }
    ]
  }
};
