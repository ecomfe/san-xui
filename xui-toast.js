define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([17],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-toast.es6
 * @author leeight
 */

var template = '<template>\n<xui-button on-click="showToast(\'success\')">Show Success Toast</xui-button>\n<xui-button on-click="showToast(\'info\')">Show Info Toast</xui-button>\n<xui-button on-click="showToast(\'warning\')">Show Warning Toast</xui-button>\n<xui-button on-click="showToast(\'error\')">Show Error Toast</xui-button>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'xui-button': _sanXui.Button,
        'xui-toast': _sanXui.Toast
    },
    initData: function initData() {
        return {};
    },
    showToast: function showToast(level) {
        if (typeof _sanXui.Toast[level] === 'function') {
            var message = 'This is a toast message';
            _sanXui.Toast[level](message);
        } else {
            alert('Unsupported toast level = ' + level);
        }
    }
});

/***/ })

},[474])});;