'use strict';

var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel' },
            { test: /\.scss$/, exclude: /node_modules/, loaders: ['style', 'css', 'resolve-url', 'sass'] }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: "#inline-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};