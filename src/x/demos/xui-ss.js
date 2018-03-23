/**
 * @file demos/xui-ss.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, StopScroll} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-ss style="{{myStyle}}">
        这个容器，滚动到底部，不会影响页面
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </xui-ss>

    <div style="{{myStyle}}">
        这个容器，滚动到底部，页面开始滚动
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-ss': StopScroll
    },
    initData() {
        return {
            myStyle: {
                'display': 'inline-block',
                'margin-right': '10px',
                'width': '150px',
                'height': '50px',
                'overflow': 'hidden',
                'border': '1px solid #000',
                'overflow-y': 'auto'
            }
        };
    }
});

