/**
 * @file demos/xui-dragger.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import Dragger from 'inf-ui/x/components/Dragger';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-dragger max="{{200}}" value="{{35}}" unit="Mbps" />
</x-row>
<x-row label="min=0,max=1,step=0.01">
    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.01}}" />
</x-row>
<x-row label="min=0,max=1,step=0.2">
    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.2}}" />
</x-row>
<x-row label="length=500,max=300,value=135">
    <xui-dragger length="{{500}}" max="{{300}}" value="{{135}}" unit="Mbps" />
</x-row>
<x-row label="disabled">
    <xui-dragger disabled unit="Mbps" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-dragger': Dragger
    },
    initData() {
        return {
        };
    }
});
