define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([16],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _infI18n = __webpack_require__(14);

var _infI18n2 = _interopRequireDefault(_infI18n);

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * @file demos/xui-toastlabel.es6
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]level=alert">\n    <xui-toastlabel text="hello toastlabel" />\n</x-row>\n<x-row label="level=normal">\n    <xui-toastlabel text="{{\'\u9884\u4ED8\u8D39\'| i18n}} i18n" level="normal" />\n</x-row>\n<x-row label="level=error">\n    <xui-toastlabel text="{{aaa}}, i18n" level="error" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-toastlabel': _sanXui.ToastLabel
    },
    initData: function initData() {
        return {
            aaa: (0, _infI18n2.default)('预付费')
        };
    }
});

/***/ })

},[475])});;