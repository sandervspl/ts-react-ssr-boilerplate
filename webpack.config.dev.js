const webpack = require('webpack');
const path = require('path');
const globals = require('./src/config/globals');

module.exports = {
    name: 'client',
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true&noInfo=true',
        'babel-polyfill',
        path.resolve(__dirname, 'src', 'index.tsx'),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.svg$/,
                loader: 'babel-loader!svg-react-loader',
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader?limit=10000',
            },
            {
                exclude: [
                    /\.jsx?$/,
                    /\.tsx?$/,
                    /\.css$/,
                    /\.svg$/,
                    /\.(jpe?g|png|gif)$/i,
                    /\.json$/,
                ],
                loader: 'file-loader',
                query: { name: 'static/[name].[ext]' },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(globals('client')),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['*', '.js', '.ts', '.tsx'],
        alias: {
            app: path.resolve(__dirname, './src/app'),
            common: path.resolve(__dirname, './src/app/components/common'),
            components: path.resolve(__dirname, './src/app/components'),
            config: path.resolve(__dirname, './src/config'),
            ducks: path.resolve(__dirname, './src/app/ducks'),
            fonts: path.resolve(__dirname, './src/app/static/fonts'),
            images: path.resolve(__dirname, './src/app/static/images'),
            modules: path.resolve(__dirname, './src/app/components/modules'),
            server: path.resolve(__dirname, './src/server'),
            services: path.resolve(__dirname, './src/app/services'),
            styles: path.resolve(__dirname, './src/app/styles'),
            vectors: path.resolve(__dirname, './src/app/static/vectors'),
        },
    },
};