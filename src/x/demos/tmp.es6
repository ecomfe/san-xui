/**
 * @file demos/xui-pager.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import Pager from 'inf-ui/x/components/Pager';

import Row from './Row';

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
