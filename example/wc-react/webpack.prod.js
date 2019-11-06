const path = require('path');
const util = require('util');

const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist'),
};

// Se dok: https://github.com/jantimon/html-webpack-plugin#configuration
const htmlWebpackPlugin = () =>
    new HtmlWebpackPlugin({
        template: 'node_modules/html-webpack-template/index.ejs',
        title: 'react',
        chunksSortMode: 'dependency',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
        inject: false,
        bodyHtmlSnippet: '<test-comp-react></test-comp-react>'
    });

module.exports = require('./webpack.common')({
    mode: 'production',

    output: {
        filename: 'testcomp-react.js',
    },

    plugins:
        process.env.NODE_ENV === 'analyze'
            ? [
                  new CleanPlugin([PATHS.dist]),
                  // Se: https://www.npmjs.com/package/webpack-bundle-analyzer
                  htmlWebpackPlugin(),
                  new BundleAnalyzerPlugin(),
              ]
            : [
                  new CleanPlugin([PATHS.dist]),
                  htmlWebpackPlugin(),

                  // Brekk bygget dersom sirkulære avhengigheter:
                  new CircularDependencyPlugin({
                      exclude: /a\.js|node_modules/,
                      failOnError: true,
                  }),

                  // Analyser duplikate avhengigheter. Sett emitError = true for å brekke bygget dersom duplikater finnes.
                  new DuplicatePackageCheckerPlugin({
                      verbose: true,
                      emitError: false,
                      showHelp: true,
                      strict: true,
                  }),
              ],
});

console.log(util.inspect(module.exports, { showHidden: false, depth: null }));
