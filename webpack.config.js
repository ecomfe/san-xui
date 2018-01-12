/**
 * @file webpack.config.js
 * @author leeight
 */

const path = require('path');

const kBaseDir = path.resolve(__dirname, '..', '..');

module.exports = {
    entry: './src/x/showcase.es6',
    output: {
        filename: './src/x/showcase2.js',
        library: 'inf-ui/x/showcase2',
        libraryTarget: 'amd'
    },
    externals: {
        san: {
            amd: 'san'
        }
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
            'mini-event': path.join(kBaseDir, 'mini-event', '1.0.2', 'src'),
            'promise': path.join(kBaseDir, 'promise', '1.0.2', 'src'),
            'er': path.join(kBaseDir, 'er', '3.1.0-beta.6', 'src'),
            'esui': path.join(kBaseDir, 'esui', '3.1.0-beta.6', 'src'),
            'inf-ria': path.join(kBaseDir, 'inf-ria', '0.0.0', 'src'),
            'inf-i18n': path.join(kBaseDir, 'inf-i18n', '0.0.0', 'src'),
            'inf-ui': path.join(kBaseDir, 'inf-ui', '0.0.0', 'src')
        }
    },
    module: {
        loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // options: {
                //    presets: ['es2015']
                // }
            }
        ]
    }
};










