/**
 * @file components/ConfirmDialog.js
 * @author leeight
 */

import {defineComponent} from 'san';

import Dialog from './Dialog';

export default defineComponent({
    template: `<template>
    <ui-dialog open="{=open=}" s-ref="dialog" skin="confirm" width="{{width}}" on-close="onCloseDialog" on-confirm="onConfirmDialog">
        <span slot="head">{{title}}</span>
        <div class="ui-dialog-icon ui-dialog-icon-confirm"></div>
        <div class="ui-dialog-text">{{message | raw}}</div>
    </ui-dialog>
    </template>`,
    components: {
        'ui-dialog': Dialog
    },
    initData() {
        return {
            open: true,
            width: 500,
            title: '请确认'
        };
    },
    onCloseDialog() {
        this.fire('close');
        this.data.set('open', false);
    },
    onConfirmDialog() {
        this.fire('confirm');
        this.data.set('open', false);
    }
});
