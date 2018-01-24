define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([20],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getOffset;
/**
 * ESUI (Enterprise Simple UI library)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file DOM相关基础库
 * @author otakustay
 */

/**
 * 获取元素在页面中的位置和尺寸信息
 *
 * @param {HTMLElement} element 目标元素
 * @return {Object} 元素的尺寸和位置信息，
 * 包含`top`、`right`、`bottom`、`left`、`width`和`height`属性
 */
function getOffset(element) {
    if (!element) {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
        };
    }

    let rect = element.getBoundingClientRect();
    let offset = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };
    let clientTop = document.documentElement.clientTop
        || document.body.clientTop
        || 0;
    let clientLeft = document.documentElement.clientLeft
        || document.body.clientLeft
        || 0;
    let scrollTop = window.pageYOffset
        || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset
        || document.documentElement.scrollLeft;
    offset.top = offset.top + scrollTop - clientTop;
    offset.bottom = offset.bottom + scrollTop - clientTop;
    offset.left = offset.left + scrollLeft - clientLeft;
    offset.right = offset.right + scrollLeft - clientLeft;

    return offset;
}



/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/**
 * @file ToastLabel.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-toastlabel');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <span s-if="text" class="${cx('content')}">{{text}}</span>
    <div s-else class="${cx('content')}"><slot/></div>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    computed: {
        mainClass() {
            const level = this.data.get('level');
            const klass = [cx(), cx('x'), cx(level)];
            return klass;
        }
    },
    initData() {
        return {
            level: 'alert' // 'normal' | 'alert' | 'error'
        };
    },
    dataTypes: {
        /**
         * 组件的样式，可选值有 normal, alert, error
         * @default alert
         */
        level: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 需要展示的内容，如果设置了 text，那么就忽略 default slot 的内容
         */
        text: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string
    }
}));



/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Toast__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_ToastLabel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inf_ui_x_components_Table__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_inf_ui_x_components_Loading__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Row__ = __webpack_require__(5);
/**
 * @file inf-ui/x/demo/xui-subrow-table.es6
 * @author huangyunzhi(huangyunzhi@baidu.com)
 */













const kTableColumns = [
    {name: 'name', label: '姓名', labelClassName: 'col-name'},
    {name: 'age', label: '年龄', sortable: true},
    {name: 'gender', label: '性别', sortable: true}
];

const template = `
<template>

<xui-toastlabel>
    有时候后端为了性能不会把subrow的内容一次性给出，所以提供了on-subrow-expand方法和on-subrow-collapse方法，可以在每次展开时请求数据从而提升体验
</xui-toastlabel>

<x-row label="[default]">
    <xui-table
        datasource="{{table.datasource}}"
        hasSubrow="{{table.hasSubrow}}"
        on-subrow-expand="onSubrowExpand"
        expandedIndex="{=_table1ExpandedIndex=}"
        on-subrow-collapse="onSubrowCollapse"
        schema="{{table.schema}}"
    >
        <div slot="sub-foo" class="subrow-content-row">
            <xui-table
                datasource="{{table.datasource}}"
                schema="{{table.schema}}"
                hasSubrow="{{table.hasSubrow}}"
            >
                <div slot="c-gender">
                    <xui-button on-click="incAge(rowIndex)">{{row.gender}}, CLICK TO INC THE AGE</xui-button>
                </div>
            </xui-table>
        </div>
        <div slot="sub-bar">
            <div class="ui-table-subrow">
                <div class="row">姓名：{{row.name}}</div>
                <div class="row">年龄：{{row.age}}</div>
                <div class="row">性别：{{row.gender}}</div>
                <div class="row">爱好：{{subrow.like}}</div>
                <div class="row">技能：{{subrow.skills}}</div>
            </div>
        </div> 
        <div slot="sub-xxx">
            <div class="ui-table-subrow">
                <xui-loading s-if="row.xui__loading"></xui-loading>
                <strong s-else class="large">
                    This row.subrowData is: {{row.subrowData}}!
                </strong>
            </div>
        </div>
    </xui-table>
</x-row>

<x-row label="[select=multi hasSubrow=true]">
    <xui-table
        datasource="{{table.datasource}}"
        hasSubrow="{{table.hasSubrow}}"
        select="{{table.select}}"
        expandedIndex="{=table.expandedIndex=}"
        on-selected-change="onSelectedChange"
        schema="{{table.schema}}"
    >
        <div slot="c-name" on-click="onClick(rowIndex)">{{row.name}}</div>
        <div slot="sub-foo" class="subrow-content-row">
            <div class="ui-table-subrow">
                <strong class="large">The selectedIndex is {{selectedIndex}}</strong>
            </div>
        </div>
    </xui-table>
</x-row>

</template>
`;

