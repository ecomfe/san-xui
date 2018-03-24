define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([13],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-textbox.js
 * @author leeight
 */

var template = '<template>\n<x-row label="type=text">\n    <xui-textbox placeholder="This is placeholder" value="{=text.value=}" on-enter="onPressEnterOnTextBox" />\n    <xui-textbox disabled placeholder="This is disabled textbox" />\n    Value is: {{text.value}}\n</x-row>\n<x-row label="type=password">\n    <xui-textbox width="{{100}}" type="password" placeholder="This is placeholder" value="{=password.value=}" />\n    <xui-textbox disabled width="300px" type="password" placeholder="This is disabled textbox" />\n    Password is: {{password.value}}\n</x-row>\n<x-row label="type=text,addon=@_@">\n    <xui-textbox\n        addon="@_@"\n        placeholder="This is placeholder"\n        value="{=text.value=}"\n        on-enter="onPressEnterOnTextBox" />\n</x-row>\n<x-row label="type=text,addon=@_@,addon-position=end">\n    <xui-textbox\n        addon="@_@"\n        addon-position="end"\n        placeholder="This is placeholder"\n        value="{=text.value=}"\n        on-enter="onPressEnterOnTextBox" />\n</x-row>\n<x-row label="multiline">\n    <xui-textbox multiline placeholder="This is placeholder" value="{=textarea.value=}" />\n    <xui-textbox multiline disabled placeholder="This is disabled textbox" />\n    Value is: {{textarea.value}}\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-textbox': _sanXui.TextBox
    },
    initData: function initData() {
        return {
            text: {
                value: ''
            },
            textarea: {
                value: ''
            },
            password: {
                value: ''
            }
        };
    },
    onPressEnterOnTextBox: function onPressEnterOnTextBox() {
        _sanXui.Toast.info('Enter pressed');
    }
});

/***/ })

},[440])});;