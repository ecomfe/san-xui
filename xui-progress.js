define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([32],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-progress.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default],value=20">
    <xui-progress value="{{20}}" />
</x-row>
<x-row label="value=50,width=300">
    <xui-progress value="{{50}}" width="{{300}}" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-progress': __WEBPACK_IMPORTED_MODULE_1_san_xui__["y" /* Progress */]
    },
    initData() {
        return {
        };
    }
}));


/***/ })

},[448])});;