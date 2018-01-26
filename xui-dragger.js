define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([44],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-dragger.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-dragger max="{{200}}" value="{{35}}" unit="Mbps" />
</x-row>
<x-row label="min=0,max=1,step=0.01">
    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.01}}" />
</x-row>
<x-row label="min=0,max=1,step=0.2">
    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.2}}" />
</x-row>
<x-row label="length=500,max=300,value=135">
    <xui-dragger length="{{500}}" max="{{300}}" value="{{135}}" unit="Mbps" />
</x-row>
<x-row label="disabled">
    <xui-dragger disabled unit="Mbps" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-dragger': __WEBPACK_IMPORTED_MODULE_1_san_xui__["m" /* Dragger */]
    },
    initData() {
        return {
        };
    }
}));


/***/ })

},[442])});;