/**
 * @file components/LegacyActionAdapter.es6
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';
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
            module="{{actionOptions.module}}"
            options="{{actionOptions.options}}" />
        <div slot="foot" s-if="foot">
            <ui-button on-click="onConfirmDialog" skin="primary" disabled="{{confirm.disabled}}">{{confirm.label || '确定'}}</ui-button>
            <ui-button on-click="onCloseDialog">取消</ui-button>
        </div>
    </ui-dialog>
    <ui-actionloader
        s-else
        on-actionloaded="onActionLoaded($event)"
        url="{{actionOptions.url}}"
        options="{{actionOptions.options}}"
        module="{{actionOptions.module}}" />
</template>`;
/* eslint-enable */

function isSanPage(erAction) {
    return !!(erAction && erAction.page && erAction.SanPage);
}

export default defineComponent({
    template,
    components: {
        'ui-actionloader': ActionLoader,
        'ui-button': Button,
        'ui-dialog': Dialog
    },
    dataTypes: {
        dialog: DataTypes.bool,
        foot: DataTypes.bool,
        confirm: DataTypes.objectOf({
            label: DataTypes.string,
            disabled: DataTypes.bool
        }),
        actionOptions: DataTypes.objectOf({
            open: DataTypes.bool,
            width: DataTypes.number,
            height: DataTypes.number,
            title: DataTypes.string,
            url: DataTypes.string,
            module: DataTypes.string,
            options: DataTypes.objectOf({
                parentAction: DataTypes.object
            })
        })
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
        const compInstance = isSanPage(erAction) ? erAction.page.children[0] : erAction;
        compInstance.on('legacyactioncustomevent', e => {
            const type = e.legacyActionFireCustomType;
            // 用owner判断是动态还是声明式 1.声明式的fire事件 通过on- 2.动态调用使用dispatch ，通过messages来处理
            erAction.owner ? this.fire(type, e.value) : this.dispatch(type, e.value);
        });

        compInstance.on('legacyactioninnerevent', e => {
            const key = e.legacyActionFireCustomType;
            this.data.set(key, e.value);
        });

        this.erAction = erAction;
    },
    onConfirmDialog() {
        const erAction = this.erAction;
        const isSan = isSanPage(erAction);
        const compInstance = isSan ? erAction.page.children[0] : erAction;

        if (compInstance && typeof compInstance.doSubmit === 'function') {
            this.data.set('confirm.label', '处理中...');
            this.data.set('confirm.disabled', true);
            return compInstance.doSubmit()
                .then(() => {
                    this.data.set('confirm.label', '确定');
                    this.data.set('confirm.disabled', false);
                    this.closeDialog();
                })
                .then(null, (error = {}) => {
                    // er
                    // 1. 如果发送请求前校验失败 因为er中对每个输入组件已有相应的提示，所以不必再弹出Toast.error
                    // 2. 如果触发了返回的数据中的错误信息触发了serverIO的弹框， 此时再弹出Toast.error已经冗余
                    // san
                    // 1. doSubmit 不一定有专门写catch来弹窗给用户错误信息，此处兜底。
                    if (isSan) {
                        Toast.error(error.global || '操作失败');
                    }
                    this.data.set('confirm.label', '确定');
                    this.data.set('confirm.disabled', false);
                });
        }
        this.closeDialog();
    },
    onCloseDialog() {
        this.closeDialog();
    }
});
