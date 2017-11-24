/**
 * @file demos/xui-bosuploader.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import BosUploader from 'inf-ui/x/components/BosUploader';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="initialize error">
    <xui-bosuploader />
</x-row>

<x-row label="normal">
    <xui-bosuploader
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>

<x-row label="auto-start=true">
    <xui-bosuploader
        auto-start
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>

<x-row label="disabled">
    <xui-bosuploader
        disabled
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-bosuploader': BosUploader
    },
    initData() {
        return {
        };
    }
});
