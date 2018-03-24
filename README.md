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

### AMD

这里使用的是 [esl](https://github.com/ecomfe/esl) 作为 AMD Loader，使用之前需要配置一下 paths 和 packages，如下：

```html
<script src="https://cdn.bdstatic.com/ecom/esl/2.2.0-rc.2/esl.js"></script>
<script>
require.config({
  paths: {
    san: "https://cdn.bdstatic.com/san/3.5.1-rc.1/san",
    jquery: "https://unpkg.com/jquery@3.3.1/dist/jquery",
    humanize: "https://unpkg.com/humanize@0.0.9/humanize",
    lodash: "https://unpkg.com/lodash@4.17.5/lodash",
    moment: "https://unpkg.com/moment@2.21.0/moment",
    axios: "https://unpkg.com/axios@0.18.0/dist/axios",
    clipboard: "https://unpkg.com/clipboard@2.0.0/dist/clipboard",
    "async-validator": "https://cdn.bdstatic.com/console/async-validator/0.0.0/async-validator.bundle",
    "big.js": "https://unpkg.com/big.js@5.0.3/big"
  },
  packages: [
    {
      name: "san-xui",
      location: "https://unpkg.com/san-xui@0.2.0/lib",
      main: "index"
    }
  ]
});
</script>
```

引入所需要的样式代码：

```html
<link rel="stylesheet" type="text/css" href="https://cdn.bdstatic.com/iconfont/iconfont.css" />
<link rel="stylesheet" type="text/css" href="https://unpkg.com/san-xui@0.2.0/dist/xui.css" />
```

最后是应用的代码：

```js
define(function(require) {
  const san = require("san");
  const { Button, alert } = require("san-xui");

  const App = san.defineComponent({
    template: `<template><ui-button on-click="onBtnClick">Hello san-xui</ui-button></template>`,
    components: {
      "ui-button": Button
    },
    onBtnClick() {
      alert("Button clicked");
    }
  });

  function start() {
    const app = new App();
    app.attach(document.getElementById("root"));
  }

  return { start };
});
```

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
        mainFiles: ['index', 'main']
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
