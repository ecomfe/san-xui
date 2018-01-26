define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([34],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-numbertextline.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>

<x-row label="[default]">
    <xui-numbertextline value="{=value=}" />
    <strong class="large">Value: {{value}}</strong>
</x-row>

<x-row label="[default],min=70,max=100">
    <xui-numbertextline min="{{70}}" max="{{100}}" value="{=value=}" />
    <strong class="large">Value: {{value}}</strong>
</x-row>

<x-row label="[default],min=-0.5,max=2,step=0.1">
    <xui-numbertextline min="{{-0.5}}" max="{{2}}" step="{{0.1}}" value="{=value2=}" />
    <strong class="large">Value: {{value2}}</strong>
</x-row>

<x-row label="disabled">
    <xui-numbertextline disabled max="{{10}}" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-numbertextline': __WEBPACK_IMPORTED_MODULE_1_san_xui__["w" /* NumberTextline */]
    },
    initData() {
        return {
            value: '80',
            value2: '1'
        };
    }
}));


/***/ })

},[458])});;