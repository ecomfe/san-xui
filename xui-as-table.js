define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([54],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-as-table.es6
 * @author leeight
 */






const kTableColumns = [
    {name: 'name', label: '姓名', labelClassName: 'col-name'},
    {name: 'age', label: '年龄', sortable: true},
    {name: 'gender', label: '性别', sortable: true}
];

const template = `
<template>

<xui-toastlabel>
项目中的真实案例，请参考：<a target="_blank" href="http://icode.baidu.com/repos/baidu/bce-multimedia/face-demo/tree/master:fe_source/src/face/v3/">face-demo</a>
</xui-toastlabel>

<x-row label="[default]">
    <xui-table
        select="multi"
        datasource="{{table.datasource}}"
        schema="{{table.schema}}"
        on-selected-change="onTableRowSelected($event)"
    >
        <div slot="c-age">
            {{row.age}}
            <xui-tip message="{{row.name}} 的年龄是：{{row.age}}" />
        </div>
        <div slot="c-gender"><xui-button on-click="incAge(rowIndex)">{{row.gender}}, CLICK TO INC THE AGE</xui-button></div>
    <xui-table>
</x-row>

</template>
`;

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-tip': __WEBPACK_IMPORTED_MODULE_1_san_xui__["O" /* Tip */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-table': __WEBPACK_IMPORTED_MODULE_1_san_xui__["L" /* Table */]
    },
    onTableRowSelected() {
        __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */].info('Table row selected');
    },
    initData() {
        return {
            table: {
                schema: kTableColumns,
                datasource: [
                    {name: 'foo', age: 10, gender: 'M'},
                    {name: 'bar', age: 20, gender: 'F', xui__disabled: true},
                    {name: 'xxx', age: 20, gender: '未知'}
                ]
            }
        };
    },
    incAge(rowIndex) {
        const key = `table.datasource[${rowIndex}].age`;
        const age = this.data.get(key);
        this.data.set(key, age + 10);
    }
}));


/***/ })

},[392])});;