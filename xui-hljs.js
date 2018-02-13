define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([44],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<x-row label="lang=javascript">\n    <xui-hljs code="{{code.javascript}}" />\n</x-row>\n\n<x-row label="lang=html">\n    <xui-hljs code="{{code.html}}" lang="html" />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-hljs.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
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

},[445])});;