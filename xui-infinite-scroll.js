define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([54],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_InfiniteScroll__ = __webpack_require__(349);
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


/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'xui-infinite-scroll': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_InfiniteScroll__["a" /* default */]
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


/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Loading__ = __webpack_require__(15);
/**
 * @file InfiniteScroll.es6
 * @author xuli07
 */




/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template: `
    <div on-scroll="scrollHandler" class="ui-infinite-scroll">
        <slot></slot>
        <slot name="loading">
            <xui-loading s-if="loading && !finished"/>
        </slot>
    </div>
    `,

    components: {
        'xui-loading': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Loading__["a" /* default */]
    },

    initData() {
        return {
            loading: false,
            distance: 50
        };
    },

    dataTypes: {
        /**
         * 是否展示 loading 的状态
         * @default false
         */
        loading: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 是否所有的数据已经加载完毕。如果 finished 设置成 true，那么滚动的时候，不会触发任何请求
         * @default false
         */
        finished: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 距离底部 distance 的时候，开始加载下一页的数据
         * @default 50
         */
        distance: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number
    },

    scrollHandler() {
        const {scrollHeight, offsetHeight, scrollTop} = this.el;
        if (scrollHeight - offsetHeight - scrollTop < this.data.get('distance')
            && !this.data.get('loading')
            && !this.data.get('finished')
        ) {
            this.fire('more');
        }
    }
}));



/***/ })

},[348])});;