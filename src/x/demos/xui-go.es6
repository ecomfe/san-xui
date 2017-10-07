/**
 * @file demos/xui-go.es6
 * @author leeight
 */

import Promise from 'promise';
import {defineComponent} from 'san';
import Go from 'inf-ui/x/components/Go';

Go.setSwitchHandler((event, comp) => {
    const hash = comp.data.get('href');
    location.hash = hash;
    return Promise.resolve();
});

/* eslint-disable */
const template = `<template>
<xui-go href="#comp=xui-button">Goto xui-button</xui-go>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-go': Go
    },
    initData() {
        return {
        };
    }
});

