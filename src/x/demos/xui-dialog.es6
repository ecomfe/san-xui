/**
 * @file demos/xui-dialog.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Dialog from 'inf-ui/x/components/Dialog';
import Button from 'inf-ui/x/components/Button';
import Select from 'inf-ui/x/components/Select';

/* eslint-disable */
const template = `<template>
<xui-button skin="primary" on-click="onShowDialog">Show Dialog</xui-button>

<xui-dialog open="{=dialog.showDialog=}">
    <xui-button on-click="closeTheDialog">关闭.</xui-button>
    <xui-button on-click="openNewDialog">打开一个新的Dialog.</xui-button>
    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
</xui-dialog>

<xui-dialog open="{=dialog.showDialog2=}" width="300" foot="{{false}}">
    <xui-button on-click="closeTheDialog">关闭上一个Dialog</xui-button>
</xui-dialog>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-select': Select,
        'xui-dialog': Dialog,
        'xui-button': Button
    },
    initData() {
        return {
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
    }
});
