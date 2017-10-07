/**
 * @file demos/xui-radioselect.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import RadioSelect from 'inf-ui/x/components/RadioSelect';

/* eslint-disable */
const template = `<template>
<xui-radioselect
    value="{=radioselect.value=}"
    datasource="{{radioselect.datasource}}" />
<strong class="large">
    Value is: {{radioselect.value}}
</strong>
<xui-radioselect
    disabled
    value="{=radioselect.value=}"
    datasource="{{radioselect.datasource}}" />
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-radioselect': RadioSelect
    },
    initData() {
        return {
            radioselect: {
                value: 'abc1',
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'abc1', value: 'abc1'},
                    {text: 'abc6', value: 'abc6'},
                    {text: 'abc7', value: 'abc7'},
                    {text: 'abc8', value: 'abc8', tip: '注：购买1年8.3折'},
                    {text: 'abc9', value: 'abc9', tip: '注：购买1年8.3折'},
                    {text: 'abc0', value: 'abc0', tip: '注：购买1年8.3折'}
                ]
            }
        };
    }
});
