define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([18],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-textbox.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="type=text">
    <xui-textbox placeholder="This is placeholder" value="{=text.value=}" on-enter="onPressEnterOnTextBox" />
    <xui-textbox disabled placeholder="This is disabled textbox" />
    Value is: {{text.value}}
</x-row>
<x-row label="type=password">
    <xui-textbox width="{{100}}" type="password" placeholder="This is placeholder" value="{=password.value=}" />
    <xui-textbox disabled width="300px" type="password" placeholder="This is disabled textbox" />
    Password is: {{password.value}}
</x-row>
<x-row label="type=text,addon=@_@">
    <xui-textbox
        addon="@_@"
        placeholder="This is placeholder"
        value="{=text.value=}"
        on-enter="onPressEnterOnTextBox" />
</x-row>
<x-row label="type=text,addon=@_@,addon-position=end">
    <xui-textbox
        addon="@_@"
        addon-position="end"
        placeholder="This is placeholder"
        value="{=text.value=}"
        on-enter="onPressEnterOnTextBox" />
</x-row>
<x-row label="multiline">
    <xui-textbox multiline placeholder="This is placeholder" value="{=textarea.value=}" />
    <xui-textbox multiline disabled placeholder="This is disabled textbox" />
    Value is: {{textarea.value}}
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-textbox': __WEBPACK_IMPORTED_MODULE_1_san_xui__["N" /* TextBox */]
    },
    initData() {
        return {
            text: {
                value: ''
            },
            textarea: {
                value: ''
            },
            password: {
                value: ''
            }
        };
    },
    onPressEnterOnTextBox() {
        __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */].info('Enter pressed');
    }
}));


/***/ })

},[476])});;