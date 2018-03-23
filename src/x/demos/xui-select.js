/**
 * @file demos/xui-select.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, Select, Button, ToastLabel} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>Layer 暂时还不支持多级菜单的情况，不过控制台现在存在这种用法</xui-toastlabel>

<x-row label="[default]">
    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
    <xui-select datasource="{{select.datasource}}" />
    <xui-select datasource="{{select.datasource}}" default-label="没有选中任何项目" />
    <xui-select datasource="{{select.datasource}}" disabled />
    <xui-button on-click="showContainer">{{container.show ? '隐藏' : '显示'}} Select</xui-button>
    <div style="{{containerStyle}}">
        <xui-select datasource="{{select.datasource}}"  />
    </div>
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
<x-row label="filter=true,layer-width=300">
    <xui-select
        filter
        filter-placeholder="输入域名查询，多个搜索项以空格分隔"
        layer-width="300"
        value="{=select.value=}"
        datasource="{{select.datasource}}" />
    <strong class="large">
        Selected value: {{select.value}}
    </strong>
</x-row>
<x-row label="分组展示,filter=true,layer-width=300">
    <xui-select
        filter
        filter-placeholder="输入域名查询，多个搜索项以空格分隔"
        layer-width="300"
        value="{=groupSelect.value=}"
        datasource="{{groupSelect.datasource}}" />
    <strong class="large">
        Selected value: {{groupSelect.value}}
    </strong>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-toastlabel': ToastLabel,
        'xui-select': Select
    },
    computed: {
        containerStyle() {
            const show = this.data.get('container.show');
            const style = {
                display: show ? 'inline-block' : 'none'
            };
            return style;
        }
    },
    initData() {
        return {
            container: {
                show: false
            },
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
            },
            groupSelect: {
                value: 'abc7',
                datasource: [
                    {group: '分组1', text: 'foo', value: 'foo'},
                    {group: '分组1', text: 'bar', value: 'bar'},
                    {group: '分组1', text: '123', value: '123', disabled: true, tip: 'Disabled item'},
                    {group: '分组2', text: 'abc1', value: 'abc1', tip: 'hello world'},
                    {group: '分组2', text: 'abc2', value: 'abc2'},
                    {group: '分组2', text: 'abc3', value: 'abc3'},
                    {group: '分组2', text: 'abc4', value: 'abc4'},
                    {group: '分组2', text: 'abc5', value: 'abc5'},
                    {group: '分组3', text: 'abc6', value: 'abc6'},
                    {group: '分组4', text: 'abc7', value: 'abc7'},
                    {group: '分组4', text: 'abc8', value: 'abc8'},
                    {group: '分组4', text: 'abc9', value: 'abc9'},
                    {group: '分组4', text: 'abc0', value: 'abc0'}
                ]
            }
        };
    },
    showContainer() {
        const show = this.data.get('container.show');
        this.data.set('container.show', !show);
    }
});
