define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([42],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-hljs.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="lang=javascript">
    <xui-hljs code="{{code.javascript}}" />
</x-row>

<x-row label="lang=html">
    <xui-hljs code="{{code.html}}" lang="html" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-hljs': __WEBPACK_IMPORTED_MODULE_1_san_xui__["I" /* SyntaxHighlighter */]
    },
    initData() {
        return {
            code: {
                javascript: 'var a = 10;\n'
                    + 'var b = 20;\n'
                    + 'console.log(a + b + \'c = 30\')\n',
                html: '<!doctype html>\n'
                    + '<html>\n'
                    + '<head>\n'
                    + '  <meta charset="utf-8" />\n'
                    + '  <title>sdfdfM<title>\n'
                    + '</head>\n'
                    + '<body>\n'
                    + '  Hello World.\n'
                    + '</body>\n'
                    + '</html>'
            }
        };
    }
}));


/***/ })

},[450])});;