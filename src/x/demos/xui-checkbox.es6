/**
 * @file demos/xui-checkbox.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import CheckBox from 'inf-ui/x/components/CheckBox';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="checked=true">
    <xui-checkbox checked="{=checkbox.checked=}" title="the label" />
    <xui-switch checked="{=checkbox.checked=}" />
</x-row>
<x-row label="[default]checked=false">
    <xui-checkbox />
    <xui-checkbox disabled />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-checkbox': CheckBox
    },
    initData() {
        return {
            checkbox: {
                checked: true
            }
        };
    }
});
