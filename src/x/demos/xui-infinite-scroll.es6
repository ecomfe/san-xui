/**
 * @file xui-infinite-scroll.es6
 * @author xuli07
 * 
 */

import {defineComponent} from 'inf-ui/sanx';
import InfiniteScroll from 'inf-ui/x/components/InfiniteScroll';

/* eslint-disable */
const template = `<template>
    <xui-infinite-scroll on-more="loadMore" busy="{{busy}}" distance="150">
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
            busy: false,
            list: Array(30).fill(1).map((k, i) => i)
        };
    },

    loadMore() {
        this.data.set('busy', true);
        setTimeout(() => {
            if (this.data.get('start') < 100) { 
                this.data.set('start', this.data.get('start') + 30);
                this.data.set('list', this.data.get('list').concat(Array(30).fill(1).map((k, i) => this.data.get('start') + i)));
                this.data.set('busy', false);
            }
        }, 1000);
    }
});