/**
 * @file demos/xui-ckeditor.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import CKEditor from 'inf-ui/x/components/CKEditor';

import Row from './Row';

/* eslint-disable */
const template = `<template>
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
