define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([12],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-viewstep.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-viewstep
        steps="{{steps}}" />
</x-row>

<x-row label="step-index=3">
    <xui-viewstep
        step-index="{{3}}"
        steps="{{steps}}" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-viewstep': __WEBPACK_IMPORTED_MODULE_1_san_xui__["T" /* ViewStep */]
    },
    initData() {
        return {
            steps: [
                {text: '选择云服务器'},
                {text: '确认订单'},
                {text: '在线支付'},
                {text: '支付成功'}
            ]
        };
    }
}));


/***/ })

},[484])});;