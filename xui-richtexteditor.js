define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([23],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-richtexteditor.js
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\n\u9700\u8981\u5728\u9875\u9762\u4E2D\u5F15\u5165 UEditor \u548C ZeroClipboard \u7684\u4EE3\u7801\uFF0C\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A<pre>\n1. \u624B\u5DE5\u5F15\u5165\n<code>&lt;script src="https://cdn.bdstatic.com/console/dep/c42ae776/ueditor/1.4.3/ueditor.all.min.js"&gt;&lt;/script&gt;\n&lt;script src="https://cdn.bdstatic.com/console/dist/ef68d9f/dep/zeroclipboard/2.2.0/ZeroClipboard.2.2.0.max.js"&gt;&lt;/script&gt;</code>\n\n2. AMD Loader\u81EA\u52A8\u5F15\u5165\n<code>require.config({\n  paths: {\n    \'zeroclipboard\': \'https://cdn.bdstatic.com/console/dep/05cfee93/zeroclipboard/ZeroClipboard\',\n    \'ueditor\': \'https://cdn.bdstatic.com/console/dep/c42ae776/ueditor/1.4.3\'\n  }\n});</code>\n</pre>\n</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-richtexteditor value="{=value=}" />\n</x-row>\n\n<x-row label="options=...">\n    <xui-richtexteditor\n        options="{{options}}"\n        value="{=value=}" />\n    <strong class="large">\n        Value is: {{value}}\n    </strong>\n</x-row>\n\n<x-row label="s-if">\n    <xui-switch checked="{=show=}" />\n    <form s-if="show">\n        <xui-richtexteditor options="{{options}}" />\n    </form>\n</x-row>\n\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-switch': _sanXui.Switch,
        'xui-richtexteditor': _sanXui.RichTextEditor
    },
    initData: function initData() {
        return {
            show: true,
            value: 'Hello world! <strong> This is the initialize content </strong>',
            options: {
                toolbars: [['fullscreen', 'source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough']]
            }
        };
    }
});

/***/ })

},[430])});;