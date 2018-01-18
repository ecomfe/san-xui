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

function alias(name) {
    return path.dirname(require.resolve(name));
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
        'san-types': {
            amd: 'san-types'
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
            'eoo': alias('@ecomfe/eoo'),
            'mini-event': alias('@ecomfe/mini-event'),
            'er': alias('@ecomfe/er'),
            'inf-ria': alias('@ecomfe/inf-ria'),
            'inf-i18n': path.join(kBaseDir, 'inf-i18n', '0.0.0', 'src'),
            'inf-ui': path.join(__dirname, 'src')
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
            {from: './src/x/demos/xui-*.es6', to: 'assets/demos/[name].txt'},
            {from: './src/x/components/*.es6', to: 'assets/components/[name].txt'},
            {from: './src/x/forms/*.es6', to: 'assets/forms/[name].txt'}
        ])
    ],
    module: {
        rules: [
            {
                test: /\.(png|gif|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                return 'assets/images/[hash].[ext]';
                            }
                        }
                    }
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
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    }
};










