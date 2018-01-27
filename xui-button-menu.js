define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([51],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-button-menu.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<xui-toastlabel>好像跟 xui-select 挺像的</xui-toastlabel>

<x-row label="[default]">
    <xui-button-menu
        label="Default"
        menus="{{menus}}"
        />

    <xui-button-menu
        label="Primary"
        skin="primary"
        menus="{{menus}}"
        />

    <xui-button-menu
        label="Danger"
        skin="danger"
        menus="{{menus}}"
        />
</x-row>

<x-row label="disabled">
    <xui-button-menu
        label="Hi"
        disabled
        menus="{{menus}}"
        />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */],
        'xui-button-menu': __WEBPACK_IMPORTED_MODULE_1_san_xui__["f" /* ButtonMenu */]
    },
    initData() {
        return {
            menus: [
                {text: 'foo'},
                {text: 'bar'},
                {text: 'abc123', disabled: true},
                {text: 'abc456'}
            ]
        };
    }
}));


/***/ })

},[421])});;