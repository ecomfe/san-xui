/**
 * @file components/MultiPicker.es
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';

import {hasUnit, arrayTreeFilter, arrayTreeCompact, create} from './util';
import Layer from './Layer';
import Icon from './Icon';
import Loading from './Loading';

const cx = create('ui-select');

const kDefaultLabel = '请选择';
const kValuesKey = 'value';
const kTmpValuesKey = '__values';

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}">
    <span class="${cx('text')}">{{label|raw}}</span>
    <ui-layer open="{=active=}" s-ref="layer" offset-top="{{3}}">
        <div class="${cx('layer')} ${cx('layer-x')} ${cx('multipicker-layer')}" style="{{layerStyle}}">
            <ul s-for="datasource, levelIndex in compactLevels">
                <li class="{{item.disabled ? '${cx('item', 'item-disabled')}' : item.active ? '${cx('item', 'item-selected')}' : '${cx('item')}'}}"
                    on-click="onItemClicked(item, levelIndex)"
                    s-for="item in datasource">
                    <span>
                        {{item.text}}
                        <ui-loading size="small" s-if="item.loading" />
                        <ui-icon name="color-error" s-elif="item.error" />
                        <ui-icon name="arrow-right" s-elif="item.expandable" />
                    </span>
                </li>
            </ul>
        </div>
    </ui-layer>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-loading': Loading,
        'ui-icon': Icon,
        'ui-layer': Layer
    },
    initData() {
        return {
            disabled: false,
            active: false,
            layerWidth: 'auto',
            loader: null,             // 数据异步加载的loader，逐步的填充 datasource 的内容
            datasource: [],
            [kValuesKey]: [],
            [kTmpValuesKey]: []       // 临时的值，点击了之后，同步到 value 里面去
        };
    },
    computed: {
        // datasource 是树形结构
        // compactLevels 是打平之后的，用户看到的和可以操作的是 compactLevels 的数据
        compactLevels() {
            const values = this.data.get(kTmpValuesKey);
            const datasource = this.data.get('datasource');
            const compactLevels = arrayTreeCompact(values, datasource);

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
            const datasource = this.data.get('datasource');
            const labels = u.map(
                arrayTreeFilter(datasource, (item, level) => item.value === values[level]),
                item => item.text
            );
            return labels.length ? labels.join(' / ') : kDefaultLabel;
        }
    },
    inited() {
        const values = this.data.get(kValuesKey);
        this.data.set(kTmpValuesKey, values);
        this.watch(kValuesKey, values => this.data.set(kTmpValuesKey, values));
    },
    onItemClicked(item, index) {
        if (item.disabled) {
            return;
        }

        this.expandChildren(item, index);
        if (item.expandable) {
            return;
        }

        this.data.set('active', false);
        const values = this.data.get(kTmpValuesKey);
        this.data.set(kValuesKey, values);
        this.fire('change');
    },
    expandChildren(item, index) {
        if (item.disabled) {
            return;
        }

        const loader = this.data.get('loader');
        if (typeof loader === 'function') {
            this.expandChildrenAync(item, index);
        }
        else {
            this.expandChildrenInternal(item, index);
        }
    },

    expandChildrenAync(item, index) {
        const values = [...this.data.get(kTmpValuesKey)];
        values[index] = item.value;
        values.splice(index + 1);     // 删掉多余的数据
        if (values.length <= 0) {
            return;
        }

        const datasource = this.data.get('datasource');
        const nodes = arrayTreeFilter(datasource, (item, level) => item.value === values[level]);

        // XXX(leeight) 这个检查可能没有必要？
        if (nodes.length !== values.length) {
            return;
        }

        const lastNode = nodes[nodes.length - 1];
        if (lastNode.children || !lastNode.expandable) {
            // 之前已经加载过了 或者 是叶子节点
            this.expandChildrenInternal(item, index);
            return;
        }

        // 显示加载的icon
        lastNode.loading = true;
        lastNode.error = null;

        // XXX(leeight) 合适么？Trigger the data change
        this.data.set('datasource', [...datasource]);

        const loader = this.data.get('loader');
        return loader(values)
            .then(children => {
                lastNode.loading = false;

                // 追加到 datasource 里面去
                if (children.length <= 0) {
                    lastNode.expandable = false;
                }
                else {
                    lastNode.children = children;
                }

                // Trigger the data change again.
                this.data.set('datasource', [...datasource]);
                this.expandChildrenInternal(item, index);
            })
            .catch(error => {
                lastNode.loading = false;
                lastNode.error = error;
                this.data.set('datasource', [...datasource]);
            });
    },

    /**
     * Expand the submenu
     *
     * @private
     * @param {Object} item The selected item.
     * @param {number} index The level index.
     */
    expandChildrenInternal(item, index) {
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
        // 同步一下数据
        const values = this.data.get(kValuesKey);
        this.data.set(kTmpValuesKey, values);

        const active = this.data.get('active');
        this.data.set('active', !active);
    }
});

