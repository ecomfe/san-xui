/**
 * @file demos/xui-webuploader.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import {Switch, Toast, Button} from 'san-xui';
import WebUploader from 'san-xui/x/components/WebUploader';

import Row from './Row';

/* eslint-disable */
const template = `<template>

<x-row label="initialize error">
    <xui-webuploader />
</x-row>

<x-row label="[default]">
    <xui-webuploader
        url="/api/null/upload"
        on-accept="onAccept($event)"
    />
</x-row>

<x-row label="hide & show">
    <xui-button on-click="toggleUploader">{{show ? 'Hide' : 'Show'}}</xui-button>
    <xui-webuploader
        url="/api/null/upload"
        on-accept="onAccept($event)"
        style="{{uploaderStyle}}"
    />
</x-row>

<x-row label="jpg,gif,png;auto-start=false;multiple=true;options=...">
    <xui-webuploader
        url="/api/null/upload"
        auto-start="{{false}}"
        multiple
        label="请选择图片"
        options="{{uploader.options}}"
    />
</x-row>

<x-row label="disabled">
    <xui-switch checked="{=uploader.disabled=}" />
    <xui-webuploader
        disabled="{=uploader.disabled=}"
        url="/api/null/upload"
    />
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-switch': Switch,
        'xui-webuploader': WebUploader
    },
    computed: {
        uploaderStyle() {
            const show = this.data.get('show');
            const style = {
                display: show ? 'inline-block' : 'none'
            };
            return style;
        }
    },
    initData() {
        return {
            show: false,
            uploader: {
                disabled: true,
                options: {
                    accept: {
                        title: 'Files',
                        extensions: 'jpg,jpeg,gif,png',
                        mimeTypes: 'image/jpeg,image/gif,image/png'
                    }
                }
            }
        };
    },
    toggleUploader() {
        const show = this.data.get('show');
        this.data.set('show', !show);
    },
    onAccept(event) {
        const ret = event.ret;
        if (ret.success) {
            Toast.success('上传成功');
        }
    }
});
