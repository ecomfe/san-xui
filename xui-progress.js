define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([29],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-progress.js
 * @author leeight
 */

var template = '<template>\n<x-row label="[default],value=20">\n    <xui-progress value="{{20}}" />\n</x-row>\n<x-row label="value=50,width=300">\n    <xui-progress value="{{50}}" width="{{300}}" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-progress': _sanXui.Progress
    },
    initData: function initData() {
        return {};
    }
});

/***/ })

},[424])});;