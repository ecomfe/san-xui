define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([12],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-tip.js
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>esui\u91CC\u9762\u7684\u5B9E\u73B0\u65B9\u6848</xui-toastlabel>\n<x-row label="position=lt">\n    <xui-tip message="hello world" />\n    <xui-tip><xui-button>Button In Tip</xui-button></xui-tip>\n    <xui-tip><xui-monthview /></xui-tip>\n</x-row>\n<x-row label="position=tc">\n    <xui-tip message="hello world" position="tc" />\n</x-row>\n<x-row label="position=rt">\n    <xui-tip message="hello world" position="rt" />\n</x-row>\n<x-row label="position=bc">\n    <xui-tip message="hello world" position="bc" />\n</x-row>\n\n<xui-toastlabel>\u65B0\u7684\u5B9E\u73B0\u65B9\u6848\uFF0C1: \u9700\u8981\u907F\u514D overflow: hidden\uFF0C\u5426\u5219\u53EF\u80FD\u6CA1\u6548\u679C 2: \u901A\u8FC7 aria-label \u6765\u8BBE\u7F6E tip \u7684\u5185\u5BB9</xui-toastlabel>\n<x-row label="tooltipped,aria-label">\n    <xui-button\n        class="tooltipped tooltipped-s"\n        aria-label="THIS THE TOOLTIPPED CONTENT"\n        >tooltipped,tooltipped-s</xui-button>\n\n    <xui-button\n        class="tooltipped tooltipped-e"\n        aria-label="THIS THE TOOLTIPPED CONTENT"\n        >tooltipped,tooltipped-e</xui-button>\n\n    <xui-button\n        class="tooltipped tooltipped-n"\n        aria-label="THIS THE TOOLTIPPED CONTENT"\n        >tooltipped,tooltipped-n</xui-button>\n\n    <xui-button\n        class="tooltipped tooltipped-w"\n        aria-label="THIS THE TOOLTIPPED CONTENT"\n        >tooltipped,tooltipped-w</xui-button>\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-button': _sanXui.Button,
        'xui-monthview': _sanXui.MonthView,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-tip': _sanXui.Tip
    },
    initData: function initData() {
        return {};
    }
});

/***/ })

},[441])});;