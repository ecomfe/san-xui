/**
 * @file demos/xui-select.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Select from 'inf-ui/x/components/Select';
import ToastLabel from 'inf-ui/x/components/ToastLabel';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>Layer 暂时还不支持多级菜单的情况，不过控制台现在存在这种用法</xui-toastlabel>

<x-row label="[default]">
    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
    <xui-select datasource="{{select.datasource}}"  />
    <xui-select datasource="{{select.datasource}}" disabled />
    <strong class="large">
        Selected value: {{select.value}}
    </strong>
</x-row>
<x-row label="multi=true">
    <xui-select
        multi
        value="{=select.multi.value=}"
        datasource="{{select.datasource}}" />
    <strong class="large">
        Selected value: {{select.multi.value}}
    </strong>
</x-row>
<x-row label="multi=true,filter=true,layer-width=300">
    <xui-select
        multi
        filter
        filter-placeholder="输入域名查询，多个搜索项以空格分隔"
        layer-width="300"
        value="{=select.multi.value=}"
        datasource="{{select.datasource}}" />
    <strong class="large">
        Selected value: {{select.multi.value}}
    </strong>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-select': Select
    },
    initData() {
        return {
            select: {
                value: 'abc7',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true, tip: 'Disabled item'},
                    {text: 'abc1', value: 'abc1', tip: 'hello world'},
                    {text: 'abc2', value: 'abc2'},
                    {text: 'abc3', value: 'abc3'},
                    {text: 'abc4', value: 'abc4'},
                    {text: 'abc5', value: 'abc5'},
                    {text: 'abc6', value: 'abc6'},
                    {text: 'abc7', value: 'abc7'},
                    {text: 'abc8', value: 'abc8'},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            }
        };
    }
});
