/**
 * 批量操作的区域，一般包含 Button, Select 之类的内容
 *
 * @file san-xui/x/biz/BulkActions.js
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from '../components/util';
import Button from '../components/Button';
import Select from '../components/Select';
import {Ghost} from './helper';

const cx = create('ui-bulk-actions');

/* eslint-disable */
const template = `<div class="${cx()}">
<ui-ghost s-for="item in controls">
    <ui-button
        s-if="item.type === 'button'"
        on-click="onBuckActionEvent(item)"
        disabled="{{item.disabled}}"
        icon="{{item.icon}}"
        label="{{item.label}}"
        skin="{{item.skin}}"
        />
    <ui-select
        s-if="item.type === 'select'"
        value="{{item.value}}"

        datasource="{{item.options}}"
        on-change="onBuckActionEvent($event)"
        />
    <a
        s-if="item.type === 'link'"
        target="_blank"
        href="{{item.link}}">{{item.label}}</a>
    <span s-if="item.type === 'divider'">&nbsp;</span>
</ui-ghost>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-ghost': Ghost,
        'ui-button': Button,
        'ui-select': Select
    },
    initData() {
        return {
            disabled: false,
            controls: []
        };
    }
});
