/**
 * @file demos/xui-uploader.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, ToastLabel, Uploader} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
<strong style="color: red">文件上传到 BOS，无需任何配置，开箱即用</strong><br />
需要在页面中引入 bce-bos-uploader-lite 的代码，有两种方式：<pre>
1. 手工引入
<code>&lt;script src="https://cdn.bdstatic.com/bce-bos-uploader-lite/1.0.5/bce-bos-uploader-lite.min.js"&gt;&lt;/script&gt;</code>

2. AMD Loader自动引入
<code>require.config({
  paths: {
    'baidubce': 'https://cdn.bdstatic.com/bce-bos-uploader-lite/1.0.5/bce-bos-uploader-lite.min'
  }
});</code>
</pre>
</xui-toastlabel>

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
        // 'xui-uploader': ../forms/Uploader
        'xui-toastlabel': ToastLabel,
        'xui-uploader': Uploader
    },
    initData() {
        return {
            value: 'https://bce-bos-uploader.bj.bcebos.com/v1//2017/12/21/88047fbb-a1b3-4430-8732-c960a2402907/dot.psd'
        };
    }
});
