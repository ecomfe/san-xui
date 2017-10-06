/**
 * @file demos/xui-toastlabel.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import ToastLabel from 'inf-ui/x/components/ToastLabel';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]level=alert">
    <xui-toastlabel text="hello toastlabel" />
</x-row>
<x-row label="level=normal">
    <xui-toastlabel text="hello toastlabel" level="normal" />
</x-row>
<x-row label="level=error">
    <xui-toastlabel text="hello toastlabel" level="error" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel
    },
    initData() {
        return {
        };
    }
});
