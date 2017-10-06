/**
 * @file demos/xui-select.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Select from 'inf-ui/x/components/Select';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
    <xui-select datasource="{{select.datasource}}"  />
    <xui-select datasource="{{select.datasource}}" disabled />
    <br/>
    <strong class="large">
        Selected value: {{select.value}}
    </strong>
</x-row>
<x-row label="multi=true">
    <xui-select
        multi
        value="{=select.multi.value=}"
        datasource="{{select.datasource}}" />
    <br/>
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
        'xui-select': Select
    },
    initData() {
        return {
            select: {
                value: 'bar',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'abc1', value: 'abc1'},
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
