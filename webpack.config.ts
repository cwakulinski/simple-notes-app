import 'webpack-dev-server';
import * as path from 'node:path';

import { Configuration } from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import WebpackConfigUtil from './util/WebpackConfig';


const webpackConfig: Configuration = {
    mode: 'development',

    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'dist' ),
    },

    devServer: {
        open: true,
        hot: true,
        watchFiles: [ 'src/**/*.pug' ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // options: {
                        //     implementation: require('sass')
                        // }
                    }
                 ],
            },
            {
                test: /\.pug$/,
                use: [ 'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            basedir: path.resolve( __dirname, './' ),
                        },
                    },
                ],
            },
            {
                test: /\.(svg)$/,
                type: 'asset/source',
            },
        ],
    },

    resolve: {
        alias: WebpackConfigUtil.getResoleAliases(),
        extensions: [ '.ts', '.js' ],
    },

    plugins: [
        new HtmlWebpackPlugin( {
            template: './static/index.pug',
            filename: 'index.html',
        } ),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new DashboardPlugin(),
    ]
}


export default webpackConfig