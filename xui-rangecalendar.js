define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([16],{

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

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/**
 * @file components/StopScroll.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template: '<div on-wheel="onWheel"><slot/></div>',
    initData() {
        return {
            disabled: false
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].bool
    },
    onWheel(e) {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }

        const layer = e.currentTarget;
        if (!layer) {
            return;
        }
        if (layer.scrollTop + e.deltaY + layer.clientHeight >= layer.scrollHeight) {
            e.preventDefault();
            layer.scrollTop = layer.scrollHeight;
        }
        if (layer.scrollTop + e.deltaY <= 0) {
            e.preventDefault();
            layer.scrollTop = 0;
        }
    }
}));


/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asInput__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ScrollIntoView__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TextBox__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__StopScroll__ = __webpack_require__(12);
/**
 * @file Select.es6
 * @author leeight
 */











const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-select');
const kDefaultLabel = '请选择';

function defaultFilter(datasource, keyword) {
    if (!keyword) {
        return datasource;
    }

    const rv = [];
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(datasource, item => {
        if (item.text && item.text.indexOf(keyword) !== -1) {
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
                                checked="{=value=}" /><span>{{item.text}}</span>
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

const Select = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({    // eslint-disable-line
    template,
    components: {
        'ui-textbox': __WEBPACK_IMPORTED_MODULE_6__TextBox__["a" /* default */],
        'ui-layer': __WEBPACK_IMPORTED_MODULE_4__Layer__["a" /* default */],
        'ui-ss': __WEBPACK_IMPORTED_MODULE_7__StopScroll__["a" /* default */],
        'ui-siv': __WEBPACK_IMPORTED_MODULE_5__ScrollIntoView__["a" /* default */]
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
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any,

        /**
         * 浮层的打开或者关闭状态
         *
         * @bindx
         * @default false
         */
        active: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * Select 的数据源，每一项的格式如下：
         * <pre><code>{
         *   text: string,
         *   value: any,
         *   group?: string （如需要分组展示，设置这个字段）
         * }</code></pre>
         */
        datasource: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].array,

        /**
         * 是否支持选择多项，如果设置为 true，那么 value 的类型是 any[]
         *
         * @default false
         */
        multi: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 浮层的宽度，如果没有设置的话，默认跟 Select 的宽度保持一致（每次展示的时候会计算）
         */
        layerWidth: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 调整 Layer 的偏移量
         *
         * @default 2
         */
        layerOffsetTop: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 调整 Layer 的偏移量
         *
         * @default 0
         */
        layerOffsetLeft: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 是否支持搜索的功能
         */
        filter: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 搜索框的 placeholder
         */
        filterPlaceholder: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 自定义的过滤器<br>
         * function(datasource: any[], keyword: string): any[]
         */
        filterCallback: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].func
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
            const defaultItems = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.filter(datasource, item => item.group == null);
            const groupedDatasource = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.chain(datasource).filter(item => item.group != null).groupBy('group').value();
            const data = [];
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(groupedDatasource, (item, key) => {
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
                style.width = Object(__WEBPACK_IMPORTED_MODULE_2__util__["h" /* hasUnit */])(realLayerWidth) ? realLayerWidth : `${realLayerWidth}px`;
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
        if (multi && !__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(value)) {
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
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(datasource, item => {
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

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__asInput__["a" /* asInput */])(Select));


/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/**
 * @file ScrollIntoView.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template: '<template><slot /></template>',
    attached() {
        /** FIXME(leeight) 效果不太好，导致页面的滚动条滚动了
        if (this.el.scrollIntoView) {
            this.el.scrollIntoView();
        }
        */
        const element = this.el.parentNode;
        element.parentNode.scrollTop = element.offsetTop;
    }
}));


/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asInput__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Select__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TextBox__ = __webpack_require__(7);
/**
 * @file MonthView.es6
 * @author leeight
 */








const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-monthview');

const kDefaultRange = {begin: new Date(1982, 10, 4), end: new Date(2046, 10, 4)};

/* eslint-disable */
const template = `<div on-click="onClick" class="{{mainClass}}">
    <div class="${cx('head')}">
        <table>
            <tbody>
                <tr>
                    <td width="30" align="left"><ui-button class="${cx('month-back')}" on-click="onMonthBack" /></td>
                    <td><ui-select datasource="{{yearDs.datasource}}" value="{=yearDs.value=}" on-change="onYearChange($event)"/></td>
                    <td><ui-select datasource="{{monthDs.datasource}}" value="{=monthDs.value=}" /></td>
                    <td width="30" align="right"><ui-button class="${cx('month-forward')}" on-click="onMonthForward" /></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="${cx('month')}">
        <table border="0" cellpadding="0" cellspacing="0" class="${cx('month-main')}">
            <thead>
                <tr>
                    <td class="${cx('month-title')}" s-for="title in titles">{{title}}</td>
                </tr>
            </thead>
            <tbody>
                <tr s-for="row in rows">
                    <td s-for="cell in row" class="{{cell | cellClass}}" on-click="onCellClick(cell)">{{cell.date}}</td>
                </tr>
                <tr s-if="{{false}}">
                    <td colspan="7" class="${cx('shortcut')}"><ui-button on-click="onTodayClick()">今天</ui-button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="${cx('time')}" s-if="time">
        <ui-textbox type="number" value="{=hour=}" width="20" />
        :
        <ui-textbox type="number" value="{=minute=}" width="20" />
        :
        <ui-textbox type="number" value="{=second=}" width="20" />
    </div>
</div>`;
/* eslint-enable */

const MonthView = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-textbox': __WEBPACK_IMPORTED_MODULE_5__TextBox__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_3__Button__["a" /* default */],
        'ui-select': __WEBPACK_IMPORTED_MODULE_4__Select__["a" /* default */]
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        rows() {
            const year = this.data.get('yearDs.value');
            const month = this.data.get('monthDs.value');
            const range = this.data.get('range');
            return Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* buildMonths */])(year, month, this.data.get('value'), range);
        }
    },
    filters: {
        cellClass(cell) {
            const klass = [cx('month-item')];
            if (cell.virtual) {
                klass.push(cx('month-item-virtual'));
            }
            if (cell.disabled) {
                klass.push(cx('month-item-disabled'));
            }
            if (cell.active) {
                klass.push(cx('month-item-today'));
                klass.push(cx('month-item-selected'));
            }

            return klass;
        }
    },
    initData() {
        return {
            disabled: false,
            skin: '',
            time: false,
            endOfDay: false, // 如果设置为 true 的时候，当没有 time 选型，选择日期的时候是 23:59:59 结束
            value: new Date(),
            titles: ['一', '二', '三', '四', '五', '六', '日'],
            range: kDefaultRange,

            // 下面的几个都是组件内部的状态，不建议对外公开
            hour: null,
            minute: null,
            second: null,
            yearDs: {datasource: []},
            monthDs: {datasource: []}
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 如果没有设置 time，但是 end-of-day 设置了 true，<br>
         * 那么选择了日期之后，结束时间是 23:59:59<br>
         * 否则默认的情况是 00:00:00
         * @default false
         */
        endOfDay: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 是否可以编辑 HH:mm:ss
         * @default false
         */
        time: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 组件的皮肤
         * @default ''
         */
        skin: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 组件的值
         * @bindx
         * @default new Date()
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].date,

        /**
         * 日期的可选范围
         * @default {begin: new Date(1982, 10, 4), end: new Date(2046, 10, 4)}
         */
        range: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].object,

        /**
         * 星期的名称
         * @default ['一', '二', '三', '四', '五', '六', '日']
         */
        titles: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].array
    },
    initYearOptions() {
        const value = this.data.get('value');
        const {begin, end} = this.data.get('range');
        const year = value.getFullYear();
        const datasource = [];

        const endYear = end.getFullYear();
        for (let year = begin.getFullYear(); year <= endYear; year++) {
            datasource.push({text: year, value: year});
        }

        this.data.set('yearDs.datasource', datasource);
        this.data.set('yearDs.value', year);
    },
    initMonthOptions(year) {
        const {value, yearDs, range} = this.data.get();
        const datasource = [];
        let month = value.getMonth();
        let end = 11;
        let start = 0;

        year = year || yearDs.value;

        if (year === range.begin.getFullYear()) {
            start = range.begin.getMonth();
            month < start && (month = start);
        }
        else if (year === range.end.getFullYear()) {
            end = range.end.getMonth();
            month > end && (month = end);
        }

        for (; start <= end; start++) {
            datasource.push({text: start + 1, value: start});
        }

        this.data.set('monthDs.datasource', datasource);
        this.data.set('monthDs.value', month);
    },
    inited() {
        const range = this.data.get('range');
        // 外部有可能传过来的range为undefined
        if (!range) {
            this.data.set('range', kDefaultRange);
        }
        // value = "2017-12-14T10:44:01Z"
        const value = this.data.get('value');
        if (value && typeof value === 'string') {
            this.data.set('value', new Date(value));
        }

        const valueWatcher = value => {
            this.initYearOptions();
            this.initMonthOptions();
            const time = this.data.get('time');
            if (value && time) {
                this.data.set('hour', value.getHours());
                this.data.set('minute', value.getMinutes());
                this.data.set('second', value.getSeconds());
            }
            this.fire('change', {value});
        };
        this.watch('value', valueWatcher);
        valueWatcher(this.data.get('value'));

        this.watch('hour', hour => {
            const time = this.data.get('time');
            if (time) {
                if (!(hour >= 0 && hour <= 23)) {
                    hour = 0;
                }
                const value = this.data.get('value');
                value.setHours(+hour);
                this.data.set('value', new Date(value));
            }
        });
        this.watch('minute', minute => {
            const time = this.data.get('time');
            if (time) {
                if (!(minute >= 0 && minute <= 59)) {
                    minute = 0;
                }
                const value = this.data.get('value');
                value.setMinutes(+minute);
                this.data.set('value', new Date(value));
            }
        });
        this.watch('second', second => {
            const time = this.data.get('time');
            if (time) {
                if (!(second >= 0 && second <= 59)) {
                    second = 0;
                }
                const value = this.data.get('value');
                value.setSeconds(+second);
                this.data.set('value', new Date(value));
            }
        });
    },
    onTodayClick() {
        this.data.set('value', new Date());
    },
    onCellClick(item) {
        if (item.disabled || item.virtual) {
            return;
        }
        const {year, month, date} = item;
        const {value, time, endOfDay} = this.data.get();
        value.setFullYear(year);
        value.setMonth(month);
        value.setDate(date);
        if (endOfDay && !time) {
            value.setHours(23, 59, 59, 999);
        }
        this.data.set('value', new Date(value));
    },
    onYearChange(e) {
        this.initMonthOptions(e.value);
    },
    onMonthBack() {
        let month = this.data.get('monthDs.value');
        let year = this.data.get('yearDs.value');
        if (month === 0) {
            month = 11;
            year -= 1;
        }
        else {
            month -= 1;
        }
        this.data.set('monthDs.value', month);
        this.data.set('yearDs.value', year);
    },
    onMonthForward() {
        let month = this.data.get('monthDs.value');
        let year = this.data.get('yearDs.value');
        if (month === 11) {
            month = 0;
            year += 1;
        }
        else {
            month += 1;
        }
        this.data.set('monthDs.value', month);
        this.data.set('yearDs.value', year);
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__asInput__["a" /* asInput */])(MonthView));



