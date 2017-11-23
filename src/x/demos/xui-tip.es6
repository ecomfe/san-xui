/**
 * @file demos/xui-tip.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import Tip from 'inf-ui/x/components/Tip';
import Button from 'inf-ui/x/components/Button';
import MonthView from 'inf-ui/x/components/MonthView';
import ToastLabel from 'inf-ui/x/components/ToastLabel';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>esui里面的实现方案</xui-toastlabel>
<x-row label="position=lt">
    <xui-tip message="hello world" />
    <xui-tip><xui-button>Button In Tip</xui-button></xui-tip>
    <xui-tip><xui-monthview /></xui-tip>
</x-row>
<x-row label="position=tc">
    <xui-tip message="hello world" position="tc" />
</x-row>
<x-row label="position=rt">
    <xui-tip message="hello world" position="rt" />
</x-row>
<x-row label="position=bc">
    <xui-tip message="hello world" position="bc" />
</x-row>

<xui-toastlabel>新的实现方案，1: 需要避免 overflow: hidden，否则可能没效果 2: 通过 aria-label 来设置 tip 的内容</xui-toastlabel>
<x-row label="tooltipped,aria-label">
    <xui-button
        class="tooltipped tooltipped-s"
        aria-label="THIS THE TOOLTIPPED CONTENT"
        >tooltipped,tooltipped-s</xui-button>

    <xui-button
        class="tooltipped tooltipped-e"
        aria-label="THIS THE TOOLTIPPED CONTENT"
        >tooltipped,tooltipped-e</xui-button>

    <xui-button
        class="tooltipped tooltipped-n"
        aria-label="THIS THE TOOLTIPPED CONTENT"
        >tooltipped,tooltipped-n</xui-button>

    <xui-button
        class="tooltipped tooltipped-w"
        aria-label="THIS THE TOOLTIPPED CONTENT"
        >tooltipped,tooltipped-w</xui-button>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-monthview': MonthView,
        'xui-toastlabel': ToastLabel,
        'xui-tip': Tip
    },
    initData() {
        return {
        };
    }
});
