/**
 * @file demos/xui-hljs.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import SyntaxHighlighter from 'inf-ui/x/components/SyntaxHighlighter';

import Row from './Row';

/* eslint-disable */
const template = `<template>
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
