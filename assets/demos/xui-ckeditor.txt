/**
 * @file demos/xui-ckeditor.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, CKEditor, ToastLabel} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
需要在页面中引入 CKEditor 的代码，有两种方式：<pre>
1. 手工引入
<code>&lt;script src="https://cdn.bdstatic.com/ckeditor/4.8.0/ckeditor.js"&gt;&lt;/script&gt;</code>

2. AMD Loader自动引入
<code>require.config({
  paths: {
    'ckeditor': 'https://cdn.bdstatic.com/ckeditor/4.8.0'
  }
});</code>
</pre>
</xui-toastlabel>

<x-row label="[default]">
    <xui-ckeditor value="{=value=}" />
</x-row>

<x-row label="options=...">
    <xui-ckeditor options="{{options}}" value="{=value=}" />
    <strong class="large">
        Value is: {{value}}
    </strong>
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-ckeditor': CKEditor
    },
    initData() {
        return {
            value: 'Hello world! <strong> This is the initialize content </strong>',
            options: {
                toolbar: [
                    ['Source', '-', 'Bold', 'Italic'],
                    ['Source', '-', 'Bold', 'Italic']
                ]
            }
        };
    }
});
