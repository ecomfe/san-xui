define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([45],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-clipboard.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">
        <xui-icon name="copy" />
    </xui-clipboard>
</x-row>

<x-row label="btns">
    <xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">
        <xui-button>{{clipboard.btnText}}</xui-button>
    </xui-clipboard>

    <xui-clipboard text="Hello World">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="e">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="w">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="n">
        <xui-button icon="copy" />
    </xui-clipboard>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-icon': __WEBPACK_IMPORTED_MODULE_1_san_xui__["p" /* Icon */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-clipboard': __WEBPACK_IMPORTED_MODULE_1_san_xui__["k" /* Clipboard */]
    },
    initData() {
        return {
            clipboard: {
                btnText: '点我复制'
            }
        };
    },
    onAfterCopy() {
        this.data.set('clipboard.btnText', '复制成功');
    }
}));


/***/ })

},[440])});;