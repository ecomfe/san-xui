/**
 * @file demos/xui-radioselect.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, RadioSelect} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-radioselect
        value="{=radioselect.value=}"
        datasource="{{radioselect.datasource}}" />
    <strong class="large">
        Value is: {{radioselect.value}}
    </strong>
</x-row>

<x-row label="disabled">
    <xui-radioselect
        disabled
        value="{=radioselect.value=}"
        datasource="{{radioselect.datasource}}" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-radioselect': RadioSelect
    },
    initData() {
        return {
            radioselect: {
                value: 'abc1',
                datasource: [
                    {text: '1个月', value: 'foo'},
                    {text: '2', value: 'bar'},
                    {text: '3', value: '123', disabled: true},
                    {text: '4', value: 'abc1'},
                    {text: '5', value: 'abc6'},
                    {text: '6', value: 'abc7'},
                    {text: '1年', value: 'abc8', tip: '注：购买1年8.3折'},
                    {text: '2年', value: 'abc9', tip: '注：购买2年7.5折'},
                    {text: '3年', value: 'abc0', tip: '注：购买3年5折'}
                ]
            }
        };
    }
});
