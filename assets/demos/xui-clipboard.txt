/**
 * @file demos/xui-clipboard.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, Clipboard, Button, Icon} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">
        <xui-icon name="copy" />
    </xui-clipboard>
</x-row>

<x-row label="btns">
    <xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">
        <xui-button>{{clipboard.btnText}}</xui-button>
    </xui-clipboard>

    <xui-clipboard text="Hello World">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="e">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="w">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="n">
        <xui-button icon="copy" />
    </xui-clipboard>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-icon': Icon,
        'xui-button': Button,
        'xui-clipboard': Clipboard
    },
    initData() {
        return {
            clipboard: {
                btnText: '点我复制'
            }
        };
    },
    onAfterCopy() {
        this.data.set('clipboard.btnText', '复制成功');
    }
});
