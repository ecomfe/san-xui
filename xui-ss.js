define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([19],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-ss.js
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]">\n    <xui-ss style="{{myStyle}}">\n        \u8FD9\u4E2A\u5BB9\u5668\uFF0C\u6EDA\u52A8\u5230\u5E95\u90E8\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u9875\u9762\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n    </xui-ss>\n\n    <div style="{{myStyle}}">\n        \u8FD9\u4E2A\u5BB9\u5668\uFF0C\u6EDA\u52A8\u5230\u5E95\u90E8\uFF0C\u9875\u9762\u5F00\u59CB\u6EDA\u52A8\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n        <br />\n    </div>\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-ss': _sanXui.StopScroll
    },
    initData: function initData() {
        return {
            myStyle: {
                'display': 'inline-block',
                'margin-right': '10px',
                'width': '150px',
                'height': '50px',
                'overflow': 'hidden',
                'border': '1px solid #000',
                'overflow-y': 'auto'
            }
        };
    }
});

/***/ })

},[434])});;