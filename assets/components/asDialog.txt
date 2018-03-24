/**
 * @file components/asDialog.js
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';

import Dialog from './Dialog';
import Button from './Button';

export function asDialog(Klass) {
    if (Klass.__dialogComponent) {
        return Klass.__dialogComponent;
    }
    const dataTypes = u.keys(Klass.dataTypes || Klass.prototype.dataTypes || {});
    const klassTemplate = dataTypes.length <= 0
        ? '<x-biz payload="{{payload}}" />'
        : '<x-biz ' + u.map(dataTypes, prop => `${prop}="{{payload.${prop}}}"`).join(' ') + ' />';

    const WrappedComponent = defineComponent({
        template: `<template>
        <ui-dialog open="{{open}}" width="{{width}}" s-ref="dialog" foot="{{!!foot}}">
            <span slot="head">{{title}}</span>
            ${klassTemplate}
            <div slot="foot" s-if="foot">
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
                title: '确认',
                payload: null
            };
        },
        inited() {
            // 设置foot默认值
            if (this.data.get('foot') === undefined) {
                this.data.set('foot', {
                    okBtn: {
                        label: '确定'
                    }
                });
            }
        },
        messages: {
            resize() {
                this.ref('dialog').__resize();
            }
        },
        onConfirmDialog() {
            this.fire('confirm');
            this.data.set('open', false);
        }
    });
    Klass.__dialogComponent = WrappedComponent;

    return WrappedComponent;
}
