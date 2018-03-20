/**
 * @file Select.js
 * @author leeight
 */

import u from 'lodash';
import {DataTypes, defineComponent} from 'san';

import {hasUnit, create} from './util';
import {asInput} from './asInput';
import Layer from './Layer';
import ScrollIntoView from './ScrollIntoView';
import TextBox from './TextBox';
import StopScroll from './StopScroll';

const cx = create('ui-select');
const kDefaultLabel = '请选择';

function defaultFilter(datasource, keyword) {
    if (!keyword) {
        return datasource;
    }

    const rv = [];
    u.each(datasource, item => {
        if (item.text && item.text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            rv.push(item);
        }
    });
    return rv;
}

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}" style="{{mainStyle}}">
    <span class="${cx('text')}" s-if="multi">{{multiLabel|raw}}</span>
    <span class="${cx('text')}" s-else>{{label|raw}}</span>
    <ui-layer open="{=active=}" follow-scroll="{{false}}" s-ref="layer" offset-top="{{layerOffsetTop}}" offset-left="{{layerOffsetLeft}}">
        <ui-ss class="${cx('layer')} ${cx('layer-x')}" style="{{layerStyle}}">
        <ul s-if="multi">
            <ui-textbox s-if="filter"
                value="{=keyword=}"
                placeholder="{{filterPlaceholder}}"
                width="{{realLayerWidth - 50}}"
                />
            <li class="${cx('item', 'item-all')}" s-if="filteredDatasource.length">
                <label>
                    <input type="checkbox" on-change="onToggleAll" checked="{=checkedAll=}" />全选/全不选
                </label>
            </li>
            <li class="${cx('x-group')}"
                s-for="group in groupedDatasource">
                <div s-if="group.title !== '-' "
                    class="${cx('group-title')}" title="{{group.title}}">{{group.title}}</div>
                <ul class="${cx('group-list')}">
                    <li class="{{item | itemClass}}"
                        aria-label="{{item.tip}}"
                        s-for="item in group.datasource">
                        <label>
                            <input type="checkbox"
                                value="{{item.value}}"
                                class="${cx('selected-box')}"
                                disabled="{{item.disabled}}"
                                checked="{=value=}" /><span style="{{textStyle}}">{{item.text}}</span>
                        </label>
                    </li>
                </ul>
            </li>
        </ul>
        <ul s-else>
            <ui-textbox s-if="filter"
                value="{=keyword=}"
                placeholder="{{filterPlaceholder}}"
                width="{{realLayerWidth - 50}}"
                />
            <li class="${cx('x-group')}"
                s-for="group in groupedDatasource">
                <div s-if="group.title !== '-' "
                    class="${cx('group-title')}" title="{{group.title}}">{{group.title}}</div>
                <ul class="${cx('group-list')}">
                    <li on-click="selectItem($event, item)"
                        class="{{item | itemClass}}"
                        aria-label="{{item.tip}}"
                        s-for="item in group.datasource">
                        <ui-siv s-if="item.value === value"><span>{{item.text}}</span></ui-siv>
                        <span s-else>{{item.text}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        </ui-ss>
    </ui-layer>
</div>`;
/* eslint-enable */

const Select = defineComponent({    // eslint-disable-line
    template,
    components: {
        'ui-textbox': TextBox,
        'ui-layer': Layer,
        'ui-ss': StopScroll,
        'ui-siv': ScrollIntoView
    },
    initData() {
        return {
            active: false,
            multi: false, // 是否支持多选，也就是之前的 MultiSelect 的功能
            layerWidth: null, // 手工设置的
            autoLayerWidth: null, // this.el.clientWidth 自动算出来的
            layerOffsetTop: 2,
            layerOffsetLeft: 0,

            filter: false, // 是否支持搜索过滤
            filterPlaceholder: '', // filter textbox placeholder
            filterCallback: defaultFilter,
            keyword: '', // 过滤的关键词

            defaultLabel: kDefaultLabel,
            value: '', // any | any[]
            checkedAll: false
        };
    },
    dataTypes: {
        /**
         * 获取或者设置 Select 组件的当前的值
         *
         * @bindx
         * @default ''
         */
        value: DataTypes.any,

        /**
         * 浮层的打开或者关闭状态
         *
         * @bindx
         * @default false
         */
        active: DataTypes.bool,

        /**
         * Select 的数据源，每一项的格式如下：
         * <pre><code>{
         *   text: string,
         *   value: any,
         *   group?: string （如需要分组展示，设置这个字段）
         * }</code></pre>
         */
        datasource: DataTypes.array,

        /**
         * 未选中任何项时的文字
         *
         * @default '请选择'
         */
        defaultLabel: DataTypes.string,

        /**
         * 是否支持选择多项，如果设置为 true，那么 value 的类型是 any[]
         *
         * @default false
         */
        multi: DataTypes.bool,

        /**
         * 浮层的宽度，如果没有设置的话，默认跟 Select 的宽度保持一致（每次展示的时候会计算）
         */
        layerWidth: DataTypes.number,

        /**
         * 调整 Layer 的偏移量
         *
         * @default 2
         */
        layerOffsetTop: DataTypes.number,

        /**
         * 调整 Layer 的偏移量
         *
         * @default 0
         */
        layerOffsetLeft: DataTypes.number,

        /**
         * 是否支持搜索的功能
         */
        filter: DataTypes.bool,

        /**
         * 搜索框的 placeholder
         */
        filterPlaceholder: DataTypes.string,

        /**
         * 自定义的过滤器<br>
         * function(datasource: any[], keyword: string): any[]
         */
        filterCallback: DataTypes.func
    },
    computed: {
        multiLabel() {
            // const datasource = this.data.get('datasource');
            const values = this.data.get('value');
            return values && values.length > 0 ? `您已经选择了${values.length}项` : this.data.get('defaultLabel');
            /**
             const labels = [];
             u.each(datasource, item => {
                if (u.indexOf(values, item.value) !== -1) {
                    labels.push(item.text);
                }
            });

            return labels.length > 0 ? labels.join(',') : this.data.get('defaultLabel');
            */
        },
        label() {
            const selectedItem = this.data.get('selectedItem');
            return selectedItem ? selectedItem.text : this.data.get('defaultLabel');
        },
        filteredDatasource() {
            // XXX(leeight) https://github.com/ecomfe/san/issues/97
            const filter = this.data.get('filter');
            const datasource = this.data.get('datasource');
            if (!filter) {
                return datasource;
            }
            const keyword = this.data.get('keyword');
            const filterCallback = this.data.get('filterCallback') || defaultFilter;
            return filterCallback(datasource, keyword);
        },
        groupedDatasource() {
            const datasource = this.data.get('filteredDatasource');
            const defaultItems = u.filter(datasource, item => item.group == null);
            const groupedDatasource = u.chain(datasource).filter(item => item.group != null).groupBy('group').value();
            const data = [];
            u.each(groupedDatasource, (item, key) => {
                data.push({title: key, datasource: item});
            });

            if (defaultItems.length) {
                data.unshift({
                    title: '-',
                    datasource: defaultItems
                });
            }

            return data;
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
        realLayerWidth() {
            const layerWidth = this.data.get('layerWidth');
            const autoLayerWidth = this.data.get('autoLayerWidth');
            return layerWidth || autoLayerWidth;
        },
        layerStyle() {
            const style = {};
            const realLayerWidth = this.data.get('realLayerWidth');
            if (realLayerWidth != null) {
                style.width = hasUnit(realLayerWidth) ? realLayerWidth : `${realLayerWidth}px`;
            }
            return style;
        },
        textStyle() {
            const style = {};
            const realLayerWidth = this.data.get('realLayerWidth');
            if (realLayerWidth != null) {
                style.width = `${realLayerWidth - 60}px`;
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
        },
        mainStyle() {
            return cx.mainStyle(this);
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
            if (item.tip) {
                klass.push('tooltipped', 'tooltipped-n');
            }
            if (item.group) {
                klass.push(cx('group-item'));
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
        this.watch('selectedItem', () => this.nextTick(() => this.__setLayerWidth()));
        this.watch('value', value => this.fire('change', {value}));
    },
    selectItem(e, item) {
        if (item.disabled) {
            return;
        }
        this.data.set('value', item.value);
        this.data.set('active', false);
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
        this.nextTick(() => this.__setLayerWidth());
    },
    __setLayerWidth() {
        const layerWidth = this.data.get('layerWidth');
        if (layerWidth == null) {
            this.data.set('autoLayerWidth', this.el.clientWidth + 2);
        }
    },
    attached() {
        this.__setLayerWidth();
    }
});

export default asInput(Select);