/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asInput;
/**
 * @file components/asInput.es6
 * @author leeight
 */

function asInput(Klass) {
    return class extends Klass {
        fire(name, event) {
            super.fire(name, event);

            if (name === 'change' && event.value != null
                || name === 'input') {
                this.nextTick(() => {
                    const value = this.data.get('value');
                    this.dispatch('input-comp-value-changed', {value});
                });
            }
        }
    };
}


/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_RangeCalendar__ = __webpack_require__(37);
/**
 * @file demos/xui-rangecalendar.es6
 * @author leeight
 */





/* eslint-disable */
const template = `<template>
<xui-rangecalendar value="{=rangecalendar.value=}" />
<xui-rangecalendar value="{=rangecalendar.value=}" disabled="{{true}}" />
<xui-rangecalendar value="{=rangecalendar.value=}" shortcut="{{false}}" />
<xui-rangecalendar value="{=rangecalendar.value=}" time="{{true}}" />
<strong class="large">
    Value is: {{rangecalendar.value.begin | datetime('YYYY-MM-DD')}} - {{rangecalendar.value.end | datetime('YYYY-MM-DD')}}
</strong>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'xui-rangecalendar': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_RangeCalendar__["a" /* default */]
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).format(f);
        }
    },
    initData() {
        return {
            rangecalendar: {
                value: {
                    begin: new Date(2017, 9, 19), // 2017-10-19
                    end: new Date(2018, 0, 12) // 2018-01-12
                },
                range: {
                    begin: new Date(2017, 9, 18), // 2017-10-18
                    end: new Date(2018, 0, 19) // 2018-01-19
                }
            }
        };
    }
}));


/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MonthView__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__asInput__ = __webpack_require__(3);
/**
 * @file RangeCalendar.es6
 * @author leeight
 */









const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-rangecalendar');

function getDayValue(bd = 1, ed = 2) {
    return function () {
        const begin = __WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(bd, 'day').toDate();
        const end = __WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(ed, 'day').endOf('day').toDate();
        return {begin, end};
    };
}

function getLastWeekValue() {
    return function () {
        const now = new Date();
        const begin = new Date(now);
        const end = new Date(now);

        const startOfWeek = 1; // 周一为第一天;

        if (begin.getDay() < startOfWeek % 7) {
            begin.setDate(
                begin.getDate() - 14 + startOfWeek - begin.getDay()
            );
        }
        else {
            begin.setDate(
                begin.getDate() - 7 - begin.getDay() + startOfWeek % 7
            );
        }
        begin.setHours(0, 0, 0, 0);

        end.setFullYear(
            begin.getFullYear(),
            begin.getMonth(),
            begin.getDate() + 6
        );
        end.setHours(23, 59, 59, 999);

        return {begin, end};
    };
}

function getMonthValue() {
    return function () {
        const begin = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('month').toDate();
        const end = __WEBPACK_IMPORTED_MODULE_0_moment___default()().endOf('day').toDate();
        return {begin, end};
    };
}

function getLastMonthValue() {
    return function () {
        const begin = __WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract('month', 1).startOf('month').toDate();
        const end = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('month').subtract('day', 1).endOf('day').toDate();
        return {begin, end};
    };
}

function getLastQuarterValue() {
    return function () {
        const now = new Date();
        const begin = __WEBPACK_IMPORTED_MODULE_0_moment___default()()
            .subtract('month', now.getMonth() % 3 + 3)
            .startOf('month').toDate();
        const end = __WEBPACK_IMPORTED_MODULE_0_moment___default()()
            .subtract('month', now.getMonth() % 3)
            .startOf('month').subtract('day', 1).endOf('day').toDate();
        return {begin, end};
    };
}

/* eslint-disable */
const template = `<div on-click="toggleLayer" class="{{mainClass}}">
    <div class="${cx('text')}">{{text}}</div>
    <div class="${cx('arrow')}"></div>
    <ui-layer open="{=active=}" s-ref="layer" follow-scroll="{{false}}">
        <div class="${cx('layer')}">
            <div class="${cx('shortcut')}" s-if="shortcut">
                <span on-click="onShortcutSelect(item)"
                    class="${cx('shortcut-item')}"
                    s-for="item in shortcutItems">{{item.text}}</span>
            </div>
            <div class="${cx('body')}">
                <div class="${cx('begin')}">
                    <div class="${cx('label')}"><h3>开始日期</h3></div>
                    <div class="${cx('begin-cal')}">
                        <ui-monthview value="{=begin.value=}" range="{{range}}" time="{{time}}" />
                    </div>
                </div>
                <div class="${cx('end')}">
                    <div class="${cx('label')}"><h3>结束日期</h3></div>
                    <div class="${cx('end-cal')}">
                        <ui-monthview value="{=end.value=}" range="{{range}}" time="{{time}}" end-of-day />
                    </div>
                </div>
            </div>
            <div class="${cx('foot')}">
                <ui-button on-click="onSelect" skin="ok" class="${cx('okBtn')}">确定</ui-button>
                <ui-button on-click="closeLayer" skin="cancel" class="${cx('cancelBtn')}">取消</ui-button>
            </div>
        </div>
    </ui-layer>
