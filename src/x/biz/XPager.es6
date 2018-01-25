/**
 * @file san-xui/x/biz/XPager.es6
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import Pager from '../components/Pager';
import Select from '../components/Select';

/* eslint-disable */
const template = `<template>
    <label class="list-page-pager-total-count" s-if="withTotalCount">共{{pager.count}}条</label>
    <label s-if="withPagerSize">每页展示</label>
    <ui-select
        s-if="withPagerSize"
        layer-width="80"
        datasource="{{pager.datasource}}"
        value="{=pager.size=}"
        on-change="onPagerSizeChange($event)"
        />
    <ui-pager
        size="{{pager.size}}"
        page="{{pager.page}}"
        count="{{pager.count}}"
        back-text="<"
        forward-text=">"
        on-change="onPagerChange($event)" />
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-select': Select,
        'ui-pager': Pager
    },
    dataTypes: {
        withTotalCount: DataTypes.bool,
        withPagerSize: DataTypes.bool,
        pager: DataTypes.object
    },
    onPagerSizeChange(event) {
        this.fire('pager-size-change', event);
    },
    onPagerChange(event) {
        this.fire('pager-change', event);
    }
});
