/**
 * @file demos/xui-toolbar.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Toolbar from 'san-xui/x/biz/Toolbar';
import {Toast, ToastLabel} from 'san-xui';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成工具栏(Toolbar)区域的组件。当前支持的类型：button, button-group, link, divider</xui-toastlabel>

<x-row label="[default]">
    <xui-toolbar controls="{{controls}}" on-item-clicked="onItemClicked" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toolbar': Toolbar,
        'xui-toastlabel': ToastLabel
    },
    initData() {
        return {
            controls: [
                {
                    type: 'button',
                    icon: 'plus',
                    disabled: false,
                    skin: 'primary',
                    label: 'Create'
                },
                {
                    type: 'button-group',
                    disabled: false,
                    datasource: [
                        {text: 'FOO', value: 'FOO'},
                        {text: 'BAR', value: 'BAR'},
                        {text: '123', value: '123'}
                    ]
                },
                {
                    type: 'link',
                    link: 'https://www.baidu.com',
                    label: 'www.baidu.com'
                }
            ]
        };
    },
    onItemClicked(event) {
        Toast.success(JSON.stringify(event));
    }
});
