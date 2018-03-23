/**
 * @file demos/xui-radiobox.js
 * @author panzihao01
 */

import {defineComponent} from 'san';
import {Row, RadioBox, ToastLabel} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>通常情况下，应该使用 <b>boxgroup 组件</b>来设置一组单选按钮</xui-toastlabel>
<x-row label="default">
    <xui-radiobox checked="{=radiobox.checked=}" title="the radiobox label" />
    <xui-radiobox checked="{=radiobox.checked=}" disabled title="disabled radiobox" />
</x-row>
<x-row label="grouped radio">
    <div>
        <xui-radiobox name="group1" checked title="radio 1-1" />
        <xui-radiobox name="group1" title="radio 1-2" />
        <xui-radiobox name="group1" title="radio 1-3" />
    </div>
    <div>
        <xui-radiobox name="group2" title="radio 2-1" />
        <xui-radiobox name="group2" checked title="radio 2-2" />
        <xui-radiobox name="group2" title="radio 2-3" />
    </div>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-radiobox': RadioBox,
        'xui-toastlabel': ToastLabel
    },
    initData() {
        return {
            radiobox: {
                checked: true
            }
        };
    }
});
