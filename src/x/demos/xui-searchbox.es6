/**
 * @file demos/xui-searchbox.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import SearchBox from 'inf-ui/x/components/SearchBox';
import Button from 'inf-ui/x/components/Button';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-searchbox />
</x-row>
<x-row label="[default],datasource">
    <xui-searchbox
        value="{=searchbox.keyword=}"
        keyword-type="{=searchbox.keywordType=}"
        datasource="{{searchbox.keywordTypes}}"
        />
    <strong class="large">
    Keyword Type: {{searchbox.keywordType}}, Keyword: {{searchbox.keyword}}
    </strong>
</x-row>
<x-row label="disabled">
    <xui-searchbox disabled />
</x-row>
<x-row label="search-btn=false">
    <xui-searchbox search-btn="{{false}}" />
    <xui-button icon="refresh" />
    <xui-button icon="download" />
</x-row>
<x-row label="placeholder=请输入实例名称进行搜索">
    <xui-searchbox placeholder="请输入实例名称进行搜索" />
    <xui-button icon="refresh" />
    <xui-button icon="download" />
</x-row>
<x-row label="width=100,placeholder=请输入实例名称进行搜索">
    <xui-searchbox
        width="100"
        placeholder="请输入实例名称进行搜索"
        value="{=searchbox.keyword=}"
        keyword-type="{=searchbox.keywordType=}"
        datasource="{{searchbox.keywordTypes}}"
    />
    <xui-button icon="refresh" />
    <xui-button icon="download" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-searchbox': SearchBox
    },
    initData() {
        return {
            searchbox: {
                keyword: '',
                keywordType: 'ID',
                keywordTypes: [
                    {text: '实例名称', value: 'NAME'},
                    {text: '实例ID', value: 'ID'}
                ]
            }
        };
    }
});
