/**
 * @file demos/xui-toast.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Toast, Button} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-button on-click="showToast('success')">Show Success Toast</xui-button>
<xui-button on-click="showToast('info')">Show Info Toast</xui-button>
<xui-button on-click="showToast('warning')">Show Warning Toast</xui-button>
<xui-button on-click="showToast('error')">Show Error Toast</xui-button>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-button': Button,
        'xui-toast': Toast
    },
    initData() {
        return {
        };
    },
    showToast(level) {
        if (typeof Toast[level] === 'function') {
            const message = 'This is a toast message';
            Toast[level](message);
        }
        else {
            alert('Unsupported toast level = ' + level);
        }
    }
});
