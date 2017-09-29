/**
 * @file v3/components/Table.es6
 * @author leeight
 */

import _ from 'lodash';
import {defineComponent} from 'san';

import {create, nextZindex} from './util';

const cx = create('ui-table');

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <table cellpadding="0" cellspacing="0" width="100%">
        <thead class="${cx('head')}">
            <tr>
                <th class="${cx('hcell', 'hcell-sel')}" san-if="select === 'multi'">
                    <div class="${cx('hcell-text')}">
                        <input disabled="{{loading}}"
                            checked="{= selectAll =}"
                            on-click="onSelectAllClicked($event)"
                            value="all"
                            type="checkbox"
                            class="${cx('select-all')}" />
                    </div>
                </th>
                <th class="${cx('hcell', 'hcell-sel')}" san-if="select === 'single'">
                </th>
                <th class="${cx('hcell')} {{item.labelClassName}} {{item.sortable ? '${cx('hcell-sort')}' : ''}}"
                    style="{{item.width ? 'width:' + item.width + 'px' : ''}}" san-for="item in schema">
                    <div class="${cx('hcell-text')}">
                        {{item.label}}
                        <div class="${cx('hsort')}" san-if="item.sortable"></div>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody san-if="loading">
            <tr>
                <td colSpan="{{columnCount}}">
                    <slot name="loading">加载中...</slot>
                </td>
            </tr>
        </tbody>
        <tbody san-else class="${cx('body')}">
            <tr san-if="error">
                <td colSpan="{{columnCount}}">
                    <slot name="error">{{error}}</slot>
                </td>
            </tr>
            <tr san-else class="${cx('row')} {{row % 2 === 0 ? '${cx('row-even')}' : '${cx('row-odd')}'}}" san-for="item, row in datasource">
                <td class="${cx('cell', 'cell-sel')}" san-if="select === 'multi'">
                    <div class="${cx('cell-text', 'cell-sel')}">
                        <input checked="{= selectedIndex =}" value="{{row}}" type="checkbox" class="${cx('multi-select')}" />
                    </div>
                </td>
                <td class="${cx('cell', 'cell-sel')}" san-if="select === 'single'">
                    <div class="${cx('cell-text', 'cell-sel')}">
                        <input checked="{= selectedIndex =}" value="{{row}}" name="{{radioName}}" type="radio" class="${cx('single-select')}" />
                    </div>
                </td>
                <td class="${cx('cell')}" san-for="col in schema">
                    <div class="${cx('cell-text')}">
                        {{item|content(col.name, col, row)|raw}}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        columnCount() {
            const schema = this.data.get('schema');
            const select = this.data.get('select');

            return schema.length + (/^(multi|single)$/.test(select) ? 1 : 0);
        },
        selectAll() {
            const loading = this.data.get('loading');
            const error = this.data.get('error');
            if (loading || error) {
                return [];
            }
            const selectedIndex = this.data.get('selectedIndex');
            return selectedIndex && selectedIndex.length ? ['all'] : [];
        },
        selectedItems() {
            const datasource = this.data.get('datasource');
            const selectedIndex = this.data.get('selectedIndex');
            const selectedItems = _([...selectedIndex])
                .map(i => datasource[i])
                .compact()
                .value();
            return selectedItems;
        }
    },

    filters: {
        content(item, key, col, row) {
            const cellBuilder = this.data.get('cellBuilder');
            if (typeof cellBuilder === 'function') {
                return cellBuilder(item, key, col, row);
            }
            return item[key];
        }
    },

    initData() {
        return {
            schema: [],
            datasource: [],
            selectedIndex: [],
            cellBuilder: null,
            select: 'none',
            radioName: `e${nextZindex()}`,
            loading: false,
            error: null
        };
    },

    dispatchEvent() {
        const {selectedIndex, selectedItems} = this.data.get();
        this.fire('selected-change', {selectedIndex: [...selectedIndex], selectedItems});
    },

    onSelectAllClicked(e) {
        const target = e.target;
        const datasource = this.data.get('datasource');
        const selectedIndex = target.checked
            ? _.range(0, datasource.length)
            : [];

        this.data.set('selectedIndex', _.map(selectedIndex, String));
    },

    inited() {
        this.pendingComps = [];
        const selectedIndex = this.data.get('selectedIndex');
        if (selectedIndex && selectedIndex.length) {
            // 如果是 number 类型的话，匹配不上，需要转成 string 类型
            this.data.set('selectedIndex', _.map(selectedIndex, String));
        }
        this.watch('selectedIndex', () => this.dispatchEvent());
    },

    attached() {
        const selectedIndex = this.data.get('selectedIndex');
        if (selectedIndex && selectedIndex.length) {
            this.dispatchEvent();
        }
    }
});
