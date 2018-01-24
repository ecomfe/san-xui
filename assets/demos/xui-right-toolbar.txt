/**
 * @file inf-ui/x/demos/xui-right-toolbar.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import RightToolbar from 'inf-ui/x/biz/RightToolbar';
import Toast from 'inf-ui/x/components/Toast';
import ToastLabel from 'inf-ui/x/components/ToastLabel';
import Switch from 'inf-ui/x/components/Switch';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成工具栏(Toolbar)区域的组件。当前支持的类型：button, button-group, link, divider</xui-toastlabel>

<x-row label="[default]">
    <div>
    显示搜索框：<xui-switch checked="{=withSearchbox=}" />
    显示自定义列：<xui-switch checked="{=withTct=}" />
    </div>
    <hr />
    <xui-right-toolbar
        loading="{{disabled}}"

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
    }
});
