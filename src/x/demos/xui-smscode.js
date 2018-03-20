/**
 * @file demos/xui-smscode.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {SMSCodeBox} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-smscode
    value="{=smscode.mobile=}"
    freeze-time="{{10}}" />
<strong class="large">
    Value is: {{smscode.mobile}}
</strong>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-smscode': SMSCodeBox
    },
    initData() {
        return {
            smscode: {
                mobile: '13062694617'
            }
        };
    }
});
