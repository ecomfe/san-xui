/**
 * @file x/forms/FormDialog.js
 * @author leeight
 * @author chenbo09
 */

import {defineComponent, DataTypes} from 'san';

import Button from '../components/Button';
import StopScroll from '../components/StopScroll';
import Dialog from '../components/Dialog';

const template = `<template>
    <ui-dialog open title="{{title}}" width="{{width}}" on-close="onCloseDialog">
        <ui-ss disabled="{{ssDisabled}}" class="ui-form-dialog-ss" style="{{ssStyle}}">
            <x-form
                s-ref="form"
                preview="{{preview}}"
                editable="{{editable}}"
                form-data="{{formData}}"
            />
        </ui-ss>
        <div slot="foot">
            <ui-button on-click="onConfirmDialog" skin="primary">{{confirmLabel}}</ui-button>
            <ui-button s-if="!confirm" on-click="onCloseDialog">{{cancelLabel}}</ui-button>
        </div>
    </ui-dialog>
</template>`;
export default defineComponent({
    template,
    initData() {
        return {
            title: 'Dialog Title',
            confirmLabel: '确认',
            cancelLabel: '取消',
            width: 800,
            confirm: false,
            preview: false,
            editable: true
        };
    },
    dataTypes: {
        /**
         * 弹出框宽度
         * @default 800
         */
        width: DataTypes.number,

        /**
         * 弹出框高度
         */
        height: DataTypes.number,

        /**
         * 标题
         */
        title: DataTypes.string,

        /**
         * 是否预览
         * @default false
         */
        preview: DataTypes.bool,

        /**
         * 是否能编辑
         * @default false
         */
        editable: DataTypes.bool,

        /**
         * 是否需要确认
         * @default false
         */
        confirm: DataTypes.bool,

        /**
         * form组件构造函数
         * @default false
         */
        formComp: DataTypes.func.isRequired,

        /**
         * 表单数据
         * @default false
         */
        formData: DataTypes.object.isRequired
    },
    computed: {
        ssDisabled() {
            // 如果没有设置过 height 属性，那么就禁用
            const height = this.data.get('height');
            if (!height) {
                return true;
            }
            return false;
        },
        ssStyle() {
            const style = {};
            const ssDisabled = this.data.get('ssDisabled');
            if (ssDisabled) {
                return style;
            }

            const height = this.data.get('height');

            style['max-height'] = height + 'px';
            style.overflow = 'hidden';
            style['overflow-y'] = 'scroll';

            return style;
        }
    },
    inited() {
        // 动态的组件
        const formComp = this.data.get('formComp');
        this.components = {
            'ui-dialog': Dialog,
            'ui-button': Button,
            'ui-ss': StopScroll,
            'x-form': formComp
        };
    },
    onConfirmDialog() {
        const confirm = this.data.get('confirm');
        if (confirm) {
            this.fire('close');
            return;
        }

        const editable = this.data.get('editable');
        const form = this.ref('form');
        if (editable && form) {
            form.validateForm().then(() => {
                // form.getFormData() 返回的是过滤之后的数据，一些无关紧要的东西都被干掉了
                const formData = form.getFormData();
                this.fire('ok', formData);
            });
        }
    },
    onCloseDialog() {
        this.fire('close');
    }
});
