define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([15],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_i18n__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-toastlabel.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<x-row label="[default]level=alert">
    <xui-toastlabel text="hello toastlabel" />
</x-row>
<x-row label="level=normal">
    <xui-toastlabel text="{{'预付费'| i18n}} i18n" level="normal" />
</x-row>
<x-row label="level=error">
    <xui-toastlabel text="{{aaa}}, i18n" level="error" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_2_san_xui__["Q" /* ToastLabel */]
    },
    initData() {
        return {
            aaa: Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["a" /* default */])('预付费')
        };
    }
}));


/***/ })

},[467])});;