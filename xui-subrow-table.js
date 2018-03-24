define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([17],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(4);

var _lodash2 = _interopRequireDefault(_lodash);

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kTableColumns = [{ name: 'name', label: '姓名', labelClassName: 'col-name' }, { name: 'age', label: '年龄', sortable: true }, { name: 'gender', label: '性别', sortable: true }]; /**
                                                                                                                                                                                 * @file demos/xui-subrow-table.js
                                                                                                                                                                                 * @author huangyunzhi(huangyunzhi@baidu.com)
                                                                                                                                                                                 */

var template = '\n<template>\n\n<xui-toastlabel>\n    \u6709\u65F6\u5019\u540E\u7AEF\u4E3A\u4E86\u6027\u80FD\u4E0D\u4F1A\u628Asubrow\u7684\u5185\u5BB9\u4E00\u6B21\u6027\u7ED9\u51FA\uFF0C\u6240\u4EE5\u63D0\u4F9B\u4E86on-subrow-expand\u65B9\u6CD5\u548Con-subrow-collapse\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u5728\u6BCF\u6B21\u5C55\u5F00\u65F6\u8BF7\u6C42\u6570\u636E\u4ECE\u800C\u63D0\u5347\u4F53\u9A8C\n</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-table\n        datasource="{{table.datasource}}"\n        hasSubrow="{{table.hasSubrow}}"\n        on-subrow-expand="onSubrowExpand"\n        expandedIndex="{=_table1ExpandedIndex=}"\n        on-subrow-collapse="onSubrowCollapse"\n        schema="{{table.schema}}"\n    >\n        <div slot="sub-foo" class="subrow-content-row">\n            <xui-table\n                datasource="{{table.datasource}}"\n                schema="{{table.schema}}"\n                hasSubrow="{{table.hasSubrow}}"\n            >\n                <div slot="c-gender">\n                    <xui-button on-click="incAge(rowIndex)">{{row.gender}}, CLICK TO INC THE AGE</xui-button>\n                </div>\n            </xui-table>\n        </div>\n        <div slot="sub-bar">\n            <div class="ui-table-subrow">\n                <div class="row">\u59D3\u540D\uFF1A{{row.name}}</div>\n                <div class="row">\u5E74\u9F84\uFF1A{{row.age}}</div>\n                <div class="row">\u6027\u522B\uFF1A{{row.gender}}</div>\n                <div class="row">\u7231\u597D\uFF1A{{subrow.like}}</div>\n                <div class="row">\u6280\u80FD\uFF1A{{subrow.skills}}</div>\n            </div>\n        </div> \n        <div slot="sub-xxx">\n            <div class="ui-table-subrow">\n                <xui-loading s-if="row.xui__loading"></xui-loading>\n                <strong s-else class="large">\n                    This row.subrowData is: {{row.subrowData}}!\n                </strong>\n            </div>\n        </div>\n    </xui-table>\n</x-row>\n\n<x-row label="[select=multi hasSubrow=true]">\n    <xui-table\n        datasource="{{table.datasource}}"\n        hasSubrow="{{table.hasSubrow}}"\n        select="{{table.select}}"\n        expandedIndex="{=table.expandedIndex=}"\n        on-selected-change="onSelectedChange"\n        schema="{{table.schema}}"\n    >\n        <div slot="c-name" on-click="onClick(rowIndex)">{{row.name}}</div>\n        <div slot="sub-foo" class="subrow-content-row">\n            <div class="ui-table-subrow">\n                <strong class="large">The selectedIndex is {{selectedIndex}}</strong>\n            </div>\n        </div>\n    </xui-table>\n</x-row>\n\n</template>\n';

function delay(payload, ms) {
    return new Promise(function (resolve) {
        return setTimeout(function () {
            return resolve(payload);
        }, ms);
    });
}

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-button': _sanXui.Button,
        'xui-table': _sanXui.Table,
        'xui-loading': _sanXui.Loading
    },
    filters: {
        stringify: function stringify(value) {
            return JSON.stringify(value);
        }
    },
    initData: function initData() {
        return {
            table: {
                schema: kTableColumns,
                hasSubrow: true,
                expandedIndex: [0],
                select: 'multi',
                datasource: [{ name: 'foo', age: 10, gender: 'M' }, { name: 'bar', age: 20, gender: 'F', subrow: { like: '写代码', skills: ['javascript', 'er', 'san'] } }, { name: 'xxx', age: 20, gender: '未知' }]
            },
            _table1ExpandedIndex: [0],
            selectedIndex: []
        };
    },
    incAge: function incAge(rowIndex) {
        var key = 'table.datasource[' + rowIndex + '].age';
        var age = this.data.get(key);
        this.data.set(key, age + 10);
    },
    onSubrowExpand: function onSubrowExpand(_ref) {
        var _this = this;

        var rowIndex = _ref.rowIndex;

        _sanXui.Toast.success('Expand Subrow!');
        if (rowIndex === 2) {
            this.data.set('table.datasource[' + rowIndex + '].xui__loading', true);
            delay(rowIndex, 2000).then(function (data) {
                _this.data.set('table.datasource[' + rowIndex + '].xui__loading', false);
                _this.data.set('table.datasource[' + rowIndex + '].subrowData', data);
            });
        }
    },
    onSubrowCollapse: function onSubrowCollapse(_ref2) {
        var rowIndex = _ref2.rowIndex;

        _sanXui.Toast.success('Collapse ' + rowIndex + 'th Subrow!');
    },
    onSelectedChange: function onSelectedChange(e) {
        _sanXui.Toast.success('Open the subrow and see change!');
        this.data.set('selectedIndex', e.selectedIndex);
    },
    onClick: function onClick(rowIndex) {
        var expandedIndex = this.data.get('table.expandedIndex');
        _lodash2.default.indexOf(expandedIndex, rowIndex) > -1 ? this.data.remove('table.expandedIndex', rowIndex) : this.data.push('table.expandedIndex', rowIndex);
    }
});

/***/ })

},[436])});;