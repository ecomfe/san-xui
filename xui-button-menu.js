define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([50],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-button-menu.js
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\u597D\u50CF\u8DDF xui-select \u633A\u50CF\u7684</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-button-menu\n        label="Default"\n        menus="{{menus}}"\n        />\n\n    <xui-button-menu\n        label="Primary"\n        skin="primary"\n        menus="{{menus}}"\n        />\n\n    <xui-button-menu\n        label="Danger"\n        skin="danger"\n        menus="{{menus}}"\n        />\n</x-row>\n\n<x-row label="disabled">\n    <xui-button-menu\n        label="Hi"\n        disabled\n        menus="{{menus}}"\n        />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
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

},[398])});;