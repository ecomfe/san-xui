/**
 * @file BulkActions.js
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';
import Button from './Button';

const cx = create('ui-bulk-actions');

/* eslint-disable */
const template = `<div class="${cx()}">
    <ui-button class="${cx('item')}" san-for="item in items"
        disabled="{{item.disabled || disabled}}"
        skin="{{item.level}}"
    >{{item.label}}</ui-button>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-button': Button
    },
    initData() {
        return {
            disabled: false,
            items: []
        };
    }
});
