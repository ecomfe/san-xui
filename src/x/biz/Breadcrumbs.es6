/**
 * @file v3/components/Breadcrumbs.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from 'inf-ui/x/components/util';

const cx = create('ui-breadcrumbs');

/* eslint-disable */
const template = `<div class="${cx()}">
    <div class="${cx('item')}" san-for="item, index in items">
        <span class="${cx('divider')}" san-if="index > 0">/</span>
        <a href="{{item.href}}" s-if="item.href">{{item.text}}</a>
        <span s-else class="${cx('label')}">{{item.text}}</span>
    </div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            items: []
        };
    }
});
