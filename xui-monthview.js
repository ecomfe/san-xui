define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([33],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<x-row label="[default]">\n    <xui-monthview value="{=monthview.value=}" range="{{monthview.range}}"/>\n    <strong class="large">\n        Value is: {{monthview.value | datetime(\'YYYY-MM-DD\')}}\n    </strong>\n</x-row>\n\n<x-row label="value type is string: 1985-03-08T01:44:48Z">\n    <xui-monthview value="1985-03-08T01:44:48Z"/>\n</x-row>\n\n<x-row label="time">\n    <xui-monthview time value="{=monthview.value=}" />\n    <strong class="large">\n        Value is: {{monthview.value | datetime(\'YYYY-MM-DD HH:mm:ss\')}}\n    </strong>\n</x-row>\n\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-monthview.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-monthview': _sanXui.MonthView
    },
    filters: {
        datetime: function datetime(value) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

            return (0, _moment2.default)(value).format(f);
        }
    },
    initData: function initData() {
        return {
            monthview: {
                value: new Date(),
                range: {
                    begin: new Date(2014, 4, 1),
                    end: new Date()
                }
            }
        };
    }
});

/***/ })

},[420])});;