define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([8],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-uploader.js
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\n<strong style="color: red">\u6587\u4EF6\u4E0A\u4F20\u5230 BOS\uFF0C\u65E0\u9700\u4EFB\u4F55\u914D\u7F6E\uFF0C\u5F00\u7BB1\u5373\u7528</strong><br />\n\u9700\u8981\u5728\u9875\u9762\u4E2D\u5F15\u5165 bce-bos-uploader-lite \u7684\u4EE3\u7801\uFF0C\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A<pre>\n1. \u624B\u5DE5\u5F15\u5165\n<code>&lt;script src="https://cdn.bdstatic.com/bce-bos-uploader-lite/1.0.5/bce-bos-uploader-lite.min.js"&gt;&lt;/script&gt;</code>\n\n2. AMD Loader\u81EA\u52A8\u5F15\u5165\n<code>require.config({\n  paths: {\n    \'baidubce\': \'https://cdn.bdstatic.com/bce-bos-uploader-lite/1.0.5/bce-bos-uploader-lite.min\'\n  }\n});</code>\n</pre>\n</xui-toastlabel>\n\n<x-row label="default">\n    <div class="as-form-row">\n        <div class="ui-form-item-content">\n            <xui-uploader value="{=value=}" />\n        </div>\n    </div>\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
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

},[445])});;