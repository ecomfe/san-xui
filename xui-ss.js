define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([23],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-ss.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-ss style="{{myStyle}}">
        这个容器，滚动到底部，不会影响页面
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </xui-ss>

    <div style="{{myStyle}}">
        这个容器，滚动到底部，页面开始滚动
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-ss': __WEBPACK_IMPORTED_MODULE_1_san_xui__["G" /* StopScroll */]
    },
    initData() {
        return {
            myStyle: {
                'display': 'inline-block',
                'margin-right': '10px',
                'width': '150px',
                'height': '50px',
                'overflow': 'hidden',
                'border': '1px solid #000',
                'overflow-y': 'auto'
            }
        };
    }
}));



/***/ })

},[459])});;