define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([12],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 481:
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
var template = '<template>\n<x-row label="[default]">\n    <xui-viewstep\n        steps="{{steps}}" />\n</x-row>\n\n<x-row label="step-index=3">\n    <xui-viewstep\n        step-index="{{3}}"\n        steps="{{steps}}" />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-viewstep.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-viewstep': _sanXui.ViewStep
    },
    initData: function initData() {
        return {
            steps: [{ text: '选择云服务器' }, { text: '确认订单' }, { text: '在线支付' }, { text: '支付成功' }]
        };
    }
});

/***/ })

},[481])});;