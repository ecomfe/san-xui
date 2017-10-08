/**
 * @file demos/xui-button.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Button from 'inf-ui/x/components/Button';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-button>Hello xui-button</xui-button>
    <xui-button skin="primary">primary skin</xui-button>
    <xui-button skin="danger">danger skin</xui-button>
    <xui-button disabled skin="primary">disabled button</xui-button>
</x-row>

<x-row label="icon">
    <xui-button icon="refresh" />
    <xui-button icon="refresh" disabled />
    <xui-button icon="download" />
    <xui-button icon="download" disabled />
    <xui-button icon="sdk" />
    <xui-button icon="sdk" disabled />
</x-row>
<x-row label="icon,label">
    <xui-button icon="refresh">刷新</xui-button>
    <xui-button icon="plus" skin="primary">创建</xui-button>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button
    }
});

