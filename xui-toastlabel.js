define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([10],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-toastlabel.js
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]level=alert">\n    <xui-toastlabel text="hello toastlabel" />\n</x-row>\n<x-row label="level=normal">\n    <xui-toastlabel text="{{\'\u9884\u4ED8\u8D39\'| i18n}} i18n" level="normal" />\n</x-row>\n<x-row label="level=error">\n    <xui-toastlabel text="{{aaa}}, i18n" level="error" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-toastlabel': _sanXui.ToastLabel
    },
    initData: function initData() {
        return {
            aaa: '预付费'
        };
    }
});

/***/ })

},[443])});;