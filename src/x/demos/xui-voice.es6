/**
 * @file demos/xui-voice.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import {Voice, ToastLabel} from 'san-xui';

import Row from './Row';

/* eslint-disable */
const template = `<template>

<xui-toastlabel>基于 vse.baidu.com 提供的服务实现语音识别，跟百度PC版本首页的实现方案一致。</xui-toastlabel>

<x-row label="[default]">
    <xui-voice on-change="onChange" />
    <strong class="large">
    TEXT: {{voiceText}}
    </strong>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-voice': Voice,
        'xui-toastlabel': ToastLabel
    },
    initData() {
        return {
            voiceText: null
        };
    },
    onChange({value}) {
        this.data.set('voiceText', value.text);
    }
});
