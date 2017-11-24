/**
 * @file inf-ui/x/biz/XPager.es6
 * @author leeight
 */

import {DataTypes} from 'san';
import {defineComponent} from 'inf-ui/sanx';
import Pager from 'inf-ui/x/components/Pager';
import Select from 'inf-ui/x/components/Select';

/* eslint-disable */
const template = `<template>
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
