/**
 * @file demos/xui-actionloader.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import {ActionLoader, ToastLabel, Button} from 'san-xui';
import controller from 'er/controller';

import Row from './Row';
import {createAction} from './util';

controller.registerAction([
    {
        type: createAction(),
        path: '/bar/foo/abc'
    },
    {
        type: createAction(),
        path: '/bar/foo/123'
    }
]);

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
通过 xui-actionloader 可以让 San Page 复用之前遗留的 ER Action，本质上跟之前的 ef/ActionPanel 是一样的思路.
</xui-toastlabel>
<br />

<x-row label="[default]">
    <xui-actionloader
        url="/foo/bar/abc"
    />
</x-row>

<x-row label="url=/bar/foo/abc">
    <div>
        <xui-button on-click="switchTo('/bar/foo/abc')">/bar/foo/abc</xui-button>
        <xui-button on-click="switchTo('/bar/foo/123')">/bar/foo/123</xui-button>
    </div>
    <br />
    <xui-actionloader url="{=action.url=}" />
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-toastlabel': ToastLabel,
        'xui-actionloader': ActionLoader
    },
    initData() {
        return {
            action: {
                url: '/bar/foo/abc'
            }
        };
    },
    switchTo(url) {
        this.data.set('action.url', url);
    }
});
