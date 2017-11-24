/**
 * @file BulkActions.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from 'inf-ui/x/components/util';
import Button from 'inf-ui/x/components/Button';

const cx = create('ui-bulk-actions');

/* eslint-disable */
const template = `<div class="${cx()}">
    <ui-button class="${cx('item')}" san-for="item in controls"
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
            controls: []
        };
    }
});
