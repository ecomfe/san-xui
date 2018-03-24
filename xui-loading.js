define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([34],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-loading.js
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]size=normal">\n    <xui-loading />\n</x-row>\n<x-row label="[default]size=middle">\n    <xui-loading size="middle" />\n</x-row>\n<x-row label="[default]size=small">\n    <xui-loading size="small" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-loading': _sanXui.Loading
    },
    initData: function initData() {
        return {};
    }
});

/***/ })

},[419])});;