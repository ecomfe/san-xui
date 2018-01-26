define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([43],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/**
 * @file demos/xui-go.es6
 * @author leeight
 */





__WEBPACK_IMPORTED_MODULE_2_san_xui__["o" /* Go */].setSwitchHandler((event, comp) => {
    // XXX 真实场景下，在 common 里面会实现这个逻辑；在 DEMO 里面，就随便写写好了。
    const hash = comp.data.get('href');
    location.hash = hash;
    return __WEBPACK_IMPORTED_MODULE_0_promise___default.a.resolve();
});

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
在百度云控制台中，从 <code>服务A</code> 跳转到 <code>服务B</code> 的时候，涉及到比较复杂的加载机制。<br />
直接用 &lt;a&gt; 会导致公共的代码重复加载，所以这里特殊处理一下，&lt;xui-go href=&quot;/billing/#/foo/bar&quot;&gt;...&lt;/xui-go&gt;。
</xui-toastlabel>
<br />
<xui-go href="#comp=xui-button">Goto xui-button</xui-go>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_2_san_xui__["Q" /* ToastLabel */],
        'xui-go': __WEBPACK_IMPORTED_MODULE_2_san_xui__["o" /* Go */]
    },
    initData() {
        return {
        };
    }
}));



/***/ })

},[449])});;