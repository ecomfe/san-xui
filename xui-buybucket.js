define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([51],{

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

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<x-row label="[default],previous">\n    <xui-buybucket\n        previous\n        datasource="{{buybucket.datasource}}" />\n</x-row>\n<x-row label="disabled,tip=This is a tip message">\n    <xui-buybucket\n        disabled\n        previous\n        tip="{{buybucket.tip}}"\n        datasource="{{buybucket.datasource}}" />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-buybucket.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-buybucket': _sanXui.BuyBucket
    },
    initData: function initData() {
        return {
            buybucket: {
                tip: '温馨提示：按需计费类型的集群子节点已经售罄，百度云正在积极扩容中，建议您先购买包年包月类型的集群， 或者提<a href="javascript:void(0)">工单</a>申请按需资源，谢谢。',
                datasource: [{ title: '地域', content: '华北 - 北京' }, { title: '可用区', content: '可用区A' }, { title: '购买配置', content: 'CPU：1核、内存：1GB、本地磁盘：20GB、公网带宽1Mbps' }, { title: '购买配额', content: '1台 * 1月' }, { title: '购买配额(2)', content: '2台 * 2月', hidden: true }, { title: '配置费用', content: '￥1296.00' }]
            }
        };
    }
});

/***/ })

},[430])});;