</div>`;
/* eslint-enable */

const RangeCalendar = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'ui-layer': __WEBPACK_IMPORTED_MODULE_4__Layer__["a" /* default */],
        'ui-monthview': __WEBPACK_IMPORTED_MODULE_5__MonthView__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_3__Button__["a" /* default */]
    },
    computed: {
        text() {
            const value = this.data.get('value');
            if (!value) {
                return '-';
            }
            const {begin, end} = value;
            const format = this.data.get('time') ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
            const beginText = __WEBPACK_IMPORTED_MODULE_0_moment___default()(begin).format(format);
            const endText = __WEBPACK_IMPORTED_MODULE_0_moment___default()(end).format(format);
            return `${beginText} - ${endText}`;
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            value: {
                begin: new Date(),
                end: new Date()
            },
            time: null,
            range: {begin: new Date(1982, 10, 4), end: new Date(2046, 10, 4)},
            // BEGIN 临时的数据
            begin: {
                value: null
            },
            end: {
                value: null
            },
            // E N D 临时的数据
            active: false,
            shortcut: true,
            shortcutItems: [
                {text: '昨天', value: getDayValue(1, 1)},
                {text: '最近7天', value: getDayValue(6, 0)},
                {text: '上周', value: getLastWeekValue()},
                {text: '本月', value: getMonthValue()},
                {text: '上个月', value: getLastMonthValue()},
                {text: '上个季度', value: getLastQuarterValue()}
            ]
        };
    },
    dataTypes: {
        /**
         * 获取或者设置组件的值
         * @bindx
         * @default {begin: new Date(), end: new Date()}
         */
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].object,

        /**
         * 日期可以选择的范围
         * @default {begin: new Date(1982, 10, 4), end: new Date(2046, 10, 4)}
         */
        range: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].object,

        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否启用选择日期的快捷方式
         * @default true
         */
        shortcut: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 浮层的打开状态
         * @bindx
         * @default false
         */
        active: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否可以编辑 HH:mm:ss
         * @default false
         */
        time: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool
    },
    inited() {
        let {begin, end} = this.data.get('value');
        if (!begin) {
            begin = new Date();
        }
        else if (typeof begin === 'string') {
            // utc to date
            begin = new Date(begin);
        }

        if (!end) {
            end = new Date();
        }
        else if (typeof end === 'string') {
            // utc to date
            end = new Date(end);
        }

        this.data.set('value', {begin, end});
        this.watch('value', value => this.fire('change', {value}));
    },
    onShortcutSelect(item) {
        const {begin, end} = typeof item.value === 'function'
            ? item.value()
            : item.value;
        this.data.set('begin.value', begin);
        this.data.set('end.value', end);
    },
    onSelect() {
        const begin = this.data.get('begin.value');
        const end = this.data.get('end.value');
        this.data.set('value', {begin, end});
        this.closeLayer();
    },
    closeLayer() {
        this.data.set('active', false);
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        if (!active) {
            const {begin, end} = this.data.get('value');
            this.data.set('begin.value', new Date(begin));
            this.data.set('end.value', new Date(end));
        }
        this.data.set('active', !active);
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_6__asInput__["a" /* asInput */])(RangeCalendar));


/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asInput__ = __webpack_require__(3);
/**
 * @file TextBox.es6
 * @author leeight
 */






const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-textbox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div s-if="addon && addonPosition === 'begin'" class="${cx('addon')}">{{addon}}</div>
    <textarea s-if="multiline"
        s-ref="inputEl"
        on-input="onInput"
        on-keyup="onKeyUp($event)"
        on-keydown="onKeyDown($event)"
        on-keypress="onKeyPress($event)"
        value="{=value=}"
        disabled="{{disabled}}"
        placeholder="{{placeholder}}"
        style="{{textboxStyle}}"></textarea>
    <input s-else
        s-ref="inputEl"
        on-input="onInput"
        on-keyup="onKeyUp($event)"
        on-keydown="onKeyDown($event)"
        on-keypress="onKeyPress($event)"
        on-focus="onFocus($event)"
        on-blur="onBlur($event)"
        value="{=value=}"
        min="{{min}}",
        max="{{max}}"
        step="{{step}}"
        type="{{type}}"
        disabled="{{disabled}}"
        placeholder="{{placeholder}}"
        style="{{textboxStyle}}" />
    <div s-if="addon && addonPosition === 'end'" class="${cx('addon', 'addon-end')}">{{addon}}</div>
</div>`;
/* eslint-enable */

