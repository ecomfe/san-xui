/**
 * @file demos/xui-button-menu.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import ButtonMenu from 'inf-ui/x/components/ButtonMenu';
import ToastLabel from 'inf-ui/x/components/ToastLabel';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>好像跟 xui-select 挺像的</xui-toastlabel>

<x-row label="[default]">
    <xui-button-menu
        label="Default"
        menus="{{menus}}"
        />

    <xui-button-menu
        label="Primary"
        skin="primary"
        menus="{{menus}}"
        />

    <xui-button-menu
        label="Danger"
        skin="danger"
        menus="{{menus}}"
        />
</x-row>

<x-row label="disabled">
    <xui-button-menu
        label="Hi"
        disabled
        menus="{{menus}}"
        />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-button-menu': ButtonMenu
    },
    initData() {
        return {
            menus: [
                {text: 'foo'},
                {text: 'bar'},
                {text: 'abc123', disabled: true},
                {text: 'abc456'}
            ]
        };
    }
});
