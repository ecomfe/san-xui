/**
 * @file demos/xui-boxgroup.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import BoxGroup from 'inf-ui/x/components/BoxGroup';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="radio">
    <xui-boxgroup
        box-type="radio"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.radio=}"
        />
    Value is: {{boxgroup.radio}}
</x-row>

<x-row label="checkbox">
    <xui-boxgroup
        box-type="checkbox"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.checkbox=}"
        />
    Value is: {{boxgroup.checkbox}}
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-boxgroup': BoxGroup
    },
    initData() {
        return {
            boxgroup: {
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
