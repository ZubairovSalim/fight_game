const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { webpack, ProvidePlugin, NormalModuleReplacementPlugin } = require("webpack");

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/scripts'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Fight Game',
            template: 'src/index.html'
        }),
        new ProvidePlugin({
            Promise: 'bluebird'
        }),
        new NormalModuleReplacementPlugin(/es6-promise$/, 'bluebird'),
    ],
    devServer: {
        static: path.join(__dirname, "public/scripts"),
        compress: true,
        port: 4000,
    },
};
