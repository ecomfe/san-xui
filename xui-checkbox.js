define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([46],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-checkbox.js
 * @author leeight
 */

var template = '<template>\n<x-row label="checked=true">\n    <xui-checkbox checked="{=checkbox.checked=}" title="the label" />\n    <xui-switch checked="{=checkbox.checked=}" />\n    <xui-radiobox checked="{=checkbox.checked=}" title="the radiobox label" />\n</x-row>\n<x-row label="[default]checked=false">\n    <xui-checkbox />\n    <xui-checkbox disabled />\n    <xui-radiobox disabled />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-switch': _sanXui.Switch,
        'xui-radiobox': _sanXui.RadioBox,
        'xui-checkbox': _sanXui.CheckBox
    },
    initData: function initData() {
        return {
            checkbox: {
                checked: true
            }
        };
    }
});

/***/ })

},[403])});;