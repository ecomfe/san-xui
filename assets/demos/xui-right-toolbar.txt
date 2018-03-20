/**
 * @file demos/xui-right-toolbar.js
 * @author leeight
 */

import {defineComponent} from 'san';
import RightToolbar from 'san-xui/x/biz/RightToolbar';
import {Toast, ToastLabel, Switch} from 'san-xui';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成工具栏(Toolbar)区域的组件。当前支持的类型：button, button-group, link, divider</xui-toastlabel>

<x-row label="[default]">
    <div>
    显示批量删除：<xui-switch checked="{=withBatchDelete=}" />
    显示搜索框：<xui-switch checked="{=withSearchbox=}" />
    显示自定义列：<xui-switch checked="{=withTct=}" />
    </div>
    <hr />
    <xui-right-toolbar
        loading="{{disabled}}"
        with-batch-delete="{{withBatchDelete}}"
        with-searchbox="{{withSearchbox}}"
        searchbox-value="{{searchboxValue}}"
        searchbox-keyword-type="{{searchboxKeywordType}}"
        searchbox-placeholder="{{searchboxPlaceholder}}"
        searchbox-keyword-types="{{searchboxKeywordTypes}}"

        with-tct="{{withTct}}"
        tct-value="{{tctValue}}"
        tct-datasource="{{tctDatasource}}"

        on-search="onSearch"
        on-refresh="onRefresh"
        on-table-columns-changed="onTableColumnsChanged"
        on-batch-delete="onBatchDelete"
    />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-switch': Switch,
        'xui-right-toolbar': RightToolbar,
        'xui-toastlabel': ToastLabel
    },
    initData() {
        return {
            withBatchDelete: true,
            withSearchbox: true,
            searchboxValue: '默认值',
            searchboxPlaceholder: 'searchboxPlaceholder',
            searchboxKeywordType: 'FOO',
            searchboxKeywordTypes: [
                {text: '--BAR--', value: 'BAR'},
                {text: '--FOO--', value: 'FOO'}
            ],
            withTct: true,
            tctValue: ['name', 'age', 'gender'],
            tctDatasource: [
                {text: '姓名', value: 'name'},
                {text: '年龄', value: 'age'},
                {text: '性别', value: 'gender'}
            ]
        };
    },
    onSearch() {
        Toast.normal('onSearch');
    },
    onRefresh() {
        Toast.normal('onRefresh');
    },
    onTableColumnsChanged() {
        Toast.normal('onTableColumnsChanged');
    },
    onBatchDelete() {
        Toast.normal('onBatchDelete');
    }
});
