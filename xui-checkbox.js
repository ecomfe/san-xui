define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([47],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-checkbox.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="checked=true">
    <xui-checkbox checked="{=checkbox.checked=}" title="the label" />
    <xui-switch checked="{=checkbox.checked=}" />
    <xui-radiobox checked="{=checkbox.checked=}" title="the radiobox label" />
</x-row>
<x-row label="[default]checked=false">
    <xui-checkbox />
    <xui-checkbox disabled />
    <xui-radiobox disabled />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_1_san_xui__["H" /* Switch */],
        'xui-radiobox': __WEBPACK_IMPORTED_MODULE_1_san_xui__["z" /* RadioBox */],
        'xui-checkbox': __WEBPACK_IMPORTED_MODULE_1_san_xui__["j" /* CheckBox */]
    },
    initData() {
        return {
            checkbox: {
                checked: true
            }
        };
    }
}));


/***/ })

},[438])});;