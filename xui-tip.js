define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([17],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-tip.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<xui-toastlabel>esui里面的实现方案</xui-toastlabel>
<x-row label="position=lt">
    <xui-tip message="hello world" />
    <xui-tip><xui-button>Button In Tip</xui-button></xui-tip>
    <xui-tip><xui-monthview /></xui-tip>
</x-row>
<x-row label="position=tc">
    <xui-tip message="hello world" position="tc" />
</x-row>
<x-row label="position=rt">
    <xui-tip message="hello world" position="rt" />
</x-row>
<x-row label="position=bc">
    <xui-tip message="hello world" position="bc" />
</x-row>

<xui-toastlabel>新的实现方案，1: 需要避免 overflow: hidden，否则可能没效果 2: 通过 aria-label 来设置 tip 的内容</xui-toastlabel>
<x-row label="tooltipped,aria-label">
    <xui-button
        class="tooltipped tooltipped-s"
        aria-label="THIS THE TOOLTIPPED CONTENT"
        >tooltipped,tooltipped-s</xui-button>

    <xui-button
        class="tooltipped tooltipped-e"
        aria-label="THIS THE TOOLTIPPED CONTENT"
        >tooltipped,tooltipped-e</xui-button>

    <xui-button
        class="tooltipped tooltipped-n"
        aria-label="THIS THE TOOLTIPPED CONTENT"
        >tooltipped,tooltipped-n</xui-button>

    <xui-button
        class="tooltipped tooltipped-w"
        aria-label="THIS THE TOOLTIPPED CONTENT"
        >tooltipped,tooltipped-w</xui-button>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-monthview': __WEBPACK_IMPORTED_MODULE_1_san_xui__["u" /* MonthView */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */],
        'xui-tip': __WEBPACK_IMPORTED_MODULE_1_san_xui__["O" /* Tip */]
    },
    initData() {
        return {
        };
    }
}));


/***/ })

},[465])});;