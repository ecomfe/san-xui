/**
 * @file demos/xui-switch.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import Switch from 'inf-ui/x/components/Switch';
import Button from 'inf-ui/x/components/Button';

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
