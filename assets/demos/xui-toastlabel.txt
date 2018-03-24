/**
 * @file demos/xui-toastlabel.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, ToastLabel} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]level=alert">
    <xui-toastlabel text="hello toastlabel" />
</x-row>
<x-row label="level=normal">
    <xui-toastlabel text="{{'预付费'| i18n}} i18n" level="normal" />
</x-row>
<x-row label="level=error">
    <xui-toastlabel text="{{aaa}}, i18n" level="error" />
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
            aaa: '预付费'
        };
    }
});
