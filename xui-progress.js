define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([47],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Progress__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-progress.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default],value=20">
    <xui-progress value="{{20}}" />
</x-row>
<x-row label="value=50,width=300">
    <xui-progress value="{{50}}" width="{{300}}" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-progress': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Progress__["a" /* default */]
    },
    initData() {
        return {
        };
    }
}));


/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/**
 * @file Progress.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-viewprogress');

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
    <div class="inner" style="{{barStyle}}"></div>
    <div class="percent">{{value}}%</div>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {},
    initData() {
        return {
            value: 0
        };
    },
    dataTypes: {
        /**
         * 取值范围[0 - 100]
         * @default 0
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 组件的宽度
         */
        width: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number
    },
    computed: {
        barStyle() {
            const value = this.data.get('value');
            return {
                width: `${value}%`
            };
        },
        mainStyle() {
            const width = this.data.get('width');
            if (width == null) {
                return {};
            }
            return {
                width: `${width}px`
            };
        },
        mainClass() {
            return cx.mainClass(this);
        }
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

},[359])});;