/**
 * @file Pager.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create, buildPagerItems} from './util';

const cx = create('ui-pager');

/* eslint-disable */
const template = `<template>
<div class="{{mainClass}}">
    <span class="${cx('count')}" s-if="withTotalCount">共{{count}}条</span>
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
        mainClass() {
            return cx.mainClass(this);
        },
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
            withTotalCount: false, // 是否显示总条数
            size: 10,
            page: 1,
            count: 0,
            backCount: 3,
            forwardCount: 3,
            backText: '<',
            forwardText: '>'
        };
    },
    dataTypes: {
        /**
         * 是否显示总的页数
         * @default false
         */
        withTotalCount: DataTypes.bool,

        /**
         * 每页展示的数量
         * @default 10
         */
        size: DataTypes.number,

        /**
         * 第一页
         * @default 1
         */
        page: DataTypes.number,

        /**
         * 总共的数量
         * @default 0
         */
        count: DataTypes.number,

        /**
         * 当前页之前最多 back-count 个页码
         * @default 3
         */
        backCount: DataTypes.number,

        /**
         * 当前页之后最多 forward-count 个页码
         * @default 3
         */
        forwardCount: DataTypes.number,

        /**
         * 后一页的文案
         * @default <
         */
        backText: DataTypes.string,

        /**
         * 前一页的文案
         * @default >
         */
        forwardText: DataTypes.string
    },
    onPagerItemClick(item) {
        if (item.disabled) {
            return;
        }
        this.fire('change', {pageNo: item.value});
    }
});
