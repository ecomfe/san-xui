define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([52],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-boxgroup.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="radio">
    <xui-boxgroup
        box-type="radio"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.radio=}"
        />
    <strong class="large">
    Value is: {{boxgroup.radio | stringify}}
    </strong>
</x-row>

<x-row label="checkbox">
    <xui-boxgroup
        box-type="checkbox"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.checkbox=}"
        />
    <strong class="large">
    Value is: {{boxgroup.checkbox | stringify}}
    </strong>
</x-row>

<x-row label="checkbox,col-count=3,item-width=100">
    <xui-boxgroup
        box-type="checkbox"
        col-count="{{3}}"
        item-width="{{100}}"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.checkbox=}"
        />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-boxgroup': __WEBPACK_IMPORTED_MODULE_1_san_xui__["d" /* BoxGroup */]
    },
    filters: {
        stringify(value) {
            return JSON.stringify(value);
        }
    },
    initData() {
        return {
            boxgroup: {
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'number 1', value: 1},
                    {text: 'string \'1\'', value: '1'},
                    {text: 'number 2', value: 2},
                    {text: 'string \'2\'', value: '2'},
                    {text: 'bool true', value: true},
                    {text: 'bool false', value: false},
                    {text: 'object 1', value: {foo: 1}},
                    {text: 'object 2', value: {bar: 1}},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            }
        };
    }
}));


/***/ })

},[432])});;