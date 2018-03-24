/**
 * @file demos/xui-go.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Go, ToastLabel} from 'san-xui';

Go.setSwitchHandler((event, comp) => {
    // XXX 真实场景下，在 common 里面会实现这个逻辑；在 DEMO 里面，就随便写写好了。
    const hash = comp.data.get('href');
    location.hash = hash;
    return Promise.resolve();
});

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
在百度云控制台中，从 <code>服务A</code> 跳转到 <code>服务B</code> 的时候，涉及到比较复杂的加载机制。<br />
直接用 &lt;a&gt; 会导致公共的代码重复加载，所以这里特殊处理一下，&lt;xui-go href=&quot;/billing/#/foo/bar&quot;&gt;...&lt;/xui-go&gt;。
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

