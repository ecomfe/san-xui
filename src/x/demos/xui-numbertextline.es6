/**
 * @file demos/xui-numbertextline.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import NumberTextline from 'inf-ui/x/components/NumberTextline';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-numbertextline max="{{10}}" value="{{2}}" />
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
        };
    }
});
