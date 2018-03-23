/**
 * @file demos/xui-textbox.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, TextBox, Toast} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="type=text">
    <xui-textbox placeholder="This is placeholder" value="{=text.value=}" on-enter="onPressEnterOnTextBox" />
    <xui-textbox disabled placeholder="This is disabled textbox" />
    Value is: {{text.value}}
</x-row>
<x-row label="type=password">
    <xui-textbox width="{{100}}" type="password" placeholder="This is placeholder" value="{=password.value=}" />
    <xui-textbox disabled width="300px" type="password" placeholder="This is disabled textbox" />
    Password is: {{password.value}}
</x-row>
<x-row label="type=text,addon=@_@">
    <xui-textbox
        addon="@_@"
        placeholder="This is placeholder"
        value="{=text.value=}"
        on-enter="onPressEnterOnTextBox" />
</x-row>
<x-row label="type=text,addon=@_@,addon-position=end">
    <xui-textbox
        addon="@_@"
        addon-position="end"
        placeholder="This is placeholder"
        value="{=text.value=}"
        on-enter="onPressEnterOnTextBox" />
</x-row>
<x-row label="multiline">
    <xui-textbox multiline placeholder="This is placeholder" value="{=textarea.value=}" />
    <xui-textbox multiline disabled placeholder="This is disabled textbox" />
    Value is: {{textarea.value}}
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-textbox': TextBox
    },
    initData() {
        return {
            text: {
                value: ''
            },
            textarea: {
                value: ''
            },
            password: {
                value: ''
            }
        };
    },
    onPressEnterOnTextBox() {
        Toast.info('Enter pressed');
    }
});