function delay(payload, ms) {
    return new __WEBPACK_IMPORTED_MODULE_1_promise___default.a(resolve => setTimeout(() => resolve(payload), ms));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_2_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_8__Row__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_ToastLabel__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_Button__["a" /* default */],
        'xui-table': __WEBPACK_IMPORTED_MODULE_6_inf_ui_x_components_Table__["a" /* default */],
        'xui-loading': __WEBPACK_IMPORTED_MODULE_7_inf_ui_x_components_Loading__["a" /* default */]
    },
    filters: {
        stringify(value) {
            return JSON.stringify(value);
        }
    },
    initData() {
        return {
            table: {
                schema: kTableColumns,
                hasSubrow: true,
                expandedIndex: [0],
                select: 'multi',
                datasource: [
                    {name: 'foo', age: 10, gender: 'M'},
                    {name: 'bar', age: 20, gender: 'F', subrow: {like: '写代码', skills: ['javascript', 'er', 'san']}},
                    {name: 'xxx', age: 20, gender: '未知'}
                ]
            },
            _table1ExpandedIndex: [0],
            selectedIndex: []
        };
    },
    incAge(rowIndex) {
        const key = `table.datasource[${rowIndex}].age`;
        const age = this.data.get(key);
        this.data.set(key, age + 10);
    },
    onSubrowExpand({rowIndex}) {
        __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Toast__["a" /* default */].success('Expand Subrow!');
        if (rowIndex === 2) {
            this.data.set(`table.datasource[${rowIndex}].xui__loading`, true);
            delay(rowIndex, 2000).then(data => {
                this.data.set(`table.datasource[${rowIndex}].xui__loading`, false);
                this.data.set(`table.datasource[${rowIndex}].subrowData`, data);
            });
        }
    },
    onSubrowCollapse({rowIndex}) {
        __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Toast__["a" /* default */].success(`Collapse ${rowIndex}th Subrow!`);
    },
    onSelectedChange(e) {
        __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Toast__["a" /* default */].success('Open the subrow and see change!');
        this.data.set('selectedIndex', e.selectedIndex);
    },
    onClick(rowIndex) {
        const expandedIndex = this.data.get('table.expandedIndex');
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.indexOf(expandedIndex, rowIndex) > -1
            ? this.data.remove('table.expandedIndex', rowIndex)
            : this.data.push('table.expandedIndex', rowIndex);
    }
}));


/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asTable__ = __webpack_require__(55);
/**
 * @file inf-ui/x/components/Table.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__asTable__["a" /* asTable */])());


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/**
 * @file demos/Row.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template: `<div class="x-row">
        <div class="label" s-if="label">{{label}}</div>
        <div class="content"><slot/></div>
    </div>`
}));



/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asTable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Loading__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TableFilter__ = __webpack_require__(56);
/**
 * @file inf-ui/x/components/asTable.es6
 * @author leeight
 */









const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-table');
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

