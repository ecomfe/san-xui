define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([27],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 471:
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
var template = '<template>\n<x-row label="[default]">\n    <xui-searchbox />\n</x-row>\n<x-row label="[default],datasource">\n    <xui-searchbox\n        value="{=searchbox.keyword=}"\n        keyword-type="{=searchbox.keywordType=}"\n        datasource="{{searchbox.keywordTypes}}"\n        />\n    <strong class="large">\n    Keyword Type: {{searchbox.keywordType}}, Keyword: {{searchbox.keyword}}\n    </strong>\n</x-row>\n<x-row label="disabled">\n    <xui-searchbox disabled />\n</x-row>\n<x-row label="search-btn=false">\n    <xui-searchbox search-btn="{{false}}" />\n    <xui-button icon="refresh" />\n    <xui-button icon="download" />\n</x-row>\n<x-row label="placeholder=\u8BF7\u8F93\u5165\u5B9E\u4F8B\u540D\u79F0\u8FDB\u884C\u641C\u7D22">\n    <xui-searchbox placeholder="\u8BF7\u8F93\u5165\u5B9E\u4F8B\u540D\u79F0\u8FDB\u884C\u641C\u7D22" />\n    <xui-button icon="refresh" />\n    <xui-button icon="download" />\n</x-row>\n<x-row label="width=100,placeholder=\u8BF7\u8F93\u5165\u5B9E\u4F8B\u540D\u79F0\u8FDB\u884C\u641C\u7D22">\n    <xui-searchbox\n        width="100"\n        placeholder="\u8BF7\u8F93\u5165\u5B9E\u4F8B\u540D\u79F0\u8FDB\u884C\u641C\u7D22"\n        value="{=searchbox.keyword=}"\n        keyword-type="{=searchbox.keywordType=}"\n        datasource="{{searchbox.keywordTypes}}"\n    />\n    <xui-checkbox title="\u8FC7\u6EE40\u5143\u8D26\u5355" />\n    <xui-button icon="refresh" />\n    <xui-button icon="download" />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-searchbox.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-radiobox': _sanXui.RadioBox,
        'xui-checkbox': _sanXui.CheckBox,
        'xui-button': _sanXui.Button,
        'xui-searchbox': _sanXui.SearchBox
    },
    initData: function initData() {
        return {
            searchbox: {
                keyword: '',
                keywordType: 'ID',
                keywordTypes: [{ text: '实例名称', value: 'NAME' }, { text: '实例ID', value: 'ID' }]
            }
        };
    }
});

/***/ })

},[471])});;