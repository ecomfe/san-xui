define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([53],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 426:
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
var template = '<template>\n<xui-toastlabel>\u597D\u50CF\u8DDF xui-select \u633A\u50CF\u7684</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-button-menu\n        label="Default"\n        menus="{{menus}}"\n        />\n\n    <xui-button-menu\n        label="Primary"\n        skin="primary"\n        menus="{{menus}}"\n        />\n\n    <xui-button-menu\n        label="Danger"\n        skin="danger"\n        menus="{{menus}}"\n        />\n</x-row>\n\n<x-row label="disabled">\n    <xui-button-menu\n        label="Hi"\n        disabled\n        menus="{{menus}}"\n        />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-button-menu.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-button-menu': _sanXui.ButtonMenu
    },
    initData: function initData() {
        return {
            menus: [{ text: 'foo' }, { text: 'bar' }, { text: 'abc123', disabled: true }, { text: 'abc456' }]
        };
    }
});

/***/ })

},[426])});;