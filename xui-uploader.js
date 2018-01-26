define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([14],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-uploader.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<xui-toastlabel text="文件上传到 BOS，无需任何配置，开箱即用" />
<x-row label="default">
    <div class="as-form-row">
        <div class="ui-form-item-content">
            <xui-uploader value="{=value=}" />
        </div>
    </div>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        // 'xui-uploader': ../forms/Uploader
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */],
        'xui-uploader': __WEBPACK_IMPORTED_MODULE_1_san_xui__["R" /* Uploader */]
    },
    initData() {
        return {
            value: 'https://bce-bos-uploader.bj.bcebos.com/v1//2017/12/21/88047fbb-a1b3-4430-8732-c960a2402907/dot.psd'
        };
    }
}));


/***/ })

},[482])});;