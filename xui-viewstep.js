define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-viewstep.js
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]">\n    <xui-viewstep\n        steps="{{steps}}" />\n</x-row>\n\n<x-row label="step-index=3">\n    <xui-viewstep\n        step-index="{{3}}"\n        steps="{{steps}}" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-viewstep': _sanXui.ViewStep
    },
    initData: function initData() {
        return {
            steps: [{ text: '选择云服务器' }, { text: '确认订单' }, { text: '在线支付' }, { text: '支付成功' }]
        };
    }
});

/***/ })

},[447])});;