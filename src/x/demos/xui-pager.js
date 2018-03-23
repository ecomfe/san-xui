/**
 * @file demos/xui-pager.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, Pager} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-pager size="{{pager.size}}"
        page="{{pager.page}}"
        count="{{pager.count}}"
        on-change="onPagerChange($event)" />
</x-row>
<x-row label="back-text=上一页,forward-text=下一页">
    <xui-pager size="{{pager.size}}"
        with-total-count
        page="{{pager.page}}"
        count="{{pager.count}}"
        back-text="上一页"
        forward-text="下一页"
        on-change="onPagerChange($event)" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-pager': Pager
    },
    initData() {
        return {
            pager: {
                size: 10,
                page: 1,
                count: 111
            }
        };
    },
    onPagerChange({pageNo}) {
        this.data.set('pager.page', pageNo);
    }
});
