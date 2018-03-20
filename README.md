## san-xui

[![](https://img.shields.io/travis/ecomfe/san-xui.svg?style=flat-square)](https://travis-ci.org/ecomfe/san-xui)
[![Codecov](https://img.shields.io/codecov/c/github/ecomfe/san-xui/master.svg?style=flat-square)](https://codecov.io/gh/ecomfe/san-xui/branch/master)
[![Dependency Status](https://img.shields.io/gemnasium/react-component/trigger.svg?style=flat-square)](https://gemnasium.com/ecomfe/san-xui)
[![npm package](https://img.shields.io/npm/v/san-xui.svg?style=flat-square)](https://www.npmjs.org/package/san-xui)
[![NPM downloads](http://img.shields.io/npm/dm/san-xui.svg?style=flat-square)](https://npmjs.org/package/san-xui)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/ecomfe/san-xui.svg)](http://isitmaintained.com/project/ecomfe/san-xui "Percentage of issues still open")

[san-xui](http://ecomfe.github.io/san-xui/) 是基于 [san](http://ecomfe.github.io/san/) 开发的一套UI组件库，在[百度云的控制台](https://console.bce.baidu.com)中得到了广泛的应用。

## 下载

NPM:

```
npm i --save san-xui
```

## 使用

### Webpack

通过 named import 导入所需要使用的组件

```js
import 'san-xui/dist/xui.css';
import {defineComponent} from 'san';
import {Button} from 'san-xui';

// 引入单个的组件
import Button from 'san-xui/lib/x/components/Button';

const App = defineComponent({
    template: `<template><ui-button>Hello san-xui</ui-button></template>`,
    components: {
        'ui-button': Button
    }
});
const app = new App();
app.attach(document.body);
```

### webpack.config.js

需要安装必要的一些插件

```
npm i --save-dev babel-loader css-loader style-loader less-loader less file-loader babel-preset-stage-0 babel-preset-env
```

然后补充上一些相关的配置

```js
const path = require('path');

function alias(name) {
    return path.dirname(require.resolve(name));
}

module.exports = {
    ...
    resolve: {
        mainFiles: ['index', 'main'],
        alias: {
            'eoo': alias('@ecomfe/eoo'),
            'mini-event': alias('@ecomfe/mini-event'),
            'er': alias('@ecomfe/er'),
            'inf-ria': alias('@ecomfe/inf-ria'),
            'inf-i18n': alias('@ecomfe/inf-i18n')
        }
    },
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
                            paths: []
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
    },
    ...
}
```
