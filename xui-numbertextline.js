define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([31],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-numbertextline.js
 * @author leeight
 */

var template = '<template>\n\n<x-row label="[default]">\n    <xui-numbertextline value="{=value=}" />\n    <strong class="large">Value: {{value}}</strong>\n</x-row>\n\n<x-row label="[default],min=70,max=100">\n    <xui-numbertextline min="{{70}}" max="{{100}}" value="{=value=}" />\n    <strong class="large">Value: {{value}}</strong>\n</x-row>\n\n<x-row label="[default],min=-0.5,max=2,step=0.1">\n    <xui-numbertextline min="{{-0.5}}" max="{{2}}" step="{{0.1}}" value="{=value2=}" />\n    <strong class="large">Value: {{value2}}</strong>\n</x-row>\n\n<x-row label="disabled">\n    <xui-numbertextline disabled max="{{10}}" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
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

},[422])});;