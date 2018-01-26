define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([21],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/**
 * @file demos/xui-switch.es6
 * @author leeight
 */




/* eslint-disable */
const template = `<template>
<xui-switch checked="{=switch.checked=}" />
<xui-switch checked="{{false}}" />
<xui-switch checked="{{false}}" disabled />
<xui-button disabled="{{!switch.checked}}">Hello xui-switch</xui-button>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_1_san_xui__["H" /* Switch */]
    },
    initData() {
        return {
            'switch': {
                checked: true
            }
        };
    }
}));


/***/ })

},[473])});;