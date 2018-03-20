/**
 * @file v3/components/Breadcrumbs.js
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-breadcrumbs');

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <div class="${cx('item')}" san-for="item, index in items">
        <span class="${cx('divider')}" san-if="index > 0">/</span><span class="${cx('label')}" >{{item.text}}</span>
    </div>
</div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            items: []
        };
    }
});
