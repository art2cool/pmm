module.exports = {
    entry: './app/index.js',
    output: {
        path: __dirname + '/app/',
        filename: "bundle.js"
    },
    watch: true,
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
