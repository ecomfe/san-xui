/**
 * @file demos/xui-dragger.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Dragger from 'inf-ui/x/components/Dragger';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-dragger max="{{200}}" value="{{35}}"/>
</x-row>
<x-row label="length=500,max=300,value=135">
    <xui-dragger length="{{500}}" max="{{300}}" value="{{135}}"/>
</x-row>
<x-row label="disabled">
    <xui-dragger disabled />
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
