/**
 * @file demos/xui-pager.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, Pager} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-pager />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-pager': Pager
    },
    initData() {
        return {
        };
    }
});
