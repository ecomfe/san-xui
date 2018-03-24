define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([44],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-clipboard.js
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]">\n    <xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">\n        <xui-icon name="copy" />\n    </xui-clipboard>\n</x-row>\n\n<x-row label="btns">\n    <xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">\n        <xui-button>{{clipboard.btnText}}</xui-button>\n    </xui-clipboard>\n\n    <xui-clipboard text="Hello World">\n        <xui-button icon="copy" />\n    </xui-clipboard>\n\n    <xui-clipboard text="Hello World" tip-position="e">\n        <xui-button icon="copy" />\n    </xui-clipboard>\n\n    <xui-clipboard text="Hello World" tip-position="w">\n        <xui-button icon="copy" />\n    </xui-clipboard>\n\n    <xui-clipboard text="Hello World" tip-position="n">\n        <xui-button icon="copy" />\n    </xui-clipboard>\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-icon': _sanXui.Icon,
        'xui-button': _sanXui.Button,
        'xui-clipboard': _sanXui.Clipboard
    },
    initData: function initData() {
        return {
            clipboard: {
                btnText: '点我复制'
            }
        };
    },
    onAfterCopy: function onAfterCopy() {
        this.data.set('clipboard.btnText', '复制成功');
    }
});

/***/ })

},[405])});;