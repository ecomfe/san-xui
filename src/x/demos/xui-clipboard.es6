/**
 * @file demos/xui-clipboard.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Clipboard from 'inf-ui/x/components/Clipboard';
import Button from 'inf-ui/x/components/Button';

/* eslint-disable */
const template = `<template>
<xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">
    <xui-button>{{clipboard.btnText}}</xui-button>
</xui-clipboard>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-button': Button,
        'xui-clipboard': Clipboard
    },
    initData() {
        return {
            clipboard: {
                btnText: '点我复制'
            }
        };
    },
    onAfterCopy() {
        this.data.set('clipboard.btnText', '复制成功');
    }
});
