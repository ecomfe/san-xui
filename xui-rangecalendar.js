define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([32],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 457:
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
var template = '<template>\n<xui-rangecalendar value="{=rangecalendar.value=}" />\n<xui-rangecalendar value="{=rangecalendar.value=}" disabled="{{true}}" />\n<xui-rangecalendar value="{=rangecalendar.value=}" shortcut="{{false}}" />\n<xui-rangecalendar value="{=rangecalendar.value=}" time="{{true}}" />\n<strong class="large">\n    Value is: {{rangecalendar.value.begin | datetime(\'YYYY-MM-DD\')}} - {{rangecalendar.value.end | datetime(\'YYYY-MM-DD\')}}\n</strong>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-rangecalendar.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'xui-rangecalendar': _sanXui.RangeCalendar
    },
    filters: {
        datetime: function datetime(value) {
            var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

            return (0, _moment2.default)(value).format(f);
        }
    },
    initData: function initData() {
        return {
            rangecalendar: {
                value: {
                    begin: new Date(2017, 9, 19), // 2017-10-19
                    end: new Date(2018, 0, 12) // 2018-01-12
                },
                range: {
                    begin: new Date(2017, 9, 18), // 2017-10-18
                    end: new Date(2018, 0, 19) // 2018-01-19
                }
            }
        };
    }
});

/***/ })

},[457])});;