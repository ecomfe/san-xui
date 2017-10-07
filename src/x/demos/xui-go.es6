/**
 * @file demos/xui-go.es6
 * @author leeight
 */

import Promise from 'promise';
import {defineComponent} from 'san';
import Go from 'inf-ui/x/components/Go';
import ToastLabel from 'inf-ui/x/components/ToastLabel';

Go.setSwitchHandler((event, comp) => {
    const hash = comp.data.get('href');
    location.hash = hash;
    return Promise.resolve();
});

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
在百度云控制台中，从 <code>服务A</code> 跳转到 <code>服务B</code> 的时候，有很复杂的加载机制。<br />
直接用 &lt;a&gt; 是无法实现的，需要自定义处理一下，&lt;xui-go href=&quot;/billing/#/foo/bar&quot;&gt;...&lt;/xui-go&gt;。
</xui-toastlabel>
<br />
<xui-go href="#comp=xui-button">Goto xui-button</xui-go>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-toastlabel': ToastLabel,
        'xui-go': Go
    },
    initData() {
        return {
        };
    }
});

