define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([36],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-monthview.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-monthview value="{=monthview.value=}" range="{{monthview.range}}"/>
    <strong class="large">
        Value is: {{monthview.value | datetime('YYYY-MM-DD')}}
    </strong>
</x-row>

<x-row label="value type is string: 1985-03-08T01:44:48Z">
    <xui-monthview value="1985-03-08T01:44:48Z"/>
</x-row>

<x-row label="time">
    <xui-monthview time value="{=monthview.value=}" />
    <strong class="large">
        Value is: {{monthview.value | datetime('YYYY-MM-DD HH:mm:ss')}}
    </strong>
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-monthview': __WEBPACK_IMPORTED_MODULE_2_san_xui__["u" /* MonthView */]
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).format(f);
        }
    },
    initData() {
        return {
            monthview: {
                value: new Date(),
                range: {
                    begin: new Date(2014, 4, 1),
                    end: new Date()
                }
            }
        };
    }
}));


/***/ })

},[444])});;