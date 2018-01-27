define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([30],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/**
 * @file demos/xui-rangecalendar.es6
 * @author leeight
 */





/* eslint-disable */
const template = `<template>
<xui-rangecalendar value="{=rangecalendar.value=}" />
<xui-rangecalendar value="{=rangecalendar.value=}" disabled="{{true}}" />
<xui-rangecalendar value="{=rangecalendar.value=}" shortcut="{{false}}" />
<xui-rangecalendar value="{=rangecalendar.value=}" time="{{true}}" />
<strong class="large">
    Value is: {{rangecalendar.value.begin | datetime('YYYY-MM-DD')}} - {{rangecalendar.value.end | datetime('YYYY-MM-DD')}}
</strong>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'xui-rangecalendar': __WEBPACK_IMPORTED_MODULE_2_san_xui__["B" /* RangeCalendar */]
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).format(f);
        }
    },
    initData() {
        return {
            rangecalendar: {
                value: {
                    begin: new Date(2017, 9, 19), // 2017-10-19
                    end: new Date(2018, 0, 12) // 2018-01-12
                },
                range: {
                    begin: new Date(2017, 9, 18), // 2017-10-18
                    end: new Date(2018, 0, 19) // 2018-01-19
                }
            }
        };
    }
}));


/***/ })

},[450])});;