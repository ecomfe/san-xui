define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([11],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-voice.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>

<xui-toastlabel>基于 vse.baidu.com 提供的服务实现语音识别，跟百度PC版本首页的实现方案一致。</xui-toastlabel>

<x-row label="[default]">
    <xui-voice on-change="onChange" />
    <strong class="large">
    TEXT: {{voiceText}}
    </strong>
</x-row>

<x-row label="error">
    <xui-voice error="初始化失败" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-voice': __WEBPACK_IMPORTED_MODULE_1_san_xui__["U" /* Voice */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */]
    },
    initData() {
        return {
            voiceText: null
        };
    },
    onChange({value}) {
        this.data.set('voiceText', value.text);
    }
}));


/***/ })

},[473])});;