/**
 * @file demos/xui-switch.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Switch, Button} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-switch checked="{=switch.checked=}" />
<xui-switch checked="{{false}}" />
<xui-switch checked="{{false}}" disabled />
<xui-button disabled="{{!switch.checked}}">Hello xui-switch</xui-button>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-button': Button,
        'xui-switch': Switch
    },
    initData() {
        return {
            'switch': {
                checked: true
            }
        };
    }
});