const TextBox = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        textboxStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            disabled: false,
            autofocus: false,
            type: 'text',
            multiline: false,
            skin: '',
            placeholder: '',
            addon: '',
            addonPosition: 'begin', // 'begin' | 'end'
            width: null,
            height: null
        };
    },
    dataTypes: {
        /**
         * 控件的禁用状态
         *
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 是否默认获取焦点
         *
         * @default false
         */
        autofocus: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 单行文本框的输入类型，可以控制输入 email, number, url 等格式
         *
         * @default text
         */
        type: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 获取或者设置控件的值
         *
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 是否展示成多行输入的文本框(textarea)
         *
         * @default false
         */
        multiline: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 皮肤样式
         */
        skin: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 设置 placeholder 的内容
         */
        placeholder: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 输入框的前缀或者后缀文案
         */
        addon: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * addon 文案的位置，可以设置 begin 或者 end
         *
         * @default begin
         */
        addonPosition: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 输入框的宽度
         */
        width: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,


        /**
         * 输入框的高度
         */
        height: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        min: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        max: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        step: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number
    },
    attached() {
        const autofocus = this.data.get('autofocus');
        if (autofocus) {
            this.focus();
        }
    },
    focus() {
        const inputEl = this.ref('inputEl');
        if (inputEl) {
            if (document.activeElement === inputEl) {
                return;
            }
            inputEl.focus();
        }
    },
    onInput() {
        const value = this.data.get('value');
        this.fire('input', {value});
    },
    onFocus(e) {
        this.fire('focus', e);
    },
    onBlur(e) {
        this.fire('blur', e);
    },
    onKeyUp(e) {
        this.fire('keyup', e);
    },
    onKeyDown(e) {
        this.fire('keydown', e);
    },
    onKeyPress(e) {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            this.fire('enter');
        }
        this.fire('keypress', e);
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__asInput__["a" /* asInput */])(TextBox));


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

},[362])});;