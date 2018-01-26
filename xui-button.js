define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([50],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-button.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-button class="tooltipped tooltipped-e" aria-label="Success: The Travis CI build passed">Hello xui-button</xui-button>
    <xui-button loading class="tooltipped tooltipped-e" aria-label="Success: The Travis CI build passed">Hello xui-button</xui-button>
    <xui-button skin="primary">primary skin</xui-button>
    <xui-button skin="danger">danger skin</xui-button>
    <xui-button
        disabled
        skin="primary"
        class="tooltipped tooltipped-n" 
        aria-label="Success: The Travis CI build passed"
    >disabled button</xui-button>
</x-row>

<x-row label="[default],size=large">
    <xui-button size="large">Hello xui-button</xui-button>
    <xui-button size="large" skin="primary">primary skin</xui-button>
    <xui-button size="large" skin="danger">danger skin</xui-button>
    <xui-button size="large" disabled skin="primary">disabled button</xui-button>
    <xui-button size="large" loading disabled skin="primary">disabled button</xui-button>
</x-row>

<x-row label="icon">
    <xui-button icon="refresh" />
    <xui-button icon="refresh" disabled />
    <xui-button icon="download" />
    <xui-button icon="download" disabled />
    <xui-button icon="sdk" />
    <xui-button icon="sdk" disabled />
</x-row>

<x-row label="icon,label">
    <xui-button icon="refresh" />
    <xui-button icon="refresh">{{'刷新'|i18n}}</xui-button>
    <xui-button icon="voice">Start</xui-button>
    <xui-button icon="plus" skin="primary" label="{{'创建' | i18n}}" />
</x-row>

<x-row label="icon,label,size=large">
    <xui-button on-click="onRefresh" icon="refresh" size="large">{{'刷新'|i18n}}</xui-button>
    <xui-button on-click="onCreate" icon="plus" skin="primary" size="large">{{'创建'|i18n}}</xui-button>
</x-row>

<x-row label="icon,size=large">
    <xui-toastlabel>非标准样式</xui-toastlabel>
    <br/>
    <xui-button icon="refresh" size="large" />
    <xui-button icon="refresh" disabled size="large" />
    <xui-button icon="download" size="large" />
    <xui-button icon="download" disabled size="large" />
    <xui-button icon="sdk" size="large" />
    <xui-button icon="sdk" disabled size="large" />
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */]
    },
    onCreate() {
        this.$plain('On Create');
    },
    onRefresh() {
        this.$plain('On Refresh');
    }
}));



/***/ })

},[434])});;