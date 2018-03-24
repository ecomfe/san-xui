/**
 * @file demos/xui-form-dialog.js
 * @author chenbo09
 */

import {defineComponent} from 'san';
import {Row, createForm, FormDialog, ToastLabel, SyntaxHighlighter, Button} from 'san-xui';

function toList(...args) {
    return args.map(v => {
        return {
            text: v,
            value: v
        };
    });
}

const ClintInfo = {
    controls: [
        {
            label: '最终客户名称',
            name: 'customerName',
            help: '项目实施的最终主体',
            type: 'text',
            required: true
        },
        {
            label: '是否有分包',
            name: 'hasSubContract',
            type: 'select',
            required: true,
            datasource: toList('是', '否')
        },
        {
            label: '分包商名称',
            name: 'subContracts',
            required: true,
            requiredRuleType: 'array',
            type: 'combo',
            multiple: true,
            max: 3,
            previewKey: 'name',
            controls: [
                {
                    name: 'type',
                    type: 'select',
                    required: true,
                    datasource: toList('新分包商', '老分包商')
                },
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    placeholder: '分包商全称'
                }
            ],
            requiredOn: {
                hasSubContract: '是'
            },
            visibleOn: {
                hasSubContract: '是'
            }
        }
    ]
};


/* eslint-disable */
const template = `<template>
    <xui-toastlabel>
        FormDialog作为内部为Form的弹出框，其formComp 参数 可以通过createForm配合schema获取。
    </xui-toastlabel>
<x-row label="[default]">
    <xui-button on-click="native:showFormDialog('viewClintInfo')" skin="primary">显示FormDialog</xui-button>
    <br />
</x-row>

<x-row label="[formData当前值]">
    <xui-hljs code="{{formData | stringify}}" />
    <br />
</x-row>

<xui-form-dialog
    s-if="viewClintInfo"
    title="客户信息"
    confirm="{{preview}}"
    preview="{{preview}}"
    width="{{800}}"
    height="{{600}}"
    on-ok="merge($event, 'viewClintInfo', 'formData.clintInfo')"
    on-close="closeFormDialog('viewClintInfo')"
    form-comp="{{ClintInfo}}"
    form-data="{{formData.clintInfo}}"
/>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-form-dialog': FormDialog,
        'xui-toastlabel': ToastLabel,
        'xui-button': Button,
        'xui-hljs': SyntaxHighlighter
    },
    filters: {
        stringify(data) {
            return JSON.stringify(data, null, 2);
        }
    },
    initData() {
        return {
            instantValidation: true,
            preview: false,
            link: 'https://wx2.sinaimg.cn/mw690/6a087a4bgy1fnienlcytzj20j60bhtbe.jpg',
            formData: {
                clintInfo: {
                    customerName: '客户名称'
                },
                basicInfo: {
                    projectName: '项目名称'
                }

            },
            ClintInfo: createForm(ClintInfo)
        };
    },
    merge(formData, key, expr) {
        if (key) {
            this.closeFormDialog(key);
        }
        this.data.merge(expr, formData);
        if (typeof this.validateForm === 'function') {
            this.validateForm();
        }
    },
    showFormDialog(key) {
        this.data.set(key, true);
    },
    closeFormDialog(key) {
        this.data.set(key, false);
    }
});
