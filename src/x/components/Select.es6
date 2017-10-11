/**
 * @file Select.es6
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';

import {hasUnit, create} from './util';
import Layer from './Layer';
import ScrollIntoView from './ScrollIntoView';
import TextBox from './TextBox';

const cx = create('ui-select');
const kDefaultLabel = '请选择';

function defaultFilter(datasource, keyword) {
    if (!keyword) {
        return datasource;
    }

    const rv = [];
    u.each(datasource, item => {
        if (item.text && item.text.indexOf(keyword) !== -1) {
            rv.push(item);
        }
    });
    return rv;
}

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}">
    <span class="${cx('text')}" s-if="multi">{{multiLabel|raw}}</span>
    <span class="${cx('text')}" s-else>{{label|raw}}</span>
    <ui-layer open="{=active=}" s-ref="layer" offset-top="{{3}}">
        <ul class="${cx('layer')} ${cx('layer-x')}" s-if="multi" style="{{layerStyle}}">
            <ui-textbox s-if="filter"
                value="{=keyword=}"
                placeholder="{{filterPlaceholder}}"
                width="{{layerWidth - 50}}"
                />
            <li class="${cx('item', 'item-all')}" s-if="filteredDatasource.length">
                <label>
                    <input type="checkbox"
                        on-change="onToggleAll"
                        checked="{=checkedAll=}"
                        />
                    全选/全不选
                </label>
            </li>
            <li class="{{item | itemClass}}"
                s-for="item in filteredDatasource">
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
        <ul class="${cx('layer')} ${cx('layer-x')}" s-else style="{{layerStyle}}">
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
        'ui-textbox': TextBox,
        'ui-layer': Layer,
        'ui-siv': ScrollIntoView
    },
    initData() {
        return {
            active: false,
            multi: false,   // 是否支持多选，也就是之前的 MultiSelect 的功能
            layerWidth: 200,

            filter: false,  // 是否支持搜索过滤
            filterPlaceholder: '',    // filter textbox placeholder
            filterCallback: defaultFilter,
            keyword: '',    // 过滤的关键词

            value: '',      // any | any[]
            checkedAll: false
        };
    },
    computed: {
        multiLabel() {
            // const datasource = this.data.get('datasource');
            const values = this.data.get('value');
            return values && values.length > 0 ? `您已经选择了${values.length}项` : kDefaultLabel;
            /**
            const labels = [];
            u.each(datasource, item => {
                if (u.indexOf(values, item.value) !== -1) {
                    labels.push(item.text);
                }
            });

            return labels.length > 0 ? labels.join(',') : kDefaultLabel;
            */
        },
        label() {
            const selectedItem = this.data.get('selectedItem');
            return selectedItem ? selectedItem.text : kDefaultLabel;
        },
        filteredDatasource() {
            // XXX(leeight) https://github.com/ecomfe/san/issues/97
            const keyword = this.data.get('keyword');
            const datasource = this.data.get('datasource');
            const filterCallback = this.data.get('filterCallback') || defaultFilter;
            return filterCallback(datasource, keyword);
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
        layerStyle() {
            const style = {};
            const layerWidth = this.data.get('layerWidth');
            if (layerWidth != null) {
                style.width = hasUnit(layerWidth) ? layerWidth : `${layerWidth}px`;
            }
            return style;
        },
        mainClass() {
            const klass = cx.mainClass(this);
            const active = this.data.get('active');
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
            // TODO(leeight) 针对 multi 的情况，还未处理
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
    onToggleAll() {
        const checkedAll = this.data.get('checkedAll');
        if (checkedAll) {
            const datasource = this.data.get('filteredDatasource');
            const value = [];
            u.each(datasource, item => {
                if (!item.disabled) {
                    value.push(item.value);
                }
            });
            this.data.set('value', value);
        }
        else {
            this.data.set('value', []);
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
