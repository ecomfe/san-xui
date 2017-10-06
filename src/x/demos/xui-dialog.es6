/**
 * @file demos/xui-dialog.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Dialog from 'inf-ui/x/components/Dialog';
import Button from 'inf-ui/x/components/Button';

/* eslint-disable */
const template = `<template>
<xui-button skin="primary" on-click="onShowDialog">Show Dialog</xui-button>

<xui-dialog open="{=dialog.showDialog=}">
    <xui-button on-click="closeTheDialog">关闭.</xui-button>
    <xui-button on-click="openNewDialog">打开一个新的Dialog.</xui-button>
</xui-dialog>

<xui-dialog open="{=dialog.showDialog2=}" width="300" foot="{{false}}">
    <xui-button on-click="closeTheDialog">关闭上一个Dialog</xui-button>
</xui-dialog>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-dialog': Dialog,
        'xui-button': Button
    },
    initData() {
        return {
        };
    },

    onShowDialog() {
        this.data.set('dialog.showDialog', true);
    },
    openNewDialog() {
        this.data.set('dialog.showDialog2', true);
    },
    closeTheDialog() {
        this.data.set('dialog.showDialog', false);
    }
});
