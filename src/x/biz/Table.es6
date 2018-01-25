/**
 * @file san-xui/x/biz/Table.es6
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import Table from '../components/Table';
// import TableColumnToggle from '../components/TableColumnToggle';
import FrozenColumnTable from '../components/FrozenColumnTable';

/* eslint-disable */
const template = `<template>
<ui-f-table
    s-if="frozen"
    schema="{{columns}}"
    select="{{table.select}}"
    loading="{{table.loading}}"
    error="{{table.error}}"
    datasource="{{table.datasource}}"
    cell-builder="{{table.cellRenderer}}"
    disabled-select-all="{{table.disabledSelectAll}}"
    selected-index="{=table.selectedIndex=}"
    on-command="onTableCommand($event)"
    on-filter="onFilter($event)"
    on-sort="onSort($event)"
    on-selected-change="onTableRowSelected($event)">
>
    <div slot="error">
        啊呀，出错了？<a href="javascript:void(0)" on-click="onRefresh">重新加载</a>
    </div>
</ui-f-table>

<ui-table
    s-else
    schema="{{columns}}"
    select="{{table.select}}"
    loading="{{table.loading}}"
    error="{{table.error}}"
    datasource="{{table.datasource}}"
    cell-builder="{{table.cellRenderer}}"
    disabled-select-all="{{table.disabledSelectAll}}"
    selected-index="{=table.selectedIndex=}"
    on-command="onTableCommand($event)"
    on-filter="onFilter($event)"
    on-sort="onSort($event)"
    on-selected-change="onTableRowSelected($event)">

    <div slot="error">
        啊呀，出错了？<a href="javascript:void(0)" on-click="onRefresh">重新加载</a>
    </div>
</ui-table>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-table': Table,
        'ui-f-table': FrozenColumnTable
    },
    computed: {
        frozen() {
            const columns = this.data.get('columns');
            for (let i = 0; i < columns.length; i++) {
                const col = columns[i];
                if (col.freezed) {
                    return true;
                }
            }
            return false;
        }
    },
    dataTypes: {
        columns: DataTypes.array,
        table: DataTypes.objectOf({
            error: DataTypes.any,
            loading: DataTypes.bool,
            disabledSelectAll: DataTypes.bool,
            datasource: DataTypes.array,
            selectedIndex: DataTypes.array,
            cellRenderer: DataTypes.func,
            select: DataTypes.string
        })
    },
    onTableCommand(event) {
        this.fire('command', event);
    },
    onFilter(event) {
        this.fire('filter', event);
    },
    onSort(event) {
        this.fire('sort', event);
    },
    onTableRowSelected(event) {
        this.fire('selected-change', event);
    },
    onRefresh() {
        this.fire('refresh');
    }
});
