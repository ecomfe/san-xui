define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([55],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-aceeditor.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-aceeditor value="{=editor.value=}" />
    <strong class="large">
        <pre>{{editor.value}}</pre>
    </strong>
</x-row>

<x-row label="width=100,height=100">
    <xui-aceeditor
        width="{{100}}"
        height="{{100}}"
        value="{=editor.value=}" />
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-aceeditor': __WEBPACK_IMPORTED_MODULE_1_san_xui__["a" /* ACEEditor */]
    },
    initData() {
        return {
            editor: {
                value: 'hello world'
            }
        };
    }
}));


/***/ })

},[378])});;