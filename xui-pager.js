define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([48],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Pager__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
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

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-pager': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Pager__["a" /* default */]
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


/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/**
 * @file Pager.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-pager');

/* eslint-disable */
const template = `<template>
<div class="{{mainClass}}">
    <span class="${cx('count')}" s-if="withTotalCount">共{{count}}条</span>
    <ul class="${cx('main')}">
        <li on-click="onPagerItemClick(item)"
            class="${cx('item')} {{item.className}}"
            san-for="item in items">{{item.label|raw}}</li>
    </ul>
</div>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        items() {
            const size = this.data.get('size');
            const page = this.data.get('page');
            const count = this.data.get('count');
            const backText = this.data.get('backText');
            const backCount = this.data.get('backCount');
            const forwardCount = this.data.get('forwardCount');
            const forwardText = this.data.get('forwardText');

            // {value, label, className, disabled}
            return Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* buildPagerItems */])({size, page, count, backCount, backText, forwardCount, forwardText, cx});
        }
    },
    initData() {
        return {
            withTotalCount: false, // 是否显示总条数
            size: 10,
            page: 1,
            count: 0,
            backCount: 3,
            forwardCount: 3,
            backText: '<',
            forwardText: '>'
        };
    },
    dataTypes: {
        /**
         * 是否显示总的页数
         * @default false
         */
        withTotalCount: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 每页展示的数量
         * @default 10
         */
        size: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 第一页
         * @default 1
         */
        page: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 总共的数量
         * @default 0
         */
        count: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 当前页之前最多 back-count 个页码
         * @default 3
         */
        backCount: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 当前页之后最多 forward-count 个页码
         * @default 3
         */
        forwardCount: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 后一页的文案
         * @default <
         */
        backText: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 前一页的文案
         * @default >
         */
        forwardText: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string
    },
    onPagerItemClick(item) {
        if (item.disabled) {
            return;
        }
        this.fire('change', {pageNo: item.value});
    }
}));


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/**
 * @file demos/Row.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template: `<div class="x-row">
        <div class="label" s-if="label">{{label}}</div>
        <div class="content"><slot/></div>
    </div>`
}));



/***/ })

},[357])});;