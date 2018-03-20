/**
 * @file components/TableFilter.js
 * @author leeight
 */
import {defineComponent} from 'san';

import {create} from './util';
import Layer from './Layer';

const cx = create('ui-table');

const template = `
<div class="${cx('filter-panel')}">
    <label on-click="onToggleFilterLayer" class="${cx('filter-head')} iconfont icon-downarrow"></label>
    <ui-layer open="{=open=}" follow-scroll="{{false}}">
        <div class="${cx('filter-select')}">
            <ul class="ui-select-layer ui-select-layer-x">
                <li class="ui-select-item" on-click="onFilter(item)" s-for="item in options">{{item.text}}</li>
            </ul>
        </div>
    </ui-layer>
</div>
`;

export default defineComponent({
    template,
    components: {
        'ui-layer': Layer
    },
    initData() {
        return {
            open: false,
            options: []
        };
    },
    onToggleFilterLayer() {
        const open = this.data.get('open');
        this.data.set('open', !open);
    },
    onFilter(item) {
        this.data.set('open', false);
        this.fire('change', item);
    }
});
