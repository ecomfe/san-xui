/**
 * @file xui-infinite-scroll.js
 * @author xuli07
 */

import {defineComponent} from 'san';
import {InfiniteScroll} from 'san-xui';

/* eslint-disable */
const template = `<template>
    <xui-infinite-scroll on-more="loadMore" loading="{{loading}}" distance="150" finished="{{finished}}">
        <div s-for="i in list">{{i}}</div>
    </xui-infinite-scroll>
</template>`;
/* eslint-enable */


export default defineComponent({
    template,
    components: {
        'xui-infinite-scroll': InfiniteScroll
    },
    initData() {
        return {
            start: 0,
            loading: false,
            finished: false,
            list: Array(30).fill(1).map((k, i) => i)
        };
    },

    loadMore() {
        this.data.set('loading', true);
        setTimeout(() => {
            if (this.data.get('start') < 100) {
                this.data.set('start', this.data.get('start') + 30);
                this.data.set('list', this.data.get('list').concat(Array(30).fill(1).map((k, i) => this.data.get('start') + i)));
                this.data.set('loading', false);
            }
            else {
                this.data.set('finished', true);
            }
        }, 1000);
    }
});
