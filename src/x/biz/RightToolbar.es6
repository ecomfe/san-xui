/**
 * 右侧工具条的区域，包括 SearchBox, RefreshButton, 自定义表格列的按钮
 *
 * @file san-xui/x/biz/RightToolbar.es6
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import TableColumnToggle from '../components/TableColumnToggle';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';

/* eslint-disable */
const template = `<template>
<ui-searchbox
    s-if="withSearchbox"
    value="{=searchboxValue=}"
    keyword-type="{=searchboxKeywordType=}"
    placeholder="{{searchboxPlaceholder}}"
    datasource="{{searchboxKeywordTypes}}"
    on-search="onSearch"
/>
<ui-button s-if="withBatchDelete" on-click="onBatchDelete">批量删除</ui-button>
<ui-button disabled="{{loading}}" on-click="onRefresh" icon="refresh" />

<ui-table-column-toggle
    s-if="withTct"
    on-change="onTableColumnsChanged"
    layer-align="right"
    layer-offset-left="{{0}}"
    value="{=tctValue=}"
    datasource="{{tctDatasource}}"
    />
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-table-column-toggle': TableColumnToggle,
        'ui-searchbox': SearchBox,
        'ui-button': Button
    },
    dataTypes: {
        loading: DataTypes.bool,

        withSearchbox: DataTypes.bool,
        withBatchDelete: DataTypes.bool,
        searchboxValue: DataTypes.any,
        searchboxKeywordType: DataTypes.string,
        searchboxPlaceholder: DataTypes.string,
        searchboxKeywordTypes: DataTypes.array,

        withTct: DataTypes.bool,
        tctValue: DataTypes.any,
        tctDatasource: DataTypes.array
    },
    onSearch() {
        this.fire('search');
    },
    onRefresh() {
        this.fire('refresh');
    },
    onTableColumnsChanged() {
        this.fire('table-columns-changed');
    },
    onBatchDelete() {
        this.fire('batch-delete');
    }
});
