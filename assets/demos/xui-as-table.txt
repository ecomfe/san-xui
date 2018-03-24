/**
 * @file demos/xui-as-table.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Tip, Toast, Row, Button, ToastLabel, Table} from 'san-xui';

const kTableColumns = [
    {name: 'name', label: '姓名', labelClassName: 'col-name'},
    {name: 'age', label: '年龄', sortable: true},
    {name: 'gender', label: '性别', sortable: true}
];

const template = `
<template>

<xui-toastlabel>
项目中的真实案例，请参考：<a target="_blank" href="http://icode.baidu.com/repos/baidu/bce-multimedia/face-demo/tree/master:fe_source/src/face/v3/">face-demo</a>
</xui-toastlabel>

<x-row label="[default]">
    <xui-table
        select="multi"
        datasource="{{table.datasource}}"
        schema="{{table.schema}}"
        on-selected-change="onTableRowSelected($event)"
    >
        <div slot="c-age">
            {{row.age}}
            <xui-tip message="{{row.name}} 的年龄是：{{row.age}}" />
        </div>
        <div slot="c-gender"><xui-button on-click="incAge(rowIndex)">{{row.gender}}, CLICK TO INC THE AGE</xui-button></div>
    <xui-table>
</x-row>

</template>
`;

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-tip': Tip,
        'xui-toastlabel': ToastLabel,
        'xui-button': Button,
        'xui-table': Table
    },
    onTableRowSelected() {
        Toast.info('Table row selected');
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
    },
    incAge(rowIndex) {
        const key = `table.datasource[${rowIndex}].age`;
        const age = this.data.get(key);
        this.data.set(key, age + 10);
    }
});
