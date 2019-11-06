const util = require('util');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_URL_BACKEND =
    process.env.ROOT_URL_BACKEND || 'http://localhost:8080';

module.exports = require('./webpack.common')({
    mode: 'development',

    // Se https://webpack.js.org/configuration/dev-server/
    devServer: {
        https: false,
        host: process.env.HOST,
        port: process.env.PORT,
        clientLogLevel: 'info',
        quiet: false,
        hot: true,
        inline: true,
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: '/',
        proxy: {
            // Se dok: https://github.com/chimurai/http-proxy-middleware
            '**': {
                target: ROOT_URL_BACKEND,
                secure: false,
            },
        },
    },

    output: {
        filename: 'testcomp-react.js',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // Se dok: https://github.com/jantimon/html-webpack-plugin#configuration
        new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.ejs',
            title: 'react',
            chunksSortMode: 'dependency',
            inject: false, // Satt til false for å hindre warning om duplikat babel-polyfill.
            bodyHtmlSnippet: '<test-comp-react></test-comp-react>'
        }),
    ],

    performance: {
        hints: false,
    },
});

console.log(util.inspect(module.exports, { showHidden: false, depth: null }));
