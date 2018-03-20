define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([56],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 433:
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
var template = '<template>\n<x-row label="radio">\n    <xui-boxgroup\n        box-type="radio"\n        datasource="{{boxgroup.datasource}}"\n        value="{=boxgroup.radio=}"\n        />\n    <strong class="large">\n    Value is: {{boxgroup.radio | stringify}}\n    </strong>\n</x-row>\n\n<x-row label="checkbox">\n    <xui-boxgroup\n        box-type="checkbox"\n        datasource="{{boxgroup.datasource}}"\n        value="{=boxgroup.checkbox=}"\n        />\n    <strong class="large">\n    Value is: {{boxgroup.checkbox | stringify}}\n    </strong>\n</x-row>\n\n<x-row label="checkbox,col-count=3,item-width=100">\n    <xui-boxgroup\n        box-type="checkbox"\n        col-count="{{3}}"\n        item-width="{{100}}"\n        datasource="{{boxgroup.datasource}}"\n        value="{=boxgroup.checkbox=}"\n        />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-boxgroup.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-boxgroup': _sanXui.BoxGroup
    },
    filters: {
        stringify: function stringify(value) {
            return JSON.stringify(value);
        }
    },
    initData: function initData() {
        return {
            boxgroup: {
                datasource: [{ text: 'foo', value: 'foo' }, { text: 'bar', value: 'bar' }, { text: '123', value: '123', disabled: true }, { text: 'number 1', value: 1 }, { text: 'string \'1\'', value: '1' }, { text: 'number 2', value: 2 }, { text: 'string \'2\'', value: '2' }, { text: 'bool true', value: true }, { text: 'bool false', value: false }, { text: 'object 1', value: { foo: 1 } }, { text: 'object 2', value: { bar: 1 } }, { text: 'abc9', value: 'abc9' }, { text: 'abc0', value: 'abc0' }]
            }
        };
    }
});

/***/ })

},[433])});;