var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve('./index.js'),
        vendor: ['jquery','popper.js','bootstrap'],
    },
    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve('./dist')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manisfest']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('./index.ejs') //embedded templete javascript
        }),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_module/,
                query: {
                    presets: [['es2015', {modules: false}]]
                }
            },
            {
                test: /\.less$/,
                loader: ['style-loader','css-loader','less-loader'] // ler da direita pra esquerda
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                loader: 'url-loader'
            }
        ]
    },
    devServer: { // inline
        contentBase: path.resolve('./dist'),
        port: 8080
    },
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_module/
    },
    performance: {
        hints: false
    },
    devtool: 'source-map'
};

// webpack = hash - id da compilação do pacote
// chunkhash = id da compilação do pedaço do modulo

// Gera grafos de dependencias