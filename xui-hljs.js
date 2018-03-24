define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([39],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-hljs.js
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\n\u9700\u8981\u5728\u9875\u9762\u4E2D\u5F15\u5165 hljs \u7684\u4EE3\u7801\u548C\u6837\u5F0F\uFF0C\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A<pre>\n1. \u624B\u5DE5\u5F15\u5165\n<code>&lt;script src="https://cdn.bdstatic.com/console/highlight.js/9.12.0/highlight.min.js"&gt;&lt;/script&gt;\n&lt;link rel="stylesheet" type="text/css" href="https://cdn.bdstatic.com/console/highlight.js/9.12.0/styles/default.min.css" /&gt;</code>\n\n2. AMD Loader\u81EA\u52A8\u5F15\u5165\n<code>require.config({\n  paths: {\n    \'hljs\': \'https://cdn.bdstatic.com/console/highlight.js/9.12.0\',\n    \'hljs/highlight\': \'https://cdn.bdstatic.com/console/highlight.js/9.12.0/highlight.min\'\n  }\n});</code>\n</pre>\n</xui-toastlabel>\n\n<x-row label="lang=javascript">\n    <xui-hljs code="{{code.javascript}}" />\n</x-row>\n\n<x-row label="lang=html">\n    <xui-hljs code="{{code.html}}" lang="html" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-hljs': _sanXui.SyntaxHighlighter
    },
    initData: function initData() {
        return {
            code: {
                javascript: 'var a = 10;\n' + 'var b = 20;\n' + 'console.log(a + b + \'c = 30\')\n',
                html: '<!doctype html>\n' + '<html>\n' + '<head>\n' + '  <meta charset="utf-8" />\n' + '  <title>sdfdfM<title>\n' + '</head>\n' + '<body>\n' + '  Hello World.\n' + '</body>\n' + '</html>'
            }
        };
    }
});

/***/ })

},[414])});;