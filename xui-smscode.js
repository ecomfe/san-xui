define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([24],{

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
/**
 * @file demos/xui-smscode.es6
 * @author leeight
 */




/* eslint-disable */
const template = `<template>
<xui-smscode
    value="{=smscode.mobile=}"
    freeze-time="{{10}}" />
<strong class="large">
    Value is: {{smscode.mobile}}
</strong>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'xui-smscode': __WEBPACK_IMPORTED_MODULE_1_san_xui__["D" /* SMSCodeBox */]
    },
    initData() {
        return {
            smscode: {
                mobile: '13062694617'
            }
        };
    }
}));


/***/ })

},[458])});;