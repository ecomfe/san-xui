/**
 * @file demos/xui-searchbox.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import SearchBox from 'inf-ui/x/components/SearchBox';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-searchbox />
</x-row>
<x-row label="disabled">
    <xui-searchbox disabled />
</x-row>
<x-row label="placeholder=请输入实例名称进行搜索">
    <xui-searchbox placeholder="请输入实例名称进行搜索" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-searchbox': SearchBox
    },
    initData() {
        return {
        };
    }
});
