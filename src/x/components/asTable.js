/**
 * @file san-xui/x/components/asTable.js
 * @author leeight
 */

import _ from 'lodash';
import $ from 'jquery';
import {defineComponent} from 'san';

import {create, hasUnit, nextZindex} from './util';
import Loading from './Loading';
import TableFilter from './TableFilter';

const cx = create('ui-table');
const kDefaultHeadTemplate = `
<th class="{{col | hcellClass}}" style="{{col | cellStyle}}" s-for="col, colIndex in tableColumns">
    <div class="${cx('hcell-text')}">
        <slot
            name="h-{{col.name}}"
            var-col="{{col}}"
            var-colIndex="{{colIndex}}"
        >
            <div s-if="col.sortable" class="${cx('hcell-text-content')}" on-click="onSort(col, colIndex)">
                {{col.label}}
                <div class="${cx('hsort')}"></div>
            </div>
            <div s-else class="${cx('hcell-text-content')}">{{col.label}}</div>
            <ui-table-filter
                s-if="col.filter"
                on-change="onFilter($event, col)"
                options="{{col.filter.options}}"
            />
        </slot>
    </div>
</th>
`;

const kDefaultCellTemplate = `
<td class="{{col | cellClass}}"
    style="{{col | cellStyle}}"
    s-for="col, colIndex in tableColumns">
    <div class="${cx('cell-text')}">
        <slot
            name="c-{{col.name}}"
            var-row="item"
            var-rowIndex="rowIndex"
            var-col="{{col}}"
            var-colIndex="{{colIndex}}"
        >
            {{item | tableCell(col.name, col, rowIndex, colIndex) | raw}}
            <a s-if="col.editcmd || col.editable"
                data-command="{{col.editcmd || 'EDIT'}}"
                class="${cx('cell-editentry')}"
                href="javascript:void(0)"><i class="iconfont icon-edit"></i></a>
        </slot>
    </div>
</td>
`;

function isEmpty(list) {
    return !list || list.length <= 0;
}

function buildTableHead(column, colIndex) {
    return `
    <th class="{{tableColumns[${colIndex}] | hcellClass}}"
        style="{{tableColumns[${colIndex}] | cellStyle}}">
        <div class="${cx('hcell-text')}">
            <slot
                name="h-${column.name}"
                var-col="tableColumns[${colIndex}]"
            >
                <div s-if="col.sortable" class="${cx('hcell-text-content')}" on-click="onSort(col, ${colIndex})">
                    {{col.label}}
                    <div class="${cx('hsort')}"></div>
                </div>
                <div s-else class="${cx('hcell-text-content')}">{{col.label}}</div>
                <ui-table-filter
                    s-if="col.filter"
                    on-change="onFilter($event, col)"
                    options="{{col.filter.options}}"
                />
            </slot>
        </div>
    </th>
    `;
}

function buildTableCell(column, colIndex) {
    return `
    <td class="{{tableColumns[${colIndex}] | cellClass}}"
        style="{{tableColumns[${colIndex}] | cellStyle}}">
        <div class="${cx('cell-text')}">
            <slot
                name="c-${column.name}"
                var-row="item"
                var-rowIndex="rowIndex"
                var-col="tableColumns[${colIndex}]"
                var-colIndex="{{${colIndex}}}"
            >
                {{row | tableCell(col.name, col, rowIndex, colIndex) | raw}}
                <a s-if="col.editcmd || col.editable"
                    data-command="{{col.editcmd || 'EDIT'}}"
                    class="${cx('cell-editentry')}"
                    href="javascript:void(0)"><i class="iconfont icon-edit"></i></a>
            </slot>
        </div>
    </td>
    `;
}

