/**
 * @file demos/xui-boxgroup.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, BoxGroup} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="radio">
    <xui-boxgroup
        box-type="radio"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.radio=}"
        />
    <strong class="large">
    Value is: {{boxgroup.radio | stringify}}
    </strong>
</x-row>

<x-row label="checkbox">
    <xui-boxgroup
        box-type="checkbox"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.checkbox=}"
        />
    <strong class="large">
    Value is: {{boxgroup.checkbox | stringify}}
    </strong>
</x-row>

<x-row label="checkbox,col-count=3,item-width=100">
    <xui-boxgroup
        box-type="checkbox"
        col-count="{{3}}"
        item-width="{{100}}"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.checkbox=}"
        />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-boxgroup': BoxGroup
    },
    filters: {
        stringify(value) {
            return JSON.stringify(value);
        }
    },
    initData() {
        return {
            boxgroup: {
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'number 1', value: 1},
                    {text: 'string \'1\'', value: '1'},
                    {text: 'number 2', value: 2},
                    {text: 'string \'2\'', value: '2'},
                    {text: 'bool true', value: true},
                    {text: 'bool false', value: false},
                    {text: 'object 1', value: {foo: 1}},
                    {text: 'object 2', value: {bar: 1}},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            }
        };
    }
});
