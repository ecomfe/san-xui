/**
 * @file demos/xui-numbertextline.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import NumberTextline from 'inf-ui/x/components/NumberTextline';

import Row from './Row';

/* eslint-disable */
const template = `<template>

<x-row label="[default]">
    <xui-numbertextline value="{=value=}" />
    <strong class="large">Value: {{value}}</strong>
</x-row>

<x-row label="[default],min=70,max=100">
    <xui-numbertextline min="{{70}}" max="{{100}}" value="{=value=}" />
    <strong class="large">Value: {{value}}</strong>
</x-row>

<x-row label="[default],min=-0.5,max=2,step=0.1">
    <xui-numbertextline min="{{-0.5}}" max="{{2}}" step="{{0.1}}" value="{=value2=}" />
    <strong class="large">Value: {{value2}}</strong>
</x-row>

<x-row label="disabled">
    <xui-numbertextline disabled max="{{10}}" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-numbertextline': NumberTextline
    },
    initData() {
        return {
            value: '80',
            value2: '1'
        };
    }
});
