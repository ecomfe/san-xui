/**
 * @file Pager.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create, buildPagerItems} from './util';

const cx = create('ui-pager');

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <span class="${cx('count')}" s-if="withTotalcount">共{{count}}条</span>
    <ul class="${cx('main')}">
        <li on-click="onPagerItemClick(item)"
            class="${cx('item')} {{item.className}}"
            san-for="item in items">{{item.label|raw}}</li>
    </ul>
</div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        items() {
            const size = this.data.get('size');
            const page = this.data.get('page');
            const count = this.data.get('count');
            const backText = this.data.get('backText');
            const backCount = this.data.get('backCount');
            const forwardCount = this.data.get('forwardCount');
            const forwardText = this.data.get('forwardText');

            // {value, label, className, disabled}
            return buildPagerItems({size, page, count, backCount, backText, forwardCount, forwardText, cx});
        }
    },
    initData() {
        return {
            withTotalcount: true,
            size: 10,
            page: 1,
            count: 0,
            backCount: 3,
            forwardCount: 3,
            backText: '上一页',
            forwardText: '下一页'
        };
    },
    onPagerItemClick(item) {
        if (item.disabled) {
            return;
        }
        this.fire('change', {pageNo: item.value});
    }
});
