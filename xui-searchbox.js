define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([26],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-searchbox.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-searchbox />
</x-row>
<x-row label="[default],datasource">
    <xui-searchbox
        value="{=searchbox.keyword=}"
        keyword-type="{=searchbox.keywordType=}"
        datasource="{{searchbox.keywordTypes}}"
        />
    <strong class="large">
    Keyword Type: {{searchbox.keywordType}}, Keyword: {{searchbox.keyword}}
    </strong>
</x-row>
<x-row label="disabled">
    <xui-searchbox disabled />
</x-row>
<x-row label="search-btn=false">
    <xui-searchbox search-btn="{{false}}" />
    <xui-button icon="refresh" />
    <xui-button icon="download" />
</x-row>
<x-row label="placeholder=请输入实例名称进行搜索">
    <xui-searchbox placeholder="请输入实例名称进行搜索" />
    <xui-button icon="refresh" />
    <xui-button icon="download" />
</x-row>
<x-row label="width=100,placeholder=请输入实例名称进行搜索">
    <xui-searchbox
        width="100"
        placeholder="请输入实例名称进行搜索"
        value="{=searchbox.keyword=}"
        keyword-type="{=searchbox.keywordType=}"
        datasource="{{searchbox.keywordTypes}}"
    />
    <xui-checkbox title="过滤0元账单" />
    <xui-button icon="refresh" />
    <xui-button icon="download" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-radiobox': __WEBPACK_IMPORTED_MODULE_1_san_xui__["z" /* RadioBox */],
        'xui-checkbox': __WEBPACK_IMPORTED_MODULE_1_san_xui__["j" /* CheckBox */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-searchbox': __WEBPACK_IMPORTED_MODULE_1_san_xui__["E" /* SearchBox */]
    },
    initData() {
        return {
            searchbox: {
                keyword: '',
                keywordType: 'ID',
                keywordTypes: [
                    {text: '实例名称', value: 'NAME'},
                    {text: '实例ID', value: 'ID'}
                ]
            }
        };
    }
}));


/***/ })

},[468])});;