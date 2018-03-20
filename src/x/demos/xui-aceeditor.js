/**
 * @file demos/xui-aceeditor.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {ACEEditor} from 'san-xui';

import Row from './Row';

/* eslint-disable */
const template = `<template>
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
