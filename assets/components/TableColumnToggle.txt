/**
 * @file components/TableColumnToggle.js
 * @author leeight
 */

import {defineComponent} from 'san';

import {hasUnit, create} from './util';
import Button from './Button';
import Layer from './Layer';

const cx = create('ui-table-column-toggle');
const cx2 = create('ui-select');

/* eslint-disable */
const template = `<div class="${cx()}">
<ui-button disabled="{{disabled}}" icon="iot-device-list" on-click="toggleLayer" />
<ui-layer
    follow-scroll="{{false}}"
    open="{=active=}"
    offset-left="{{layerOffsetLeft}}"
    offset-top="{{layerOffsetTop}}"
    align="{{layerAlign}}"
    width="{{layerWidth}}">
    <ul class="${cx2('layer')} ${cx2('layer-x')}" style="{{layerStyle}}">
        <li class="{{item | itemClass}}"
            on-click="onItemClick(item)"
            s-for="item in datasource">
            <label>
                <input type="checkbox"
                    value="{{item.value}}"
                    class="${cx2('selected-box')}"
                    disabled="{{item.disabled}}"
                    checked="{=value=}" />
                <span>{{item.text}}</span>
            </label>
        </li>
    </ul>
</ui-layer>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-button': Button,
        'ui-layer': Layer
    },
    initData() {
        return {
            active: false,
            disabled: false,
            layerAlign: 'left',
            layerWidth: 200,
            layerOffsetLeft: 0,
            layerOffsetTop: 0,
            // 0, 1, 2, 3
            value: [],
            // item.text, item.value, item.disabled
            datasource: []
        };
    },
    computed: {
        layerStyle() {
            const style = {};
            const layerWidth = this.data.get('layerWidth');
            if (layerWidth != null) {
                style.width = hasUnit(layerWidth) ? layerWidth : `${layerWidth}px`;
            }
            return style;
        }
    },
    filters: {
        itemClass(item) {
            const klass = [cx2('item', 'item-multi')];
            // TODO(leeight) 针对 multi 的情况，还未处理
            if (item.disabled) {
                klass.push(cx2('item-disabled'));
            }
            return klass;
        }
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        this.data.set('active', !active);
    },
    onItemClick(item) {
        if (item.disabled) {
            return;
        }
        this.nextTick(() => this.fire('change'));
    }
});
