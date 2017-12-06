/**
 * @file inf-ui/x/demo/xui-as-table.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import Tip from 'inf-ui/x/components/Tip';
import Button from 'inf-ui/x/components/Button';
import {asTable} from 'inf-ui/x/components/asTable';

import Row from './Row';

const kTableColumns = [
    {name: 'name', label: '姓名', labelClassName: 'col-name'},
    {name: 'age', label: '年龄', sortable: true},
    {name: 'gender', label: '性别', sortable: true}
];
const MyTable = asTable(kTableColumns);

const template = `
<template>

<x-row label="[default]">
    <xui-table datasource="{{table.datasource}}" schema="{{table.schema}}">
        <div slot="name"><xui-button>{{row.name}}</xui-button></div>
        <div slot="age">
            {{row.age}}
            <xui-tip message="{{row.name}} 的年龄是：{{row.age}}" />
        </div>
        <div slot="gender"><xui-button>{{row.gender}}</xui-button></div>
    <xui-table>
</x-row>

</template>
`;

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-tip': Tip,
        'xui-button': Button,
        'xui-table': MyTable
    },
    initData() {
        return {
            table: {
                schema: kTableColumns,
                datasource: [
                    {name: 'foo', age: 10, gender: 'M'},
                    {name: 'bar', age: 20, gender: 'F', xui__disabled: true},
                    {name: 'xxx', age: 20, gender: '未知'}
                ]
            }
        };
    }
});
