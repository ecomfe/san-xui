/**
 * @file demos/xui-as-form.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import ToastLabel from 'inf-ui/x/components/ToastLabel';
import ACEEditor from 'inf-ui/x/components/ACEEditor';
import SyntaxHighlighter from 'inf-ui/x/components/SyntaxHighlighter';
import Button from 'inf-ui/x/components/Button';
import Select from 'inf-ui/x/components/Select';
import Toast from 'inf-ui/x/components/Toast';
import Ghost from 'inf-ui/x/components/Ghost';
import {createForm} from 'inf-ui/x/forms/createForm';

import Row from './Row';
import {kDefaultSchema, kSchema$eq, kSchema$in, kSchema$gt} from './examples/formSchemas';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>暂时还不支持表单验证的逻辑</xui-toastlabel>
<x-row label="[default]">
    <xui-select width="300" on-change="onExampleChanged" datasource="{{examples.datasource}}"></xui-select>
    <xui-button on-click="buildForm" skin="primary">生成表单</xui-button>
    <br />
    <br />
    <xui-aceeditor s-ref="editor" s-if="schemaCode" value="{=schemaCode=}" mode="ace/mode/json" />
    <br />
    <table class="typedefs as-form-preview" s-if="schemaCode">
        <tbody>
            <tr><th>表单</th><th>表单数据</th></tr>
            <tr>
                <td class="as-form-instance"><xui-ghost s-ref="form-container" /></td>
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
        'xui-ghost': Ghost,
        'xui-select': Select,
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
            examples: {
                datasource: [
                    {text: '默认情况', value: kDefaultSchema},
                    {text: '表单联动 visibleOn: $eq, $ne', value: kSchema$eq},
                    {text: '表单联动 visibleOn: $in, $nin', value: kSchema$in},
                    {text: '表单联动 $gt, $lt, $gte, $lte', value: kSchema$gt}
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
        const editor = this.ref('editor');
        const schemaCode = JSON.stringify(value, null, 2);
        this.data.set('schemaCode', schemaCode);
        if (editor) {
            editor.editor.setValue(schemaCode, 1);
        }
        this.buildFormBySchema({value});
    },
    buildFormBySchema({value}) {
        this.nextTick(() => {
            const formContainer = this.ref('form-container');
            if (formContainer) {
                if (this.formInstance) {
                    this.formInstance.dispose();
                    formContainer.el.innerHTML = '';
                }
                this.data.set('formData', {});
                const FormComponent = createForm(value);
                const formInstance = new FormComponent();
                formInstance.watch('formData', formData => this.data.set('formData', formData));
                formInstance.attach(formContainer.el);
                this.formInstance = formInstance;
            }
        });
    }
});
