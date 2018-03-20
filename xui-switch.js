define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([21],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-switch.js
 * @author leeight
 */

var template = '<template>\n<xui-switch checked="{=switch.checked=}" />\n<xui-switch checked="{{false}}" />\n<xui-switch checked="{{false}}" disabled />\n<xui-button disabled="{{!switch.checked}}">Hello xui-switch</xui-button>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'xui-button': _sanXui.Button,
        'xui-switch': _sanXui.Switch
    },
    initData: function initData() {
        return {
            'switch': {
                checked: true
            }
        };
    }
});

/***/ })

},[477])});;