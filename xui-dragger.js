define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([46],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 437:
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
var template = '<template>\n<x-row label="[default]">\n    <xui-dragger max="{{200}}" value="{{35}}" unit="Mbps" />\n</x-row>\n<x-row label="min=0,max=1,step=0.01">\n    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.01}}" />\n</x-row>\n<x-row label="min=0,max=1,step=0.2">\n    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.2}}" />\n</x-row>\n<x-row label="length=500,max=300,value=135">\n    <xui-dragger length="{{500}}" max="{{300}}" value="{{135}}" unit="Mbps" />\n</x-row>\n<x-row label="disabled">\n    <xui-dragger disabled unit="Mbps" />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-dragger.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-dragger': _sanXui.Dragger
    },
    initData: function initData() {
        return {};
    }
});

/***/ })

},[437])});;