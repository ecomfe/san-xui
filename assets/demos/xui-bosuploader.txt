/**
 * @file demos/xui-bosuploader.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {BosUploader, Toast} from 'san-xui';

import Row from './Row';
import UUID from './uuid';

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

<x-row label="multiple,key-cb,ak,sk,bos-endpoint,on-complete">
    <xui-bosuploader
        multiple
        key-cb="{{keyCb}}"
        bos-endpoint="https://bce-bos-uploader.bj.bcebos.com"
        ak="ydFi9KR2YOrvHlmGD3oYKEWW"
        sk="KGCc1x4KEpSVmXUu1gOfutqMDmxf0Hvn"
        on-complete="onComplete"
    >
        <div slot="preview">
            <div s-for="f in files">
                <a s-if="f.url" href="{{f.url}}" target="_blank">{{f.name}}</a>
                <span s-else>{{f.name}} ({{f.progress}})</span>
            </div>
        </div>
    </xui-bosuploader>
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
            keyCb(file) {
                const uuid = UUID.generate();
                const extIndex = file.name.lastIndexOf('.');
                if (extIndex === -1) {
                    return uuid;
                }
                const ext = file.name.substr(extIndex);
                return uuid + ext;
            }
        };
    },
    onComplete({files}) {
        Toast.success('上传完毕，文件数量：' + files.length);
    }
});
