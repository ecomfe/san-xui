/**
 * @file demos/xui-uploader.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import ToastLabel from 'inf-ui/x/components/ToastLabel';
import Uploader from 'inf-ui/x/forms/Uploader';
// import Toast from 'inf-ui/x/components/Toast';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel text="文件上传到 BOS，无需任何配置，开箱即用" />
<x-row label="default">
    <div class="as-form-row">
        <div class="ui-form-item-content">
            <xui-uploader value="{=value=}" />
        </div>
    </div>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-uploader': Uploader
    },
    initData() {
        return {
            value: 'https://bce-bos-uploader.bj.bcebos.com/v1//2017/12/21/88047fbb-a1b3-4430-8732-c960a2402907/dot.psd'
        };
    }
});
