define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([20],{

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

/* eslint-disable */
/**
 * @file demos/xui-smscode.js
 * @author leeight
 */

var template = '<template>\n<xui-smscode\n    value="{=smscode.mobile=}"\n    freeze-time="{{10}}" />\n<strong class="large">\n    Value is: {{smscode.mobile}}\n</strong>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'xui-smscode': _sanXui.SMSCodeBox
    },
    initData: function initData() {
        return {
            smscode: {
                mobile: '13062694617'
            }
        };
    }
});

/***/ })

},[433])});;