/**
 * @file demos/xui-hljs.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, ToastLabel, SyntaxHighlighter} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
需要在页面中引入 hljs 的代码和样式，有两种方式：<pre>
1. 手工引入
<code>&lt;script src="https://cdn.bdstatic.com/console/highlight.js/9.12.0/highlight.min.js"&gt;&lt;/script&gt;
&lt;link rel="stylesheet" type="text/css" href="https://cdn.bdstatic.com/console/highlight.js/9.12.0/styles/default.min.css" /&gt;</code>

2. AMD Loader自动引入
<code>require.config({
  paths: {
    'hljs': 'https://cdn.bdstatic.com/console/highlight.js/9.12.0',
    'hljs/highlight': 'https://cdn.bdstatic.com/console/highlight.js/9.12.0/highlight.min'
  }
});</code>
</pre>
</xui-toastlabel>

<x-row label="lang=javascript">
    <xui-hljs code="{{code.javascript}}" />
</x-row>

<x-row label="lang=html">
    <xui-hljs code="{{code.html}}" lang="html" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-hljs': SyntaxHighlighter
    },
    initData() {
        return {
            code: {
                javascript: 'var a = 10;\n'
                    + 'var b = 20;\n'
                    + 'console.log(a + b + \'c = 30\')\n',
                html: '<!doctype html>\n'
                    + '<html>\n'
                    + '<head>\n'
                    + '  <meta charset="utf-8" />\n'
                    + '  <title>sdfdfM<title>\n'
                    + '</head>\n'
                    + '<body>\n'
                    + '  Hello World.\n'
                    + '</body>\n'
                    + '</html>'
            }
        };
    }
});
