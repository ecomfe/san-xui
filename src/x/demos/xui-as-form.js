/**
 * @file demos/xui-as-form.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {createForm, Row, ToastLabel, ACEEditor, SyntaxHighlighter, Button, Select, Switch, Toast} from 'san-xui';

/* eslint-disable */
import {
    kDefaultSchema, kSchema$eq, kSchema$in,
    kSchema$gt, kSchema$validations, kSchema$requiredOn
} from './examples/formSchemas';
/* eslint-enable */

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-select width="300" on-change="onExampleChanged" datasource="{{examples.datasource}}"></xui-select>
    <xui-button on-click="buildForm" skin="primary">生成表单</xui-button>
    <br />
    <br />
    <xui-aceeditor s-if="schemaCode" value="{=schemaCode=}" mode="ace/mode/json" />
    <br />
    <table class="typedefs as-form-preview" s-if="schemaCode">
        <colgroup>
            <col width="700px" />
            <col width="200px" />
        </colgroup>
        <tbody>
            <tr><th>表单</th><th>表单数据</th></tr>
            <tr>
                <td class="as-form-instance">
                    <div s-ref="form-container"></div>
                    <div>
                        开启实时验证：<xui-switch checked="{=instantValidation=}" on-change="onInstantValidationChanged" />
                        预览模式：<xui-switch checked="{=preview=}" on-change="onPreviewChanged" />
                        <xui-button skin="primary" on-click="validateForm">验证表单</xui-button>
                    </div>
                </td>
                <td class="as-form-data"><xui-hljs code="{{formData | stringify}}" /></td>
            </tr>
        </tbody>
    </table>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-select': Select,
        'xui-switch': Switch,
        'xui-button': Button,
        'xui-hljs': SyntaxHighlighter,
        'xui-aceeditor': ACEEditor
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
            examples: {
                datasource: [
                    {text: '默认情况', value: kDefaultSchema},
                    {text: '表单联动 visibleOn: $eq, $ne', value: kSchema$eq},
                    {text: '表单联动 visibleOn: $in, $nin', value: kSchema$in},
                    {text: '表单联动 $gt, $lt, $gte, $lte', value: kSchema$gt},
                    {text: '表单验证', value: kSchema$validations},
                    {text: '表单验证 requiredOn', value: kSchema$requiredOn}
                ]
            },
            formData: {},
            schemaCode: null
        };
    },
    buildForm() {
        const value = this.data.get('schemaCode');
        try {
            const schema = JSON.parse(value);
            if (!schema && !schema.controls) {
                throw new Error('Invalid json format');
            }
            this.buildFormBySchema({value: schema});
        }
        catch (ex) {
            Toast.error('JSON 不合法，请检查');
        }
    },
    onExampleChanged({value}) {
        const schemaCode = JSON.stringify(value, null, 2);
        this.data.set('schemaCode', schemaCode);
        this.buildFormBySchema({value});
    },
    onInstantValidationChanged({value}) {
        if (this.formInstance) {
            this.formInstance.data.set('instantValidation', value);
            this.validateForm();
        }
    },
    onPreviewChanged({value}) {
        if (this.formInstance) {
            this.formInstance.data.set('preview', value);
        }
    },
    buildFormBySchema({value}) {
        this.nextTick(() => {
            const formContainer = this.ref('form-container');
            if (formContainer) {
                if (this.formInstance) {
                    this.formInstance.dispose();
                    formContainer.innerHTML = '';
                }
                this.data.set('formData', {});
                const instantValidation = this.data.get('instantValidation');
                const FormComponent = createForm(value);
                const formInstance = new FormComponent({data: {instantValidation}});
                formInstance.watch('formData', formData => this.data.set('formData', formData));
                formInstance.attach(formContainer);
                this.formInstance = formInstance;
            }
        });
    },
    validateForm() {
        if (!this.formInstance) {
            return;
        }
        this.formInstance.validateForm()
            .then(() => Toast.success('验证通过'))
            .catch(() => Toast.error('验证失败'));
    }
});
