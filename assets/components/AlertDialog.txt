/**
 * @file components/AlertDialog.js
 * @author leeight
 */

import {defineComponent} from 'san';

import Dialog from './Dialog';
import Button from './Button';

export default defineComponent({
    template: `<template>
    <ui-dialog open="{=open=}" skin="alert" width="{{width}}" s-ref="dialog">
        <span slot="head">{{title}}</span>
        <div class="ui-dialog-icon ui-dialog-icon-warning"></div>
        <div class="ui-dialog-text">{{message | raw}}</div>
        <div slot="foot">
            <ui-button on-click="onConfirmDialog" skin="primary">{{'确定'}}</ui-button>
        </div>
    </ui-dialog>
    </template>`,
    components: {
        'ui-button': Button,
        'ui-dialog': Dialog
    },
    initData() {
        return {
            open: true,
            width: 500,
            title: '确认'
        };
    },
    onConfirmDialog() {
        this.fire('confirm');
        this.data.set('open', false);
    }
});
