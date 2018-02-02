define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([8],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _RightToolbar = __webpack_require__(460);

var _RightToolbar2 = _interopRequireDefault(_RightToolbar);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * @file demos/xui-right-toolbar.es6
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\u901A\u8FC7JSON\u914D\u7F6E\uFF0C\u6765\u751F\u6210\u5DE5\u5177\u680F(Toolbar)\u533A\u57DF\u7684\u7EC4\u4EF6\u3002\u5F53\u524D\u652F\u6301\u7684\u7C7B\u578B\uFF1Abutton, button-group, link, divider</xui-toastlabel>\n\n<x-row label="[default]">\n    <div>\n    \u663E\u793A\u641C\u7D22\u6846\uFF1A<xui-switch checked="{=withSearchbox=}" />\n    \u663E\u793A\u81EA\u5B9A\u4E49\u5217\uFF1A<xui-switch checked="{=withTct=}" />\n    </div>\n    <hr />\n    <xui-right-toolbar\n        loading="{{disabled}}"\n\n        with-searchbox="{{withSearchbox}}"\n        searchbox-value="{{searchboxValue}}"\n        searchbox-keyword-type="{{searchboxKeywordType}}"\n        searchbox-placeholder="{{searchboxPlaceholder}}"\n        searchbox-keyword-types="{{searchboxKeywordTypes}}"\n\n        with-tct="{{withTct}}"\n        tct-value="{{tctValue}}"\n        tct-datasource="{{tctDatasource}}"\n\n        on-search="onSearch"\n        on-refresh="onRefresh"\n        on-table-columns-changed="onTableColumnsChanged"\n    />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-switch': _sanXui.Switch,
        'xui-right-toolbar': _RightToolbar2.default,
        'xui-toastlabel': _sanXui.ToastLabel
    },
    initData: function initData() {
        return {
            withSearchbox: true,
            searchboxValue: '默认值',
            searchboxPlaceholder: 'searchboxPlaceholder',
            searchboxKeywordType: 'FOO',
            searchboxKeywordTypes: [{ text: '--BAR--', value: 'BAR' }, { text: '--FOO--', value: 'FOO' }],
            withTct: true,
            tctValue: ['name', 'age', 'gender'],
            tctDatasource: [{ text: '姓名', value: 'name' }, { text: '年龄', value: 'age' }, { text: '性别', value: 'gender' }]
        };
    },
    onSearch: function onSearch() {
        _sanXui.Toast.normal('onSearch');
    },
    onRefresh: function onRefresh() {
        _sanXui.Toast.normal('onRefresh');
    },
    onTableColumnsChanged: function onTableColumnsChanged() {
        _sanXui.Toast.normal('onTableColumnsChanged');
    }
});

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _TableColumnToggle = __webpack_require__(218);

var _TableColumnToggle2 = _interopRequireDefault(_TableColumnToggle);

var _SearchBox = __webpack_require__(42);

var _SearchBox2 = _interopRequireDefault(_SearchBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<ui-searchbox\n    s-if="withSearchbox"\n    value="{=searchboxValue=}"\n    keyword-type="{=searchboxKeywordType=}"\n    placeholder="{{searchboxPlaceholder}}"\n    datasource="{{searchboxKeywordTypes}}"\n    on-search="onSearch"\n/>\n\n<ui-button disabled="{{loading}}" on-click="onRefresh" icon="refresh" />\n\n<ui-table-column-toggle\n    s-if="withTct"\n    on-change="onTableColumnsChanged"\n    layer-align="right"\n    layer-offset-left="{{0}}"\n    value="{=tctValue=}"\n    datasource="{{tctDatasource}}"\n    />\n</template>';
/* eslint-enable */

/**
 * 右侧工具条的区域，包括 SearchBox, RefreshButton, 自定义表格列的按钮
 *
 * @file san-xui/x/biz/RightToolbar.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'ui-table-column-toggle': _TableColumnToggle2.default,
        'ui-searchbox': _SearchBox2.default
    },
    dataTypes: {
        loading: _san.DataTypes.bool,

        withSearchbox: _san.DataTypes.bool,
        searchboxValue: _san.DataTypes.any,
        searchboxKeywordType: _san.DataTypes.string,
        searchboxPlaceholder: _san.DataTypes.string,
        searchboxKeywordTypes: _san.DataTypes.array,

        withTct: _san.DataTypes.bool,
        tctValue: _san.DataTypes.any,
        tctDatasource: _san.DataTypes.array
    },
    onSearch: function onSearch() {
        this.fire('search');
    },
    onRefresh: function onRefresh() {
        this.fire('refresh');
    },
    onTableColumnsChanged: function onTableColumnsChanged() {
        this.fire('table-columns-changed');
    }
});

/***/ })

},[459])});;