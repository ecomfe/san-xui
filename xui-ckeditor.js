define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([50],{

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

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<x-row label="[default]">\n    <xui-ckeditor value="{=value=}" />\n</x-row>\n\n<x-row label="options=...">\n    <xui-ckeditor options="{{options}}" value="{=value=}" />\n    <strong class="large">\n        Value is: {{value}}\n    </strong>\n</x-row>\n\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-ckeditor.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-ckeditor': _sanXui.CKEditor
    },
    initData: function initData() {
        return {
            value: 'Hello world! <strong> This is the initialize content </strong>',
            options: {
                toolbar: [['Source', '-', 'Bold', 'Italic'], ['Source', '-', 'Bold', 'Italic']]
            }
        };
    }
});

/***/ })

},[440])});;