define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([53],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/**
 * @file demos/xui-as-table.js
 * @author leeight
 */

var kTableColumns = [{ name: 'name', label: '姓名', labelClassName: 'col-name' }, { name: 'age', label: '年龄', sortable: true }, { name: 'gender', label: '性别', sortable: true }];

var template = '\n<template>\n\n<xui-toastlabel>\n\u9879\u76EE\u4E2D\u7684\u771F\u5B9E\u6848\u4F8B\uFF0C\u8BF7\u53C2\u8003\uFF1A<a target="_blank" href="http://icode.baidu.com/repos/baidu/bce-multimedia/face-demo/tree/master:fe_source/src/face/v3/">face-demo</a>\n</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-table\n        select="multi"\n        datasource="{{table.datasource}}"\n        schema="{{table.schema}}"\n        on-selected-change="onTableRowSelected($event)"\n    >\n        <div slot="c-age">\n            {{row.age}}\n            <xui-tip message="{{row.name}} \u7684\u5E74\u9F84\u662F\uFF1A{{row.age}}" />\n        </div>\n        <div slot="c-gender"><xui-button on-click="incAge(rowIndex)">{{row.gender}}, CLICK TO INC THE AGE</xui-button></div>\n    <xui-table>\n</x-row>\n\n</template>\n';

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-tip': _sanXui.Tip,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-button': _sanXui.Button,
        'xui-table': _sanXui.Table
    },
    onTableRowSelected: function onTableRowSelected() {
        _sanXui.Toast.info('Table row selected');
    },
    initData: function initData() {
        return {
            table: {
                schema: kTableColumns,
                datasource: [{ name: 'foo', age: 10, gender: 'M' }, { name: 'bar', age: 20, gender: 'F', xui__disabled: true }, { name: 'xxx', age: 20, gender: '未知' }]
            }
        };
    },
    incAge: function incAge(rowIndex) {
        var key = 'table.datasource[' + rowIndex + '].age';
        var age = this.data.get(key);
        this.data.set(key, age + 10);
    }
});

/***/ })

},[395])});;