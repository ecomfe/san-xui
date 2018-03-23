/**
 * @file demos/xui-progress.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, Progress} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default],value=20">
    <xui-progress value="{{20}}" />
</x-row>
<x-row label="value=50,width=300">
    <xui-progress value="{{50}}" width="{{300}}" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-progress': Progress
    },
    initData() {
        return {
        };
    }
});
