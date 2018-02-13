define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([58],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 270:
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
var template = '<template>\n<x-row label="[default]">\n    <xui-aceeditor value="{=editor.value=}" />\n    <strong class="large">\n        <pre>{{editor.value}}</pre>\n    </strong>\n</x-row>\n\n<x-row label="width=100,height=100">\n    <xui-aceeditor\n        width="{{100}}"\n        height="{{100}}"\n        value="{=editor.value=}" />\n</x-row>\n\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-aceeditor.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-aceeditor': _sanXui.ACEEditor
    },
    initData: function initData() {
        return {
            editor: {
                value: 'hello world'
            }
        };
    }
});

/***/ })

},[270])});;