define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([16],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/**
 * @file demos/xui-toast.es6
 * @author leeight
 */




/* eslint-disable */
const template = `<template>
<xui-button on-click="showToast('success')">Show Success Toast</xui-button>
<xui-button on-click="showToast('info')">Show Info Toast</xui-button>
<xui-button on-click="showToast('warning')">Show Warning Toast</xui-button>
<xui-button on-click="showToast('error')">Show Error Toast</xui-button>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-toast': __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */]
    },
    initData() {
        return {
        };
    },
    showToast(level) {
        if (typeof __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */][level] === 'function') {
            const message = 'This is a toast message';
            __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */][level](message);
        }
        else {
            alert('Unsupported toast level = ' + level);
        }
    }
}));


/***/ })

},[466])});;