define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([48],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 424:
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
 * @file demos/xui-calendar.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>

<x-row label="[default]">
    <xui-calendar value="{=calendar.value=}" range="{{calendar.range}}"/>
    <strong class="large">
        Value is: {{calendar.value | datetime('YYYY-MM-DD')}}
    </strong>
</x-row>

<x-row label="value type is string: 1985-03-08T01:44:48Z">
    <xui-calendar value="1985-03-08T01:44:48Z" />
</x-row>

<x-row label="prev,next,time">
    <xui-calendar prev next time value="{=calendar.value=}" />
    <strong class="large">
        Value is: {{calendar.value | datetime('YYYY-MM-DD HH:mm:ss')}}
    </strong>
</x-row>

<x-row label="disabled">
    <xui-calendar value="{=calendar.value=}" disabled />
</x-row>

<x-row label="disabled,prev,next">
    <xui-calendar prev next value="{=calendar.value=}" disabled />
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-calendar': __WEBPACK_IMPORTED_MODULE_2_san_xui__["h" /* Calendar */]
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).format(f);
        }
    },
    initData() {
        return {
            calendar: {
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

},[424])});;