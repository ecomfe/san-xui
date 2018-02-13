define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([49],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 433:
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
var template = '<template>\n<x-row label="checked=true">\n    <xui-checkbox checked="{=checkbox.checked=}" title="the label" />\n    <xui-switch checked="{=checkbox.checked=}" />\n    <xui-radiobox checked="{=checkbox.checked=}" title="the radiobox label" />\n</x-row>\n<x-row label="[default]checked=false">\n    <xui-checkbox />\n    <xui-checkbox disabled />\n    <xui-radiobox disabled />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-checkbox.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
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

},[433])});;