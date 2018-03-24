define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([43],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-dialog.js
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]">\n<xui-button skin="primary" on-click="onShowDialog">Show Dialog</xui-button>\n\n<xui-dialog open="{=dialog.showDialog=}">\n    <xui-tip><xui-button>Button In Tip</xui-button></xui-tip>\n    <xui-button on-click="closeTheDialog">\u5173\u95ED.</xui-button>\n    <xui-button on-click="openNewDialog">\u6253\u5F00\u4E00\u4E2A\u65B0\u7684Dialog.</xui-button>\n    <xui-button on-click="showToast">show toast.</xui-button>\n    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />\n</xui-dialog>\n\n<xui-dialog open="{=dialog.showDialog2=}" width="300" foot="{{false}}">\n    <xui-button on-click="closeTheDialog">\u5173\u95ED\u4E0A\u4E00\u4E2ADialog</xui-button>\n</xui-dialog>\n</x-row>\n\n<x-row label="alert,confirm,plain">\n    <xui-button on-click="showAlertDialog">alert</xui-button>\n    <xui-button on-click="showConfirmDialog">confirm</xui-button>\n    <xui-button on-click="showPlainDialog">plain</xui-button>\n</x-row>\n\n<x-row label="AlertDialog">\n    <xui-alert-dialog open="{=alertDialogOpened=}" message="Hello Alert Dialog" />\n    <xui-button on-click="showAlertDialog2">AlertDialog Component</xui-button>\n</x-row>\n\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-tip': _sanXui.Tip,
        'xui-select': _sanXui.Select,
        'xui-dialog': _sanXui.Dialog,
        'xui-alert-dialog': _sanXui.AlertDialog,
        'xui-button': _sanXui.Button
    },
    initData: function initData() {
        return {
            alertDialogOpened: false,
            select: {
                value: 'abc7',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [{ text: 'foo', value: 'foo' }, { text: 'bar', value: 'bar' }, { text: '123', value: '123', disabled: true }, { text: 'abc1', value: 'abc1' }, { text: 'abc2', value: 'abc2' }, { text: 'abc3', value: 'abc3' }, { text: 'abc4', value: 'abc4' }, { text: 'abc5', value: 'abc5' }, { text: 'abc6', value: 'abc6' }, { text: 'abc7', value: 'abc7' }, { text: 'abc8', value: 'abc8' }, { text: 'abc9', value: 'abc9' }, { text: 'abc0', value: 'abc0' }]
            }
        };
    },
    onShowDialog: function onShowDialog() {
        this.data.set('dialog.showDialog', true);
    },
    openNewDialog: function openNewDialog() {
        this.data.set('dialog.showDialog2', true);
    },
    closeTheDialog: function closeTheDialog() {
        this.data.set('dialog.showDialog', false);
    },
    showAlertDialog2: function showAlertDialog2() {
        this.data.set('alertDialogOpened', true);
    },
    showAlertDialog: function showAlertDialog() {
        (0, _sanXui.alert)({ message: 'Alert dialog (w=500)' }).then(function () {
            return _sanXui.Toast.success('OK');
        });
    },
    showConfirmDialog: function showConfirmDialog() {
        (0, _sanXui.confirm)({ message: 'Confirm dialog (w=400)', width: 400 }).then(function () {
            return _sanXui.Toast.success('OK');
        }).catch(function () {
            return _sanXui.Toast.warning('Canceled');
        });
    },
    showPlainDialog: function showPlainDialog() {
        (0, _sanXui.plain)({ message: 'Plain dialog (w=500)' }).then(function () {
            return _sanXui.Toast.success('OK');
        });
    },
    showToast: function showToast() {
        _sanXui.Toast.success('ok');
    }
});

/***/ })

},[406])});;