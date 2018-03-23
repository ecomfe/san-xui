/**
 * @file webpack.config.js
 * @author leeight
 */

const {execSync} = require('child_process');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const kBaseDir = path.resolve(__dirname, '..', '..');
const kGitVersion = execSync('git rev-parse --short HEAD').toString().trim();

function entries() {
    const files = glob.sync('./src/x/demos/xui-*.js');
    const config = {
        app: './src/x/demos/app.js'
    };
    files.forEach(f => {
        const key = path.basename(f, '.js');
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
        path: __dirname + '/output',
        libraryTarget: 'amd'
    },
    externals: {
        'san': {
            amd: 'san'
        },
        'san-types': {
            amd: 'san-types'
        },
        echarts: {
            amd: 'echarts'
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
        mainFiles: ['index', 'main'],
        alias: {
            'inf-ria': alias('@ecomfe/inf-ria'),
            'san-xui': path.join(__dirname, 'src')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            GIT_VERSION: JSON.stringify(kGitVersion)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            // (the commons chunk name)

            filename: 'commons.js',
            // (the filename of the commons chunk)

            minChunks: 3
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
            {from: './src/x/demos/xui-*.js', to: 'assets/demos/[name].txt'},
            {from: './src/x/components/*.js', to: 'assets/components/[name].txt'},
            {from: './src/x/forms/*.js', to: 'assets/forms/[name].txt'}
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
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0']
                    }
                }
            }
        ]
    }
};










