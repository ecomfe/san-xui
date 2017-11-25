/**
 * @file components/AlertDialog.es6
 * @author leeight
 */

import _ from 'inf-i18n';
import {defineComponent} from 'san';

import Dialog from './Dialog';
import Button from './Button';
import {i18n} from '../../mixins/filters';

export default defineComponent({
    template: `<template>
    <ui-dialog open="{=open=}" skin="alert" width="{{width}}" s-ref="dialog">
        <span slot="head">{{title}}</span>
        <div class="ui-dialog-icon ui-dialog-icon-warning"></div>
        <div class="ui-dialog-text">{{message | raw}}</div>
        <div slot="foot">
            <ui-button on-click="onConfirmDialog" skin="primary">{{'确定'|i18n}}</ui-button>
        </div>
    </ui-dialog>
    </template>`,
    components: {
        'ui-button': Button,
        'ui-dialog': Dialog
    },
    filters: {
        i18n
    },
    initData() {
        return {
            open: true,
            title: _('确认')
        };
    },
    onConfirmDialog() {
        this.fire('confirm');
        this.data.set('open', false);
    }
});
