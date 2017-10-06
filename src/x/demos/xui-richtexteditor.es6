/**
 * @file demos/xui-richtexteditor.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import RichTextEditor from 'inf-ui/x/components/RichTextEditor';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-richtexteditor value="{=value=}" />
</x-row>

<x-row label="options=...">
    <xui-richtexteditor
        options="{{options}}"
        value="{=value=}" />
    <br />
    <br />
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
        'xui-richtexteditor': RichTextEditor
    },
    initData() {
        return {
            value: 'Hello world! <strong> This is the initialize content </strong>',
            options: {
                toolbars: [
                    [
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough',
                    ]
                ]
            }
        };
    }
});
