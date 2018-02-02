define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([27],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 462:
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
var template = '<template>\n<xui-toastlabel>Layer \u6682\u65F6\u8FD8\u4E0D\u652F\u6301\u591A\u7EA7\u83DC\u5355\u7684\u60C5\u51B5\uFF0C\u4E0D\u8FC7\u63A7\u5236\u53F0\u73B0\u5728\u5B58\u5728\u8FD9\u79CD\u7528\u6CD5</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />\n    <xui-select datasource="{{select.datasource}}"  />\n    <xui-select datasource="{{select.datasource}}" disabled />\n    <xui-button on-click="showContainer">{{container.show ? \'\u9690\u85CF\' : \'\u663E\u793A\'}} Select</xui-button>\n    <div style="{{containerStyle}}">\n        <xui-select datasource="{{select.datasource}}"  />\n    </div>\n    <strong class="large">\n        Selected value: {{select.value}}\n    </strong>\n</x-row>\n<x-row label="multi=true">\n    <xui-select\n        multi\n        value="{=select.multi.value=}"\n        datasource="{{select.datasource}}" />\n    <strong class="large">\n        Selected value: {{select.multi.value}}\n    </strong>\n</x-row>\n<x-row label="multi=true,filter=true,layer-width=300">\n    <xui-select\n        multi\n        filter\n        filter-placeholder="\u8F93\u5165\u57DF\u540D\u67E5\u8BE2\uFF0C\u591A\u4E2A\u641C\u7D22\u9879\u4EE5\u7A7A\u683C\u5206\u9694"\n        layer-width="300"\n        value="{=select.multi.value=}"\n        datasource="{{select.datasource}}" />\n    <strong class="large">\n        Selected value: {{select.multi.value}}\n    </strong>\n</x-row>\n<x-row label="filter=true,layer-width=300">\n    <xui-select\n        filter\n        filter-placeholder="\u8F93\u5165\u57DF\u540D\u67E5\u8BE2\uFF0C\u591A\u4E2A\u641C\u7D22\u9879\u4EE5\u7A7A\u683C\u5206\u9694"\n        layer-width="300"\n        value="{=select.value=}"\n        datasource="{{select.datasource}}" />\n    <strong class="large">\n        Selected value: {{select.value}}\n    </strong>\n</x-row>\n<x-row label="\u5206\u7EC4\u5C55\u793A,filter=true,layer-width=300">\n    <xui-select\n        filter\n        filter-placeholder="\u8F93\u5165\u57DF\u540D\u67E5\u8BE2\uFF0C\u591A\u4E2A\u641C\u7D22\u9879\u4EE5\u7A7A\u683C\u5206\u9694"\n        layer-width="300"\n        value="{=groupSelect.value=}"\n        datasource="{{groupSelect.datasource}}" />\n    <strong class="large">\n        Selected value: {{groupSelect.value}}\n    </strong>\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-select.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-button': _sanXui.Button,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-select': _sanXui.Select
    },
    computed: {
        containerStyle: function containerStyle() {
            var show = this.data.get('container.show');
            var style = {
                display: show ? 'inline-block' : 'none'
            };
            return style;
        }
    },
    initData: function initData() {
        return {
            container: {
                show: false
            },
            select: {
                value: 'abc7',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [{ text: 'foo', value: 'foo' }, { text: 'bar', value: 'bar' }, { text: '123', value: '123', disabled: true, tip: 'Disabled item' }, { text: 'abc1', value: 'abc1', tip: 'hello world' }, { text: 'abc2', value: 'abc2' }, { text: 'abc3', value: 'abc3' }, { text: 'abc4', value: 'abc4' }, { text: 'abc5', value: 'abc5' }, { text: 'abc6', value: 'abc6' }, { text: 'abc7', value: 'abc7' }, { text: 'abc8', value: 'abc8' }, { text: 'abc9', value: 'abc9' }, { text: 'abc0', value: 'abc0' }]
            },
            groupSelect: {
                value: 'abc7',
                datasource: [{ group: '分组1', text: 'foo', value: 'foo' }, { group: '分组1', text: 'bar', value: 'bar' }, { group: '分组1', text: '123', value: '123', disabled: true, tip: 'Disabled item' }, { group: '分组2', text: 'abc1', value: 'abc1', tip: 'hello world' }, { group: '分组2', text: 'abc2', value: 'abc2' }, { group: '分组2', text: 'abc3', value: 'abc3' }, { group: '分组2', text: 'abc4', value: 'abc4' }, { group: '分组2', text: 'abc5', value: 'abc5' }, { group: '分组3', text: 'abc6', value: 'abc6' }, { group: '分组4', text: 'abc7', value: 'abc7' }, { group: '分组4', text: 'abc8', value: 'abc8' }, { group: '分组4', text: 'abc9', value: 'abc9' }, { group: '分组4', text: 'abc0', value: 'abc0' }]
            }
        };
    },
    showContainer: function showContainer() {
        var show = this.data.get('container.show');
        this.data.set('container.show', !show);
    }
});

/***/ })

},[462])});;