/**
 * @file demos/xui-voice.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, Voice, ToastLabel} from 'san-xui';

/* eslint-disable */
const template = `<template>

<xui-toastlabel>基于 vse.baidu.com 提供的服务实现语音识别，跟百度PC版本首页的实现方案一致。</xui-toastlabel>

<x-row label="[default]">
    <xui-voice on-change="onChange" />
    <strong class="large">
    TEXT: {{voiceText}}
    </strong>
</x-row>

<x-row label="error">
    <xui-voice error="初始化失败" />
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
