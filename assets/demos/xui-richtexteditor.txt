/**
 * @file demos/xui-richtexteditor.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import {Switch, RichTextEditor} from 'san-xui';

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
