/**
 * @file inf-ui/x/biz/RightToolbar.es6
 * @author leeight
 */

import {DataTypes} from 'san';
import {defineComponent} from 'inf-ui/sanx';
import TableColumnToggle from 'inf-ui/x/components/TableColumnToggle';
import SearchBox from 'inf-ui/x/components/SearchBox';

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
        'ui-searchbox': SearchBox
    },
    dataTypes: {
        loading: DataTypes.bool,

        withSearchbox: DataTypes.bool,
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
    }
});
