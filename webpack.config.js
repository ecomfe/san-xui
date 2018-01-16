/**
 * @file webpack.config.js
 * @author leeight
 */

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const kBaseDir = path.resolve(__dirname, '..', '..');

function entries() {
    const files = glob.sync('./src/x/demos/xui-*.es6');
    const config = {
        app: './src/x/demos/app.es6'
    };
    files.forEach(f => {
        const key = path.basename(f, '.es6');
        config[key] = f;
    });
    return config;
}

module.exports = {
    entry: entries(),
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        libraryTarget: 'amd'
    },
    externals: {
        san: {
            amd: 'san'
        },
        echarts: {
            amd: 'echarts'
        },
        'async-validator': {
            amd: 'async-validator'
        }
    },
    devServer: {
        allowedHosts: [
            '.efe.tech',
            '.baidu.com',
            '.baidu-int.com'
        ],
        host: '0.0.0.0'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.es6'],
        mainFiles: ['index', 'main'],
        alias: {
            'moment': path.join(kBaseDir, 'moment', '2.7.0', 'src', 'moment'),
            'jquery': path.join(kBaseDir, 'jquery', '1.9.1', 'src', 'jquery'),
            'bat-ria': path.join(kBaseDir, 'bat-ria', '0.1.14', 'src'),
            'clipboard': path.join(kBaseDir, 'clipboard', '0.0.0', 'src'),
            'eoo': path.join(kBaseDir, 'eoo', '0.1.4', 'src'),
            'underscore': path.join(kBaseDir, 'underscore', '1.6.0', 'src', 'underscore'),
            'lodash': path.join(kBaseDir, 'lodash', '3.10.1', 'src', 'lodash'),
            'mini-event': path.join(kBaseDir, 'mini-event', '1.0.2', 'src'),
            'promise': path.join(kBaseDir, 'promise', '1.0.2', 'src'),
            'humanize': path.join(kBaseDir, 'humanize', '0.0.9', 'src'),
            'er': path.join(kBaseDir, 'er', '3.1.0-beta.6', 'src'),
            'esui': path.join(kBaseDir, 'esui', '3.1.0-beta.6', 'src'),
            'inf-ria': path.join(kBaseDir, 'inf-ria', '0.0.0', 'src'),
            'inf-i18n': path.join(kBaseDir, 'inf-i18n', '0.0.0', 'src'),
            'inf-ui': path.join(kBaseDir, 'inf-ui', '0.0.0', 'src')
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            // (the commons chunk name)

            filename: 'commons.js'
            // (the filename of the commons chunk)

            // minChunks: 3,
            // (Modules must be shared between 3 entries)

            // chunks: ['pageA', 'pageB'],
            // (Only use these entries)
        }),
        new HtmlWebpackPlugin({
            chunks: ['commons', 'app'],
            minify: {
                minifyJS: true,
                minifyCSS: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            },
            hash: true,
            inject: 'head',
            template: './src/x/demos/index.html'
        }),
        new CopyWebpackPlugin([
            {from: './src/x/demos/xui-*.es6', to: '[name].txt'}
        ])
    ],
    module: {
        rules: [
            {
                test: /\.(png|gif|jpe?g|svg)$/,
                use: [
                    {loader: 'file-loader'}
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'less-loader',
                        options: {
                            relativeUrls: true,
                            paths: [
                                kBaseDir
                            ]
                        }
                    }
                ]
            }
        ],
        loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
                // options: {
                //    presets: ['es2015']
                // }
            }
        ]
    }
};










