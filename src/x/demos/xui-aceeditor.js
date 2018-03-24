/**
 * @file demos/xui-aceeditor.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, ACEEditor, ToastLabel} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
需要在页面中引入 ace 的代码，有两种方式：<pre>
1. 手工引入
<code>&lt;script src="https://cdn.bdstatic.com/ace-builds/src-min-noconflict/ace.js"&gt;&lt;/script&gt;</code>

2. AMD Loader自动引入
<code>require.config({
  paths: {
    'ace-builds': 'https://cdn.bdstatic.com/ace-builds/src-min-noconflict'
  }
});</code>
</pre>
</xui-toastlabel>

<x-row label="[default]">
    <xui-aceeditor value="{=editor.value=}" />
    <strong class="large">
        <pre>{{editor.value}}</pre>
    </strong>
</x-row>

<x-row label="width=100,height=100">
    <xui-aceeditor
        width="{{100}}"
        height="{{100}}"
        value="{=editor.value=}" />
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-aceeditor': ACEEditor
    },
    initData() {
        return {
            editor: {
                value: 'hello world'
            }
        };
    }
});
