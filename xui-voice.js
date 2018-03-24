define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-voice.js
 * @author leeight
 */

var template = '<template>\n\n<xui-toastlabel>\u57FA\u4E8E vse.baidu.com \u63D0\u4F9B\u7684\u670D\u52A1\u5B9E\u73B0\u8BED\u97F3\u8BC6\u522B\uFF0C\u8DDF\u767E\u5EA6PC\u7248\u672C\u9996\u9875\u7684\u5B9E\u73B0\u65B9\u6848\u4E00\u81F4\u3002</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-voice on-change="onChange" />\n    <strong class="large">\n    TEXT: {{voiceText}}\n    </strong>\n</x-row>\n\n<x-row label="error">\n    <xui-voice error="\u521D\u59CB\u5316\u5931\u8D25" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-voice': _sanXui.Voice,
        'xui-toastlabel': _sanXui.ToastLabel
    },
    initData: function initData() {
        return {
            voiceText: null
        };
    },
    onChange: function onChange(_ref) {
        var value = _ref.value;

        this.data.set('voiceText', value.text);
    }
});

/***/ })

},[448])});;