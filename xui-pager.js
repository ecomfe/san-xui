define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([35],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 461:
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
var template = '<template>\n<x-row label="[default]">\n    <xui-pager size="{{pager.size}}"\n        page="{{pager.page}}"\n        count="{{pager.count}}"\n        on-change="onPagerChange($event)" />\n</x-row>\n<x-row label="back-text=\u4E0A\u4E00\u9875,forward-text=\u4E0B\u4E00\u9875">\n    <xui-pager size="{{pager.size}}"\n        with-total-count\n        page="{{pager.page}}"\n        count="{{pager.count}}"\n        back-text="\u4E0A\u4E00\u9875"\n        forward-text="\u4E0B\u4E00\u9875"\n        on-change="onPagerChange($event)" />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-pager.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-pager': _sanXui.Pager
    },
    initData: function initData() {
        return {
            pager: {
                size: 10,
                page: 1,
                count: 111
            }
        };
    },
    onPagerChange: function onPagerChange(_ref) {
        var pageNo = _ref.pageNo;

        this.data.set('pager.page', pageNo);
    }
});

/***/ })

},[461])});;