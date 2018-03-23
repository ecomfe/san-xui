/**
 * @file demos/xui-register-form-item.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, ToastLabel, registerFormItem, createForm} from 'san-xui';

/**
 * 注册一个 type: 'color' 类型的组件，一般来说，为了命名避免冲突，建议加上业务的前缀比较稳妥
 * 控件需要支持 value 属性的双绑
 */
const Color = defineComponent({
    template: `<template>
    <div class="ui-color-picker">
       <input type="color" value="{=value=}" />
    </div>
    </template>`
});

registerFormItem({
    type: 'color',
    tagName: 'ui-form-item-color', // 需要跟下面 builder 里面用的保持一致
    Component: Color,
    builder(item, prefix) {
        // preview 和 formData 是内置的，直接用
        // 如果不需要处理预览模式，就不需要使用 s-if 和 s-else 了
        // 例如：return `<ui-form-item-color value="{=formData.${item.name}=}" />`;
        return `
        <ui-form-item-color s-if="!preview" value="{=formData.${item.name}=}" />
        <span s-else>{{formData.${item.name}}}</span>`;
    }
});

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
默认情况下，提供的 form-item 类型是不够的，如果需要扩展，调用 registerFormItem() 来完成<br/>
<code style="font-family: monospace">
registerFormItem({<br/>
&nbsp;&nbsp;type: string,<br/>
&nbsp;&nbsp;tagName: string?,<br/>
&nbsp;&nbsp;Component: &lt;san.Component&gt;<br/>
&nbsp;&nbsp;builder(item: Object, prefix: string): string<br/>
})
</code>
</xui-toastlabel>
<x-row label="registerFormItem">
    <xui-form form-data="{=formData=}" style="{{formStyle}}" />
    <pre>{{formData | stringify}}</pre>
</x-row>
</template>`;
/* eslint-enable */

const kFormSchema = {
    controls: [
        {
            label: '内置的组件',
            type: 'text',
            required: true,
            name: 'bar'
        },
        {
            label: '自定义的组件',
            type: 'color',
            required: true,
            name: 'foo'
        }
    ]
};

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-form': createForm(kFormSchema),
        'xui-toastlabel': ToastLabel
    },
    filters: {
        stringify(data) {
            return JSON.stringify(data, null, 2);
        }
    },
    initData() {
        return {
            formData: {},
            formStyle: {
                'border': '1px solid #ccc',
                'display': 'block',
                'margin-top': '10px'
            }
        };
    }
});
