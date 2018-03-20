define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([23],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 475:
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
var template = '<template>\n<x-row label="sticky\u5728\u67D0\u4E2A\u5BB9\u5668\u533A\u57DF">\n    <div class="container" style="{{boxStyle}}">\n        <xui-sticky marginTop="20" container=".container">\n            <div slot="sticky" style="{{boxStyle}}">\n                <strong class="large" >Sticky Element of custom container</strong>\n            </div>\n            <div style="{{boxStyle}}">\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n                sticky \u81EA\u5B9A\u4E49\u5BB9\u5668\u533A\u57DF<br>\n            </div>\n        </xui-sticky>\n    </div>\n    <div style="{{boxStyle}}">\n        stick\u5BB9\u5668\u5916\u7684\u5185\u5BB9<br>\n        stick\u5BB9\u5668\u5916\u7684\u5185\u5BB9<br>\n        stick\u5BB9\u5668\u5916\u7684\u5185\u5BB9<br>\n        stick\u5BB9\u5668\u5916\u7684\u5185\u5BB9<br>\n        stick\u5BB9\u5668\u5916\u7684\u5185\u5BB9<br>\n        stick\u5BB9\u5668\u5916\u7684\u5185\u5BB9<br>\n    </div>\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-sticky.js
 * @author liyuan
 */

exports.default = (0, _san.defineComponent)({
    template: template,

    components: {
        'x-row': _Row2.default,
        'xui-sticky': _sanXui.Sticky
    },

    initData: function initData() {
        return {
            boxStyle: {
                'padding': '10px',
                'box-sizing': 'border-box',
                'border': '1px solid #3d3d3d',
                'width': '100%',
                'text-align': 'center',
                'line-height': '30px',
                'margin-bottom': '10px'
            }
        };
    }
});

/***/ })

},[475])});;