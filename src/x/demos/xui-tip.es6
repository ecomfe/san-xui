/**
 * @file demos/xui-tip.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Tip from 'inf-ui/x/components/Tip';
import Button from 'inf-ui/x/components/Button';
import MonthView from 'inf-ui/x/components/MonthView';

import Row from './Row';

/* eslint-disable */
const template = `<template>
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
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-monthview': MonthView,
        'xui-tip': Tip
    },
    initData() {
        return {
        };
    }
});
