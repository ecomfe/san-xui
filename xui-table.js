define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([20],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 469:
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
var template = '<template>\n<x-row label="[default]">\n    <xui-table\n        schema="{{table.schema}}"\n        cell-builder="{{table.cellRenderer}}"\n        on-command="onCommand($event)"\n        loading="{{table.loading}}"\n        error="{{table.error}}"\n        datasource="{{table.datasource}}">\n        <div class="ui-table-loading" slot="loading">\u81EA\u5B9A\u4E49\u52A0\u8F7D\u4E2D....</div>\n        <div class="ui-table-error" slot="error">\n            \u554A\u5440\uFF0C\u51FA\u9519\u4E86\uFF1F<a href="javascript:void(0)" on-click="refreshTable">\u91CD\u65B0\u52A0\u8F7D</a>\n        </div>\n    </xui-table>\n</x-row>\n\n<x-row label="select=multi">\n    <div class="xui-table-demo-toolbar">\n        <xui-searchbox search-btn="{{false}}" />\n        <xui-table-column-toggle\n            on-change="toggleTableColumns"\n            layer-align="right"\n            value="{=tct.value=}"\n            datasource="{{tct.datasource}}"\n            />\n    </div>\n\n    <xui-table select="multi"\n        schema="{{table.schema}}"\n        loading="{{table.loading}}"\n        error="{{table.error}}"\n        datasource="{{table.datasource}}"\n        selected-index="{=table.selectedIndex=}"\n        on-selected-change="onTableRowSelected($event)">\n\n        <div class="ui-table-loading" slot="loading">\u81EA\u5B9A\u4E49\u52A0\u8F7D\u4E2D....</div>\n        <div class="ui-table-error" slot="error">\n            \u554A\u5440\uFF0C\u51FA\u9519\u4E86\uFF1F<a href="javascript:void(0)" on-click="refreshTable">\u91CD\u65B0\u52A0\u8F7D</a>\n        </div>\n    </xui-table>\n    <p>Table Selected Index: {{table.selectedIndex}}</p>\n</x-row>\n\n<x-row label="select=single">\n    <xui-table select="single"\n        schema="{{table.schema}}"\n        loading="{{table.loading}}"\n        error="{{table.error}}"\n        datasource="{{table.datasource}}"\n        on-selected-change="onTableRowSelected($event)">\n\n        <div class="ui-table-loading" slot="loading">\u81EA\u5B9A\u4E49\u52A0\u8F7D\u4E2D....</div>\n        <div class="ui-table-error" slot="error">\n            \u554A\u5440\uFF0C\u51FA\u9519\u4E86\uFF1F<a href="javascript:void(0)" on-click="refreshTable">\u91CD\u65B0\u52A0\u8F7D</a>\n        </div>\n    </xui-table>\n</x-row>\n\n<x-row label="select=multi,freezed,\u5DE6\u51BB\u7ED3\u5217">\n    <xui-frozen-column-table\n        select="multi"\n        selected-index="{=freezedLeftTable.selectedIndex=}"\n        schema="{{freezedLeftTable.schema}}"\n        datasource="{{freezedLeftTable.datasource}}"\n        />\n    <p>Table Selected Index: {{freezedLeftTable.selectedIndex}}</p>\n</x-row>\n\n<x-row label="select=multi,freezed,\u5DE6\u53F3\u51BB\u7ED3\u5217">\n    <div class="xui-table-demo-toolbar">\n        <xui-button on-click="resetFreezedTableDatasource">Reset Datasource</xui-button>\n    </div>\n    <xui-frozen-column-table\n        select="multi"\n        selected-index="{=freezedTable.selectedIndex=}"\n        schema="{{freezedTable.schema}}"\n        datasource="{{freezedTable.datasource}}"\n        />\n    <p>Table Selected Index: {{freezedTable.selectedIndex}}</p>\n</x-row>\n\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-table.es
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-button': _sanXui.Button,
        'xui-boxgroup': _sanXui.BoxGroup,
        'xui-searchbox': _sanXui.SearchBox,
        'xui-table': _sanXui.Table,
        'xui-frozen-column-table': _sanXui.FrozenColumnTable,
        'xui-table-column-toggle': _sanXui.TableColumnToggle
    },
    initData: function initData() {
        return {
            tct: {
                value: ['name', 'age', 'gender'],
                datasource: [{ text: 'name', value: 'name' }, { text: 'age', value: 'age' }, { text: 'gender', value: 'gender' }]
            },
            freezedLeftTable: {
                selectedIndex: [1, 3],
                schema: [{ name: 'name', label: '标签/tag', freezed: true }, { name: 'DCC', label: '专属实例', freezed: true }, { name: 'BCC', label: 'BCC实例' }, { name: 'abc', label: '专属子XX' }, { name: 'CDS', label: '云磁盘' }, { name: 'EIP', label: '弹性公网' }, { name: 'BOS', label: '云存储' }, { name: 'RDS', label: '关系型数据库', width: 500 }, { name: 'SG', label: '安全组', width: 500 }, { name: 'BLB', label: '负载均衡' }, { name: 'EEE', label: '操作' }],
                datasource: [{ name: 'tag1', DCC: 1, BCC: 1, abc: 1, CDS: 1, EIP: 1, BOS: 1, RDS: 1, SG: 1, BLB: 1, EEE: 'sdfdsf' }, { name: 'tag2', DCC: 2, BCC: '2<br>3<br>4', abc: 2, CDS: 2, EIP: 2, BOS: 2, RDS: 2, SG: 2, BLB: 2, EEE: 'eee' }, { name: 'tag3', DCC: 3, BCC: 3, abc: 3, CDS: 3, EIP: 3, BOS: 3, RDS: 3, SG: 3, BLB: 3, EEE: 'xxx' }, { name: 'tag4', DCC: 4, BCC: 4, abc: 4, CDS: 4, EIP: 4, BOS: 4, RDS: 4, SG: 4, BLB: 4, EEE: 'xxx' }]
            },
            freezedTable: {
                selectedIndex: [1, 3],
                schema: [{ name: 'name', label: '标签/tag', freezed: true }, { name: 'DCC', label: '专属实例', freezed: true }, { name: 'BCC', label: 'BCC实例' }, { name: 'abc', label: '专属子XX' }, { name: 'CDS', label: '云磁盘' }, { name: 'EIP', label: '弹性公网' }, { name: 'BOS', label: '云存储' }, { name: 'RDS', label: '关系型数据库', width: 500 }, { name: 'SG', label: '安全组', width: 500 }, { name: 'BLB', label: '负载均衡' }, { name: 'EEE', label: '操作', freezed: true }],
                datasource: [{ name: 'tag1', DCC: 1, BCC: 1, abc: 1, CDS: 1, EIP: 1, BOS: 1, RDS: 1, SG: 1, BLB: 1, EEE: 'sdfdsf' }, { name: 'tag2', DCC: 2, BCC: '2<br>3<br>4', abc: 2, CDS: 2, EIP: 2, BOS: 2, RDS: 2, SG: 2, BLB: 2, EEE: 'eee' }, { name: 'tag3', DCC: 3, BCC: 3, abc: 3, CDS: 3, EIP: 3, BOS: 3, RDS: 3, SG: 3, BLB: 3, EEE: 'xxx' }, { name: 'tag4', DCC: 4, BCC: 4, abc: 4, CDS: 4, EIP: 4, BOS: 4, RDS: 4, SG: 4, BLB: 4, EEE: 'xxx' }]
            },
            table: {
                selectedIndex: [1],
                schema: [{ name: 'name', label: '姓名', labelClassName: 'col-name' }, {
                    name: 'age',
                    label: '年龄',
                    width: 500,
                    sortable: true,
                    filter: {
                        options: [{ text: '全部', value: 'foo' }, { text: '未审核', value: 'foo1' }, { text: '已审核', value: 'foo2' }, { text: '已通过', value: 'foo3' }]
                    }
                }, { name: 'gender', label: '性别', sortable: true }],
                datasource: [{ name: 'foo', age: 10, gender: 'M' }, { name: 'bar', age: 20, gender: 'F', xui__disabled: true }, { name: 'xxx', age: 20, gender: '未知' }],
                cellRenderer: function cellRenderer(item, key, col, rowIndex) {
                    if (key === 'gender') {
                        return '<a data-command="DELETE" href="javascript:void(0)">删除</a>';
                    }
                    return item[key];
                }
            }
        };
    },
    onTableRowSelected: function onTableRowSelected() {
        console.log('Table row selected');
    },
    onCommand: function onCommand(_ref) {
        var type = _ref.type,
            payload = _ref.payload,
            rowIndex = _ref.rowIndex;

        console.log(type, payload, rowIndex);
        this.data.removeAt('table.datasource', rowIndex - 1);
    },
    toggleTableColumns: function toggleTableColumns() {
        var columnNames = this.data.get('tct.value');
        var schema = this.data.get('table.schema');
        for (var i = 0; i < schema.length; i++) {
            // 如果不存在，说明需要隐藏
            var xuiHidden = columnNames.indexOf(schema[i].name) === -1;
            this.data.set('table.schema[' + i + '].xui__hidden', xuiHidden);
        }
    },
    resetFreezedTableDatasource: function resetFreezedTableDatasource() {
        var key = 'freezedTable.datasource[1].BCC';
        var bcc = this.data.get(key);
        this.data.set(key, bcc === '2' ? '2<br>3<br>4' : '2');
    }
});

/***/ })

},[469])});;