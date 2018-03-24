define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([28],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-radiobox.js
 * @author panzihao01
 */

var template = '<template>\n<xui-toastlabel>\u901A\u5E38\u60C5\u51B5\u4E0B\uFF0C\u5E94\u8BE5\u4F7F\u7528 <b>boxgroup \u7EC4\u4EF6</b>\u6765\u8BBE\u7F6E\u4E00\u7EC4\u5355\u9009\u6309\u94AE</xui-toastlabel>\n<x-row label="default">\n    <xui-radiobox checked="{=radiobox.checked=}" title="the radiobox label" />\n    <xui-radiobox checked="{=radiobox.checked=}" disabled title="disabled radiobox" />\n</x-row>\n<x-row label="grouped radio">\n    <div>\n        <xui-radiobox name="group1" checked title="radio 1-1" />\n        <xui-radiobox name="group1" title="radio 1-2" />\n        <xui-radiobox name="group1" title="radio 1-3" />\n    </div>\n    <div>\n        <xui-radiobox name="group2" title="radio 2-1" />\n        <xui-radiobox name="group2" checked title="radio 2-2" />\n        <xui-radiobox name="group2" title="radio 2-3" />\n    </div>\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-radiobox': _sanXui.RadioBox,
        'xui-toastlabel': _sanXui.ToastLabel
    },
    initData: function initData() {
        return {
            radiobox: {
                checked: true
            }
        };
    }
});

/***/ })

},[425])});;