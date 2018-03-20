define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([14],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 486:
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
var template = '<template>\n<x-row label="\u57FA\u672C\u529F\u80FD">\n    <xui-tree datasource="{{tree.datasource}}" on-expand="onExpand" on-collapse="onCollapse"/>\n</x-row>\n<x-row label="skin=block, expand-all=true \u8282\u70B9\u5168\u90E8\u5C55\u5F00">\n    <xui-tree datasource="{{tree.datasource}}" expand-all="{{true}}" skin="block"/>\n</x-row>\n<x-row label="skin=folder, expand-all=false">\n    <xui-tree datasource="{{tree.datasource}}" expand-all="{{false}}" skin="folder" on-click="onNodeClick"/>\n</x-row>\n<x-row label="multi=true,\u652F\u6301\u591A\u9009">\n    <xui-tree datasource="{{tree.datasource}}" multi="{{true}}" on-select="onSelect" on-unselect="onUnselect"/>\n</x-row>\n<x-row label="edit=true,\u652F\u6301\u7F16\u8F91">\n    <xui-tree datasource="{{tree.datasource}}" expand-all="{{true}}" edit="{{true}}"\n        on-create="onCreate" on-update="onUpdate" on-delete="onDelete"/>\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-tree.js
 * @author zhangzhe(zhangzhe@baidu.com)
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-tree': _sanXui.Tree
    },
    computed: {},
    initData: function initData() {
        return {
            tree: {
                datasource: {
                    value: '00000',
                    text: '根节点名称',
                    children: [{
                        value: '2',
                        text: '联盟研发部',
                        children: [{ value: '21', text: 'RD' }, { value: '22', text: 'FE' }, { value: '23', text: 'QA' }, { value: '24', text: 'PM' }]
                    }, {
                        value: '3',
                        text: '贴吧事业部',
                        children: [{ value: '31', text: 'RD' }, { value: '32', text: 'FE' }, { value: '33', text: 'QA' }, { value: '34', text: 'PM', children: [{ value: '341', text: 'PM1' }] }]
                    }, {
                        value: '4',
                        text: '百度音乐'
                    }]
                }
            }
        };
    },
    onExpand: function onExpand(evt) {
        console.log('\u6253\u5F00\u4E86\u8282\u70B9 ' + evt.node.value + ':"' + evt.node.text + '"');
    },
    onCollapse: function onCollapse(evt) {
        console.log('\u6536\u8D77\u4E86\u8282\u70B9 ' + evt.node.value + ':"' + evt.node.text + '"');
    },
    onSelect: function onSelect(evt) {
        console.log('\u52FE\u9009\u4E86\u8282\u70B9 ' + evt.node.value + ':"' + evt.node.text + '"');
        console.log('\u5F53\u524D\u9009\u4E2D\u7684\u8282\u70B9\u662F\uFF1A' + evt.value);
    },
    onUnselect: function onUnselect(evt) {
        console.log('\u53D6\u6D88\u52FE\u9009\u8282\u70B9 ' + evt.node.value + ':"' + evt.node.text + '"');
        console.log('\u5F53\u524D\u9009\u4E2D\u7684\u8282\u70B9\u662F\uFF1A' + evt.value);
    },
    onNodeClick: function onNodeClick(evt) {
        console.log('当前选中的节点是：');
        console.log(evt.node);
    },
    onCreate: function onCreate(evt) {
        console.log('新增节点');
        console.log(evt.node);
    },
    onUpdate: function onUpdate(evt) {
        console.log('更新节点');
        console.log(evt.node);
    },
    onDelete: function onDelete(evt) {
        console.log('删除节点');
        console.log(evt.node);
    }
});

/***/ })

},[486])});;