/**
 * @file demos/xui-bos-uploader.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import BosUploader from 'inf-ui/x/components/BosUploader';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="initialize error">
    <xui-bos-uploader />
</x-row>

<x-row label="normal">
    <xui-bos-uploader
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>

<x-row label="auto-start=true">
    <xui-bos-uploader
        auto-start
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>

<x-row label="disabled">
    <xui-bos-uploader
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
        'xui-bos-uploader': BosUploader
    },
    initData() {
        return {
        };
    }
});
