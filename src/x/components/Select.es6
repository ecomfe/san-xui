/**
 * @file Select.es6
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';

import {create} from './util';
import Layer from './Layer';
import ScrollIntoView from './ScrollIntoView';

const cx = create('ui-select');
const kDefaultLabel = '请选择';

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}">
    <span class="${cx('text')}" s-if="multi">{{multiLabel|raw}}</span>
    <span class="${cx('text')}" s-else>{{label|raw}}</span>
    <ui-layer open="{=active=}" ref="layer">
        <ul class="${cx('layer')} ${cx('layer-x')}" s-if="multi">
            <li class="{{item | itemClass}}"
                s-for="item in datasource">
                <label>
                    <input type="checkbox"
                        value="{{item.value}}"
                        class="${cx('selected-box')}"
                        disabled="{{item.disabled}}"
                        checked="{=value=}" />
                    <span>{{item.text}}</span>
                </label>
            </li>
        </ul>
        <ul class="${cx('layer')} ${cx('layer-x')}" s-else>
            <li on-click="selectItem($event, item)"
                class="{{item | itemClass}}"
                s-for="item in datasource">
                <ui-siv s-if="item.value === value"><span>{{item.text}}</span></ui-siv>
                <span s-else>{{item.text}}</span>
            </li>
        </ul>
    </ui-layer>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-layer': Layer,
        'ui-siv': ScrollIntoView
    },
    initData() {
        return {
            active: false,
            multi: false,   // 是否支持多选，也就是之前的 MultiSelect 的功能
            value: ''       // any | any[]
        };
    },
    computed: {
        multiLabel() {
            const datasource = this.data.get('datasource');
            const values = this.data.get('value');
            const labels = [];
            u.each(datasource, item => {
                if (u.indexOf(values, item.value) !== -1) {
                    labels.push(item.text);
                }
            });

            return labels.length > 0 ? labels.join(',') : kDefaultLabel;
        },
        label() {
            const selectedItem = this.data.get('selectedItem');
            return selectedItem ? selectedItem.text : kDefaultLabel;
        },
        selectedItem() {
            const value = this.data.get('value');
            const datasource = this.data.get('datasource');
            if (value != null && datasource) {
                for (let i = 0; i < datasource.length; i++) {
                    if (datasource[i] && datasource[i].value === value) {
                        return datasource[i];
                    }
                }
            }
            return null;
        },
        mainClass() {
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const active = this.data.get('active');
            const klass = [cx(), cx('x')];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-button');
            }
            if (disabled) {
                klass.push('state-disabled');
                klass.push(cx('disabled'));
            }
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
            }
            return klass;
        }
    },
    filters: {
        itemClass(item) {
            const value = this.data.get('value');
            const multi = this.data.get('multi');
            const klass = [cx('item')];
            if (item.value === value) {
                klass.push(cx('item-selected'));
            }
            if (item.disabled) {
                klass.push(cx('item-disabled'));
            }
            if (multi) {
                klass.push(cx('item-multi'));
            }
            return klass;
        }
    },
    inited() {
        const {multi, value} = this.data.get();
        if (multi && !u.isArray(value)) {
            // 转化一下格式
            this.data.set('value', []);
        }
    },
    selectItem(e, item) {
        if (item.disabled) {
            return;
        }
        this.data.set('value', item.value);
        this.data.set('active', false);

        this.fire('change', {selectedItem: item});
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
