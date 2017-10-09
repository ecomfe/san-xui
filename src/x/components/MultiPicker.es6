/**
 * @file components/MultiPicker.es
 * @author leeight
 */

// import u from 'lodash';
import {defineComponent} from 'san';

import {hasUnit, arrayTreeFilter2, create} from './util';
import Layer from './Layer';
import Icon from './Icon';

const cx = create('ui-select');

const kDefaultLabel = '请选择';
const kValuesKey = 'value';
const kTmpValuesKey = '__values';

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}">
    <span class="${cx('text')}">{{label|raw}}</span>
    <ui-layer open="{=active=}" s-ref="layer">
        <div class="${cx('layer')} ${cx('layer-x')} ${cx('multipicker-layer')}" style="{{layerStyle}}">
            <ul s-for="datasource, levelIndex in compactLevels">
                <li class="{{item.active ? '${cx('item', 'item-selected')}' : '${cx('item')}'}}"
                    on-click="onItemSelected(item, levelIndex)"
                    on-mouseover="expandChildren(item, levelIndex)"
                    s-for="item in datasource">
                    <span>{{item.text}}<ui-icon name="arrow-right" s-if="item.expandable" /></span>
                </li>
            </ul>
        </div>
    </ui-layer>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-icon': Icon,
        'ui-layer': Layer
    },
    initData() {
        return {
            disabled: false,
            active: false,
            layerWidth: 'auto',
            datasource: [],
            [kValuesKey]: [],
            [kTmpValuesKey]: []      // 临时的值，点击了之后，同步到 value 里面去
        };
    },
    computed: {
        // datasource 是树形结构
        // compactLevels 是打平之后的，用户看到的和可以操作的是 compactLevels 的数据
        compactLevels() {
            const values = this.data.get(kTmpValuesKey);
            const datasource = this.data.get('datasource');
            const compactLevels = [];

            arrayTreeFilter2(values, datasource, compactLevels);

            return compactLevels;
        },
        mainClass() {
            const klass = cx.mainClass(this);
            const active = this.data.get('active');
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
            }
            return klass;
        },
        layerStyle() {
            const style = {};
            const layerWidth = this.data.get('layerWidth');
            if (layerWidth != null) {
                style.width = hasUnit(layerWidth) ? layerWidth : `${layerWidth}px`;
            }
            return style;
        },
        label() {
            const values = this.data.get(kValuesKey);
            return values && values.length ? values.join(' / ') : kDefaultLabel;
        }
    },
    inited() {
        const values = this.data.get(kValuesKey);
        this.data.set(kTmpValuesKey, values);
        this.watch(kValuesKey, values => this.data.set(kTmpValuesKey, values));
    },
    onItemSelected(item, index) {
        this.data.set('active', false);
        const values = this.data.get(kTmpValuesKey);
        this.data.set(kValuesKey, values);
    },
    expandChildren(item, index) {
        this.data.set(`${kTmpValuesKey}[${index}]`, item.value);
        const values = this.data.get(kTmpValuesKey);
        for (let i = index + 1; i < values.length; i++) {
            this.data.removeAt(kTmpValuesKey, i);
        }
    },
    toggleLayer(e) {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        this.data.set('active', !active);
    }
});

