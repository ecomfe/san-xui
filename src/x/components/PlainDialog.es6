/**
 * @file components/PlainDialog.es6
 * @author leeight
 */

import _ from 'inf-i18n';
import {defineComponent} from 'san';

import Dialog from './Dialog';
import Button from './Button';

export default defineComponent({
    template: `<template>
    <ui-dialog open="{=open=}" width="{{width}}" s-ref="dialog" foot="{{!!foot}}">
        <span slot="head">{{title}}</span>
        {{message | raw}}
        <div slot="foot">
            <ui-button on-click="onConfirmDialog" skin="primary">{{foot.okBtn.label || '确定'}}</ui-button>
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
            title: _('确认'),
            foot: {
                okBtn: {
                    label: _('确定')
                }
            }
        };
    },
    onConfirmDialog() {
        this.fire('confirm');
        this.data.set('open', false);
    }
});
