define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _Toolbar = __webpack_require__(485);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * @file demos/xui-toolbar.js
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\u901A\u8FC7JSON\u914D\u7F6E\uFF0C\u6765\u751F\u6210\u5DE5\u5177\u680F(Toolbar)\u533A\u57DF\u7684\u7EC4\u4EF6\u3002\u5F53\u524D\u652F\u6301\u7684\u7C7B\u578B\uFF1Abutton, button-group, link, divider</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-toolbar controls="{{controls}}" on-item-clicked="onItemClicked" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-toolbar': _Toolbar2.default,
        'xui-toastlabel': _sanXui.ToastLabel
    },
    initData: function initData() {
        return {
            controls: [{
                type: 'button',
                icon: 'plus',
                disabled: false,
                skin: 'primary',
                label: 'Create'
            }, {
                type: 'button-group',
                disabled: false,
                datasource: [{ text: 'FOO', value: 'FOO' }, { text: 'BAR', value: 'BAR' }, { text: '123', value: '123' }]
            }, {
                type: 'link',
                link: 'https://www.baidu.com',
                label: 'www.baidu.com'
            }]
        };
    },
    onItemClicked: function onItemClicked(event) {
        _sanXui.Toast.success(JSON.stringify(event));
    }
});

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _Button = __webpack_require__(6);

var _Button2 = _interopRequireDefault(_Button);

var _RadioSelect = __webpack_require__(52);

var _RadioSelect2 = _interopRequireDefault(_RadioSelect);

var _Icon = __webpack_require__(18);

var _Icon2 = _interopRequireDefault(_Icon);

var _helper = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<ui-ghost s-for="item in controls">\n    <ui-button\n        s-if="item.type === \'button\'"\n        on-click="onToolbarEvent(item)"\n        disabled="{{item.disabled}}"\n        icon="{{item.icon}}"\n        label="{{item.label}}"\n        skin="{{item.skin}}"\n        />\n    <ui-radioselect\n        s-if="item.type === \'button-group\'"\n        value="{{item.value}}"\n        disabled="{{item.disabled}}"\n        on-change="onToolbarEvent($event)"\n        datasource="{{item.datasource}}"\n        />\n    <a\n        s-if="item.type === \'link\'"\n        target="_blank"\n        href="{{item.link}}">\n        <ui-icon s-if="{{item.icon}}" name="{{item.icon}}" />\n        {{item.label}}\n    </a>\n    <span s-if="item.type === \'divider\'">&nbsp;</span>\n</ui-ghost>\n</template>';
/* eslint-enable */

/**
 * 左侧工具栏的区域，包括 Button, ButtonGroupp, 链接 等等
 * @file san-xui/x/biz/Toolbar.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'ui-ghost': _helper.Ghost,
        'ui-button': _Button2.default,
        'ui-radioselect': _RadioSelect2.default,
        'ui-icon': _Icon2.default
    },
    dataTypes: {
        controls: _san.DataTypes.array
    },
    onToolbarEvent: function onToolbarEvent(event) {
        this.fire('item-clicked', event);
    }
});

/***/ })

},[484])});;