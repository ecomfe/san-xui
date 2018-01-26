define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui_x_biz_RightToolbar__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-right-toolbar.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成工具栏(Toolbar)区域的组件。当前支持的类型：button, button-group, link, divider</xui-toastlabel>

<x-row label="[default]">
    <div>
    显示搜索框：<xui-switch checked="{=withSearchbox=}" />
    显示自定义列：<xui-switch checked="{=withTct=}" />
    </div>
    <hr />
    <xui-right-toolbar
        loading="{{disabled}}"

        with-searchbox="{{withSearchbox}}"
        searchbox-value="{{searchboxValue}}"
        searchbox-keyword-type="{{searchboxKeywordType}}"
        searchbox-placeholder="{{searchboxPlaceholder}}"
        searchbox-keyword-types="{{searchboxKeywordTypes}}"

        with-tct="{{withTct}}"
        tct-value="{{tctValue}}"
        tct-datasource="{{tctDatasource}}"

        on-search="onSearch"
        on-refresh="onRefresh"
        on-table-columns-changed="onTableColumnsChanged"
    />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_2_san_xui__["H" /* Switch */],
        'xui-right-toolbar': __WEBPACK_IMPORTED_MODULE_1_san_xui_x_biz_RightToolbar__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_2_san_xui__["Q" /* ToastLabel */]
    },
    initData() {
        return {
            withSearchbox: true,
            searchboxValue: '默认值',
            searchboxPlaceholder: 'searchboxPlaceholder',
            searchboxKeywordType: 'FOO',
            searchboxKeywordTypes: [
                {text: '--BAR--', value: 'BAR'},
                {text: '--FOO--', value: 'FOO'}
            ],
            withTct: true,
            tctValue: ['name', 'age', 'gender'],
            tctDatasource: [
                {text: '姓名', value: 'name'},
                {text: '年龄', value: 'age'},
                {text: '性别', value: 'gender'}
            ]
        };
    },
    onSearch() {
        __WEBPACK_IMPORTED_MODULE_2_san_xui__["P" /* Toast */].normal('onSearch');
    },
    onRefresh() {
        __WEBPACK_IMPORTED_MODULE_2_san_xui__["P" /* Toast */].normal('onRefresh');
    },
    onTableColumnsChanged() {
        __WEBPACK_IMPORTED_MODULE_2_san_xui__["P" /* Toast */].normal('onTableColumnsChanged');
    }
}));


/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_TableColumnToggle__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_SearchBox__ = __webpack_require__(44);
/**
 * 右侧工具条的区域，包括 SearchBox, RefreshButton, 自定义表格列的按钮
 *
 * @file san-xui/x/biz/RightToolbar.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<ui-searchbox
    s-if="withSearchbox"
    value="{=searchboxValue=}"
    keyword-type="{=searchboxKeywordType=}"
    placeholder="{{searchboxPlaceholder}}"
    datasource="{{searchboxKeywordTypes}}"
    on-search="onSearch"
/>

<ui-button disabled="{{loading}}" on-click="onRefresh" icon="refresh" />

<ui-table-column-toggle
    s-if="withTct"
    on-change="onTableColumnsChanged"
    layer-align="right"
    layer-offset-left="{{0}}"
    value="{=tctValue=}"
    datasource="{{tctDatasource}}"
    />
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-table-column-toggle': __WEBPACK_IMPORTED_MODULE_1__components_TableColumnToggle__["a" /* default */],
        'ui-searchbox': __WEBPACK_IMPORTED_MODULE_2__components_SearchBox__["a" /* default */]
    },
    dataTypes: {
        loading: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        withSearchbox: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,
        searchboxValue: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].any,
        searchboxKeywordType: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,
        searchboxPlaceholder: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,
        searchboxKeywordTypes: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].array,

        withTct: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,
        tctValue: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].any,
        tctDatasource: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].array
    },
    onSearch() {
        this.fire('search');
    },
    onRefresh() {
        this.fire('refresh');
    },
    onTableColumnsChanged() {
        this.fire('table-columns-changed');
    }
}));


/***/ })

},[466])});;