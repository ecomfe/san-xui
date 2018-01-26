## san-xui

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
npm i --save-dev babel-loader css-loader style-loader less-loader less file-loader
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
        extensions: ['.js', '.jsx', '.es6'],
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
            }
        ],
        loaders: [
            {
                test: /\.(js|es6)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    },
    ...
}
```