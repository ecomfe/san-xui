/**
 * @file demos/xui-dialog.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {alert, confirm, plain, Row, Tip, Dialog, Button, Select, Toast, AlertDialog} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
<xui-button skin="primary" on-click="onShowDialog">Show Dialog</xui-button>

<xui-dialog open="{=dialog.showDialog=}">
    <xui-tip><xui-button>Button In Tip</xui-button></xui-tip>
    <xui-button on-click="closeTheDialog">关闭.</xui-button>
    <xui-button on-click="openNewDialog">打开一个新的Dialog.</xui-button>
    <xui-button on-click="showToast">show toast.</xui-button>
    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
</xui-dialog>

<xui-dialog open="{=dialog.showDialog2=}" width="300" foot="{{false}}">
    <xui-button on-click="closeTheDialog">关闭上一个Dialog</xui-button>
</xui-dialog>
</x-row>

<x-row label="alert,confirm,plain">
    <xui-button on-click="showAlertDialog">alert</xui-button>
    <xui-button on-click="showConfirmDialog">confirm</xui-button>
    <xui-button on-click="showPlainDialog">plain</xui-button>
</x-row>

<x-row label="AlertDialog">
    <xui-alert-dialog open="{=alertDialogOpened=}" message="Hello Alert Dialog" />
    <xui-button on-click="showAlertDialog2">AlertDialog Component</xui-button>
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-tip': Tip,
        'xui-select': Select,
        'xui-dialog': Dialog,
        'xui-alert-dialog': AlertDialog,
        'xui-button': Button
    },
    initData() {
        return {
            alertDialogOpened: false,
            select: {
                value: 'abc7',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'abc1', value: 'abc1'},
                    {text: 'abc2', value: 'abc2'},
                    {text: 'abc3', value: 'abc3'},
                    {text: 'abc4', value: 'abc4'},
                    {text: 'abc5', value: 'abc5'},
                    {text: 'abc6', value: 'abc6'},
                    {text: 'abc7', value: 'abc7'},
                    {text: 'abc8', value: 'abc8'},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            }
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
    },
    showAlertDialog2() {
        this.data.set('alertDialogOpened', true);
    },
    showAlertDialog() {
        alert({message: 'Alert dialog (w=500)'})
            .then(() => Toast.success('OK'));
    },
    showConfirmDialog() {
        confirm({message: 'Confirm dialog (w=400)', width: 400})
            .then(() => Toast.success('OK'))
            .catch(() => Toast.warning('Canceled'));
    },
    showPlainDialog() {
        plain({message: 'Plain dialog (w=500)'})
            .then(() => Toast.success('OK'));
    },
    showToast() {
        Toast.success('ok');
    }
});