function asTable(columns) {
    const tableCellsTemplate = isEmpty(columns)
        ? kDefaultCellTemplate
        // 在这里提前展开，以后 columns 就不能改变了
        : __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(columns, buildTableCell).join('\n');

    const tableHeadsTemplate = isEmpty(columns)
        ? kDefaultHeadTemplate
        // 在这里提前展开，以后 columns 就不能改变了
        : __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(columns, buildTableHead).join('\n');

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
                        <slot name="error">{{error}}</slot>
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
                    on-mouseleave="onLeaveRow(item, rowIndex)">
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

    return Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
        template,

        components: {
            'ui-table-filter': __WEBPACK_IMPORTED_MODULE_5__TableFilter__["a" /* default */],
            'ui-loading': __WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]
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
                const tableColumns = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.filter(schema, col => !col.xui__hidden);
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
                return selectedIndex && selectedIndex.length === datasource.length ? ['all'] : [];
            },
            selectedItems() {
                const datasource = this.data.get('datasource');
                const selectedIndex = this.data.get('selectedIndex');
                const selectedItems = __WEBPACK_IMPORTED_MODULE_0_lodash___default()([...selectedIndex])
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
                    style.width = Object(__WEBPACK_IMPORTED_MODULE_3__util__["h" /* hasUnit */])(item.width) ? item.width : item.width + 'px';
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
                radioName: `e${Object(__WEBPACK_IMPORTED_MODULE_3__util__["k" /* nextZindex */])()}`,
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
                    this.fire('selected-change', __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.extend({selectedIndex: [...selectedIndex], selectedItems}, args));
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
                ? __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.range(0, datasource.length)
                : [];

            this.data.set('selectedIndex', __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(selectedIndex, String));
        },

        inited() {
            const selectedIndex = this.data.get('selectedIndex');
            if (selectedIndex && selectedIndex.length) {
                // 如果是 number 类型的话，匹配不上，需要转成 string 类型
                this.data.set('selectedIndex', __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(selectedIndex, String));
            }
            this.watch('selectedIndex', () => this.dispatchEvent('selected'));
            this.watch('expandedIndex', expandedIndex => {
                const datasource = this.data.get('datasource');
                // 去重处理，避免因为重复数据无法正确显示
                expandedIndex = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.uniq(expandedIndex);
                __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(datasource, (o, index) => this.data.set(`datasource[${index}].xui__expanded`, false));
                __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(expandedIndex, index => this.data.set(`datasource[${index}].xui__expanded`, true));
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
                __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.forEach(expandedIndex, item => this.data.set(`datasource[${item}].xui__expanded`, true));
            }
            __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.el).on('click', 'a[data-command]', e => {
                // 因为有 head 的存在，rowIndex 是从 1开始的
                const type = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.currentTarget).data('command');
                if (!type) {
                    return;
                }

                const rowIndex = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.target).parents('tr').prop('rowIndex');
                const payload = this.data.get(`datasource[${rowIndex - 1}]`);
                if (payload) {
                    this.fire('command', {type, payload, rowIndex, domEvent: e});
                }
            });
        },

        disposed() {
            __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.el).off('click');
        }
    });
}


/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Layer__ = __webpack_require__(8);
/**
 * @file components/TableFilter.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-table');

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

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-layer': __WEBPACK_IMPORTED_MODULE_2__Layer__["a" /* default */]
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
}));


/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fx_opacity__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__esui_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__esui_page__ = __webpack_require__(18);
/**
 * @file Layer.es6
 * @author leeight
 */









const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-layer');

/* eslint-disable */
const template = `
<template>
    <div s-ref="layer" s-if="open" s-transition="$fxOpacity" class="${cx()}" style="{{layerStyle}}"><slot/></div>
</template>
`;

/* eslint-enable */

