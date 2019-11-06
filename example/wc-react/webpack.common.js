const path = require('path');

const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist'),
};

/**
 * Ansvarlig for å generere endelig webpack config basert på stage.
 *
 * @param options fra stage.
 */
module.exports = options => ({
    mode: options.mode,
    target: 'web',

    entry: [
        '@babel/polyfill', // Last alltid Babel sin polyfill først.
        'react', // Last så React.
        'react-dom', // Last deretter react-dom.
        PATHS.app,
    ],

    devServer: options.devServer,
    // Se https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'eval-source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css'],
        modules: ['node_modules', PATHS.app, path.join(__dirname, '.')],
    },

    output: Object.assign(
        {
            path: PATHS.dist,
            publicPath: '/',
        },
        options.output
    ),

    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { // Last inn bygd CSS som tekst, slik at denne kan inline-es på ønsket sted av  Web Component-en.
                        loader: 'raw-loader',
                    },
                    { // Bygg CSS av less.
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                include: [PATHS.app],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(otf|png|gif|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
            {
                test: /\.(jpg|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },
        ],
    },

    // Sett sammen plugins avhengig av stage.
    plugins: options.plugins.concat([
        // Bootstrap krever jquery. Vi trenger kun bootstrap + jquery for rendering i IE.
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        // NODE_ENV tilgjengelig som miljøvariabel for den kjørende applikasjonen:
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]),

    performance: options.performance || {},

    // Kan tweakes ytterligere for å redusere nedlastingstider. Se: https://webpack.js.org/plugins/split-chunks-plugin/
    optimization: {
        namedModules: true,
        splitChunks: {
            name: 'vendor',
            minChunks: 2,
        },
    },
});