export function asTable(columns) {
    const tableCellsTemplate = isEmpty(columns)
        ? kDefaultCellTemplate
        // 在这里提前展开，以后 columns 就不能改变了
        : _.map(columns, buildTableCell).join('\n');

    const tableHeadsTemplate = isEmpty(columns)
        ? kDefaultHeadTemplate
        // 在这里提前展开，以后 columns 就不能改变了
        : _.map(columns, buildTableHead).join('\n');

    /* eslint-disable */
    const template = `<div class="{{mainClass}}" style="{{mainStyle}}" on-scroll="onScroll($event)">
        <table cellpadding="0" cellspacing="0" width="{{tableWidth}}">
            <thead class="${cx('head')}">
                <tr>
                    <th class="${cx('hcell', 'hcell-sel')}" s-if="select === 'multi'">
                        <div class="${cx('hcell-text')}">
                            <input disabled="{{disabledSelectAll || loading}}"
                                checked="{=selectAll=}"
                                on-click="onSelectAllClicked($event)"
                                value="all"
                                type="checkbox"
                                class="${cx('select-all')}" />
                        </div>
                    </th>
                    <th class="${cx('hcell', 'hcell-sel')}" s-if="select === 'single'">
                    </th>
                    <th class="${cx('hcell', 'hcell-sel')}" s-if="hasSubrow">
                    </th>
                    ${tableHeadsTemplate}
                </tr>
            </thead>
            <tbody class="${cx('body')}">
                <tr s-if="error">
                    <td colSpan="{{columnCount}}" class="${cx('error')}">
                        <slot name="error">{{error | raw}}</slot>
                    </td>
                </tr>
                <tr s-elif="!loading && !datasource.length">
                    <td colSpan="{{columnCount}}" class="${cx('empty')}">
                        <slot name="empty">{{emptyText}}</slot>
                    </td>
                </tr>
                <template s-else s-for="item, rowIndex in datasource">
                <tr class="{{item | rowClass(rowIndex)}}"
                    on-mouseenter="onEnterRow(item, rowIndex)"
                    on-mouseleave="onLeaveRow(item, rowIndex)"
                    data-row-index="{{rowIndex}}">
                    <td class="${cx('cell', 'cell-sel')}" s-if="select === 'multi'">
                        <div class="${cx('cell-text', 'cell-sel')}">
                            <input disabled="{=item.xui__disabled=}"
                                checked="{=selectedIndex=}"
                                value="{{rowIndex}}"
                                type="checkbox"
                                class="${cx('multi-select')}" />
                        </div>
                    </td>
                    <td class="${cx('cell', 'cell-sel')}" s-if="select === 'single'">
                        <div class="${cx('cell-text', 'cell-sel')}">
                            <input disabled="{=item.xui__disabled=}"
                                checked="{=selectedIndex=}"
                                value="{{rowIndex}}"
                                name="{{radioName}}"
                                type="radio"
                                class="${cx('single-select')}" />
                        </div>
                    </td>
                    <td class="${cx('cell', 'cell-sel')}" s-if="hasSubrow">
                        <div class="${cx('cell-text', 'cell-sel')}">
                            <label class="${cx('subrow-label')} {{item.xui__expanded ? 'open' : 'close'}} iconfont icon-downarrow"
                                on-click="toggleSubrow(rowIndex)"></label>
                        </div>
                    </td>
                    ${tableCellsTemplate}
                </tr>
                <tr s-if="item.xui__expanded">
                    <td colspan="{{columnCount}}">
                        <div class="${cx('subrow-wrapper')}">
                            <slot
                                name="sub-{{item.name}}"
                                var-row="item"
                                var-subrow="item.subrow"
                                var-rowIndex="rowIndex"
                            >
                                {{row | raw}}
                            </slot>
                        </div>
                    </td>
                </tr>
                </template>
            </tbody>
        </table>
        <div class="${cx('loading')}" s-if="loading"><slot name="loading"><ui-loading /></slot></div>
    </div>`;
    /* eslint-enable */

    return defineComponent({
        template,

        components: {
            'ui-table-filter': TableFilter,
            'ui-loading': Loading
        },
        computed: {
            mainStyle() {
                return cx.mainStyle(this);
            },
            mainClass() {
                const klass = cx.mainClass(this);
                const loading = this.data.get('loading');
                if (loading) {
                    klass.push(cx('state-loading'));
                }
                return klass;
            },
            tableColumns() {
                const schema = this.data.get('schema');
                const tableColumns = _.filter(schema, col => !col.xui__hidden);
                return tableColumns;
            },
            columnCount() {
                const tableColumns = this.data.get('tableColumns');
                const select = this.data.get('select');
                const hasSubrow = this.data.get('hasSubrow');
                return tableColumns.length + (/^(multi|single)$/.test(select) ? 1 : 0) + (hasSubrow ? 1 : 0);
            },
            selectAll() {
                const loading = this.data.get('loading');
                const error = this.data.get('error');
                if (loading || error) {
                    return [];
                }
                const selectedIndex = this.data.get('selectedIndex');
                const datasource = this.data.get('datasource');
                return selectedIndex && selectedIndex.length > 0 && selectedIndex.length === datasource.length ? ['all'] : [];
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
            rowClass(item, rowIndex) {
                const klass = [cx('row')];
                klass.push(cx(rowIndex % 2 === 0 ? 'row-even' : 'row-odd'));
                return klass;
            },
            cellStyle(item) {
                const style = {};
                // FIXME(leeight) 如果 item.width 发生了变化，实际上这里不会被调用的
                if (item.width != null) {
                    style.width = hasUnit(item.width) ? item.width : item.width + 'px';
                }
                return style;
            },
            cellClass(item) {
                const klass = [cx('cell')];
                return klass;
            },
            hcellClass(item) {
                const klass = [cx('hcell')];
                if (item.sortable) {
                    klass.push(cx('hcell-sort'));
                    // 显示向上或向下箭头
                    if (item.order) {
                        klass.push(cx(`hcell-${item.order}`));
                    }
                }
                if (item.labelClassName) {
                    klass.push(item.labelClassName);
                }
                return klass;
            },
            tableCell(item, key, col, rowIndex, colIndex) {
                const cellBuilder = this.data.get('cellBuilder');
                if (typeof cellBuilder === 'function') {
                    return cellBuilder(item, key, col, rowIndex, colIndex);
                }
                return item[key];
            }
        },

        initData() {
            return {
                schema: [],
                datasource: [],
                selectedIndex: [],
                expandedIndex: [],
                cellBuilder: null,
                tableWidth: '100%',
                select: 'none',
                disabledSelectAll: false,
                radioName: `e${nextZindex()}`,
                loading: false,
                emptyText: '暂无数据',
                hasSubrow: false,
                error: null
            };
        },

        dispatchEvent(eventType, args = {}) {
            switch (eventType) {
                case 'selected':
                    const {selectedIndex, selectedItems} = this.data.get();
                    this.fire('selected-change', $.extend({selectedIndex: [...selectedIndex], selectedItems}, args));
                    break;
                case 'subrow-expand':
                    this.fire('subrow-expand', args);
                    break;
                case 'subrow-collapse':
                    this.fire('subrow-collapse', args);
                    break;
                default:
                    break;
            }
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
            const selectedIndex = this.data.get('selectedIndex');
            if (selectedIndex && selectedIndex.length) {
                // 如果是 number 类型的话，匹配不上，需要转成 string 类型
                this.data.set('selectedIndex', _.map(selectedIndex, String));
            }
            this.watch('selectedIndex', () => this.dispatchEvent('selected'));
            this.watch('expandedIndex', expandedIndex => {
                const datasource = this.data.get('datasource');
                // 去重处理，避免因为重复数据无法正确显示
                expandedIndex = _.uniq(expandedIndex);
                _.forEach(datasource, (o, index) => this.data.set(`datasource[${index}].xui__expanded`, false));
                _.forEach(expandedIndex, index => this.data.set(`datasource[${index}].xui__expanded`, true));
            });
        },

        onEnterRow(item, rowIndex) {
            this.fire('row-enter', {rowIndex});
        },

        onLeaveRow(item, rowIndex) {
            this.fire('row-leave', {rowIndex});
        },

        onFilter(filterItem, colItem) {
            const key = colItem.name;
            const value = filterItem.value;
            this.fire('filter', {[key]: value});
        },

        onScroll(event) {
            this.fire('scroll', event);
        },

        onSort(colItem, colIndex) {
            const loading = this.data.get('loading');
            // 在loading中不让重新排序
            if (loading) {
                return;
            }
            const orderBy = colItem.name;
            const order = this.data.get(`schema[${colIndex}].order`) === 'desc' ? 'asc' : 'desc';
            // 更新schema中的order，记录当前的order
            this.data.set(`schema[${colIndex}].order`, order);
            this.fire('sort', {orderBy, order});
        },

        toggleSubrow(rowIndex) {
            const _expanded = this.data.get(`datasource[${rowIndex}].xui__expanded`);
            if (_expanded) {
                this.data.remove('expandedIndex', rowIndex);
                this.dispatchEvent('subrow-collapse', {rowIndex});
            }
            else {
                this.data.push('expandedIndex', rowIndex);
                this.dispatchEvent('subrow-expand', {rowIndex});
            }
        },

        attached() {
            const selectedIndex = this.data.get('selectedIndex');
            const expandedIndex = this.data.get('expandedIndex');
            if (selectedIndex && selectedIndex.length) {
                this.dispatchEvent('selected');
            }
            if (expandedIndex && expandedIndex.length) {
                _.forEach(expandedIndex, item => this.data.set(`datasource[${item}].xui__expanded`, true));
            }
            $(this.el).on('click', 'a[data-command]', e => {
                const type = $(e.currentTarget).data('command');
                if (!type) {
                    return;
                }
                // 这个rowIndex从0开始
                let rowIndex = $(e.target).parents('tr').data('rowIndex');
                const payload = this.data.get(`datasource[${rowIndex}]`);
                // zhangzhe 2018-03-14 为了兼容之前这里的rowIndex从1开始，所以依旧加了1
                rowIndex++;
                if (payload) {
                    this.fire('command', {type, payload, rowIndex, domEvent: e});
                }
            });
        },

        disposed() {
            $(this.el).off('click');
        }
    });
}
