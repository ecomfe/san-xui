define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([47],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 401:
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
var template = '<template>\n\n<x-row label="[default]">\n    <xui-calendar value="{=calendar.value=}" range="{{calendar.range}}"/>\n    <strong class="large">\n        Value is: {{calendar.value | datetime(\'YYYY-MM-DD\')}}\n    </strong>\n</x-row>\n\n<x-row label="value type is string: 1985-03-08T01:44:48Z">\n    <xui-calendar value="1985-03-08T01:44:48Z" />\n</x-row>\n\n<x-row label="prev,next,time">\n    <xui-calendar prev next time value="{=calendar.value=}" />\n    <strong class="large">\n        Value is: {{calendar.value | datetime(\'YYYY-MM-DD HH:mm:ss\')}}\n    </strong>\n</x-row>\n\n<x-row label="disabled">\n    <xui-calendar value="{=calendar.value=}" disabled />\n</x-row>\n\n<x-row label="disabled,prev,next">\n    <xui-calendar prev next value="{=calendar.value=}" disabled />\n</x-row>\n\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-calendar.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-calendar': _sanXui.Calendar
    },
    filters: {
        datetime: function datetime(value) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

            return (0, _moment2.default)(value).format(f);
        }
    },
    initData: function initData() {
        return {
            calendar: {
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

},[401])});;