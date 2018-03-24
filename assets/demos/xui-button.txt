/**
 * @file demos/xui-button.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, Button, ToastLabel} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-button class="tooltipped tooltipped-e" aria-label="Success: The Travis CI build passed">Hello xui-button</xui-button>
    <xui-button loading class="tooltipped tooltipped-e" aria-label="Success: The Travis CI build passed">Hello xui-button</xui-button>
    <xui-button skin="primary">primary skin</xui-button>
    <xui-button skin="danger">danger skin</xui-button>
    <xui-button
        disabled
        skin="primary"
        class="tooltipped tooltipped-n" 
        aria-label="Success: The Travis CI build passed"
    >disabled button</xui-button>
</x-row>

<x-row label="[default],size=large">
    <xui-button size="large">Hello xui-button</xui-button>
    <xui-button size="large" skin="primary">primary skin</xui-button>
    <xui-button size="large" skin="danger">danger skin</xui-button>
    <xui-button size="large" disabled skin="primary">disabled button</xui-button>
    <xui-button size="large" loading disabled skin="primary">disabled button</xui-button>
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
    <xui-button icon="refresh" />
    <xui-button icon="refresh">{{'刷新'|i18n}}</xui-button>
    <xui-button icon="voice">Start</xui-button>
    <xui-button icon="plus" skin="primary" label="{{'创建' | i18n}}" />
</x-row>

<x-row label="icon,label,size=large">
    <xui-button on-click="onRefresh" icon="refresh" size="large">{{'刷新'|i18n}}</xui-button>
    <xui-button on-click="onCreate" icon="plus" skin="primary" size="large">{{'创建'|i18n}}</xui-button>
</x-row>

<x-row label="icon,size=large">
    <xui-toastlabel>非标准样式</xui-toastlabel>
    <br/>
    <xui-button icon="refresh" size="large" />
    <xui-button icon="refresh" disabled size="large" />
    <xui-button icon="download" size="large" />
    <xui-button icon="download" disabled size="large" />
    <xui-button icon="sdk" size="large" />
    <xui-button icon="sdk" disabled size="large" />
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-button': Button
    },
    onCreate() {
        this.$plain('On Create');
    },
    onRefresh() {
        this.$plain('On Refresh');
    }
});

