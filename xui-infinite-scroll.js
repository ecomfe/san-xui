define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([40],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/**
 * @file xui-infinite-scroll.es6
 * @author xuli07
 */




/* eslint-disable */
const template = `<template>
    <xui-infinite-scroll on-more="loadMore" loading="{{loading}}" distance="150" finished="{{finished}}">
        <div s-for="i in list">{{i}}</div>
    </xui-infinite-scroll>
</template>`;
/* eslint-enable */


/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'xui-infinite-scroll': __WEBPACK_IMPORTED_MODULE_1_san_xui__["q" /* InfiniteScroll */]
    },
    initData() {
        return {
            start: 0,
            loading: false,
            finished: false,
            list: Array(30).fill(1).map((k, i) => i)
        };
    },

    loadMore() {
        this.data.set('loading', true);
        setTimeout(() => {
            if (this.data.get('start') < 100) {
                this.data.set('start', this.data.get('start') + 30);
                this.data.set('list', this.data.get('list').concat(Array(30).fill(1).map((k, i) => this.data.get('start') + i)));
                this.data.set('loading', false);
            }
            else {
                this.data.set('finished', true);
            }
        }, 1000);
    }
}));


/***/ })

},[452])});;