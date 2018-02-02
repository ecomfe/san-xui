define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([40],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '\n<template>\n<x-row label="center-to-view=true width=700 auto-hide-except-parent=false">\n<xui-button skin="primary" on-click="onShowLayer">Show Layer</xui-button>\n<xui-layer class="demo-layer" center-to-view="{{true}}" auto-hide-except-parent="{{false}}" open="{=layer.showLayer=}">\n    <x-row label="type=default">\n        <xui-tip><xui-button>Button In Tip</xui-button></xui-tip>\n        <xui-button on-click="closeTheLayer">\u5173\u95ED.</xui-button>\n        <xui-button on-click="openNewLayer">\u6253\u5F00\u4E00\u4E2A\u65B0\u7684Layer.</xui-button>\n        <xui-select multi filter layer-width="300" datasource="{{select.datasource}}" value="{=select.value=}" />\n    </x-row>\n\n    <x-row label="type=text">\n        <xui-textbox placeholder="This is placeholder" value="{=text.value=}" on-enter="onPressEnterOnTextBox" />\n        <xui-textbox disabled placeholder="This is disabled textbox" />\n        Value is: {{text.value}}\n    </x-row>\n\n    <x-row label="type=password">\n        <xui-textbox width="{{100}}" type="password" placeholder="This is placeholder" value="{=password.value=}" />\n        <xui-textbox disabled width="300px" type="password" placeholder="This is disabled textbox" />\n        Password is: {{password.value}}\n    </x-row>\n\n    <x-row label="multiline">\n        <xui-textbox multiline placeholder="This is placeholder" value="{=textarea.value=}" />\n        <xui-textbox multiline disabled placeholder="This is disabled textbox" />\n        Value is: {{textarea.value}}\n    </x-row>\n</xui-layer>\n\n<xui-layer class="demo-layer" auto-hide-except-parent="{{false}}" open="{=layer.showLayer2=}">\n    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />\n    <xui-button on-click="closeTheLayer">\u5173\u95ED\u4E0A\u4E00\u4E2ALayer</xui-button>\n</xui-layer>\n\n</x-row>\n\n<x-row label="follow-scroll=false offset-top=100 offset-left=100" class="layer-test-row">\n<xui-button skin="primary" on-click="openThirdLayer">Show another Layer</xui-button>\n<xui-layer class="demo-layer" follow-scroll="{{false}}" offset-top="{{100}}" offset-left="{{100}}" open="{=layer.showLayer3=}">\n    <x-row label="radio">\n        <xui-boxgroup\n            box-type="radio"\n\n            datasource="{{boxgroup.datasource}}"\n            value="{=boxgroup.radio=}"/>\n        <strong class="large">\n            Value is: {{boxgroup.radio}}\n        </strong>\n\n    </x-row>\n\n    <x-row label="checkbox">\n        <xui-boxgroup\n            box-type="checkbox"\n            datasource="{{boxgroup.datasource}}"\n            value="{=boxgroup.checkbox=}"/>\n        <strong class="large">\n            Value is: {{boxgroup.checkbox}}\n        </strong>\n    </x-row>\n\n    <x-row label="checkbox,col-count=3">\n        <xui-boxgroup\n            box-type="checkbox"\n\n            datasource="{{boxgroup.datasource}}"\n            value="{=boxgroup.checkbox=}"/>\n        <strong class="large">\n            Value is: {{boxgroup.checkbox}}\n        </strong>\n    </x-row>\n\n    <x-row label="\u64CD\u4F5C\u7CFB\u7EDF">\n        <xui-multipicker\n            datasource="{{os.datasource}}"\n            value="{=os.value=}"/>\n        <strong class="large">\n            \u64CD\u4F5C\u7CFB\u7EDF: {{os.value}}\n        </strong>\n    </x-row>\n\n</xui-layer>\n</x-row>\n\n<x-row label="width=300 height=500">\n    <xui-button skin="primary" on-click="openFourthLayer">Show fourth Layer</xui-button>\n    <xui-layer class="demo-layer" width="{{300}}" height="{{500}}" open="{=layer.showLayer4=}">\n        <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />\n    </xui-layer>\n</x-row>\n\n</template>';

/* eslint-enable */

/**
 * @file demos/xui-layer.es6
 * @author chenbo09
 */

function getImages(osType) {
    switch (osType) {
        case 'CentOS':
            return [{ text: '7.1 x86_64 (64bit)', value: 'da93d591-4130-4870-81a9-d84daf9a8c4c' }, { text: '6.8 x86_64 (64bit)', value: 'b8639e78-b3e9-4fa5-b69e-32294b9f4b4b' }, { text: '6.5 x86_64 (64bit)', value: '2b366fe9-63ac-4c63-8c78-516bc5acb950' }, { text: '7.2 x86_64 (64bit)', value: 'bad85757-b6c6-4026-b34c-e7677435c149' }, { text: '6.5 i386 (32bit)', value: '60422670-4389-4026-ae22-b77f2be48210' }];
        case 'Debian':
            return [{ text: '8.1.0 amd64 (64bit)', value: '166df269-54b6-4841-a2c2-4672e0505b82' }, { text: '7.5.0 amd64 (64bit)', value: 'f7369fc5-9419-41c5-833f-28401d87dda3' }];
        case 'Ubuntu':
            return [{ text: '12.04.4 LTS amd64 (64bit)', value: 'ed97a9ef-7b1e-48ec-96ee-c8a01a13e1e5' }, { text: '14.04.1 LTS amd64 (64bit)', value: '3fa6fedb-c62a-4acb-b198-373b0d00e069' }, { text: '16.04 LTS amd64 (64bit)', value: '3c9832ea-3277-4716-926c-925489aa165d' }, { text: '16.04 LTS i386 (32bit)', value: '0cbe2924-1325-4d94-8e96-2989dd0a0aad' }, { text: '14.04.1 LTS i386 (32bit)', value: '1cce752d-fa3c-4af7-8e5d-9e7d3b603c9d' }, { text: '12.04.4 LTS i386 (32bit)', value: '37fcf765-f6fb-43b7-94c9-ee4153b58953' }];
        case 'Windows Server':
            return [{ text: '2008 R2 x86_64 (64bit) 中文版', value: '7beb02e6-5daf-4b5c-b7a0-e68f4bbcc916', disabled: true }, { text: '2012 R2 x86_64 (64bit) 中文版', value: '4af300d1-5dca-4fce-a919-5e25e96ec887' }, { text: '2016 x86_64 (64bit) 中文版', value: 'f30c74f2-07dc-4e1d-a5e6-2d5f03f737cf' }];
        default:
            return [];
    }
}

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-tip': _sanXui.Tip,
        'xui-select': _sanXui.Select,
        'xui-layer': _sanXui.Layer,
        'xui-button': _sanXui.Button,
        'xui-textbox': _sanXui.TextBox,
        'xui-multipicker': _sanXui.MultiPicker,
        'xui-boxgroup': _sanXui.BoxGroup
    },
    initData: function initData() {
        return {
            select: {
                value: 'abc7',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [{ text: 'foo', value: 'foo' }, { text: 'bar', value: 'bar' }, { text: '123', value: '123', disabled: true }, { text: 'abc1', value: 'abc1' }, { text: 'abc2', value: 'abc2' }, { text: 'abc3', value: 'abc3' }, { text: 'abc4', value: 'abc4' }, { text: 'abc5', value: 'abc5' }, { text: 'abc6', value: 'abc6' }, { text: 'abc7', value: 'abc7' }, { text: 'abc8', value: 'abc8' }, { text: 'abc9', value: 'abc9' }, { text: 'abc0', value: 'abc0' }]
            },
            os: {
                value: ['Windows Server', 'f30c74f2-07dc-4e1d-a5e6-2d5f03f737cf'],
                datasource: [{
                    text: 'CentOS',
                    value: 'CentOS',
                    children: getImages('CentOS')
                }, {
                    text: 'Debian',
                    value: 'Debian',
                    children: getImages('Debian')
                }, {
                    text: 'Ubuntu',
                    value: 'Ubuntu',
                    disabled: true,
                    children: getImages('Ubuntu')
                }, {
                    text: 'Windows Server',
                    value: 'Windows Server',
                    children: getImages('Windows Server')
                }]
            },
            boxgroup: {
                datasource: [{ text: 'foo', value: 'foo' }, { text: 'bar', value: 'bar' }, { text: '123', value: '123', disabled: true }, { text: 'abc1', value: 'abc1' }, { text: 'abc2', value: 'abc2' }, { text: 'abc3', value: 'abc3' }, { text: 'abc4', value: 'abc4' }, { text: 'abc5', value: 'abc5' }, { text: 'abc6', value: 'abc6' }, { text: 'abc7', value: 'abc7' }, { text: 'abc8', value: 'abc8' }, { text: 'abc9', value: 'abc9' }, { text: 'abc0', value: 'abc0' }]
            }
        };
    },
    onShowLayer: function onShowLayer() {
        this.data.set('layer.showLayer', true);
    },
    openNewLayer: function openNewLayer() {
        this.data.set('layer.showLayer2', true);
    },
    openThirdLayer: function openThirdLayer() {
        this.data.set('layer.showLayer3', true);
    },
    openFourthLayer: function openFourthLayer() {
        this.data.set('layer.showLayer4', true);
    },
    closeTheLayer: function closeTheLayer() {
        this.data.set('layer.showLayer', false);
    },
    onPressEnterOnTextBox: function onPressEnterOnTextBox() {
        _sanXui.Toast.info('Enter pressed');
    }
});

/***/ })

},[447])});;