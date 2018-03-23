/**
 * @file demos/xui-viewstep.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, ViewStep} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-viewstep
        steps="{{steps}}" />
</x-row>

<x-row label="step-index=3">
    <xui-viewstep
        step-index="{{3}}"
        steps="{{steps}}" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-viewstep': ViewStep
    },
    initData() {
        return {
            steps: [
                {text: '选择云服务器'},
                {text: '确认订单'},
                {text: '在线支付'},
                {text: '支付成功'}
            ]
        };
    }
});
