/**
 * @file demos/xui-table.es
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, Table, TableColumnToggle, FrozenColumnTable, SearchBox, BoxGroup, Button} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-table
        schema="{{table.schema}}"
        cell-builder="{{table.cellRenderer}}"
        on-command="onCommand($event)"
        loading="{{table.loading}}"
        error="{{table.error}}"
        datasource="{{table.datasource}}">
        <div class="ui-table-loading" slot="loading">自定义加载中....</div>
        <div class="ui-table-error" slot="error">
            啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
        </div>
    </xui-table>
</x-row>

<x-row label="select=multi">
    <div class="xui-table-demo-toolbar">
        <xui-searchbox search-btn="{{false}}" />
        <xui-table-column-toggle
            on-change="toggleTableColumns"
            layer-align="right"
            value="{=tct.value=}"
            datasource="{{tct.datasource}}"
            />
    </div>

    <xui-table select="multi"
        schema="{{table.schema}}"
        loading="{{table.loading}}"
        error="{{table.error}}"
        datasource="{{table.datasource}}"
        selected-index="{=table.selectedIndex=}"
        on-selected-change="onTableRowSelected($event)">

        <div class="ui-table-loading" slot="loading">自定义加载中....</div>
        <div class="ui-table-error" slot="error">
            啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
        </div>
    </xui-table>
    <p>Table Selected Index: {{table.selectedIndex}}</p>
</x-row>

<x-row label="select=single">
    <xui-table select="single"
        schema="{{table.schema}}"
        loading="{{table.loading}}"
        error="{{table.error}}"
        datasource="{{table.datasource}}"
        on-selected-change="onTableRowSelected($event)">

        <div class="ui-table-loading" slot="loading">自定义加载中....</div>
        <div class="ui-table-error" slot="error">
            啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
        </div>
    </xui-table>
</x-row>

<x-row label="select=multi,freezed,左冻结列">
    <xui-frozen-column-table
        select="multi"
        selected-index="{=freezedLeftTable.selectedIndex=}"
        schema="{{freezedLeftTable.schema}}"
        datasource="{{freezedLeftTable.datasource}}"
        />
    <p>Table Selected Index: {{freezedLeftTable.selectedIndex}}</p>
</x-row>

<x-row label="select=multi,freezed,左右冻结列">
    <div class="xui-table-demo-toolbar">
        <xui-button on-click="resetFreezedTableDatasource">Reset Datasource</xui-button>
    </div>
    <xui-frozen-column-table
        select="multi"
        selected-index="{=freezedTable.selectedIndex=}"
        schema="{{freezedTable.schema}}"
        datasource="{{freezedTable.datasource}}"
        />
    <p>Table Selected Index: {{freezedTable.selectedIndex}}</p>
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-boxgroup': BoxGroup,
        'xui-searchbox': SearchBox,
        'xui-table': Table,
        'xui-frozen-column-table': FrozenColumnTable,
        'xui-table-column-toggle': TableColumnToggle
    },
    initData() {
        return {
            tct: {
                value: ['name', 'age', 'gender'],
                datasource: [
                    {text: 'name', value: 'name'},
                    {text: 'age', value: 'age'},
                    {text: 'gender', value: 'gender'}
                ]
            },
            freezedLeftTable: {
                selectedIndex: [1, 3],
                schema: [
                    {name: 'name', label: '标签/tag', freezed: true},
                    {name: 'DCC', label: '专属实例', freezed: true},
                    {name: 'BCC', label: 'BCC实例'},
                    {name: 'abc', label: '专属子XX'},
                    {name: 'CDS', label: '云磁盘'},
                    {name: 'EIP', label: '弹性公网'},
                    {name: 'BOS', label: '云存储'},
                    {name: 'RDS', label: '关系型数据库', width: 500},
                    {name: 'SG', label: '安全组', width: 500},
                    {name: 'BLB', label: '负载均衡'},
                    {name: 'EEE', label: '操作'}
                ],
                datasource: [
                    {name: 'tag1', DCC: 1, BCC: 1, abc: 1, CDS: 1, EIP: 1, BOS: 1, RDS: 1, SG: 1, BLB: 1, EEE: 'sdfdsf'},
                    {name: 'tag2', DCC: 2, BCC: '2<br>3<br>4', abc: 2, CDS: 2, EIP: 2, BOS: 2, RDS: 2, SG: 2, BLB: 2, EEE: 'eee'},
                    {name: 'tag3', DCC: 3, BCC: 3, abc: 3, CDS: 3, EIP: 3, BOS: 3, RDS: 3, SG: 3, BLB: 3, EEE: 'xxx'},
                    {name: 'tag4', DCC: 4, BCC: 4, abc: 4, CDS: 4, EIP: 4, BOS: 4, RDS: 4, SG: 4, BLB: 4, EEE: 'xxx'}
                ]
            },
            freezedTable: {
                selectedIndex: [1, 3],
                schema: [
                    {name: 'name', label: '标签/tag', freezed: true},
                    {name: 'DCC', label: '专属实例', freezed: true},
                    {name: 'BCC', label: 'BCC实例'},
                    {name: 'abc', label: '专属子XX'},
                    {name: 'CDS', label: '云磁盘'},
                    {name: 'EIP', label: '弹性公网'},
                    {name: 'BOS', label: '云存储'},
                    {name: 'RDS', label: '关系型数据库', width: 500},
                    {name: 'SG', label: '安全组', width: 500},
                    {name: 'BLB', label: '负载均衡'},
                    {name: 'EEE', label: '操作', freezed: true}
                ],
                datasource: [
                    {name: 'tag1', DCC: 1, BCC: 1, abc: 1, CDS: 1, EIP: 1, BOS: 1, RDS: 1, SG: 1, BLB: 1, EEE: 'sdfdsf'},
                    {name: 'tag2', DCC: 2, BCC: '2<br>3<br>4', abc: 2, CDS: 2, EIP: 2, BOS: 2, RDS: 2, SG: 2, BLB: 2, EEE: 'eee'},
                    {name: 'tag3', DCC: 3, BCC: 3, abc: 3, CDS: 3, EIP: 3, BOS: 3, RDS: 3, SG: 3, BLB: 3, EEE: 'xxx'},
                    {name: 'tag4', DCC: 4, BCC: 4, abc: 4, CDS: 4, EIP: 4, BOS: 4, RDS: 4, SG: 4, BLB: 4, EEE: 'xxx'}
                ]
            },
            table: {
                selectedIndex: [1],
                schema: [
                    {name: 'name', label: '姓名', labelClassName: 'col-name'},
                    {
                        name: 'age',
                        label: '年龄',
                        width: 500,
                        sortable: true,
                        filter: {
                            options: [
                                {text: '全部', value: 'foo'},
                                {text: '未审核', value: 'foo1'},
                                {text: '已审核', value: 'foo2'},
                                {text: '已通过', value: 'foo3'}
                            ]
                        }
                    },
                    {name: 'gender', label: '性别', sortable: true}
                ],
                datasource: [
                    {name: 'foo', age: 10, gender: 'M'},
                    {name: 'bar', age: 20, gender: 'F', xui__disabled: true},
                    {name: 'xxx', age: 20, gender: '未知'}
                ],
                cellRenderer(item, key, col, rowIndex) {
                    if (key === 'gender') {
                        return '<a data-command="DELETE" href="javascript:void(0)">删除</a>';
                    }
                    return item[key];
                }
            }
        };
    },
    onTableRowSelected() {
        console.log('Table row selected');
    },
    onCommand({type, payload, rowIndex}) {
        console.log(type, payload, rowIndex);
        this.data.removeAt('table.datasource', rowIndex - 1);
    },
    toggleTableColumns() {
        const columnNames = this.data.get('tct.value');
        const schema = this.data.get('table.schema');
        for (let i = 0; i < schema.length; i++) {
            // 如果不存在，说明需要隐藏
            const xuiHidden = columnNames.indexOf(schema[i].name) === -1;
            this.data.set(`table.schema[${i}].xui__hidden`, xuiHidden);
        }
    },
    resetFreezedTableDatasource() {
        const key = 'freezedTable.datasource[1].BCC';
        const bcc = this.data.get(key);
        this.data.set(key, bcc === '2' ? '2<br>3<br>4' : '2');
    }
});
