define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _ActionLoader = __webpack_require__(70);

var _ActionLoader2 = _interopRequireDefault(_ActionLoader);

var _controller = __webpack_require__(239);

var _controller2 = _interopRequireDefault(_controller);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

var _util = __webpack_require__(393);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file demos/xui-actionloader.es6
 * @author leeight
 */

_controller2.default.registerAction([{
    type: (0, _util.createAction)(),
    path: '/bar/foo/abc'
}, {
    type: (0, _util.createAction)(),
    path: '/bar/foo/123'
}]);

/* eslint-disable */
var template = '<template>\n<xui-toastlabel>\n\u901A\u8FC7 xui-actionloader \u53EF\u4EE5\u8BA9 San Page \u590D\u7528\u4E4B\u524D\u9057\u7559\u7684 ER Action\uFF0C\u672C\u8D28\u4E0A\u8DDF\u4E4B\u524D\u7684 ef/ActionPanel \u662F\u4E00\u6837\u7684\u601D\u8DEF.\n</xui-toastlabel>\n<br />\n\n<x-row label="[default]">\n    <xui-actionloader\n        url="/foo/bar/abc"\n    />\n</x-row>\n\n<x-row label="url=/bar/foo/abc">\n    <div>\n        <xui-button on-click="switchTo(\'/bar/foo/abc\')">/bar/foo/abc</xui-button>\n        <xui-button on-click="switchTo(\'/bar/foo/123\')">/bar/foo/123</xui-button>\n    </div>\n    <br />\n    <xui-actionloader url="{=action.url=}" />\n</x-row>\n\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-button': _sanXui.Button,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-actionloader': _ActionLoader2.default
    },
    initData: function initData() {
        return {
            action: {
                url: '/bar/foo/abc'
            }
        };
    },
    switchTo: function switchTo(url) {
        this.data.set('action.url', url);
    }
});

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file demos/util.es6
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author leeight
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.createAction = createAction;

var _promise = __webpack_require__(9);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleAction = function () {
    function SimpleAction(actionContext) {
        _classCallCheck(this, SimpleAction);

        this.context = actionContext;
    }

    _createClass(SimpleAction, [{
        key: 'enter',
        value: function enter(actionContext) {
            if (Math.random() > .8) {
                return _promise2.default.reject(new Error('RANDOM error on entering action...'));
            }

            var container = actionContext.container;
            var containerElement = document.getElementById(container);
            if (containerElement) {
                var now = new Date();
                var url = actionContext.url.toString();
                containerElement.innerHTML = '\n                <h1>Simple Action Loaded!</h1>\n                <h2>Url: ' + url + '</h2>\n                <h3>Time: ' + now + '</h3>\n            ';
                return _promise2.default.resolve();
            }
            return _promise2.default.reject(new Error('No such element, id = ' + container));
        }
    }]);

    return SimpleAction;
}();

function createAction() {
    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 350;

    return {
        createRuntimeAction: function createRuntimeAction(actionContext) {
            return new _promise2.default(function (resolve, reject) {
                setTimeout(function () {
                    return resolve(new SimpleAction(actionContext));
                }, ms);
            });
        }
    };
}

/***/ })

},[383])});;