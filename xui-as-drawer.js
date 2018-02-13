define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([57],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sanXui = __webpack_require__(3);

var _san = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file demos/xui-as-drawer.es6
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zhanghao25
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BizComponent = function (_Component) {
    _inherits(BizComponent, _Component);

    function BizComponent() {
        _classCallCheck(this, BizComponent);

        return _possibleConstructorReturn(this, (BizComponent.__proto__ || Object.getPrototypeOf(BizComponent)).apply(this, arguments));
    }

    _createClass(BizComponent, [{
        key: 'inited',
        value: function inited() {
            var _this2 = this;

            this.watch('payload.id', function (id) {
                return _this2._fetchData(id);
            });
        }
    }, {
        key: '_fetchData',
        value: function _fetchData(id) {
            var _this3 = this;

            this.dispatch('loading', true);

            setTimeout(function () {
                _this3.data.set('data', 'asdfasfasdf');
                _this3.dispatch('loading', false);
            }, 1000);
        }
    }, {
        key: 'template',
        get: function get() {
            return '\n            <template>\n                <div>\n                    <label>\u5F02\u6B65\u6570\u636E</label>\n                    <span>{{data}}</span>\n                </div>\n            </template>\n        ';
        }
    }]);

    return BizComponent;
}(_san.Component);

exports.default = (0, _san.defineComponent)({
    trimWhitespace: 'blank',
    template: '\n        <template>\n            <xui-as-drawer expand="{= expand =}" payload="{{payload}}" expandTo="{{expandTo}}">\n                <div slot="header">\u7EBF\u7D22ID\uFF1A{{payload.id}}</div>\n            </xui-as-drawer>\n\n            <button on-click="expandToLeft">left</button>\n            <button on-click="expandToRight">right</button>\n            <button on-click="expandToTop">top</button>\n            <button on-click="expandToBottom">bottom</button>\n        </template>\n    ',
    components: {
        'xui-as-drawer': (0, _sanXui.asDrawer)(BizComponent)
    },
    initData: function initData() {
        return {
            expand: true,
            expandTo: 'right',
            payload: { id: 123123 }
        };
    },
    expandToLeft: function expandToLeft() {
        var _this4 = this;

        // 先隐藏，再显示
        setTimeout(function () {
            _this4.data.set('payload', { id: 1 });
            _this4.data.set('expandTo', 'left');
            _this4.data.set('expand', true);
        }, 100);
    },
    expandToRight: function expandToRight() {
        var _this5 = this;

        // 先隐藏，再显示
        setTimeout(function () {
            _this5.data.set('payload', { id: 2 });
            _this5.data.set('expandTo', 'right');
            _this5.data.set('expand', true);
        }, 100);
    },
    expandToTop: function expandToTop() {
        var _this6 = this;

        // 先隐藏，再显示
        setTimeout(function () {
            _this6.data.set('payload', { id: 3 });
            _this6.data.set('expandTo', 'top');
            _this6.data.set('expand', true);
        }, 100);
    },
    expandToBottom: function expandToBottom() {
        var _this7 = this;

        // 先隐藏，再显示
        setTimeout(function () {
            _this7.data.set('payload', { id: 4 });
            _this7.data.set('expandTo', 'bottom');
            _this7.data.set('expand', true);
        }, 100);
    }
});

/***/ })

},[416])});;