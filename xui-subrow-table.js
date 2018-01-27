define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([22],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-subrow-table.es6
 * @author huangyunzhi(huangyunzhi@baidu.com)
 */








const kTableColumns = [
    {name: 'name', label: '姓名', labelClassName: 'col-name'},
    {name: 'age', label: '年龄', sortable: true},
    {name: 'gender', label: '性别', sortable: true}
];

const template = `
<template>

<xui-toastlabel>
    有时候后端为了性能不会把subrow的内容一次性给出，所以提供了on-subrow-expand方法和on-subrow-collapse方法，可以在每次展开时请求数据从而提升体验
</xui-toastlabel>

<x-row label="[default]">
    <xui-table
        datasource="{{table.datasource}}"
        hasSubrow="{{table.hasSubrow}}"
        on-subrow-expand="onSubrowExpand"
        expandedIndex="{=_table1ExpandedIndex=}"
        on-subrow-collapse="onSubrowCollapse"
        schema="{{table.schema}}"
    >
        <div slot="sub-foo" class="subrow-content-row">
            <xui-table
                datasource="{{table.datasource}}"
                schema="{{table.schema}}"
                hasSubrow="{{table.hasSubrow}}"
            >
                <div slot="c-gender">
                    <xui-button on-click="incAge(rowIndex)">{{row.gender}}, CLICK TO INC THE AGE</xui-button>
                </div>
            </xui-table>
        </div>
        <div slot="sub-bar">
            <div class="ui-table-subrow">
                <div class="row">姓名：{{row.name}}</div>
                <div class="row">年龄：{{row.age}}</div>
                <div class="row">性别：{{row.gender}}</div>
                <div class="row">爱好：{{subrow.like}}</div>
                <div class="row">技能：{{subrow.skills}}</div>
            </div>
        </div> 
        <div slot="sub-xxx">
            <div class="ui-table-subrow">
                <xui-loading s-if="row.xui__loading"></xui-loading>
                <strong s-else class="large">
                    This row.subrowData is: {{row.subrowData}}!
                </strong>
            </div>
        </div>
    </xui-table>
</x-row>

<x-row label="[select=multi hasSubrow=true]">
    <xui-table
        datasource="{{table.datasource}}"
        hasSubrow="{{table.hasSubrow}}"
        select="{{table.select}}"
        expandedIndex="{=table.expandedIndex=}"
        on-selected-change="onSelectedChange"
        schema="{{table.schema}}"
    >
        <div slot="c-name" on-click="onClick(rowIndex)">{{row.name}}</div>
        <div slot="sub-foo" class="subrow-content-row">
            <div class="ui-table-subrow">
                <strong class="large">The selectedIndex is {{selectedIndex}}</strong>
            </div>
        </div>
    </xui-table>
</x-row>

</template>
`;

function delay(payload, ms) {
    return new __WEBPACK_IMPORTED_MODULE_1_promise___default.a(resolve => setTimeout(() => resolve(payload), ms));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_4__Row__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_3_san_xui__["Q" /* ToastLabel */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_3_san_xui__["e" /* Button */],
        'xui-table': __WEBPACK_IMPORTED_MODULE_3_san_xui__["L" /* Table */],
        'xui-loading': __WEBPACK_IMPORTED_MODULE_3_san_xui__["t" /* Loading */]
    },
    filters: {
        stringify(value) {
            return JSON.stringify(value);
        }
    },
    initData() {
        return {
            table: {
                schema: kTableColumns,
                hasSubrow: true,
                expandedIndex: [0],
                select: 'multi',
                datasource: [
                    {name: 'foo', age: 10, gender: 'M'},
                    {name: 'bar', age: 20, gender: 'F', subrow: {like: '写代码', skills: ['javascript', 'er', 'san']}},
                    {name: 'xxx', age: 20, gender: '未知'}
                ]
            },
            _table1ExpandedIndex: [0],
            selectedIndex: []
        };
    },
    incAge(rowIndex) {
        const key = `table.datasource[${rowIndex}].age`;
        const age = this.data.get(key);
        this.data.set(key, age + 10);
    },
    onSubrowExpand({rowIndex}) {
        __WEBPACK_IMPORTED_MODULE_3_san_xui__["P" /* Toast */].success('Expand Subrow!');
        if (rowIndex === 2) {
            this.data.set(`table.datasource[${rowIndex}].xui__loading`, true);
            delay(rowIndex, 2000).then(data => {
                this.data.set(`table.datasource[${rowIndex}].xui__loading`, false);
                this.data.set(`table.datasource[${rowIndex}].subrowData`, data);
            });
        }
    },
    onSubrowCollapse({rowIndex}) {
        __WEBPACK_IMPORTED_MODULE_3_san_xui__["P" /* Toast */].success(`Collapse ${rowIndex}th Subrow!`);
    },
    onSelectedChange(e) {
        __WEBPACK_IMPORTED_MODULE_3_san_xui__["P" /* Toast */].success('Open the subrow and see change!');
        this.data.set('selectedIndex', e.selectedIndex);
    },
    onClick(rowIndex) {
        const expandedIndex = this.data.get('table.expandedIndex');
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.indexOf(expandedIndex, rowIndex) > -1
            ? this.data.remove('table.expandedIndex', rowIndex)
            : this.data.push('table.expandedIndex', rowIndex);
    }
}));


/***/ })

},[460])});;