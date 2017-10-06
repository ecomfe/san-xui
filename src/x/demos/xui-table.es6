/**
 * @file demos/xui-table.es
 * @author leeight
 */

import {defineComponent} from 'san';
import Table from 'inf-ui/x/components/Table';

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
        'xui-table': Table
    },
    initData() {
        return {
            table: {
                selectedIndex: [1],
                schema: [
                    {name: 'name', label: '姓名', labelClassName: 'col-name'},
                    {name: 'age', label: '年龄', width: 500, sortable: true},
                    {name: 'gender', label: '性别', sortable: true}
                ],
                datasource: [
                    {name: 'foo', age: 10, gender: 'M'},
                    {name: 'bar', age: 20, gender: 'F'},
                    {name: 'xxx', age: 20, gender: '未知'}
                ]
            }
        };
    },
    onTableRowSelected() {
        console.log('Table row selected');
    }
});
