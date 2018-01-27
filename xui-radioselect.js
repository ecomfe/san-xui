define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([31],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-radioselect.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-radioselect
        value="{=radioselect.value=}"
        datasource="{{radioselect.datasource}}" />
    <strong class="large">
        Value is: {{radioselect.value}}
    </strong>
</x-row>

<x-row label="disabled">
    <xui-radioselect
        disabled
        value="{=radioselect.value=}"
        datasource="{{radioselect.datasource}}" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-radioselect': __WEBPACK_IMPORTED_MODULE_1_san_xui__["A" /* RadioSelect */]
    },
    initData() {
        return {
            radioselect: {
                value: 'abc1',
                datasource: [
                    {text: '1个月', value: 'foo'},
                    {text: '2', value: 'bar'},
                    {text: '3', value: '123', disabled: true},
                    {text: '4', value: 'abc1'},
                    {text: '5', value: 'abc6'},
                    {text: '6', value: 'abc7'},
                    {text: '1年', value: 'abc8', tip: '注：购买1年8.3折'},
                    {text: '2年', value: 'abc9', tip: '注：购买2年7.5折'},
                    {text: '3年', value: 'abc0', tip: '注：购买3年5折'}
                ]
            }
        };
    }
}));


/***/ })

},[449])});;