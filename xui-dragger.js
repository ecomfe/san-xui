define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([42],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-dragger.js
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]">\n    <xui-dragger max="{{200}}" value="{{35}}" unit="Mbps" />\n</x-row>\n<x-row label="min=0,max=1,step=0.01">\n    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.01}}" />\n</x-row>\n<x-row label="min=0,max=1,step=0.2">\n    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.2}}" />\n</x-row>\n<x-row label="length=500,max=300,value=135">\n    <xui-dragger length="{{500}}" max="{{300}}" value="{{135}}" unit="Mbps" />\n</x-row>\n<x-row label="disabled">\n    <xui-dragger disabled unit="Mbps" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-dragger': _sanXui.Dragger
    },
    initData: function initData() {
        return {};
    }
});

/***/ })

},[407])});;