function returnFalse(e) {
    e.stopPropagation();
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
    template,
    $fxOpacity: Object(__WEBPACK_IMPORTED_MODULE_4__fx_opacity__["a" /* opacity */])(5),
    initData() {
        return {
            // 是否是打开的状态
            open: false,
            // 是否默认居中，如果设置为true，align offsetTop offsetLeft就没有效果
            centerToView: false,
            // 点击文档中其它位置的时候，是否自动隐藏
            autoHide: true,
            // 是否跟随滚动条重新定位，因为之前是默认跟随，为了兼容，默认值为true。
            // 以下特例建议设置为false:
            // layer里面继续使用了layer，且第二个layer的位置依赖于第一个layer的元素，此时建议第一个浮层使用false。
            followScroll: true,
            // 如果在页面中直接使用layer，可能希望点击了父节点也触发隐藏。变量默认为true，因为select等组件需要。
            // 如果autoHide 为false 此变量无效。
            autoHideExceptParent: true,
            // 是否在初次显示时自动定位到 parentComponent.el 的下面 。
            // 注意：如果parentComponent.el大小，位置发生变化，并不会同步更新。
            autoPosition: true,
            // 这两个值为实际需要自定义锁定的宽度和高度。
            width: 0, // 外部传进来的宽度值
            height: 0, // 外部传进来的高度值
            align: null, // 设置为'left' 'right' 可以直接指定对其左右方式，如果没有指定 动态去计算
            offsetTop: 0, // 有时候自动定位不准确，需要修正一下
            offsetLeft: 0, // 有时候自动定位不准确，需要修正一下
            layerStyle: {
                left: '-10000px',
                top: '-10000px'
            }
        };
    },
    dataTypes: {
        open: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,
        centerToView: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,
        autoHide: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,
        followScroll: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,
        autoHideExceptParent: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,
        autoPosition: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,
        width: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].number,
        height: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].number,
        align: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].oneOf(['left', 'right']),
        offsetTop: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].number,
        offsetLeft: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].number
    },
    inited() {
        // moving变量用于维护本layer组件移动状态。因为是一个内部state，不希望放到data里被干扰，所以暂时直接挂在Component上
        this.moving = false;

        const autoHide = this.data.get('autoHide');
        const followScroll = this.data.get('followScroll');

        this.autoHideHandler = autoHide ? () => this.data.set('open', false) : null;
        this.scrollHandler = followScroll ? __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.debounce(() => this.selfPosition(true), 100) : null;

        this.watch('open', open => {
            // 一个表单页可以能有较多select && 其他浮层。关闭的情况下去掉事件。

            open ? this.bindLayerEvents() : this.unbindLayerEvents();

            const autoPosition = this.data.get('autoPosition');
            if (autoPosition && open) {
                this.nextTick(() => this.selfPosition());
            }
        });
    },
    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
        // 这些事件只在显示时才有意义，默认情况下，一个页面只有一个浮层处于打开状态
        if (this.data.get('open')) {
            this.bindLayerEvents();
        }
    },
    bindLayerEvents() {
        if (this.autoHideHandler) {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('mousedown', this.autoHideHandler);
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.el).on('mousedown', returnFalse);
            if (!this.scrollHandler) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('scroll', this.autoHideHandler);
            }

            const pc = this.parentComponent;
            const autoHideExceptParent = this.data.get('autoHideExceptParent');
            // 用pc.id fix 点击选择组件闪动的bug
            if (autoHideExceptParent && pc && pc.el) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(pc.el).on('mousedown', returnFalse);
            }
        }

        if (this.scrollHandler) {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('scroll', this.scrollHandler);
        }
    },
    unbindLayerEvents() {
        if (this.autoHideHandler) {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off('mousedown', this.autoHideHandler);
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.el).off('mousedown', returnFalse);
            if (!this.scrollHandler) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('scroll', this.autoHideHandler);
            }

            const pc = this.parentComponent;
            const autoHideExceptParent = this.data.get('autoHideExceptParent');
            if (autoHideExceptParent && pc && pc.el) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(pc.el).off('mousedown', returnFalse);
            }
        }

        if (this.scrollHandler) {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('scroll', this.scrollHandler);
        }
    },

    selfPosition(kz) {
        if (this.moving) {
            return;
        }
        this.moving = true;
        // todo 默认跟随父元素，如果后续有指定元素跟随指定元素的需求，在attachToElement中扩展即可。
        this.data.get('centerToView') ? this.centerToView(kz) : this.attachToElement(kz);
        this.moving = false;
    },

    attachToElement(kz) {
        const align = this.data.get('align');
        // 相当于 宽度 和 高度 分别进行了调整，然后进行计算
        const offsetTop = this.data.get('offsetTop');
        const offsetLeft = this.data.get('offsetLeft');

        const pc = this.parentComponent;

        if (!pc || !pc.el) {
            return;
        }

        const layer = this.ref('layer');

        if (!layer) {
            return;
        }

        let topValue = 0;
        let leftValue = 0;

        // 和esui/layer对齐  但是保留了 用户自定义的offset
        // 垂直算法：
        // offsetTop产生的偏移将合和height合并在一起，参与同上下空间的比较
        // 1. 将层的上边缘贴住目标元素的下边缘
        // 2. 如果下方空间不够，则转为层的下边缘贴住目标元素的上边缘
        // 3. 如果上方空间依旧不够，则强制使用第1步的位置
        //
        // 水平算法：
        // offsetLeft产生的偏移将合和width合并在一起，参与同左右空间的比较
        // 0. 先应用align 如果没有设置align 再走常规比较
        // 1. 将层的左边缘贴住目标元素的左边缘
        // 2. 如果右侧空间不够，则转为层的右边缘贴住目标元素的右边缘
        // 3. 如果左侧空间依旧不够，则强制使用第1步的位置

        const pageWidth = Object(__WEBPACK_IMPORTED_MODULE_6__esui_page__["d" /* getViewWidth */])();
        const pageHeight = Object(__WEBPACK_IMPORTED_MODULE_6__esui_page__["c" /* getViewHeight */])();
        const pageScrollTop = Object(__WEBPACK_IMPORTED_MODULE_6__esui_page__["b" /* getScrollTop */])();
        const pageScrollLeft = Object(__WEBPACK_IMPORTED_MODULE_6__esui_page__["a" /* getScrollLeft */])();

        const targetElement = Object(__WEBPACK_IMPORTED_MODULE_5__esui_dom__["a" /* getOffset */])(pc.el);


        this.data.set('layerStyle.left', '-10000px');
        this.data.set('layerStyle.top', '-10000px');


        const layerElement = Object(__WEBPACK_IMPORTED_MODULE_5__esui_dom__["a" /* getOffset */])(layer);
        // dom 中的width 计算使用的是 getBoundingClientRect 。这个方法的宽度包含了padding 和 boarder。
        // 实际中的width熟悉不包括
        let widthValue = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(layer).width();
        let heightValue = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(layer).height();

        this.data.set('layerStyle.left', '0px');
        this.data.set('layerStyle.top', '0px');

        if (this.data.get('width')) {
            widthValue = layerElement.width = this.data.get('width');

        }

        if (this.data.get('height')) {
            heightValue = layerElement.height = this.data.get('height');
        }

        // 先算垂直的位置
        const bottomSpace = pageHeight - (targetElement.bottom - pageScrollTop);
        const topSpace = targetElement.top - pageScrollTop;
        if (bottomSpace <= (layerElement.height + offsetTop)
            && topSpace > (layerElement.height + offsetTop)) {
            // 放上面
            topValue = targetElement.top - layerElement.height;
        }
        else {
            // 放下面
            topValue = targetElement.bottom;
        }
        topValue = topValue + offsetTop;

        // 再算水平的位置
        if (align === 'left') {
            // 靠左侧
            leftValue = targetElement.left;
        } else if (align === 'right') {
            // 靠右侧
            leftValue = targetElement.right - layerElement.width;
        } else {
            const rightSpace = pageWidth - (targetElement.left - pageScrollLeft);
            const leftSpace = targetElement.right - pageScrollLeft;
            if (rightSpace <= (layerElement.width + offsetLeft)
                && leftSpace > (layerElement.width + offsetLeft)) {
                // 靠右侧
                leftValue = targetElement.right - layerElement.width;
            }
            else {
                // 靠左侧
                leftValue = targetElement.left;
            }
        }

        leftValue = leftValue + offsetLeft;

        this.positionLayerElement({topValue, leftValue, widthValue, heightValue, kz});
    },

    centerToView(kz) {
        const layer = this.ref('layer');

        if (!layer) {
            return;
        }

        this.data.set('layerStyle.left', '-10000px');
        this.data.set('layerStyle.top', '-10000px');

        let widthValue = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(layer).width();
        let heightValue = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(layer).height();

        const layerElement = Object(__WEBPACK_IMPORTED_MODULE_5__esui_dom__["a" /* getOffset */])(layer);

        if (this.data.get('width')) {
            widthValue = layerElement.width = this.data.get('width');
        }

        if (this.data.get('height')) {
            heightValue = layerElement.height = this.data.get('height');
        }

        this.data.set('layerStyle.left', '0px');
        this.data.set('layerStyle.top', '0px');

        const pageWidth = Object(__WEBPACK_IMPORTED_MODULE_6__esui_page__["d" /* getViewWidth */])();
        const pageHeight = Object(__WEBPACK_IMPORTED_MODULE_6__esui_page__["c" /* getViewHeight */])();

        // 计算位置
        let topValue = Math.floor((pageHeight - layerElement.height) / 2);
        let leftValue = Math.floor((pageWidth - layerElement.width) / 2);

        topValue += Object(__WEBPACK_IMPORTED_MODULE_6__esui_page__["b" /* getScrollTop */])();

        this.positionLayerElement({topValue, leftValue, widthValue, heightValue, kz});
    },
    // 移动当前浮层的公共方法
    positionLayerElement(options = {}) {
        const topValue = options.topValue + 'px';
        const leftValue = options.leftValue + 'px';

        const widthValue = options.widthValue + 'px';
        const heightValue = options.heightValue + 'px';

        if (options.kz) {
            this.data.set('layerStyle.left', leftValue);
            this.data.set('layerStyle.top', topValue);
            this.data.set('layerStyle.width', widthValue);
            this.data.set('layerStyle.height', heightValue);
        }
        else {
            this.data.set('layerStyle', {
                'z-index': Object(__WEBPACK_IMPORTED_MODULE_3__util__["k" /* nextZindex */])(),
                'left': leftValue,
                'top': topValue,
                'width': widthValue,
                'height': heightValue
            });
        }
    },
    detached() {
        this.unbindLayerEvents();
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.el).remove();
    }
}));


/***/ })

},[372])});;