/**
 * @file components/asDialog.es6
 * @author leeight
 */

import _ from 'inf-i18n';
import {defineComponent} from 'san';

import Dialog from './Dialog';
import Button from './Button';

export function asDialog(Klass) {
    if (Klass.__dialogComponent) {
        return Klass.__dialogComponent;
    }

    const WrappedComponent = defineComponent({
        template: `<template>
        <ui-dialog open="{{open}}" width="{{width}}" s-ref="dialog">
            <span slot="head">{{title}}</span>
            <x-biz payload="{{payload}}" />
            <div slot="foot">
                <ui-button on-click="onConfirmDialog" skin="primary">{{foot.okBtn.label || '确定'}}</ui-button>
            </div>
        </ui-dialog>
        </template>`,
        components: {
            'x-biz': Klass,
            'ui-button': Button,
            'ui-dialog': Dialog
        },
        initData() {
            return {
                open: true,
                title: _('确认'),
                payload: null,
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
    Klass.__dialogComponent = WrappedComponent;

    return WrappedComponent;
}
