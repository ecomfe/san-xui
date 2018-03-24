/**
 * @file demos/xui-richtexteditor.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, ToastLabel, Switch, RichTextEditor} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
需要在页面中引入 UEditor 和 ZeroClipboard 的代码，有两种方式：<pre>
1. 手工引入
<code>&lt;script src="https://cdn.bdstatic.com/console/dep/c42ae776/ueditor/1.4.3/ueditor.all.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.bdstatic.com/console/dist/ef68d9f/dep/zeroclipboard/2.2.0/ZeroClipboard.2.2.0.max.js"&gt;&lt;/script&gt;</code>

2. AMD Loader自动引入
<code>require.config({
  paths: {
    'zeroclipboard': 'https://cdn.bdstatic.com/console/dep/05cfee93/zeroclipboard/ZeroClipboard',
    'ueditor': 'https://cdn.bdstatic.com/console/dep/c42ae776/ueditor/1.4.3'
  }
});</code>
</pre>
</xui-toastlabel>

<x-row label="[default]">
    <xui-richtexteditor value="{=value=}" />
</x-row>

<x-row label="options=...">
    <xui-richtexteditor
        options="{{options}}"
        value="{=value=}" />
    <strong class="large">
        Value is: {{value}}
    </strong>
</x-row>

<x-row label="s-if">
    <xui-switch checked="{=show=}" />
    <form s-if="show">
        <xui-richtexteditor options="{{options}}" />
    </form>
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-switch': Switch,
        'xui-richtexteditor': RichTextEditor
    },
    initData() {
        return {
            show: true,
            value: 'Hello world! <strong> This is the initialize content </strong>',
            options: {
                toolbars: [
                    [
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough'
                    ]
                ]
            }
        };
    }
});
