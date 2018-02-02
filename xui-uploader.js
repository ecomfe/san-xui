define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([14],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 477:
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
var template = '<template>\n<xui-toastlabel text="\u6587\u4EF6\u4E0A\u4F20\u5230 BOS\uFF0C\u65E0\u9700\u4EFB\u4F55\u914D\u7F6E\uFF0C\u5F00\u7BB1\u5373\u7528" />\n<x-row label="default">\n    <div class="as-form-row">\n        <div class="ui-form-item-content">\n            <xui-uploader value="{=value=}" />\n        </div>\n    </div>\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-uploader.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        // 'xui-uploader': ../forms/Uploader
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-uploader': _sanXui.Uploader
    },
    initData: function initData() {
        return {
            value: 'https://bce-bos-uploader.bj.bcebos.com/v1//2017/12/21/88047fbb-a1b3-4430-8732-c960a2402907/dot.psd'
        };
    }
});

/***/ })

},[477])});;