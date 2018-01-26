define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([33],{

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
 * @file demos/xui-pager.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-pager size="{{pager.size}}"
        page="{{pager.page}}"
        count="{{pager.count}}"
        on-change="onPagerChange($event)" />
</x-row>
<x-row label="back-text=上一页,forward-text=下一页">
    <xui-pager size="{{pager.size}}"
        with-total-count
        page="{{pager.page}}"
        count="{{pager.count}}"
        back-text="上一页"
        forward-text="下一页"
        on-change="onPagerChange($event)" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-pager': __WEBPACK_IMPORTED_MODULE_1_san_xui__["x" /* Pager */]
    },
    initData() {
        return {
            pager: {
                size: 10,
                page: 1,
                count: 111
            }
        };
    },
    onPagerChange({pageNo}) {
        this.data.set('pager.page', pageNo);
    }
}));


/***/ })

},[459])});;