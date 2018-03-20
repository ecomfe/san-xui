define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([45],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(10);

var _promise2 = _interopRequireDefault(_promise);

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sanXui.Go.setSwitchHandler(function (event, comp) {
    // XXX 真实场景下，在 common 里面会实现这个逻辑；在 DEMO 里面，就随便写写好了。
    var hash = comp.data.get('href');
    location.hash = hash;
    return _promise2.default.resolve();
});

/* eslint-disable */
/**
 * @file demos/xui-go.js
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\n\u5728\u767E\u5EA6\u4E91\u63A7\u5236\u53F0\u4E2D\uFF0C\u4ECE <code>\u670D\u52A1A</code> \u8DF3\u8F6C\u5230 <code>\u670D\u52A1B</code> \u7684\u65F6\u5019\uFF0C\u6D89\u53CA\u5230\u6BD4\u8F83\u590D\u6742\u7684\u52A0\u8F7D\u673A\u5236\u3002<br />\n\u76F4\u63A5\u7528 &lt;a&gt; \u4F1A\u5BFC\u81F4\u516C\u5171\u7684\u4EE3\u7801\u91CD\u590D\u52A0\u8F7D\uFF0C\u6240\u4EE5\u8FD9\u91CC\u7279\u6B8A\u5904\u7406\u4E00\u4E0B\uFF0C&lt;xui-go href=&quot;/billing/#/foo/bar&quot;&gt;...&lt;/xui-go&gt;\u3002\n</xui-toastlabel>\n<br />\n<xui-go href="#comp=xui-button">Goto xui-button</xui-go>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-go': _sanXui.Go
    },
    initData: function initData() {
        return {};
    }
});

/***/ })

},[451])});;