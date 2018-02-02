define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([52],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 427:
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
var template = '<template>\n<x-row label="[default]">\n    <xui-button class="tooltipped tooltipped-e" aria-label="Success: The Travis CI build passed">Hello xui-button</xui-button>\n    <xui-button loading class="tooltipped tooltipped-e" aria-label="Success: The Travis CI build passed">Hello xui-button</xui-button>\n    <xui-button skin="primary">primary skin</xui-button>\n    <xui-button skin="danger">danger skin</xui-button>\n    <xui-button\n        disabled\n        skin="primary"\n        class="tooltipped tooltipped-n" \n        aria-label="Success: The Travis CI build passed"\n    >disabled button</xui-button>\n</x-row>\n\n<x-row label="[default],size=large">\n    <xui-button size="large">Hello xui-button</xui-button>\n    <xui-button size="large" skin="primary">primary skin</xui-button>\n    <xui-button size="large" skin="danger">danger skin</xui-button>\n    <xui-button size="large" disabled skin="primary">disabled button</xui-button>\n    <xui-button size="large" loading disabled skin="primary">disabled button</xui-button>\n</x-row>\n\n<x-row label="icon">\n    <xui-button icon="refresh" />\n    <xui-button icon="refresh" disabled />\n    <xui-button icon="download" />\n    <xui-button icon="download" disabled />\n    <xui-button icon="sdk" />\n    <xui-button icon="sdk" disabled />\n</x-row>\n\n<x-row label="icon,label">\n    <xui-button icon="refresh" />\n    <xui-button icon="refresh">{{\'\u5237\u65B0\'|i18n}}</xui-button>\n    <xui-button icon="voice">Start</xui-button>\n    <xui-button icon="plus" skin="primary" label="{{\'\u521B\u5EFA\' | i18n}}" />\n</x-row>\n\n<x-row label="icon,label,size=large">\n    <xui-button on-click="onRefresh" icon="refresh" size="large">{{\'\u5237\u65B0\'|i18n}}</xui-button>\n    <xui-button on-click="onCreate" icon="plus" skin="primary" size="large">{{\'\u521B\u5EFA\'|i18n}}</xui-button>\n</x-row>\n\n<x-row label="icon,size=large">\n    <xui-toastlabel>\u975E\u6807\u51C6\u6837\u5F0F</xui-toastlabel>\n    <br/>\n    <xui-button icon="refresh" size="large" />\n    <xui-button icon="refresh" disabled size="large" />\n    <xui-button icon="download" size="large" />\n    <xui-button icon="download" disabled size="large" />\n    <xui-button icon="sdk" size="large" />\n    <xui-button icon="sdk" disabled size="large" />\n</x-row>\n\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-button.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-button': _sanXui.Button
    },
    onCreate: function onCreate() {
        this.$plain('On Create');
    },
    onRefresh: function onRefresh() {
        this.$plain('On Refresh');
    }
});

/***/ })

},[427])});;