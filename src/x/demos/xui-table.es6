/**
 * @file demos/xui-table.es
 * @author leeight
 */

import {defineComponent} from 'san';
import Table from 'inf-ui/x/components/Table';
import TableColumnToggle from 'inf-ui/x/components/TableColumnToggle';
import SearchBox from 'inf-ui/x/components/SearchBox';
import BoxGroup from 'inf-ui/x/components/BoxGroup';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-table
        schema="{{table.schema}}"
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



</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-boxgroup': BoxGroup,
        'xui-searchbox': SearchBox,
        'xui-table': Table,
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
                ]
            }
        };
    },
    onTableRowSelected() {
        console.log('Table row selected');
    },
    toggleTableColumns() {
        const columnNames = this.data.get('tct.value');
        const schema = this.data.get('table.schema');
        for (let i = 0; i < schema.length; i++) {
            // 如果不存在，说明需要隐藏
            const xuiHidden = columnNames.indexOf(schema[i].name) === -1;
            this.data.set(`table.schema[${i}].xui__hidden`, xuiHidden);
        }
    }
});
