define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([36],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 460:
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
var template = '<template>\n\n<x-row label="[default]">\n    <xui-numbertextline value="{=value=}" />\n    <strong class="large">Value: {{value}}</strong>\n</x-row>\n\n<x-row label="[default],min=70,max=100">\n    <xui-numbertextline min="{{70}}" max="{{100}}" value="{=value=}" />\n    <strong class="large">Value: {{value}}</strong>\n</x-row>\n\n<x-row label="[default],min=-0.5,max=2,step=0.1">\n    <xui-numbertextline min="{{-0.5}}" max="{{2}}" step="{{0.1}}" value="{=value2=}" />\n    <strong class="large">Value: {{value2}}</strong>\n</x-row>\n\n<x-row label="disabled">\n    <xui-numbertextline disabled max="{{10}}" />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-numbertextline.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-numbertextline': _sanXui.NumberTextline
    },
    initData: function initData() {
        return {
            value: '80',
            value2: '1'
        };
    }
});

/***/ })

},[460])});;