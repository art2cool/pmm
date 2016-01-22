
module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname + '/app/',
    filename: "bundle.js"
  },
  devtool: 'source-map',
  watch: true,
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ],
    preLoaders: [
      {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
    ]
  },
  jshint: {
    camelcase: true
  }

};
