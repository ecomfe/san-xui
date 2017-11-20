/**
 * @file components/LegacyActionAdapter.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Dialog from 'inf-ui/x/components/Dialog';
import Button from 'inf-ui/x/components/Button';
import Toast from 'inf-ui/x/components/Toast';
import ActionLoader from 'inf-ui/x/components/ActionLoader';

/* eslint-disable */
const template = `<template>
    <ui-dialog
        s-if="dialog"
        s-ref="dialog"
        open="{=actionOptions.open=}"
        height="{{actionOptions.height}}"
        width="{{actionOptions.width}}">
        <span slot="head">{{actionOptions.title}}</span>
        <ui-actionloader
            on-actionloaded="onActionLoaded($event)"
            url="{{actionOptions.url}}"
            options="{{actionOptions.options}}" />
        <div slot="foot" s-if="foot">
            <ui-button on-click="onConfirmDialog" skin="primary" disabled="{{confirm.disabled}}">{{confirm.label}}</ui-button>
            <ui-button on-click="onCloseDialog">取消</ui-button>
        </div>
    </ui-dialog>
    <ui-actionloader
        s-else
        on-actionloaded="onActionLoaded($event)"
        url="{{actionOptions.url}}"
        options="{{actionOptions.options}}" />
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-actionloader': ActionLoader,
        'ui-button': Button,
        'ui-dialog': Dialog
    },
    initData() {
        return {
            dialog: false,
            foot: true,
            confirm: {
                label: '确定',
                disabled: false
            },
            actionOptions: {
                open: false
            }
        };
    },
    inited() {
        this.erAction = null;
    },
    closeDialog() {
        this.data.set('actionOptions.open', false);
    },
    onActionLoaded(e) {
        const erAction = e.action;
        erAction.on('beforesubmit', () => {
            this.data.set('confirm.label', '处理中...');
            this.data.set('confirm.disabled', true);
        });

        const erView = erAction.view;
        const enableSubmit = erView.enableSubmit;
        erView.enableSubmit = () => {
            if (typeof enableSubmit === 'function') {
                enableSubmit.call(erView);
            }
            this.data.set('confirm.label', '确定');
            this.data.set('confirm.disabled', false);
        };
        this.erAction = erAction;
    },
    onConfirmDialog() {
        const erAction = this.erAction;
        if (erAction && erAction.page && erAction.SanPage) {
            const compInstance = erAction.page.children[0];
            if (compInstance && typeof compInstance.doSubmit === 'function') {
                this.data.set('confirm.label', '处理中...');
                this.data.set('confirm.disabled', true);
                return compInstance.doSubmit()
                    .then(() => {
                        this.data.set('confirm.label', '确定');
                        this.data.set('confirm.disabled', false);
                        this.closeDialog();
                    })
                    .catch(error => {
                        Toast.error(error.global || '操作失败');
                        this.data.set('confirm.label', '确定');
                        this.data.set('confirm.disabled', false);
                    });
            }
            this.closeDialog();
        }
        else if (erAction && erAction.view) {
            const form = erAction.view.get('form');
            if (form) {
                form.validateAndSubmit();
            }
        }
        else {
            this.closeDialog();
        }
    },
    onCloseDialog() {
        this.closeDialog();
    }
});
