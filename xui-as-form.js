define(["san","async-validator"], function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_45__) { return webpackJsonp([0],{

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

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asInput__ = __webpack_require__(3);
/**
 * @file Switch.es6
 * @author leeight
 */






const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-togglebutton');

/* eslint-disable */
const template = `<div on-click="toggleSwitch" class="{{mainClass}}">
    <span s-if="checked" class="${cx('part-on')}">ON</span>
    <span s-else class="${cx('part-off')}">OFF</span>
</div>`;
/* eslint-enable */

const Switch = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({    // eslint-disable-line
    template,
    initData() {
        return {
            checked: true
        };
    },
    dataTypes: {
        /**
         * 获取或者设置 Switch 组件选中的状态
         * @bindx
         * @default true
         */
        checked: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * Switch 组件的禁用状态
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool
    },
    computed: {
        value() {
            return this.data.get('checked');
        },
        mainClass() {
            const klass = cx.mainClass(this);
            const checked = this.data.get('checked');
            if (checked) {
                klass.push('state-checked');
                klass.push(cx('checked'));
            }
            return klass;
        }
    },
    inited() {
        this.watch('value', value => this.fire('change', {value}));
    },
    toggleSwitch() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }

        const checked = this.data.get('checked');
        this.data.set('checked', !checked);
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__asInput__["a" /* asInput */])(Switch));


/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__esui_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Layer__ = __webpack_require__(8);
/**
 * @file Tip.es6
 * @author leeight
 */






const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-tip');
const cx2 = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-tiplayer');

/* eslint-disable */
const template = `<template>
    <div on-mouseover="showLayer" on-mouseout="hideLayer" class="{{mainClass}}">
        <ui-layer open="{=active=}" auto-position="{{false}}" s-ref="layer" follow-scroll="{{false}}">
            <div class="{{tiplayerClass}}" s-ref="layer-body">
                <div class="${cx2('body-panel')}" on-mouseenter="cancelTimer" on-mouseleave="hideLayer">
                    <div class="${cx2('body')}" s-if="message" style="{{messageStyle}}">
                        {{message | raw}}
                    </div>
                    <div class="${cx2('body')}" s-else>
                        <slot />
                    </div>
                </div>
                <div class="{{arrowClass}}"></div>
            </div>
        </ui-layer>
    </div>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({   // eslint-disable-line
    template,
    components: {
        'ui-layer': __WEBPACK_IMPORTED_MODULE_3__Layer__["a" /* default */]
    },
    computed: {
        style() {
            return {};
        },
        tiplayerClass() {
            const position = this.data.get('position');
            const klass = [
                cx2(),
                cx2('x'),
                cx2(position)
            ];
            return klass;
        },
        arrowClass() {
            const position = this.data.get('position');
            const klass = [
                cx2('arrow'),
                cx2('arrow-' + position)
            ];
            return klass;
        },
        mainClass() {
            const klass = [cx(), cx('x')];
            return klass;
        },
        messageStyle() {
            const style = {};
            const width = this.data.get('width');
            if (width != null) {
                style.width = Object(__WEBPACK_IMPORTED_MODULE_2__util__["h" /* hasUnit */])(width) ? width : width + 'px';
            }
            return style;
        }
    },
    initData() {
        return {
            message: null,
            position: 'lt', // 'lt' | 'tc' | 'rt' | 'bc'
            active: false,
            duration: 500
        };
    },
    dataTypes: {
        /**
         * Tip 需要展示的内容，如果设置了 message，那么就忽略 default slot 的内容
         */
        message: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * Tip 的位置，可选的内容有：lt, tc, rt, bc
         * @default lt
         */
        position: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * Tip 打开的状态
         * @bindx
         * @default false
         */
        active: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 默认的延迟(ms)
         * @default 500
         */
        duration: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number
    },
    inited() {
        this.timer = null;
    },
    attached() {
    },
    positionLayer() {
        const layer = this.ref('layer');
        const layerBody = this.ref('layer-body');
        const position = this.data.get('position');
        if (layerBody) {
            const rect = this.el.getBoundingClientRect();
            const offset = Object(__WEBPACK_IMPORTED_MODULE_1__esui_dom__["a" /* getOffset */])(this.el);
            const {offsetHeight, offsetWidth} = layerBody;
            const style = {'z-index': Object(__WEBPACK_IMPORTED_MODULE_2__util__["k" /* nextZindex */])()};
            if (position === 'lt') {
                style.top = (offset.top - (offsetHeight - rect.height) / 2) + 'px';
                style.left = offset.right + 'px';
            }
            else if (position === 'bc') {
                style.left = (offset.left - (offsetWidth - rect.width) / 2) + 'px';
                style.top = (offset.top + rect.height + 11) + 'px';
            }
            else if (position === 'rt') {
                style.top = (offset.top - (offsetHeight - rect.height) / 2) + 'px';
                style.left = (offset.left - offsetWidth) + 'px';
            }
            else if (position === 'tc') {
                style.left = (offset.left - (offsetWidth - rect.width) / 2) + 'px';
                style.top = (offset.top - rect.height - offsetHeight) + 'px';
            }
            layer.data.set('layerStyle', style);
        }
    },
    updated() {
        const active = this.data.get('active');
        if (active) {
            this.positionLayer();
        }
    },
    showLayer() {
        this.cancelTimer();
        this.timer = setTimeout(
            () => {
                this.timer = null;
                this.data.set('active', true);
            },
            this.data.get('duration')
        );
    },
    cancelTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    },
    hideLayer() {
        this.cancelTimer();
        const active = this.data.get('active');
        if (!active) {
            return;
        }
        this.timer = setTimeout(
            () => {
                this.timer = null;
                this.data.set('active', false);
            },
            this.data.get('duration')
        );
    }
}));



/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asInput__ = __webpack_require__(3);
/**
 * @file components/BoxGroup.es6
 * @author leeight
 */







const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-boxgroup');

/* eslint-disable */
const template = `
<template>
<div class="{{mainClass}}">
    <div class="${cx('group')}" s-for="ds, i in groupedDatasource">
        <label class="${cx('radio', 'wrapper')}" style="{{itemStyle}}" san-for="item in ds">
            <input san-if="boxType == 'radio'"
                type="radio"
                on-change="onChange($event, item.__index)"
                name="{{name}}"
                disabled="{{item.disabled || disabled}}"
                checked="{{checkedStatus[item.__index]}}"
            />
            <input san-else
                type="checkbox"
                on-change="onChange($event, item.__index)"
                name="{{name}}"
                disabled="{{item.disabled || disabled}}"
                checked="{{checkedStatus[item.__index]}}"
            />
            <span>{{item | title}}</span>
        </label>
    </div>
</div>
</template>
`;
/* eslint-enable */

const BoxGroup = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    initData() {
        return {
            datasource: [], // Array.<{value: string, title: string}>
            disabled: false,
            orientation: 'horizontal', // 'vertical' | 'horizontal'
            value: null,
            colCount: 0, // 展示N列
            itemWidth: 0, // 每一列的宽度
            name: 'esui' + Object(__WEBPACK_IMPORTED_MODULE_2__util__["j" /* nexUuid */])(),
            boxType: 'radio' // 'radio' | 'checkbox'
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 组件的数据源
         * <pre><code>{
         *   text: string,
         *   value: any,
         *   disabled?: bool
         * }</code></pre>
         * @default []
         */
        datasource: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].array,

        /**
         * 排列方式，横向还是纵向
         * @default horizontal
         */
        orientation: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 组件当前的值，如果是 checkbox 的话，值的类型是 any[]
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any,

        /**
         * 每行最多展示 col-count 列
         * @default 0
         */
        colCount: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 每一项的宽度
         * @default 0
         */
        itemWidth: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 类型 radio | checkbox
         */
        boxType: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string
    },
    computed: {
        checkedStatus() {
            const status = {};
            const datasource = this.data.get('datasource');
            const boxType = this.data.get('boxType');

            let value = this.data.get('value');
            if (value != null) {
                if (boxType === 'radio' && !__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(value)) {
                    value = [value];
                }

                for (let i = 0; i < value.length; i++) {
                    for (let j = 0; j < datasource.length; j++) {
                        if (datasource[j].value === value[i]) {
                            status['' + j] = 1;
                            break;
                        }
                    }
                }
            }

            return status;
        },
        itemStyle() {
            const style = {};

            const itemWidth = this.data.get('itemWidth');
            if (itemWidth > 0) {
                style.width = `${itemWidth}px`;
            }

            return style;
        },
        groupedDatasource() {
            const datasource = this.data.get('datasource');
            const colCount = this.data.get('colCount');
            if (!colCount) {
                return [__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(datasource, (item, __index) => {
                    const {text, title, disabled} = item;
                    return {
                        text, title, disabled, __index
                    };
                })];
            }
            const itemsCount = datasource.length;
            const groups = [];
            const groupCount = Math.ceil(itemsCount / colCount);

            for (let i = 0; i < groupCount; i++) {
                const group = [];
                const startIndex = i * colCount;
                const endIndex = Math.min(itemsCount, (i + 1) * colCount);
                for (let j = startIndex; j < endIndex; j++) {
                    const {text, title, disabled} = datasource[j];
                    group.push({text, title, disabled, __index: j});
                }
                groups.push(group);
            }

            return groups;
        },
        mainClass() {
            const klass = cx.mainClass(this);
            const orientation = this.data.get('orientation');
            if (orientation) {
                klass.push(cx(orientation));
                klass.push('state-' + orientation);
            }
            return klass;
        }
    },
    filters: {
        title(item) {
            return item.text || item.title;
        }
    },
    inited() {
        const {boxType, value, disabled} = this.data.get();
        if (disabled === '') {
            this.data.set('disabled', true);
        }
        if (boxType === 'radio' && __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(value)) {
            this.data.set('value', value[0]);
        }
        if (boxType === 'checkbox' && !value) {
            this.data.set('value', []);
        }
        this.watch('value', value => this.fire('change', {value}));
    },
    onChange(e, index) {
        const boxType = this.data.get('boxType');
        const datasource = this.data.get('datasource');

        const value = datasource[index].value;
        if (boxType === 'radio') {
            if (e.target.checked) {
                this.data.set('value', value);
            }
            else {
                // ??? 好像不太可能？
            }
        }
        else {
            if (e.target.checked) {
                this.data.push('value', value);
            }
            else {
                const valueIndex = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.findIndex(this.data.get('value'), o => o === value);
                if (valueIndex !== -1) {
                    this.data.removeAt('value', valueIndex);
                }
            }
        }
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__asInput__["a" /* asInput */])(BoxGroup));


/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asInput__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Icon__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Loading__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__StopScroll__ = __webpack_require__(12);
/**
 * @file components/MultiPicker.es
 * @author leeight
 */











const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-select');

const kDefaultLabel = '请选择';
const kValuesKey = 'value';
const kTmpValuesKey = '__values';

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}">
    <span class="${cx('text')}">{{label|raw}}</span>
    <ui-layer open="{=active=}" follow-scroll="{{false}}" s-ref="layer" offset-top="{{0}}">
        <div class="${cx('layer')} ${cx('layer-x')} ${cx('multipicker-layer')}" style="{{layerStyle}}">
            <ui-ss class="${cx('multipicker-column')}" s-for="datastore, levelIndex in compactLevels">
                <ul>
                    <li class="{{item.disabled ? '${cx('item', 'item-disabled')}' : item.active ? '${cx('item', 'item-selected')}' : '${cx('item')}'}}"
                        on-click="onItemClicked(item, levelIndex)"
                        s-for="item in datastore">
                        <span>
                            {{item.text}}
                            <ui-loading size="small" s-if="item.loading" />
                            <ui-icon name="color-error" s-elif="item.error" />
                            <ui-icon name="arrow-right" s-elif="item.expandable" />
                        </span>
                    </li>
                </ul>
            </ui-ss>
        </div>
    </ui-layer>
</div>`;
/* eslint-enable */

const MultiPicker = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'ui-loading': __WEBPACK_IMPORTED_MODULE_6__Loading__["a" /* default */],
        'ui-icon': __WEBPACK_IMPORTED_MODULE_5__Icon__["a" /* default */],
        'ui-ss': __WEBPACK_IMPORTED_MODULE_7__StopScroll__["a" /* default */],
        'ui-layer': __WEBPACK_IMPORTED_MODULE_4__Layer__["a" /* default */]
    },
    initData() {
        return {
            disabled: false,
            active: false,
            layerWidth: 'auto',
            loader: null, // 数据异步加载的loader，逐步的填充 datasource 的内容
            datasource: [],
            [kValuesKey]: [],
            [kTmpValuesKey]: [] // 临时的值，点击了之后，同步到 value 里面去
        };
    },
    dataTypes: {
        /**
         * 控制 MultiPicker浮层的展开和关闭
         * @bindx
         * @default false
         */
        active: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 获取或者设置 MultiPicker 组件的值
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].array,

        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * MultiPicker 组件的数据源，不一定是完整的，可以通过 loader 逐步填充
         * <pre><code>{
         *   text: string,
         *   value: any,
         *   disabled?: bool, // 是否禁止选择当前项
         *   expandable?: bool, // 如果是 true，说明可以继续展开
         *   children?: any[] // 如果可以展开，那么子节点的内容（可以是 loader 动态返回的）
         * }
         * </code></pre>
         * @default []
         */
        datasource: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].array,

        /**
         * 如果需要异步的加载数据，那么就设置这个参数<br>
         * <code>function(values: any[]): Promise.&lt;DatasourceItem[], Error&gt;</code>
         */
        loader: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].func,

        /**
         * 浮层的宽度，例如 'auto', '100px', '100%', 300
         *
         * @default 'auto'
         */
        layerWidth: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any
    },
    computed: {
        // datasource 是树形结构
        // compactLevels 是打平之后的，用户看到的和可以操作的是 compactLevels 的数据
        compactLevels() {
            const values = this.data.get(kTmpValuesKey);
            const datasource = this.data.get('datasource');
            const compactLevels = Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* arrayTreeCompact */])(values, datasource);

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
                style.width = Object(__WEBPACK_IMPORTED_MODULE_2__util__["h" /* hasUnit */])(layerWidth) ? layerWidth : `${layerWidth}px`;
            }
            return style;
        },
        label() {
            const values = this.data.get(kValuesKey);
            const datasource = this.data.get('datasource');
            const nodes = Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* arrayTreeFilter */])(datasource, (item, level) => item.value === values[level]);
            const labels = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(nodes, item => item.text);
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
        this.fire('change', {[kValuesKey]: values});
    },
    expandChildren(item, index) {
        if (item.disabled) {
            return;
        }

        const loader = this.data.get('loader');
        if (typeof loader === 'function') {
            this.expandChildrenAsync(item, index);
        }
        else {
            this.expandChildrenInternal(item, index);
        }
    },

    expandChildrenAsync(item, index) {
        const values = [...this.data.get(kTmpValuesKey)];
        values[index] = item.value;
        values.splice(index + 1); // 删掉多余的数据
        if (values.length <= 0) {
            return;
        }

        const datasource = this.data.get('datasource');
        const indexes = Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* arrayTreeFilterIndex */])(datasource, (item, level) => item.value === values[level]);
        const itemKey = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(indexes,
            (v, i) => i === 0 ? `datasource[${v}]` : `children[${v}]`).join('.'); // eslint-disable-line

        const lastNode = this.data.get(itemKey);
        if (!lastNode || lastNode.children || !lastNode.expandable) {
            // 之前已经加载过了 或者 是叶子节点
            this.expandChildrenInternal(item, index);
            return;
        }

        // 显示加载的icon
        this.data.set(`${itemKey}.loading`, true);
        this.data.set(`${itemKey}.error`, null);

        const loader = this.data.get('loader');
        return loader(values).then(children => {
            this.data.set(`${itemKey}.loading`, false);

            // 追加到 datasource 里面去
            if (children.length <= 0) {
                this.data.set(`${itemKey}.expandable`, false);
            }
            else {
                this.data.set(`${itemKey}.children`, children);
            }

            this.expandChildrenInternal(item, index);
        }).catch(error => {
            this.data.set(`${itemKey}.loading`, false);
            this.data.set(`${itemKey}.error`, error);
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

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__asInput__["a" /* asInput */])(MultiPicker));


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

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_ToastLabel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_ACEEditor__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_SyntaxHighlighter__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_Select__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inf_ui_x_components_Switch__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_inf_ui_x_components_Toast__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_inf_ui_x_forms_createForm__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Row__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__examples_formSchemas__ = __webpack_require__(317);
/**
 * @file demos/xui-as-form.es6
 * @author leeight
 */












/* eslint-disable */

/* eslint-enable */

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-select width="300" on-change="onExampleChanged" datasource="{{examples.datasource}}"></xui-select>
    <xui-button on-click="buildForm" skin="primary">生成表单</xui-button>
    <br />
    <br />
    <xui-aceeditor s-if="schemaCode" value="{=schemaCode=}" mode="ace/mode/json" />
    <br />
    <table class="typedefs as-form-preview" s-if="schemaCode">
        <colgroup>
            <col width="700px" />
            <col width="200px" />
        </colgroup>
        <tbody>
            <tr><th>表单</th><th>表单数据</th></tr>
            <tr>
                <td class="as-form-instance">
                    <div s-ref="form-container"></div>
                    <div>
                        开启实时验证：<xui-switch checked="{=instantValidation=}" on-change="onInstantValidationChanged" />
                        预览模式：<xui-switch checked="{=preview=}" on-change="onPreviewChanged" />
                        <xui-button skin="primary" on-click="validateForm">验证表单</xui-button>
                    </div>
                </td>
                <td class="as-form-data"><xui-hljs code="{{formData | stringify}}" /></td>
            </tr>
        </tbody>
    </table>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_9__Row__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_ToastLabel__["a" /* default */],
        'xui-select': __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_Select__["a" /* default */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_6_inf_ui_x_components_Switch__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_Button__["a" /* default */],
        'xui-hljs': __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_SyntaxHighlighter__["a" /* default */],
        'xui-aceeditor': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_ACEEditor__["a" /* default */]
    },
    filters: {
        stringify(data) {
            return JSON.stringify(data, null, 2);
        }
    },
    initData() {
        return {
            instantValidation: true,
            preview: false,
            examples: {
                datasource: [
                    {text: '默认情况', value: __WEBPACK_IMPORTED_MODULE_10__examples_formSchemas__["a" /* kDefaultSchema */]},
                    {text: '表单联动 visibleOn: $eq, $ne', value: __WEBPACK_IMPORTED_MODULE_10__examples_formSchemas__["b" /* kSchema$eq */]},
                    {text: '表单联动 visibleOn: $in, $nin', value: __WEBPACK_IMPORTED_MODULE_10__examples_formSchemas__["d" /* kSchema$in */]},
                    {text: '表单联动 $gt, $lt, $gte, $lte', value: __WEBPACK_IMPORTED_MODULE_10__examples_formSchemas__["c" /* kSchema$gt */]},
                    {text: '表单验证', value: __WEBPACK_IMPORTED_MODULE_10__examples_formSchemas__["f" /* kSchema$validations */]},
                    {text: '表单验证 requiredOn', value: __WEBPACK_IMPORTED_MODULE_10__examples_formSchemas__["e" /* kSchema$requiredOn */]}
                ]
            },
            formData: {},
            schemaCode: null
        };
    },
    buildForm() {
        const value = this.data.get('schemaCode');
        try {
            const schema = JSON.parse(value);
            if (!schema && !schema.controls) {
                throw new Error('Invalid json format');
            }
            this.buildFormBySchema({value: schema});
        }
        catch (ex) {
            __WEBPACK_IMPORTED_MODULE_7_inf_ui_x_components_Toast__["a" /* default */].error('JSON 不合法，请检查');
        }
    },
    onExampleChanged({value}) {
        const schemaCode = JSON.stringify(value, null, 2);
        this.data.set('schemaCode', schemaCode);
        this.buildFormBySchema({value});
    },
    onInstantValidationChanged({value}) {
        if (this.formInstance) {
            this.formInstance.data.set('instantValidation', value);
            this.validateForm();
        }
    },
    onPreviewChanged({value}) {
        if (this.formInstance) {
            this.formInstance.data.set('preview', value);
        }
    },
    buildFormBySchema({value}) {
        this.nextTick(() => {
            const formContainer = this.ref('form-container');
            if (formContainer) {
                if (this.formInstance) {
                    this.formInstance.dispose();
                    formContainer.innerHTML = '';
                }
                this.data.set('formData', {});
                const instantValidation = this.data.get('instantValidation');
                const FormComponent = Object(__WEBPACK_IMPORTED_MODULE_8_inf_ui_x_forms_createForm__["a" /* createForm */])(value);
                const formInstance = new FormComponent({data: {instantValidation}});
                formInstance.watch('formData', formData => this.data.set('formData', formData));
                formInstance.attach(formContainer);
                this.formInstance = formInstance;
            }
        });
    },
    validateForm() {
        if (!this.formInstance) {
            return;
        }
        this.formInstance.validateForm()
            .then(() => __WEBPACK_IMPORTED_MODULE_7_inf_ui_x_components_Toast__["a" /* default */].success('验证通过'))
            .catch(() => __WEBPACK_IMPORTED_MODULE_7_inf_ui_x_components_Toast__["a" /* default */].error('验证失败'));
    }
}));


/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @file inf-ui/x/demos/examples/formSchemas.es6
 * @author leeight
 */

const kDefaultSchema = {
    '//': '暂时支持 6 种控件类型，如果需要扩展，调用 registerFormItem 即可',
    'controls': [
        {
            label: '文本类型',
            placeholder: '请输入姓名',
            type: 'text',
            required: true,
            name: 'aText',
            validations: [
                'minLength:10',
                'maxLength:20',
                'isUrl'
            ],
            help: '最少10个字符，最多20个字符，URL格式'
        },
        {
            label: '多行文本类型',
            placeholder: '请输入描述信息',
            type: 'text',
            multiline: true,
            required: true,
            name: 'aMultilineText'
        },
        {
            label: '数值类型',
            placeholder: '请输入年龄',
            type: 'number',
            required: true,
            name: 'bNumber',
            validations: ['minimum:10', 'maximum:30'],
            validationErrors: {
                minimum: '年龄最小值10',
                maximum: '年龄最大值30'
            },
            help: '最小值10，最大值30'
        },
        {
            label: 'SELECT',
            type: 'select',
            required: true,
            name: 'cSelect',
            datasource: [
                {text: '选型1', value: 'O1'},
                {text: '选型2', value: 'O2'},
                {text: '选型3', value: 'O3'},
                {text: '选型4', value: 'O4'}
            ]
        },
        {
            label: '多选(MULTI SELECT)',
            type: 'select',
            required: true,
            name: 'dSelect',
            multi: true,
            width: 200,
            datasource: [
                {text: '选型1', value: 'O1'},
                {text: '选型2', value: 'O2'},
                {text: '选型3', value: 'O3'},
                {text: '选型4', value: 'O4'}
            ]
        },
        {
            label: '日期',
            type: 'calendar',
            required: true,
            name: 'eCalendar'
        },
        {
            label: '文件上传',
            type: 'uploader',
            required: true,
            name: 'fUploader'
        },
        {
            label: '开关',
            type: 'switch',
            required: true,
            name: 'gSwitch'
        },
        {
            label: 'BoxGroup',
            type: 'boxgroup',
            required: true,
            requiredRuleType: 'number',
            datasource: [
                {text: 'FOO', value: 0},
                {text: 'BAR', value: 1}
            ],
            name: 'gBoxgroup'
        },
        {
            label: 'Dragger',
            type: 'dragger',
            required: true,
            requiredRuleType: 'number',
            name: 'gDragger'
        },
        {
            label: 'NumberTextline',
            type: 'numbertextline',
            required: true,
            requiredRuleType: 'number',
            min: 10,
            max: 20,
            name: 'gNtl'
        },
        {
            label: 'RadioSelect',
            type: 'radioselect',
            required: true,
            name: 'gRs',
            datasource: [
                {text: '1个月', value: 'foo'},
                {text: '2', value: 'bar'},
                {text: '3', value: '123', disabled: true}
            ]
        },
        {
            label: 'Region',
            type: 'region',
            required: true,
            requiredRuleType: 'array',
            name: 'gRegion'
        },
        {
            label: 'MultiPicker',
            type: 'multipicker',
            required: true,
            requiredRuleType: 'array',
            name: 'gMp',
            datasource: [
                {
                    text: 'CentOS',
                    value: 'CentOS'
                },
                {
                    text: 'Debian',
                    value: 'Debian'
                },
                {
                    text: 'Ubuntu',
                    value: 'Ubuntu',
                    disabled: true
                },
                {
                    text: 'Windows Server',
                    value: 'Windows Server'
                }
            ]
        },
        {
            label: 'UserPicker',
            type: 'userpicker',
            required: true,
            requiredRuleType: 'array',
            name: 'gUp',
            searchRequester(keyword) {
                return fetch('https://randomuser.me/api/?results=5')
                    .then(response => response.json())
                    .then(response => {
                        const results = response.results;
                        return results.map(o => {
                            // 必须要有 accountId 和 username 两个属性
                            o.accountId = o.email;
                            o.username = o.name.first + ' ' + o.name.last;
                            o.displayName = o.username;
                            return o;
                        });
                    });
            }
        },
        {
            label: 'RangeCalendar',
            type: 'rangecalendar',
            required: true,
            requiredRuleType: 'object',
            name: 'gRc'
        },
        {
            label: 'ACEEditor',
            type: 'aceeditor',
            required: true,
            width: 300,
            name: 'gACE'
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["a"] = kDefaultSchema;


const kSchema$eq = {
    '//': '演示 $eq, $ne 的用法',
    'controls': [
        {
            label: 'SELECT',
            type: 'select',
            name: 'aSelect',
            datasource: [
                {text: 'A', value: 'A'},
                {text: 'B', value: 'B'},
                {text: 'C', value: 'C'},
                {text: 'D', value: 'D'}
            ]
        },
        {
            label: '选择"A"的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aSelect: 'A'
            }
        },
        {
            label: '选择"B"的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aSelect: {
                    $eq: 'B'
                }
            }
        },
        {
            label: '不等于"C"的时候出现',
            type: 'text',
            name: 'dText',
            visibleOn: {
                aSelect: {
                    $ne: 'C'
                }
            }
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["b"] = kSchema$eq;


const kSchema$in = {
    '//': '演示 $in, $nin 的用法',
    'controls': [
        {
            label: 'SELECT',
            type: 'select',
            name: 'aSelect',
            datasource: [
                {text: 'A', value: 'A'},
                {text: 'B', value: 'B'},
                {text: 'C', value: 'C'},
                {text: 'D', value: 'D'}
            ]
        },
        {
            label: '选择"A" / "B" 的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aSelect: {
                    $in: ['A', 'B']
                }
            }
        },
        {
            label: '选择"C" / "D" 的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aSelect: {
                    $nin: ['A', 'B']
                }
            }
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["d"] = kSchema$in;



const kSchema$gt = {
    '//': '演示 $gt, $gte, $lt, $lte 的用法',
    'controls': [
        {
            label: '数值类型',
            type: 'number',
            name: 'aNumber'
        },
        {
            label: '大于 10 的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aNumber: {
                    $gt: 10
                }
            }
        },
        {
            label: '大于等于 10 的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aNumber: {
                    $gte: 10
                }
            }
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["c"] = kSchema$gt;



const kSchema$validations = {
    '//': '演示验证规则的用法',
    'controls': [
        {
            label: 'minLength,maxLength',
            type: 'text',
            name: 'username',
            required: true,
            validations: [
                'minLength:5',
                'maxLength:20'
            ]
        },
        {
            label: 'maximum,minimum',
            type: 'number',
            name: 'age',
            required: true,
            validations: [
                'minimum:10',
                'maximum:30'
            ]
        },
        {
            label: 'matchRegexp',
            type: 'text',
            name: 'matchRegexp',
            required: true,
            validations: [
                'matchRegexp:^\\d+$'
            ]
        },
        {
            label: 'isEmail',
            type: 'text',
            name: 'isEmail',
            required: true,
            validations: ['isEmail']
        },
        {
            label: 'isUrl',
            type: 'text',
            name: 'isUrl',
            required: true,
            validations: ['isUrl']
        },
        {
            label: 'isNumeric',
            type: 'text',
            name: 'isNumeric',
            required: true,
            validations: ['isNumeric']
        },
        {
            label: 'isAlphanumeric',
            type: 'text',
            name: 'isAlphanumeric',
            required: true,
            validations: ['isAlphanumeric']
        },
        {
            label: 'isInt',
            type: 'text',
            name: 'isInt',
            required: true,
            validations: ['isInt']
        },
        {
            label: 'isFloat',
            type: 'text',
            name: 'isFloat',
            required: true,
            validations: ['isFloat']
        },
        {
            label: 'isBool',
            type: 'switch',
            name: 'isBool',
            required: true,
            validations: ['isBool']
        },
        {
            label: 'isJson',
            type: 'text',
            multiline: true,
            name: 'isJson',
            required: true,
            validations: ['isJson']
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["f"] = kSchema$validations;


const kSchema$requiredOn = {
    '//': '介绍 requiredOn 的用法',
    'controls': [
        {
            label: '性别',
            type: 'select',
            name: 'gender',
            required: true,
            datasource: [
                {text: '女', value: '女'},
                {text: '男', value: '男'}
            ]
        },
        {
            label: '年龄',
            type: 'number',
            name: 'age',
            requiredOn: {
                gender: '女'
            }
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["e"] = kSchema$requiredOn;



/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/**
 * @file components/SyntaxHighlighter.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-hljs');

/* eslint-disable */
const template = `<div class="${cx()}">
<pre><code class="{{lang}}">{{highlightedCode|raw}}</code></pre>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    initData() {
        return {
            code: '',
            lang: 'javascript'
        };
    },
    dataTypes: {
        /**
         * 需要高亮的代码
         * @default ''
         */
        code: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].string,

        /**
         * 代码的类型
         * @default javascript
         */
        lang: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].string
    },
    __updateHighlightedCode(hljs) {
        const code = this.data.get('code');
        const lang = this.data.get('lang');
        try {
            const rv = hljs.highlight(lang, code);
            this.data.set('highlightedCode', rv.value);
        }
        catch (ex) {
            this.data.set('highlightedCode', '');
        }
    },
    attached() {
        const amdModules = ['hljs/highlight', 'inf-ria/css!hljs/styles/default.min.css'];
        window.require(amdModules, hljs => {
            this.watch('code', () => this.__updateHighlightedCode(hljs));
            this.watch('lang', () => this.__updateHighlightedCode(hljs));
            this.__updateHighlightedCode(hljs);
        });
    }
}));


/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asInput__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MonthView__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Button__ = __webpack_require__(9);
/**
 * @file Calendar.es6
 * @author leeight
 */









const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-calendar');
const kDefaultRange = {begin: new Date(1982, 10, 4), end: new Date(2046, 10, 4)};

/* eslint-disable */
const template = `<div class="${cx('xx')}">
<ui-button on-click="prevDay" disabled="{{prevDisabled}}" s-if="prev"><</ui-button>
<div on-click="toggleLayer" class="{{mainClass}}">
    <div class="${cx('text')}">{{text}}</div>
    <div class="${cx('arrow')}"></div>
    <ui-layer open="{=active=}" s-ref="layer" follow-scroll="{{false}}">
        <div class="${cx('layer')}">
            <ui-monthview value="{=value=}" time="{{time}}" range="{{range}}" on-change="onChange"/>
        </div>
    </ui-layer>
</div>
<ui-button on-click="nextDay" disabled="{{nextDisabled}}" s-if="next">></ui-button>
</div>
`;
/* eslint-enable */

const Calendar = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({  // eslint-disable-line
    template,
    components: {
        'ui-button': __WEBPACK_IMPORTED_MODULE_6__Button__["a" /* default */],
        'ui-layer': __WEBPACK_IMPORTED_MODULE_4__Layer__["a" /* default */],
        'ui-monthview': __WEBPACK_IMPORTED_MODULE_5__MonthView__["a" /* default */]
    },
    computed: {
        text() {
            const value = this.data.get('value');
            const valueText = __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).format(this.data.get('format'));
            return `${valueText}`;
        },
        mainClass() {
            return cx.mainClass(this);
        },
        prevDisabled() {
            const disabled = this.data.get('disabled');
            const range = this.data.get('range');
            const value = this.data.get('value');
            // computed的执行早于了inted，所以需要判断下range
            return disabled || (range && __WEBPACK_IMPORTED_MODULE_0_moment___default()(range.begin).unix() >= __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).add(-1, 'day').unix());
        },
        nextDisabled() {
            const disabled = this.data.get('disabled');
            const range = this.data.get('range');
            const value = this.data.get('value');
            // computed的执行早于了inted，所以需要判断下range
            return disabled || (range && __WEBPACK_IMPORTED_MODULE_0_moment___default()(range.end).unix() <= __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).unix());
        }
    },
    initData() {
        return {
            value: new Date(),
            time: false,
            prev: false,
            next: false,
            active: false,
            range: kDefaultRange,
            format: 'YYYY-MM-DD'
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否可以编辑 HH:mm:ss
         * @default false
         */
        time: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否展示前一天的按钮
         * @default false
         */
        prev: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否展示后一天的按钮
         * @default false
         */
        next: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 浮层的展开状态
         * @bindx
         * @default false
         */
        active: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 组件的值
         * @bindx
         * @default new Date()
         */
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].date,

        /**
         * 文案格式化日期的时候默认格式
         * @default YYYY-MM-DD
         */
        format: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string
    },
    inited() {
        let {value, range} = this.data.get();
        // 外部有可能传过来的range为undefined
        if (!range) {
            this.data.set('range', kDefaultRange);
        }
        if (!value) {
            value = new Date();
        }
        else if (value && typeof value === 'string') {
            value = new Date(value);
        }
        // 只有 new Date(value), 数据才会同步到外部的组件里面去
        this.data.set('value', new Date(value));
        this.watch('value', value => this.fire('change', {value}));
    },
    nextDay() {
        const value = this.data.get('value');
        const newValue = __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).add(1, 'day').toDate();
        this.data.set('value', newValue);
    },
    prevDay() {
        const value = this.data.get('value');
        const newValue = __WEBPACK_IMPORTED_MODULE_0_moment___default()(value).subtract(1, 'day').toDate();
        this.data.set('value', newValue);
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        this.data.set('active', !active);
    },
    onChange({value}) {
        if (value !== this.data.get('value')) {
            this.fire('change', {value});
        }
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__asInput__["a" /* asInput */])(Calendar));



/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_humanize__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_humanize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_humanize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Button__ = __webpack_require__(9);
/**
 * @file components/BosUploader.es6
 * @author leeight
 */








const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-bos-uploader');
const kStatus = {
    PENDING: 'pending',
    UPLOADING: 'uploading',
    UPLOAD_SUCCESS: 'upload-success',
    UPLOAD_ERROR: 'upload-error'
};
const kStatusText = {
    [kStatus.PENDING]: '等待上传',
    [kStatus.UPLOADING]: '上传中',
    [kStatus.UPLOAD_SUCCESS]: '上传成功',
    [kStatus.UPLOAD_ERROR]: '上传失败'
};
window.$ = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a;

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <div s-else>
        <ui-button disabled="{{disabled}}" s-ref="btn">选择文件</ui-button>
        <ui-button icon="paddle-upload"
            s-if="!autoStart"
            on-click="startUpload"
            disabled="{{startDisabled}}"
            skin="primary">开始上传</ui-button>
        <div class="${cx('speed-info')}" s-if="withSpeedInfo && speedInfo">{{speedInfo | raw}}</div>

        <div class="${cx('list')}" s-if="files.length">
            <slot name="preview" var-files="files">
                <table border="1" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th class="${cx('col-no')}">序号</th>
                            <th class="${cx('col-name')}">名称</th>
                            <th class="${cx('col-status')}">状态</th>
                            <th class="${cx('col-progress')}">进度</th>
                            <th class="${cx('col-size')}">大小</th>
                            <th class="${cx('col-time')}">耗时</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr s-for="f, i in files">
                            <td>#{{i}}</td>
                            <td><div title="{{f.name}}">{{f.name}}</div></td>
                            <td>{{f.status | status}}</td>
                            <td>{{f.progress}}</td>
                            <td>{{f.size | filesize}}</td>
                            <td>{{f.time}}</td>
                        </tr>
                    </tbody>
                </table>
            </slot>
        </div>
    </div>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
    template,
    components: {
        'ui-button': __WEBPACK_IMPORTED_MODULE_4__Button__["a" /* default */]
    },
    initData() {
        return {
            autoStart: false,
            finished: false,
            multiple: false,
            withSpeedInfo: true,
            speedInfo: null,
            error: null,
            files: []
        };
    },
    dataTypes: {
        /**
         * 是否自动上传
         * @default false
         */
        autoStart: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 是否支持多选
         * @default false
         */
        multiple: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 是否展示上传进度的信息
         * @default true
         */
        withSpeedInfo: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 计算签名的地址，<strong style="color:red">线上环境</strong>建议设置这个参数<br>
         * uptoken_url 的后端实现逻辑，请参考:
         * <pre><code>https://github.com/leeight/bce-sdk-js-usage</code></pre>
         */
        uptokenUrl: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string.isRequired,

        /**
         * 如果是 ak 和 sk 是 sts 服务获取的，需要通过这个参数设置对应的 stsToken。<br>
         * 更多信息请参考
         * <a target="_blank" href="https://cloud.baidu.com/doc/BOS/API/27.5CSTS.E6.9C.8D.E5.8A.A1.E6.8E.A5.E5.8F.A3.html">官方文档（临时授权访问）</a>
         */
        uptoken: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 测试环境，方便的话，可以设置 ak 参数
         */
        ak: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 测试环境，方便的话，可以设置 sk 参数
         */
        sk: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 计算上传的文件名
         * <pre><code>function(file:File): string | Promise.&lt;string&gt;</code></pre>
         */
        keyCb: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].func,

        /**
         * BOS的地址，需要设置成 https://&lt;bucket&gt;.&lt;region&gt;.bcebos.com，例如：
         * <pre><code>https://bce-bos-uploader.bj.bcebos.com</code></pre>
         */
        bosEndpoint: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string.isRequired
    },
    computed: {
        startDisabled() {
            const files = this.data.get('files');
            const disabled = this.data.get('disabled');
            const finished = this.data.get('finished');
            if (disabled || finished || files.length <= 0) {
                return true;
            }
            return false;
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    filters: {
        status(sv) {
            return `<i class="${cx('status', 'status-' + sv)}">${kStatusText[sv]}</i>`;
        },
        filesize(size) {
            return __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.filesize(size);
        }
    },
    findById(uuid) {
        const files = this.data.get('files');
        for (let i = 0; i < files.length; i++) {
            if (uuid === files[i].uuid) {
                return i;
            }
        }
        return -1;
    },
    initializeUploader(baidubce) {
        const autoStart = this.data.get('autoStart');
        const bosEndpoint = this.data.get('bosEndpoint');
        const uptokenUrl = this.data.get('uptokenUrl');
        const ak = this.data.get('ak');
        const sk = this.data.get('sk');
        const uptoken = this.data.get('uptoken');
        if (!bosEndpoint || !(uptokenUrl || (ak && sk))) {
            this.data.set('error', new Error('初始化失败，请设置 bos-endpoint 和 uptoken-url 或者 ak && sk 属性'));
            return;
        }

        // FIXME(leeight) 奇怪，为啥会没有这个元素呢?
        const btn = this.ref('btn');
        if (!btn) {
            return;
        }

        const multiple = this.data.get('multiple');
        this.uploader = new baidubce.bos.Uploader({
            browse_button: btn.el,
            auto_start: autoStart,
            multi_selection: multiple,
            bos_endpoint: bosEndpoint,
            bos_multipart_parallel: 5,
            bos_multipart_auto_continue: true,
            chunk_size: '8mb',

            uptoken_url: uptokenUrl,
            uptoken,
            bos_ak: ak,
            bos_sk: sk,

            max_retries: 2,
            max_file_size: '50Gb',
            init: {
                FilesFilter: (_, files) => {  // eslint-disable-line
                    if (!multiple) {
                        // 如果是单选的情况，每次选择文件之前，清空 files
                        this.data.set('files', []);
                    }
                },
                FilesAdded: (_, files) => {   // eslint-disable-line
                    for (let i = 0; i < files.length; i++) {
                        const item = files[i];
                        const uuid = Object(__WEBPACK_IMPORTED_MODULE_3__util__["j" /* nexUuid */])();
                        item.__id = uuid;
                        // Plain Object
                        const file = {
                            uuid,
                            name: item.name,
                            size: item.size,
                            status: kStatus.PENDING,
                            progress: '0.00%',
                            time: '-'
                        };
                        this.data.push('files', file);
                    }

                    if (files.length) {
                        this.data.set('finished', false);
                    }
                },
                BeforeUpload: (_, file) => {    // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }

                    this.data.set(`files[${idx}].__startTime`, new Date().getTime());
                    this.data.set(`files[${idx}].status`, kStatus.UPLOADING);
                },
                UploadProgress: (_, file, progress, event) => {   // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }
                    this.data.set(`files[${idx}].progress`, (progress * 100).toFixed(2) + '%');
                },
                FileUploaded: (_, file, info) => {    // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }
                    const f = this.data.get(`files[${idx}]`);
                    const time = ((new Date().getTime() - f.__startTime) / 1000).toFixed(2);
                    this.data.set(`files[${idx}].time`, time);
                    this.data.set(`files[${idx}].status`, kStatus.UPLOAD_SUCCESS);
                    this.data.set(`files[${idx}].url`, info && info.body && info.body.location);
                },
                NetworkSpeed: (_, bytes, time, pendings) => {   // eslint-disable-line
                    const speed = bytes / (time / 1000);
                    let html = '上传速度：' + __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.filesize(speed) + '/s';
                    const seconds = pendings / speed;
                    if (seconds > 1) {
                        const dhms = baidubce.utils.toDHMS(Math.ceil(seconds));
                        html += '，剩余时间：' + [
                            __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.pad(dhms.HH, 2, '0'),
                            __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.pad(dhms.MM, 2, '0'),
                            __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.pad(dhms.SS, 2, '0')
                        ].join(':');
                    }
                    this.data.set('speedInfo', html);
                },
                Aborted: (_, error, file) => {    // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }
                    this.data.set(`files[${idx}].status`, kStatus.UPLOAD_ERROR);
                },
                Error: (_, error, file) => {    // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }
                    this.data.set(`files[${idx}].status`, kStatus.UPLOAD_ERROR);
                },
                UploadComplete: () => {   // eslint-disable-line
                    this.data.set('speedInfo', null);
                    this.data.set('finished', true);
                    const files = this.data.get('files');
                    this.fire('complete', {files});
                },
                Key: (_, file) => {   // eslint-disable-line
                    const keyCb = this.data.get('keyCb');
                    if (typeof keyCb === 'function') {
                        // string | Promise.<string>
                        return keyCb(file);
                    }

                    const date = new Date();
                    const year = date.getFullYear();

                    let month = date.getMonth() + 1;
                    if (month < 10) {
                        month = '0' + month;
                    }

                    let day = date.getDate();
                    if (day < 10) {
                        day = '0' + day;
                    }

                    const deferred = baidubce.sdk.Q.defer();
                    setTimeout(() => {
                        const key = year + '/' + month + '/' + day + '/' + file.name;
                        deferred.resolve(key);
                    }, 0);
                    return deferred.promise;
                }
            }
        });

        const disabled = this.data.get('disabled');
        if (disabled) {
            const browseBtn = this.uploader.options.browse_button;
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(browseBtn).attr('disabled', disabled);
        }
    },
    inited() {
        this.watch('disabled', disabled => {
            if (this.uploader) {
                const browseBtn = this.uploader.options.browse_button;
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(browseBtn).attr('disabled', disabled);
            }
        });
    },
    attached() {
        window.require(['baidubce'], baidubce => this.initializeUploader(baidubce));
    },
    startUpload() {
        if (this.uploader) {
            this.uploader.start();
        }
    }
}));




/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {


(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `humanize` variable.
  var previousHumanize = root.humanize;

  var humanize = {};

  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = humanize;
    }
    exports.humanize = humanize;
  } else {
    if (typeof define === 'function' && define.amd) {
      define('humanize', function() {
        return humanize;
      });
    }
    root.humanize = humanize;
  }

  humanize.noConflict = function() {
    root.humanize = previousHumanize;
    return this;
  };

  humanize.pad = function(str, count, padChar, type) {
    str += '';
    if (!padChar) {
      padChar = ' ';
    } else if (padChar.length > 1) {
      padChar = padChar.charAt(0);
    }
    type = (type === undefined) ? 'left' : 'right';

    if (type === 'right') {
      while (str.length < count) {
        str = str + padChar;
      }
    } else {
      // default to left
      while (str.length < count) {
        str = padChar + str;
      }
    }

    return str;
  };

  // gets current unix time
  humanize.time = function() {
    return new Date().getTime() / 1000;
  };

  /**
   * PHP-inspired date
   */

                        /*  jan  feb  mar  apr  may  jun  jul  aug  sep  oct  nov  dec */
  var dayTableCommon = [ 0,   0,  31,  59,  90, 120, 151, 181, 212, 243, 273, 304, 334 ];
  var dayTableLeap   = [ 0,   0,  31,  60,  91, 121, 152, 182, 213, 244, 274, 305, 335 ];
  // var mtable_common[13] = {  0,  31,  28,  31,  30,  31,  30,  31,  31,  30,  31,  30,  31 };
  // static int ml_table_leap[13]   = {  0,  31,  29,  31,  30,  31,  30,  31,  31,  30,  31,  30,  31 };


  humanize.date = function(format, timestamp) {
    var jsdate = ((timestamp === undefined) ? new Date() : // Not provided
                  (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                  new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
                 );

    var formatChr = /\\?([a-z])/gi;
    var formatChrCb = function (t, s) {
      return f[t] ? f[t]() : s;
    };

    var shortDayTxt = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthTxt = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var f = {
      /* Day */
      // Day of month w/leading 0; 01..31
      d: function () { return humanize.pad(f.j(), 2, '0'); },

      // Shorthand day name; Mon..Sun
      D: function () { return f.l().slice(0, 3); },

      // Day of month; 1..31
      j: function () { return jsdate.getDate(); },

      // Full day name; Monday..Sunday
      l: function () { return shortDayTxt[f.w()]; },

      // ISO-8601 day of week; 1[Mon]..7[Sun]
      N: function () { return f.w() || 7; },

      // Ordinal suffix for day of month; st, nd, rd, th
      S: function () {
        var j = f.j();
        return j > 4 && j < 21 ? 'th' : {1: 'st', 2: 'nd', 3: 'rd'}[j % 10] || 'th';
      },

      // Day of week; 0[Sun]..6[Sat]
      w: function () { return jsdate.getDay(); },

      // Day of year; 0..365
      z: function () {
        return (f.L() ? dayTableLeap[f.n()] : dayTableCommon[f.n()]) + f.j() - 1;
      },

      /* Week */
      // ISO-8601 week number
      W: function () {
        // days between midweek of this week and jan 4
        // (f.z() - f.N() + 1 + 3.5) - 3
        var midWeekDaysFromJan4 = f.z() - f.N() + 1.5;
        // 1 + number of weeks + rounded week
        return humanize.pad(1 + Math.floor(Math.abs(midWeekDaysFromJan4) / 7) + (midWeekDaysFromJan4 % 7 > 3.5 ? 1 : 0), 2, '0');
      },

      /* Month */
      // Full month name; January..December
      F: function () { return monthTxt[jsdate.getMonth()]; },

      // Month w/leading 0; 01..12
      m: function () { return humanize.pad(f.n(), 2, '0'); },

      // Shorthand month name; Jan..Dec
      M: function () { return f.F().slice(0, 3); },

      // Month; 1..12
      n: function () { return jsdate.getMonth() + 1; },

      // Days in month; 28..31
      t: function () { return (new Date(f.Y(), f.n(), 0)).getDate(); },

      /* Year */
      // Is leap year?; 0 or 1
      L: function () { return new Date(f.Y(), 1, 29).getMonth() === 1 ? 1 : 0; },

      // ISO-8601 year
      o: function () {
        var n = f.n();
        var W = f.W();
        return f.Y() + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
      },

      // Full year; e.g. 1980..2010
      Y: function () { return jsdate.getFullYear(); },

      // Last two digits of year; 00..99
      y: function () { return (String(f.Y())).slice(-2); },

      /* Time */
      // am or pm
      a: function () { return jsdate.getHours() > 11 ? 'pm' : 'am'; },

      // AM or PM
      A: function () { return f.a().toUpperCase(); },

      // Swatch Internet time; 000..999
      B: function () {
        var unixTime = jsdate.getTime() / 1000;
        var secondsPassedToday = unixTime % 86400 + 3600; // since it's based off of UTC+1
        if (secondsPassedToday < 0) { secondsPassedToday += 86400; }
        var beats = ((secondsPassedToday) / 86.4) % 1000;
        if (unixTime < 0) {
          return Math.ceil(beats);
        }
        return Math.floor(beats);
      },

      // 12-Hours; 1..12
      g: function () { return f.G() % 12 || 12; },

      // 24-Hours; 0..23
      G: function () { return jsdate.getHours(); },

      // 12-Hours w/leading 0; 01..12
      h: function () { return humanize.pad(f.g(), 2, '0'); },

      // 24-Hours w/leading 0; 00..23
      H: function () { return humanize.pad(f.G(), 2, '0'); },

      // Minutes w/leading 0; 00..59
      i: function () { return humanize.pad(jsdate.getMinutes(), 2, '0'); },

      // Seconds w/leading 0; 00..59
      s: function () { return humanize.pad(jsdate.getSeconds(), 2, '0'); },

      // Microseconds; 000000-999000
      u: function () { return humanize.pad(jsdate.getMilliseconds() * 1000, 6, '0'); },

      // Whether or not the date is in daylight savings time
      /*
      I: function () {
        // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
        // If they are not equal, then DST is observed.
        var Y = f.Y();
        return 0 + ((new Date(Y, 0) - Date.UTC(Y, 0)) !== (new Date(Y, 6) - Date.UTC(Y, 6)));
      },
      */

      // Difference to GMT in hour format; e.g. +0200
      O: function () {
        var tzo = jsdate.getTimezoneOffset();
        var tzoNum = Math.abs(tzo);
        return (tzo > 0 ? '-' : '+') + humanize.pad(Math.floor(tzoNum / 60) * 100 + tzoNum % 60, 4, '0');
      },

      // Difference to GMT w/colon; e.g. +02:00
      P: function () {
        var O = f.O();
        return (O.substr(0, 3) + ':' + O.substr(3, 2));
      },

      // Timezone offset in seconds (-43200..50400)
      Z: function () { return -jsdate.getTimezoneOffset() * 60; },

      // Full Date/Time, ISO-8601 date
      c: function () { return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb); },

      // RFC 2822
      r: function () { return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb); },

      // Seconds since UNIX epoch
      U: function () { return jsdate.getTime() / 1000 || 0; }
    };    

    return format.replace(formatChr, formatChrCb);
  };


  /**
   * format number by adding thousands separaters and significant digits while rounding
   */
  humanize.numberFormat = function(number, decimals, decPoint, thousandsSep) {
    decimals = isNaN(decimals) ? 2 : Math.abs(decimals);
    decPoint = (decPoint === undefined) ? '.' : decPoint;
    thousandsSep = (thousandsSep === undefined) ? ',' : thousandsSep;

    var sign = number < 0 ? '-' : '';
    number = Math.abs(+number || 0);

    var intPart = parseInt(number.toFixed(decimals), 10) + '';
    var j = intPart.length > 3 ? intPart.length % 3 : 0;

    return sign + (j ? intPart.substr(0, j) + thousandsSep : '') + intPart.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep) + (decimals ? decPoint + Math.abs(number - intPart).toFixed(decimals).slice(2) : '');
  };


  /**
   * For dates that are the current day or within one day, return 'today', 'tomorrow' or 'yesterday', as appropriate.
   * Otherwise, format the date using the passed in format string.
   *
   * Examples (when 'today' is 17 Feb 2007):
   * 16 Feb 2007 becomes yesterday.
   * 17 Feb 2007 becomes today.
   * 18 Feb 2007 becomes tomorrow.
   * Any other day is formatted according to given argument or the DATE_FORMAT setting if no argument is given.
   */
  humanize.naturalDay = function(timestamp, format) {
    timestamp = (timestamp === undefined) ? humanize.time() : timestamp;
    format = (format === undefined) ? 'Y-m-d' : format;

    var oneDay = 86400;
    var d = new Date();
    var today = (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime() / 1000;

    if (timestamp < today && timestamp >= today - oneDay) {
      return 'yesterday';
    } else if (timestamp >= today && timestamp < today + oneDay) {
      return 'today';
    } else if (timestamp >= today + oneDay && timestamp < today + 2 * oneDay) {
      return 'tomorrow';
    }

    return humanize.date(format, timestamp);
  };

  /**
   * returns a string representing how many seconds, minutes or hours ago it was or will be in the future
   * Will always return a relative time, most granular of seconds to least granular of years. See unit tests for more details
   */
  humanize.relativeTime = function(timestamp) {
    timestamp = (timestamp === undefined) ? humanize.time() : timestamp;

    var currTime = humanize.time();
    var timeDiff = currTime - timestamp;

    // within 2 seconds
    if (timeDiff < 2 && timeDiff > -2) {
      return (timeDiff >= 0 ? 'just ' : '') + 'now';
    }

    // within a minute
    if (timeDiff < 60 && timeDiff > -60) {
      return (timeDiff >= 0 ? Math.floor(timeDiff) + ' seconds ago' : 'in ' + Math.floor(-timeDiff) + ' seconds');
    }

    // within 2 minutes
    if (timeDiff < 120 && timeDiff > -120) {
      return (timeDiff >= 0 ? 'about a minute ago' : 'in about a minute');
    }

    // within an hour
    if (timeDiff < 3600 && timeDiff > -3600) {
      return (timeDiff >= 0 ? Math.floor(timeDiff / 60) + ' minutes ago' : 'in ' + Math.floor(-timeDiff / 60) + ' minutes');
    }

    // within 2 hours
    if (timeDiff < 7200 && timeDiff > -7200) {
      return (timeDiff >= 0 ? 'about an hour ago' : 'in about an hour');
    }

    // within 24 hours
    if (timeDiff < 86400 && timeDiff > -86400) {
      return (timeDiff >= 0 ? Math.floor(timeDiff / 3600) + ' hours ago' : 'in ' + Math.floor(-timeDiff / 3600) + ' hours');
    }

    // within 2 days
    var days2 = 2 * 86400;
    if (timeDiff < days2 && timeDiff > -days2) {
      return (timeDiff >= 0 ? '1 day ago' : 'in 1 day');
    }

    // within 29 days
    var days29 = 29 * 86400;
    if (timeDiff < days29 && timeDiff > -days29) {
      return (timeDiff >= 0 ? Math.floor(timeDiff / 86400) + ' days ago' : 'in ' + Math.floor(-timeDiff / 86400) + ' days');
    }

    // within 60 days
    var days60 = 60 * 86400;
    if (timeDiff < days60 && timeDiff > -days60) {
      return (timeDiff >= 0 ? 'about a month ago' : 'in about a month');
    }

    var currTimeYears = parseInt(humanize.date('Y', currTime), 10);
    var timestampYears = parseInt(humanize.date('Y', timestamp), 10);
    var currTimeMonths = currTimeYears * 12 + parseInt(humanize.date('n', currTime), 10);
    var timestampMonths = timestampYears * 12 + parseInt(humanize.date('n', timestamp), 10);

    // within a year
    var monthDiff = currTimeMonths - timestampMonths;
    if (monthDiff < 12 && monthDiff > -12) {
      return (monthDiff >= 0 ? monthDiff + ' months ago' : 'in ' + (-monthDiff) + ' months');
    }

    var yearDiff = currTimeYears - timestampYears;
    if (yearDiff < 2 && yearDiff > -2) {
      return (yearDiff >= 0 ? 'a year ago' : 'in a year');
    }

    return (yearDiff >= 0 ? yearDiff + ' years ago' : 'in ' + (-yearDiff) + ' years');
  };

  /**
   * Converts an integer to its ordinal as a string.
   *
   * 1 becomes 1st
   * 2 becomes 2nd
   * 3 becomes 3rd etc
   */
  humanize.ordinal = function(number) {
    number = parseInt(number, 10);
    number = isNaN(number) ? 0 : number;
    var sign = number < 0 ? '-' : '';
    number = Math.abs(number);
    var tens = number % 100;

    return sign + number + (tens > 4 && tens < 21 ? 'th' : {1: 'st', 2: 'nd', 3: 'rd'}[number % 10] || 'th');
  };

  /**
   * Formats the value like a 'human-readable' file size (i.e. '13 KB', '4.1 MB', '102 bytes', etc).
   *
   * For example:
   * If value is 123456789, the output would be 117.7 MB.
   */
  humanize.filesize = function(filesize, kilo, decimals, decPoint, thousandsSep, suffixSep) {
    kilo = (kilo === undefined) ? 1024 : kilo;
    if (filesize <= 0) { return '0 bytes'; }
    if (filesize < kilo && decimals === undefined) { decimals = 0; }
    if (suffixSep === undefined) { suffixSep = ' '; }
    return humanize.intword(filesize, ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'], kilo, decimals, decPoint, thousandsSep, suffixSep);
  };

  /**
   * Formats the value like a 'human-readable' number (i.e. '13 K', '4.1 M', '102', etc).
   *
   * For example:
   * If value is 123456789, the output would be 117.7 M.
   */
  humanize.intword = function(number, units, kilo, decimals, decPoint, thousandsSep, suffixSep) {
    var humanized, unit;

    units = units || ['', 'K', 'M', 'B', 'T'],
    unit = units.length - 1,
    kilo = kilo || 1000,
    decimals = isNaN(decimals) ? 2 : Math.abs(decimals),
    decPoint = decPoint || '.',
    thousandsSep = thousandsSep || ',',
    suffixSep = suffixSep || '';

    for (var i=0; i < units.length; i++) {
      if (number < Math.pow(kilo, i+1)) {
        unit = i;
        break;
      }
    }
    humanized = number / Math.pow(kilo, unit);

    var suffix = units[unit] ? suffixSep + units[unit] : '';
    return humanize.numberFormat(humanized, decimals, decPoint, thousandsSep) + suffix;
  };

  /**
   * Replaces line breaks in plain text with appropriate HTML
   * A single newline becomes an HTML line break (<br />) and a new line followed by a blank line becomes a paragraph break (</p>).
   * 
   * For example:
   * If value is Joel\nis a\n\nslug, the output will be <p>Joel<br />is a</p><p>slug</p>
   */
  humanize.linebreaks = function(str) {
    // remove beginning and ending newlines
    str = str.replace(/^([\n|\r]*)/, '');
    str = str.replace(/([\n|\r]*)$/, '');

    // normalize all to \n
    str = str.replace(/(\r\n|\n|\r)/g, "\n");

    // any consecutive new lines more than 2 gets turned into p tags
    str = str.replace(/(\n{2,})/g, '</p><p>');

    // any that are singletons get turned into br
    str = str.replace(/\n/g, '<br />');
    return '<p>' + str + '</p>';
  };

  /**
   * Converts all newlines in a piece of plain text to HTML line breaks (<br />).
   */
  humanize.nl2br = function(str) {
    return str.replace(/(\r\n|\n|\r)/g, '<br />');
  };

  /**
   * Truncates a string if it is longer than the specified number of characters.
   * Truncated strings will end with a translatable ellipsis sequence ('…').
   */
  humanize.truncatechars = function(string, length) {
    if (string.length <= length) { return string; }
    return string.substr(0, length) + '…';
  };

  /**
   * Truncates a string after a certain number of words.
   * Newlines within the string will be removed.
   */
  humanize.truncatewords = function(string, numWords) {
    var words = string.split(' ');
    if (words.length < numWords) { return string; }
    return words.slice(0, numWords).join(' ') + '…';
  };

}).call(this);


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-disable */
/**
 * UUID.js - RFC-compliant UUID Generator for JavaScript
 *
 * @file
 * @author  LiosK
 * @version v3.6.1
 * @license The MIT License: Copyright (c) 2010-2017 LiosK.
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

// create local namespace
function UUID() {}


// Core Component {{{

/**
 * Generates a version 4 UUID as a hexadecimal string.
 * @returns {string} Hexadecimal UUID string.
 */
UUID.generate = function() {
  var rand = UUID._getRandomInt, hex = UUID._hexAligner;
  return  hex(rand(32), 8)          // time_low
        + "-"
        + hex(rand(16), 4)          // time_mid
        + "-"
        + hex(0x4000 | rand(12), 4) // time_hi_and_version
        + "-"
        + hex(0x8000 | rand(14), 4) // clock_seq_hi_and_reserved clock_seq_low
        + "-"
        + hex(rand(48), 12);        // node
};

/**
 * Returns an unsigned x-bit random integer.
 * @private
 * @param {number} x Unsigned integer ranging from 0 to 53, inclusive.
 * @returns {number} Unsigned x-bit random integer (0 <= f(x) < 2^x).
 */
UUID._getRandomInt = function(x) {
  if (x < 0 || x > 53) { return NaN; }
  var n = 0 | Math.random() * 0x40000000; // 1 << 30
  return x > 30 ? n + (0 | Math.random() * (1 << x - 30)) * 0x40000000 : n >>> 30 - x;
};

/**
 * Converts an integer to a zero-filled hexadecimal string.
 * @private
 * @param {number} num
 * @param {number} length
 * @returns {string}
 */
UUID._hexAligner = function(num, length) {
  var str = num.toString(16), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

// }}}

// UUID Object Component {{{

/**
 * Names of UUID internal fields.
 * @type {string[]}
 * @constant
 * @since 3.0
 */
UUID.FIELD_NAMES = ["timeLow", "timeMid", "timeHiAndVersion",
                    "clockSeqHiAndReserved", "clockSeqLow", "node"];

/**
 * Sizes of UUID internal fields.
 * @type {number[]}
 * @constant
 * @since 3.0
 */
UUID.FIELD_SIZES = [32, 16, 16, 8, 8, 48];

/**
 * Creates a version 4 {@link UUID} object.
 * @returns {UUID} Version 4 {@link UUID} object.
 * @since 3.0
 */
UUID.genV4 = function() {
  var rand = UUID._getRandomInt;
  return new UUID()._init(rand(32), rand(16), // time_low time_mid
                          0x4000 | rand(12),  // time_hi_and_version
                          0x80   | rand(6),   // clock_seq_hi_and_reserved
                          rand(8), rand(48)); // clock_seq_low node
};

/**
 * Converts a hexadecimal UUID string to a {@link UUID} object.
 * @param {string} strId Hexadecimal UUID string ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
 * @returns {UUID} {@link UUID} object or null.
 * @since 3.0
 */
UUID.parse = function(strId) {
  var r, p = /^\s*(urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(\})?\s*$/i;
  if (r = p.exec(strId)) {
    var l = r[1] || "", t = r[8] || "";
    if (((l + t) === "") ||
        (l === "{" && t === "}") ||
        (l.toLowerCase() === "urn:uuid:" && t === "")) {
      return new UUID()._init(parseInt(r[2], 16), parseInt(r[3], 16),
                              parseInt(r[4], 16), parseInt(r[5], 16),
                              parseInt(r[6], 16), parseInt(r[7], 16));
    }
  }
  return null;
};

/**
 * Initializes a {@link UUID} object.
 * @private
 * @constructs UUID
 * @param {number} [timeLow=0] time_low field (octet 0-3, uint32).
 * @param {number} [timeMid=0] time_mid field (octet 4-5, uint16).
 * @param {number} [timeHiAndVersion=0] time_hi_and_version field (octet 6-7, uint16).
 * @param {number} [clockSeqHiAndReserved=0] clock_seq_hi_and_reserved field (octet 8, uint8).
 * @param {number} [clockSeqLow=0] clock_seq_low field (octet 9, uint8).
 * @param {number} [node=0] node field (octet 10-15, uint48).
 * @returns {UUID} this.
 */
UUID.prototype._init = function() {
  var names = UUID.FIELD_NAMES, sizes = UUID.FIELD_SIZES;
  var bin = UUID._binAligner, hex = UUID._hexAligner;

  /**
   * UUID internal field values as an array of integers.
   * @type {number[]}
   */
  this.intFields = new Array(6);

  /**
   * UUID internal field values as an array of binary strings.
   * @type {string[]}
   */
  this.bitFields = new Array(6);

  /**
   * UUID internal field values as an array of hexadecimal strings.
   * @type {string[]}
   */
  this.hexFields = new Array(6);

  for (var i = 0; i < 6; i++) {
    var intValue = parseInt(arguments[i] || 0);
    this.intFields[i] = this.intFields[names[i]] = intValue;
    this.bitFields[i] = this.bitFields[names[i]] = bin(intValue, sizes[i]);
    this.hexFields[i] = this.hexFields[names[i]] = hex(intValue, sizes[i] >>> 2);
  }

  /**
   * UUID version number.
   * @type {number}
   */
  this.version = (this.intFields.timeHiAndVersion >>> 12) & 0xF;

  /**
   * 128-bit binary string representation.
   * @type {string}
   */
  this.bitString = this.bitFields.join("");

  /**
   * Non-delimited hexadecimal string representation ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx").
   * @type {string}
   * @since v3.3.0
   */
  this.hexNoDelim = this.hexFields.join("");

  /**
   * Hexadecimal string representation ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
   * @type {string}
   */
  this.hexString = this.hexFields[0] + "-" + this.hexFields[1] + "-" + this.hexFields[2]
                 + "-" + this.hexFields[3] + this.hexFields[4] + "-" + this.hexFields[5];

  /**
   * URN string representation ("urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
   * @type {string}
   */
  this.urn = "urn:uuid:" + this.hexString;

  return this;
};

/**
 * Converts an integer to a zero-filled binary string.
 * @private
 * @param {number} num
 * @param {number} length
 * @returns {string}
 */
UUID._binAligner = function(num, length) {
  var str = num.toString(2), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

/**
 * Returns the hexadecimal string representation.
 * @returns {string} {@link UUID#hexString}.
 */
UUID.prototype.toString = function() { return this.hexString; };

/**
 * Tests if two {@link UUID} objects are equal.
 * @param {UUID} uuid
 * @returns {boolean} True if two {@link UUID} objects are equal.
 */
UUID.prototype.equals = function(uuid) {
  if (!(uuid instanceof UUID)) { return false; }
  for (var i = 0; i < 6; i++) {
    if (this.intFields[i] !== uuid.intFields[i]) { return false; }
  }
  return true;
};

/**
 * Nil UUID object.
 * @type {UUID}
 * @constant
 * @since v3.4.0
 */
UUID.NIL = new UUID()._init(0, 0, 0, 0, 0, 0);

// }}}

// UUID Version 1 Component {{{

/**
 * Creates a version 1 {@link UUID} object.
 * @returns {UUID} Version 1 {@link UUID} object.
 * @since 3.0
 */
UUID.genV1 = function() {
  if (UUID._state == null) { UUID.resetState(); }
  var now = new Date().getTime(), st = UUID._state;
  if (now != st.timestamp) {
    if (now < st.timestamp) { st.sequence++; }
    st.timestamp = now;
    st.tick = UUID._getRandomInt(4);
  } else if (Math.random() < UUID._tsRatio && st.tick < 9984) {
    // advance the timestamp fraction at a probability
    // to compensate for the low timestamp resolution
    st.tick += 1 + UUID._getRandomInt(4);
  } else {
    st.sequence++;
  }

  // format time fields
  var tf = UUID._getTimeFieldValues(st.timestamp);
  var tl = tf.low + st.tick;
  var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'

  // format clock sequence
  st.sequence &= 0x3FFF;
  var cshar = (st.sequence >>> 8) | 0x80; // set variant '10'
  var csl = st.sequence & 0xFF;

  return new UUID()._init(tl, tf.mid, thav, cshar, csl, st.node);
};

/**
 * Re-initializes the internal state for version 1 UUID creation.
 * @since 3.0
 */
UUID.resetState = function() {
  UUID._state = new UUIDState();
};

function UUIDState() {
  var rand = UUID._getRandomInt;
  this.timestamp = 0;
  this.sequence = rand(14);
  this.node = (rand(8) | 1) * 0x10000000000 + rand(40); // set multicast bit '1'
  this.tick = rand(4);  // timestamp fraction smaller than a millisecond
}

/**
 * Probability to advance the timestamp fraction: the ratio of tick movements to sequence increments.
 * @private
 * @type {number}
 */
UUID._tsRatio = 1 / 4;

/**
 * Persistent internal state for version 1 UUID creation.
 * @private
 * @type {UUIDState}
 */
UUID._state = null;

/**
 * @private
 * @param {Date|number} time ECMAScript Date Object or milliseconds from 1970-01-01.
 * @returns {any}
 */
UUID._getTimeFieldValues = function(time) {
  var ts = time - Date.UTC(1582, 9, 15);
  var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
  return  { low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
            mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts };
};

// }}}

// Backward Compatibility Component {{{

/**
 * Reinstalls {@link UUID.generate} method to emulate the interface of UUID.js version 2.x.
 * @since 3.1
 * @deprecated Version 2.x compatible interface is not recommended.
 */
UUID.makeBackwardCompatible = function() {
  var f = UUID.generate;
  UUID.generate = function(o) {
    return (o && o.version == 1) ? UUID.genV1().hexString : f.call(UUID);
  };
  UUID.makeBackwardCompatible = function() {};
};

// }}}

return UUID;

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


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

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asInput__ = __webpack_require__(3);
/**
 * @file RadioSelect.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-radioselect');
const cx2 = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-radio');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ul>
        <li on-click="onItemClick(item)"
            class="{{item | itemClass(value)}}"
            s-for="item in datasource">
          <div class="${cx2('item-hover')}" s-if="item.tip">{{item.tip}}<br/></div>
          <div class="arrow-down" s-if="item.tip"><i></i></div>
          {{item.text}}
        </li>
    </ul>
</div>`;
/* eslint-enable */

const RadioSelect = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    filters: {
        itemClass(item, value) {
            const klass = [cx2('block')];

            if (item.disabled) {
                klass.push(cx2('disabled'));
            }

            if (item.value === value) {
                klass.push(cx2('selected'));
            }

            return klass;
        }
    },
    initData() {
        return {
            value: null,
            datasource: []
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 组件当前的值
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].any,

        /**
         * 组件的数据源
         * <pre><code>{
         *   text: string,
         *   value: any,
         *   tip?: string
         * }</code></pre>
         */
        datasource: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].array
    },
    onItemClick(item) {
        const disabled = this.data.get('disabled');
        if (item.disabled || disabled) {
            return;
        }
        this.data.set('value', item.value);
        this.fire('change', item);
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__asInput__["a" /* asInput */])(RadioSelect));


/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loading__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asInput__ = __webpack_require__(3);
/**
 * @file components/ACEEditor.es6
 * @author leeight
 */

/* global ace */







const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-aceeditor');
const kUrl = 'inf-ria/js!https://cdn.bdstatic.com/ace-builds/src-min-noconflict/ace.js';

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <ui-loading s-if="loading" />
    <div s-else s-ref="ghost" style="{{mainStyle}}"></div>
</div>`;
/* eslint-enable */

const ACEEditor = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-loading': __WEBPACK_IMPORTED_MODULE_2__Loading__["a" /* default */]
    },
    initData() {
        return {
            loading: true,
            theme: null,
            mode: null,
            readonly: false,
            width: '100%',
            height: 300,
            value: null
        };
    },
    dataTypes: {
        /**
         * 设置或者获取编辑器的值
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 编辑器的风格
         */
        theme: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 编辑器支持的语言
         */
        mode: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 是否是只读模式
         * @default false
         */
        readonly: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 宽度
         * @default 100%
         */
        width: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 高度
         * @default 300
         */
        height: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number
    },
    computed: {
        mainStyle() {
            const loading = this.data.get('loading');
            const style = cx.mainStyle(this);
            style.display = loading ? 'none' : 'block';
            return style;
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    inited() {
        this.watch('value', value => {
            if (this.editor) {
                const currentValue = this.editor.getValue();
                if (currentValue !== value) {
                    this.editor.setValue(value, 1);
                }
            }
        });
    },
    attached() {
        window.require([kUrl], () => {
            this.data.set('loading', false);
            this.nextTick(() => {
                const ghost = this.ref('ghost');
                if (!ghost) {
                    this.data.set('error', new Error('ACEEditor初始化失败.'));
                    return;
                }

                const editor = this.editor = ace.edit(ghost);
                editor.on('change', e => {
                    this.data.set('value', editor.getValue());
                    this.fire('input');
                });
                const {theme, mode, readonly, value} = this.data.get();
                if (theme != null) {
                    editor.setTheme(theme);
                }
                if (mode != null) {
                    editor.getSession().setMode(mode);
                }
                if (readonly != null) {
                    editor.setReadOnly(readonly);
                }
                if (value != null) {
                    editor.setValue(value, 1);
                }
            });
        });
    },
    disposed() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__asInput__["a" /* asInput */])(ACEEditor));


/***/ }),

/***/ 45:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_45__;

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_BosUploader__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_asInput__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_demos_uuid__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_demos_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_inf_ui_x_demos_uuid__);
/**
 * @file inf-ui/x/forms/Uploader.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
    <xui-bosuploader
        auto-start
        files="{{files}}"
        with-speed-info="{{false}}"
        key-cb="{{keyCb}}"
        bos-endpoint="https://bce-bos-uploader.bj.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization"
        on-complete="onComplete"
    >
        <div slot="preview">
            <div s-for="f in files">
                <a s-if="f.url" href="{{f.url}}" target="_blank">{{f.name}}</a>
                <span s-else>{{f.name}} ({{f.progress}})</span>
            </div>
        </div>
    </xui-bosuploader>
</template>`;
/* eslint-enable */

const Uploader = Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({ // eslint-disable-line
    template,
    components: {
        'xui-bosuploader': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_BosUploader__["a" /* default */]
    },
    dataTypes: {
        /**
         * 获取或者设置当前上传组件的文件地址
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].string,

        /**
         * 需要上传的文件列表<br>
         * 上传成功之后，可以通过访问数组中元素的 url 属性获取文件地址
         */
        files: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].array,

        /**
         * 计算文件的地址，默认的文件路径是如下的格式"YYYY/MM/dd/[uuid]/[name].[ext]"
         * <pre><code>function(file:File): string</code></pre>
         */
        keyCb: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].func
    },
    initData() {
        return {
            value: null,
            files: [],
            keyCb(file) {
                const date = new Date();
                const year = date.getFullYear();

                let month = date.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }

                let day = date.getDate();
                if (day < 10) {
                    day = '0' + day;
                }

                const uuid = __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_demos_uuid___default.a.generate();
                const key = year + '/' + month + '/' + day + '/' + uuid + '/' + file.name;
                return key;
            }
        };
    },
    inited() {
        const value = this.data.get('value');
        if (value) {
            const lastSlashIndex = value.lastIndexOf('/');
            let name = value.substr(lastSlashIndex + 1);
            try {
                name = decodeURIComponent(name);
            }
            catch (ex) {
            }
            this.data.set('files', [{name, url: value}]);
        }
    },
    onComplete({files}) {
        if (files && files.length) {
            const value = files[0].url;
            this.data.set('value', value);
            this.fire('change', {value});
        }
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_asInput__["a" /* asInput */])(Uploader));


/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_big_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_big_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_big_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextBox__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__asInput__ = __webpack_require__(3);
/**
 * @file components/NumberTextline.es6
 * @author leeight
 */









const cx = Object(__WEBPACK_IMPORTED_MODULE_4__util__["f" /* create */])('ui-numbertextline');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-button icon="minus" on-click="onDecrease" skin="primary" disabled="{{decreaseDisabled}}" />
    <ui-textbox type="number" value="{=value=}" min="{{min}}" max="{{max}}" step="{{step}}" disabled="{{disabled}}" width="{{width}}"/>
    <ui-button icon="plus" on-click="onIncrease" skin="primary" disabled="{{increaseDisabled}}" />
</div>`;
/* eslint-enable */

function isValid(value) {
    return /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i.test(value);
}

const NumberTextline = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'ui-button': __WEBPACK_IMPORTED_MODULE_2__Button__["a" /* default */],
        'ui-textbox': __WEBPACK_IMPORTED_MODULE_3__TextBox__["a" /* default */]
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        decreaseDisabled() {
            const disabled = this.data.get('disabled');
            if (disabled) {
                return true;
            }

            const min = this.data.get('min');
            const value = this.data.get('value');
            return !(isValid(value) && +value > min);
        },
        increaseDisabled() {
            const disabled = this.data.get('disabled');
            if (disabled) {
                return true;
            }

            const max = this.data.get('max');
            const value = this.data.get('value');
            return !(isValid(value) && +value < max);
        }
    },
    initData() {
        return {
            disabled: false,
            width: 38,
            min: 0,
            max: 100,
            step: 1 // 默认step是1,支持小数
        };
    },
    dataTypes: {
        /**
         * 控件的禁用状态
         *
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 控件的宽度
         *
         * @default 38
         */
        width: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 获取或者设置控件的内容
         *
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 最小值
         *
         * @default 0
         */
        min: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 最大值
         *
         * @default 100
         */
        max: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 步进值，支持小数，例如 0.1
         *
         * @default 1
         */
        step: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number
    },
    inited() {
        // 如果value没有填默认值，则与min一致
        const {value, min} = this.data.get();
        if (value == null) {
            this.data.set('value', String(min));
        }
        this.watch('value', value => this.fire('input', {value}));
    },
    onDecrease() {
        const {value, min, max, step} = this.data.get();
        const newValue = Math.min(max, Math.max(min, new __WEBPACK_IMPORTED_MODULE_0_big_js___default.a(value).minus(step)));
        this.data.set('value', String(newValue));
    },
    onIncrease() {
        const {value, min, max, step} = this.data.get();
        const newValue = Math.max(min, Math.min(max, new __WEBPACK_IMPORTED_MODULE_0_big_js___default.a(value).add(step)));
        this.data.set('value', String(newValue));
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_5__asInput__["a" /* asInput */])(NumberTextline));


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* big.js v3.1.3 https://github.com/MikeMcl/big.js/LICENCE */
;(function (global) {
    'use strict';

/*
  big.js v3.1.3
  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
  https://github.com/MikeMcl/big.js/
  Copyright (c) 2014 Michael Mclaughlin <M8ch88l@gmail.com>
  MIT Expat Licence
*/

/***************************** EDITABLE DEFAULTS ******************************/

    // The default values below must be integers within the stated ranges.

    /*
     * The maximum number of decimal places of the results of operations
     * involving division: div and sqrt, and pow with negative exponents.
     */
    var DP = 20,                           // 0 to MAX_DP

        /*
         * The rounding mode used when rounding to the above decimal places.
         *
         * 0 Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
         * 1 To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
         * 2 To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
         * 3 Away from zero.                                  (ROUND_UP)
         */
        RM = 1,                            // 0, 1, 2 or 3

        // The maximum value of DP and Big.DP.
        MAX_DP = 1E6,                      // 0 to 1000000

        // The maximum magnitude of the exponent argument to the pow method.
        MAX_POWER = 1E6,                   // 1 to 1000000

        /*
         * The exponent value at and beneath which toString returns exponential
         * notation.
         * JavaScript's Number type: -7
         * -1000000 is the minimum recommended exponent value of a Big.
         */
        E_NEG = -7,                   // 0 to -1000000

        /*
         * The exponent value at and above which toString returns exponential
         * notation.
         * JavaScript's Number type: 21
         * 1000000 is the maximum recommended exponent value of a Big.
         * (This limit is not enforced or checked.)
         */
        E_POS = 21,                   // 0 to 1000000

/******************************************************************************/

        // The shared prototype object.
        P = {},
        isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        Big;


    /*
     * Create and return a Big constructor.
     *
     */
    function bigFactory() {

        /*
         * The Big constructor and exported function.
         * Create and return a new instance of a Big number object.
         *
         * n {number|string|Big} A numeric value.
         */
        function Big(n) {
            var x = this;

            // Enable constructor usage without new.
            if (!(x instanceof Big)) {
                return n === void 0 ? bigFactory() : new Big(n);
            }

            // Duplicate.
            if (n instanceof Big) {
                x.s = n.s;
                x.e = n.e;
                x.c = n.c.slice();
            } else {
                parse(x, n);
            }

            /*
             * Retain a reference to this Big constructor, and shadow
             * Big.prototype.constructor which points to Object.
             */
            x.constructor = Big;
        }

        Big.prototype = P;
        Big.DP = DP;
        Big.RM = RM;
        Big.E_NEG = E_NEG;
        Big.E_POS = E_POS;

        return Big;
    }


    // Private functions


    /*
     * Return a string representing the value of Big x in normal or exponential
     * notation to dp fixed decimal places or significant digits.
     *
     * x {Big} The Big to format.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * toE {number} 1 (toExponential), 2 (toPrecision) or undefined (toFixed).
     */
    function format(x, dp, toE) {
        var Big = x.constructor,

            // The index (normal notation) of the digit that may be rounded up.
            i = dp - (x = new Big(x)).e,
            c = x.c;

        // Round?
        if (c.length > ++dp) {
            rnd(x, i, Big.RM);
        }

        if (!c[0]) {
            ++i;
        } else if (toE) {
            i = dp;

        // toFixed
        } else {
            c = x.c;

            // Recalculate i as x.e may have changed if value rounded up.
            i = x.e + i + 1;
        }

        // Append zeros?
        for (; c.length < i; c.push(0)) {
        }
        i = x.e;

        /*
         * toPrecision returns exponential notation if the number of
         * significant digits specified is less than the number of digits
         * necessary to represent the integer part of the value in normal
         * notation.
         */
        return toE === 1 || toE && (dp <= i || i <= Big.E_NEG) ?

          // Exponential notation.
          (x.s < 0 && c[0] ? '-' : '') +
            (c.length > 1 ? c[0] + '.' + c.join('').slice(1) : c[0]) +
              (i < 0 ? 'e' : 'e+') + i

          // Normal notation.
          : x.toString();
    }


    /*
     * Parse the number or string value passed to a Big constructor.
     *
     * x {Big} A Big number instance.
     * n {number|string} A numeric value.
     */
    function parse(x, n) {
        var e, i, nL;

        // Minus zero?
        if (n === 0 && 1 / n < 0) {
            n = '-0';

        // Ensure n is string and check validity.
        } else if (!isValid.test(n += '')) {
            throwErr(NaN);
        }

        // Determine sign.
        x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

        // Decimal point?
        if ((e = n.indexOf('.')) > -1) {
            n = n.replace('.', '');
        }

        // Exponential form?
        if ((i = n.search(/e/i)) > 0) {

            // Determine exponent.
            if (e < 0) {
                e = i;
            }
            e += +n.slice(i + 1);
            n = n.substring(0, i);

        } else if (e < 0) {

            // Integer.
            e = n.length;
        }

        nL = n.length;

        // Determine leading zeros.
        for (i = 0; i < nL && n.charAt(i) == '0'; i++) {
        }

        if (i == nL) {

            // Zero.
            x.c = [ x.e = 0 ];
        } else {

            // Determine trailing zeros.
            for (; nL > 0 && n.charAt(--nL) == '0';) {
            }

            x.e = e - i - 1;
            x.c = [];

            // Convert string to array of digits without leading/trailing zeros.
            //for (e = 0; i <= nL; x.c[e++] = +n.charAt(i++)) {
            for (; i <= nL; x.c.push(+n.charAt(i++))) {
            }
        }

        return x;
    }


    /*
     * Round Big x to a maximum of dp decimal places using rounding mode rm.
     * Called by div, sqrt and round.
     *
     * x {Big} The Big to round.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * rm {number} 0, 1, 2 or 3 (DOWN, HALF_UP, HALF_EVEN, UP)
     * [more] {boolean} Whether the result of division was truncated.
     */
    function rnd(x, dp, rm, more) {
        var u,
            xc = x.c,
            i = x.e + dp + 1;

        if (rm === 1) {

            // xc[i] is the digit after the digit that may be rounded up.
            more = xc[i] >= 5;
        } else if (rm === 2) {
            more = xc[i] > 5 || xc[i] == 5 &&
              (more || i < 0 || xc[i + 1] !== u || xc[i - 1] & 1);
        } else if (rm === 3) {
            more = more || xc[i] !== u || i < 0;
        } else {
            more = false;

            if (rm !== 0) {
                throwErr('!Big.RM!');
            }
        }

        if (i < 1 || !xc[0]) {

            if (more) {

                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                x.e = -dp;
                x.c = [1];
            } else {

                // Zero.
                x.c = [x.e = 0];
            }
        } else {

            // Remove any digits after the required decimal places.
            xc.length = i--;

            // Round up?
            if (more) {

                // Rounding up may mean the previous digit has to be rounded up.
                for (; ++xc[i] > 9;) {
                    xc[i] = 0;

                    if (!i--) {
                        ++x.e;
                        xc.unshift(1);
                    }
                }
            }

            // Remove trailing zeros.
            for (i = xc.length; !xc[--i]; xc.pop()) {
            }
        }

        return x;
    }


    /*
     * Throw a BigError.
     *
     * message {string} The error message.
     */
    function throwErr(message) {
        var err = new Error(message);
        err.name = 'BigError';

        throw err;
    }


    // Prototype/instance methods


    /*
     * Return a new Big whose value is the absolute value of this Big.
     */
    P.abs = function () {
        var x = new this.constructor(this);
        x.s = 1;

        return x;
    };


    /*
     * Return
     * 1 if the value of this Big is greater than the value of Big y,
     * -1 if the value of this Big is less than the value of Big y, or
     * 0 if they have the same value.
    */
    P.cmp = function (y) {
        var xNeg,
            x = this,
            xc = x.c,
            yc = (y = new x.constructor(y)).c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either zero?
        if (!xc[0] || !yc[0]) {
            return !xc[0] ? !yc[0] ? 0 : -j : i;
        }

        // Signs differ?
        if (i != j) {
            return i;
        }
        xNeg = i < 0;

        // Compare exponents.
        if (k != l) {
            return k > l ^ xNeg ? 1 : -1;
        }

        i = -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;

        // Compare digit by digit.
        for (; ++i < j;) {

            if (xc[i] != yc[i]) {
                return xc[i] > yc[i] ^ xNeg ? 1 : -1;
            }
        }

        // Compare lengths.
        return k == l ? 0 : k > l ^ xNeg ? 1 : -1;
    };


    /*
     * Return a new Big whose value is the value of this Big divided by the
     * value of Big y, rounded, if necessary, to a maximum of Big.DP decimal
     * places using rounding mode Big.RM.
     */
    P.div = function (y) {
        var x = this,
            Big = x.constructor,
            // dividend
            dvd = x.c,
            //divisor
            dvs = (y = new Big(y)).c,
            s = x.s == y.s ? 1 : -1,
            dp = Big.DP;

        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!Big.DP!');
        }

        // Either 0?
        if (!dvd[0] || !dvs[0]) {

            // If both are 0, throw NaN
            if (dvd[0] == dvs[0]) {
                throwErr(NaN);
            }

            // If dvs is 0, throw +-Infinity.
            if (!dvs[0]) {
                throwErr(s / 0);
            }

            // dvd is 0, return +-0.
            return new Big(s * 0);
        }

        var dvsL, dvsT, next, cmp, remI, u,
            dvsZ = dvs.slice(),
            dvdI = dvsL = dvs.length,
            dvdL = dvd.length,
            // remainder
            rem = dvd.slice(0, dvsL),
            remL = rem.length,
            // quotient
            q = y,
            qc = q.c = [],
            qi = 0,
            digits = dp + (q.e = x.e - y.e) + 1;

        q.s = s;
        s = digits < 0 ? 0 : digits;

        // Create version of divisor with leading zero.
        dvsZ.unshift(0);

        // Add zeros to make remainder as long as divisor.
        for (; remL++ < dvsL; rem.push(0)) {
        }

        do {

            // 'next' is how many times the divisor goes into current remainder.
            for (next = 0; next < 10; next++) {

                // Compare divisor and remainder.
                if (dvsL != (remL = rem.length)) {
                    cmp = dvsL > remL ? 1 : -1;
                } else {

                    for (remI = -1, cmp = 0; ++remI < dvsL;) {

                        if (dvs[remI] != rem[remI]) {
                            cmp = dvs[remI] > rem[remI] ? 1 : -1;
                            break;
                        }
                    }
                }

                // If divisor < remainder, subtract divisor from remainder.
                if (cmp < 0) {

                    // Remainder can't be more than 1 digit longer than divisor.
                    // Equalise lengths using divisor with extra leading zero?
                    for (dvsT = remL == dvsL ? dvs : dvsZ; remL;) {

                        if (rem[--remL] < dvsT[remL]) {
                            remI = remL;

                            for (; remI && !rem[--remI]; rem[remI] = 9) {
                            }
                            --rem[remI];
                            rem[remL] += 10;
                        }
                        rem[remL] -= dvsT[remL];
                    }
                    for (; !rem[0]; rem.shift()) {
                    }
                } else {
                    break;
                }
            }

            // Add the 'next' digit to the result array.
            qc[qi++] = cmp ? next : ++next;

            // Update the remainder.
            if (rem[0] && cmp) {
                rem[remL] = dvd[dvdI] || 0;
            } else {
                rem = [ dvd[dvdI] ];
            }

        } while ((dvdI++ < dvdL || rem[0] !== u) && s--);

        // Leading zero? Do not remove if result is simply zero (qi == 1).
        if (!qc[0] && qi != 1) {

            // There can't be more than one zero.
            qc.shift();
            q.e--;
        }

        // Round?
        if (qi > digits) {
            rnd(q, dp, Big.RM, rem[0] !== u);
        }

        return q;
    };


    /*
     * Return true if the value of this Big is equal to the value of Big y,
     * otherwise returns false.
     */
    P.eq = function (y) {
        return !this.cmp(y);
    };


    /*
     * Return true if the value of this Big is greater than the value of Big y,
     * otherwise returns false.
     */
    P.gt = function (y) {
        return this.cmp(y) > 0;
    };


    /*
     * Return true if the value of this Big is greater than or equal to the
     * value of Big y, otherwise returns false.
     */
    P.gte = function (y) {
        return this.cmp(y) > -1;
    };


    /*
     * Return true if the value of this Big is less than the value of Big y,
     * otherwise returns false.
     */
    P.lt = function (y) {
        return this.cmp(y) < 0;
    };


    /*
     * Return true if the value of this Big is less than or equal to the value
     * of Big y, otherwise returns false.
     */
    P.lte = function (y) {
         return this.cmp(y) < 1;
    };


    /*
     * Return a new Big whose value is the value of this Big minus the value
     * of Big y.
     */
    P.sub = P.minus = function (y) {
        var i, j, t, xLTy,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        // Signs differ?
        if (a != b) {
            y.s = -b;
            return x.plus(y);
        }

        var xc = x.c.slice(),
            xe = x.e,
            yc = y.c,
            ye = y.e;

        // Either zero?
        if (!xc[0] || !yc[0]) {

            // y is non-zero? x is non-zero? Or both are zero.
            return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
        }

        // Determine which is the bigger number.
        // Prepend zeros to equalise exponents.
        if (a = xe - ye) {

            if (xLTy = a < 0) {
                a = -a;
                t = xc;
            } else {
                ye = xe;
                t = yc;
            }

            t.reverse();
            for (b = a; b--; t.push(0)) {
            }
            t.reverse();
        } else {

            // Exponents equal. Check digit by digit.
            j = ((xLTy = xc.length < yc.length) ? xc : yc).length;

            for (a = b = 0; b < j; b++) {

                if (xc[b] != yc[b]) {
                    xLTy = xc[b] < yc[b];
                    break;
                }
            }
        }

        // x < y? Point xc to the array of the bigger number.
        if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
        }

        /*
         * Append zeros to xc if shorter. No need to add zeros to yc if shorter
         * as subtraction only needs to start at yc.length.
         */
        if (( b = (j = yc.length) - (i = xc.length) ) > 0) {

            for (; b--; xc[i++] = 0) {
            }
        }

        // Subtract yc from xc.
        for (b = i; j > a;){

            if (xc[--j] < yc[j]) {

                for (i = j; i && !xc[--i]; xc[i] = 9) {
                }
                --xc[i];
                xc[j] += 10;
            }
            xc[j] -= yc[j];
        }

        // Remove trailing zeros.
        for (; xc[--b] === 0; xc.pop()) {
        }

        // Remove leading zeros and adjust exponent accordingly.
        for (; xc[0] === 0;) {
            xc.shift();
            --ye;
        }

        if (!xc[0]) {

            // n - n = +0
            y.s = 1;

            // Result must be zero.
            xc = [ye = 0];
        }

        y.c = xc;
        y.e = ye;

        return y;
    };


    /*
     * Return a new Big whose value is the value of this Big modulo the
     * value of Big y.
     */
    P.mod = function (y) {
        var yGTx,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        if (!y.c[0]) {
            throwErr(NaN);
        }

        x.s = y.s = 1;
        yGTx = y.cmp(x) == 1;
        x.s = a;
        y.s = b;

        if (yGTx) {
            return new Big(x);
        }

        a = Big.DP;
        b = Big.RM;
        Big.DP = Big.RM = 0;
        x = x.div(y);
        Big.DP = a;
        Big.RM = b;

        return this.minus( x.times(y) );
    };


    /*
     * Return a new Big whose value is the value of this Big plus the value
     * of Big y.
     */
    P.add = P.plus = function (y) {
        var t,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        // Signs differ?
        if (a != b) {
            y.s = -b;
            return x.minus(y);
        }

        var xe = x.e,
            xc = x.c,
            ye = y.e,
            yc = y.c;

        // Either zero?
        if (!xc[0] || !yc[0]) {

            // y is non-zero? x is non-zero? Or both are zero.
            return yc[0] ? y : new Big(xc[0] ? x : a * 0);
        }
        xc = xc.slice();

        // Prepend zeros to equalise exponents.
        // Note: Faster to use reverse then do unshifts.
        if (a = xe - ye) {

            if (a > 0) {
                ye = xe;
                t = yc;
            } else {
                a = -a;
                t = xc;
            }

            t.reverse();
            for (; a--; t.push(0)) {
            }
            t.reverse();
        }

        // Point xc to the longer array.
        if (xc.length - yc.length < 0) {
            t = yc;
            yc = xc;
            xc = t;
        }
        a = yc.length;

        /*
         * Only start adding at yc.length - 1 as the further digits of xc can be
         * left as they are.
         */
        for (b = 0; a;) {
            b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;
            xc[a] %= 10;
        }

        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

        if (b) {
            xc.unshift(b);
            ++ye;
        }

         // Remove trailing zeros.
        for (a = xc.length; xc[--a] === 0; xc.pop()) {
        }

        y.c = xc;
        y.e = ye;

        return y;
    };


    /*
     * Return a Big whose value is the value of this Big raised to the power n.
     * If n is negative, round, if necessary, to a maximum of Big.DP decimal
     * places using rounding mode Big.RM.
     *
     * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
     */
    P.pow = function (n) {
        var x = this,
            one = new x.constructor(1),
            y = one,
            isNeg = n < 0;

        if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
            throwErr('!pow!');
        }

        n = isNeg ? -n : n;

        for (;;) {

            if (n & 1) {
                y = y.times(x);
            }
            n >>= 1;

            if (!n) {
                break;
            }
            x = x.times(x);
        }

        return isNeg ? one.div(y) : y;
    };


    /*
     * Return a new Big whose value is the value of this Big rounded to a
     * maximum of dp decimal places using rounding mode rm.
     * If dp is not specified, round to 0 decimal places.
     * If rm is not specified, use Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     * [rm] 0, 1, 2 or 3 (ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP)
     */
    P.round = function (dp, rm) {
        var x = this,
            Big = x.constructor;

        if (dp == null) {
            dp = 0;
        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!round!');
        }
        rnd(x = new Big(x), dp, rm == null ? Big.RM : rm);

        return x;
    };


    /*
     * Return a new Big whose value is the square root of the value of this Big,
     * rounded, if necessary, to a maximum of Big.DP decimal places using
     * rounding mode Big.RM.
     */
    P.sqrt = function () {
        var estimate, r, approx,
            x = this,
            Big = x.constructor,
            xc = x.c,
            i = x.s,
            e = x.e,
            half = new Big('0.5');

        // Zero?
        if (!xc[0]) {
            return new Big(x);
        }

        // If negative, throw NaN.
        if (i < 0) {
            throwErr(NaN);
        }

        // Estimate.
        i = Math.sqrt(x.toString());

        // Math.sqrt underflow/overflow?
        // Pass x to Math.sqrt as integer, then adjust the result exponent.
        if (i === 0 || i === 1 / 0) {
            estimate = xc.join('');

            if (!(estimate.length + e & 1)) {
                estimate += '0';
            }

            r = new Big( Math.sqrt(estimate).toString() );
            r.e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
        } else {
            r = new Big(i.toString());
        }

        i = r.e + (Big.DP += 4);

        // Newton-Raphson iteration.
        do {
            approx = r;
            r = half.times( approx.plus( x.div(approx) ) );
        } while ( approx.c.slice(0, i).join('') !==
                       r.c.slice(0, i).join('') );

        rnd(r, Big.DP -= 4, Big.RM);

        return r;
    };


    /*
     * Return a new Big whose value is the value of this Big times the value of
     * Big y.
     */
    P.mul = P.times = function (y) {
        var c,
            x = this,
            Big = x.constructor,
            xc = x.c,
            yc = (y = new Big(y)).c,
            a = xc.length,
            b = yc.length,
            i = x.e,
            j = y.e;

        // Determine sign of result.
        y.s = x.s == y.s ? 1 : -1;

        // Return signed 0 if either 0.
        if (!xc[0] || !yc[0]) {
            return new Big(y.s * 0);
        }

        // Initialise exponent of result as x.e + y.e.
        y.e = i + j;

        // If array xc has fewer digits than yc, swap xc and yc, and lengths.
        if (a < b) {
            c = xc;
            xc = yc;
            yc = c;
            j = a;
            a = b;
            b = j;
        }

        // Initialise coefficient array of result with zeros.
        for (c = new Array(j = a + b); j--; c[j] = 0) {
        }

        // Multiply.

        // i is initially xc.length.
        for (i = b; i--;) {
            b = 0;

            // a is yc.length.
            for (j = a + i; j > i;) {

                // Current sum of products at this digit position, plus carry.
                b = c[j] + yc[i] * xc[j - i - 1] + b;
                c[j--] = b % 10;

                // carry
                b = b / 10 | 0;
            }
            c[j] = (c[j] + b) % 10;
        }

        // Increment result exponent if there is a final carry.
        if (b) {
            ++y.e;
        }

        // Remove any leading zero.
        if (!c[0]) {
            c.shift();
        }

        // Remove trailing zeros.
        for (i = c.length; !c[--i]; c.pop()) {
        }
        y.c = c;

        return y;
    };


    /*
     * Return a string representing the value of this Big.
     * Return exponential notation if this Big has a positive exponent equal to
     * or greater than Big.E_POS, or a negative exponent equal to or less than
     * Big.E_NEG.
     */
    P.toString = P.valueOf = P.toJSON = function () {
        var x = this,
            Big = x.constructor,
            e = x.e,
            str = x.c.join(''),
            strL = str.length;

        // Exponential notation?
        if (e <= Big.E_NEG || e >= Big.E_POS) {
            str = str.charAt(0) + (strL > 1 ? '.' + str.slice(1) : '') +
              (e < 0 ? 'e' : 'e+') + e;

        // Negative exponent?
        } else if (e < 0) {

            // Prepend zeros.
            for (; ++e; str = '0' + str) {
            }
            str = '0.' + str;

        // Positive exponent?
        } else if (e > 0) {

            if (++e > strL) {

                // Append zeros.
                for (e -= strL; e-- ; str += '0') {
                }
            } else if (e < strL) {
                str = str.slice(0, e) + '.' + str.slice(e);
            }

        // Exponent zero.
        } else if (strL > 1) {
            str = str.charAt(0) + '.' + str.slice(1);
        }

        // Avoid '-0'
        return x.s < 0 && x.c[0] ? '-' + str : str;
    };


    /*
     ***************************************************************************
     * If toExponential, toFixed, toPrecision and format are not required they
     * can safely be commented-out or deleted. No redundant code will be left.
     * format is used only by toExponential, toFixed and toPrecision.
     ***************************************************************************
     */


    /*
     * Return a string representing the value of this Big in exponential
     * notation to dp fixed decimal places and rounded, if necessary, using
     * Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P.toExponential = function (dp) {

        if (dp == null) {
            dp = this.c.length - 1;
        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!toExp!');
        }

        return format(this, dp, 1);
    };


    /*
     * Return a string representing the value of this Big in normal notation
     * to dp fixed decimal places and rounded, if necessary, using Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P.toFixed = function (dp) {
        var str,
            x = this,
            Big = x.constructor,
            neg = Big.E_NEG,
            pos = Big.E_POS;

        // Prevent the possibility of exponential notation.
        Big.E_NEG = -(Big.E_POS = 1 / 0);

        if (dp == null) {
            str = x.toString();
        } else if (dp === ~~dp && dp >= 0 && dp <= MAX_DP) {
            str = format(x, x.e + dp);

            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
            if (x.s < 0 && x.c[0] && str.indexOf('-') < 0) {
        //E.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
                str = '-' + str;
            }
        }
        Big.E_NEG = neg;
        Big.E_POS = pos;

        if (!str) {
            throwErr('!toFix!');
        }

        return str;
    };


    /*
     * Return a string representing the value of this Big rounded to sd
     * significant digits using Big.RM. Use exponential notation if sd is less
     * than the number of digits necessary to represent the integer part of the
     * value in normal notation.
     *
     * sd {number} Integer, 1 to MAX_DP inclusive.
     */
    P.toPrecision = function (sd) {

        if (sd == null) {
            return this.toString();
        } else if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
            throwErr('!toPre!');
        }

        return format(this, sd - 1, 2);
    };


    // Export


    Big = bigFactory();

    //AMD.
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return Big;
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    // Node and other CommonJS-like environments that support module.exports.
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Big;
        module.exports.Big = Big;

    //Browser.
    } else {
        global.Big = Big;
    }
})(this);


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextBox__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__asInput__ = __webpack_require__(3);
/**
 * @file components/Dragger.es6
 * @author leeight
 */








const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-dragger');

function getValue(value, step) {
    if (step === 1) {
        return ~~value;
    }
    value = Math.round(value / step) * step;
    return step < 1 ? parseFloat(value.toFixed(2)) : ~~value;
}

/* eslint-disable */
const template = `<div on-click="onClick" class="{{mainClass}}" style="{{mainStyle}}">
    <div
        class="${cx('control-bar', 'control-bar-horizontal')}"
        s-ref="control-bar"
        style="{{controlBarStyle}}"></div>
    <div class="${cx('bar', 'bar-horizontal')}" s-ref="bar" on-click="onBarClick($event)">
        <div class="${cx('bar-selected', 'bar-selected-horizontal')}" style="{{selectedBarStyle}}"></div>
        <div class="${cx('bar-left')}">{{min}}{{unit}}</div>
        <div class="${cx('bar-middle')}">{{(max - min) / 2}}{{unit}}</div>
        <div class="${cx('bar-right')}">{{max}}{{unit}}</div>
        <div class="${cx('ruling-box')}">
            <div class="${cx('ruling', 'ruling-horizontal')}"></div>
        </div>
    </div>
    <ui-textbox
        addon="{{unit}}"
        addon-position="end"
        type="number"
        width="60px"
        value="{=value=}"
        disabled="{{disabled}}"
        style="{{textboxStyle}}"
        />
</div>`;
/* eslint-enable */

const Dragger = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({ // eslint-disable-line
    template,
    components: {
        'ui-textbox': __WEBPACK_IMPORTED_MODULE_3__TextBox__["a" /* default */]
    },
    initData() {
        return {
            disabled: false,
            length: 350,
            value: 0, // [min, max]
            min: 0,
            max: 100,
            step: 1,
            unit: null,
            skin: ''
        };
    },
    dataTypes: {
        /**
         * 获取或者设置Dragger组件的值
         *
         * @bindx
         * @default 0
         */
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 可输入的最小值
         *
         * @default 0
         */
        min: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 可输入的最大值
         *
         * @default 100
         */
        max: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 步进值，可以设置小数
         *
         * @default 1
         */
        step: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 控件的禁用状态
         *
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 控件的宽度
         *
         * @default 350
         */
        length: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 控件的单位，例如 Mbps 之类的
         */
        unit: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 控件的皮肤
         */
        skin: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string
    },
    computed: {
        selectedBarStyle() {
            const style = this.data.get('controlBarStyle');
            return {
                width: style.left
            };
        },
        textboxStyle() {
            const length = this.data.get('length');
            return {
                left: `${length + 35}px`
            };
        },
        controlBarStyle() {
            const min = this.data.get('min');
            const max = this.data.get('max');
            if (min >= max) {
                return {};
            }

            const value = this.data.get('value');
            const length = this.data.get('length');
            let left = value * length / (max - min);
            return {
                left: `${left}px`
            };
        },
        mainStyle() {
            const length = this.data.get('length');
            return {
                width: `${length}px`
            };
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    inited() {
        this.watch('value', value => {
            const {min, step, max} = this.data.get();
            if (value < min || value > max) {
                if (value < min) {
                    value = min;
                }
                else if (value > max) {
                    value = max;
                }
            }
            else {
                value = getValue(value, step);
            }
            this.data.set('value', value);
            this.fire('change', {value});
        });
    },
    attached() {
        const controlBar = this.ref('control-bar');
        if (controlBar) {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(controlBar).on('mousedown', e => {
                const disabled = this.data.get('disabled');
                if (disabled) {
                    return false;
                }

                this.startPosition = {
                    x: e.clientX,
                    y: e.clientY,
                    originalValue: this.data.get('value')
                };
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('mousemove.dragger', e => this.onMoveControlBar(e));
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('mouseup.dragger', e => this.onReleaseMouse(e));
                return false;
            });
        }
    },
    onMoveControlBar(e) {
        const {x, originalValue} = this.startPosition;
        const {min, length, step, max} = this.data.get();
        const deltaX = e.clientX - x;

        let value = originalValue + (deltaX * (max - min) / length);
        if (value <= min) {
            value = min;
        }
        else if (value >= max) {
            value = max;
        }

        this.data.set('value', getValue(value, step));
    },
    onReleaseMouse(e) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off('mousemove.dragger');
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off('mouseup.dragger');
    },
    onBarClick(e) {
        const {disabled, step, min, length, max} = this.data.get();
        if (disabled) {
            return;
        }

        const bar = this.ref('bar');
        const rect = bar.getBoundingClientRect();
        const deltaX = e.clientX - rect.left;

        let value = deltaX * (max - min) / length;
        if (value <= min) {
            value = min;
        }
        else if (value >= max) {
            value = max;
        }

        this.data.set('value', getValue(value, step));
    },
    onClick() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        this.fire('click');
    },
    disposed() {
        const controlBar = this.ref('control-bar');
        if (controlBar) {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(controlBar).off('mousedown');
        }
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off('mousemove.dragger');
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off('mouseup.dragger');
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_4__asInput__["a" /* asInput */])(Dragger));


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

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_MultiPicker__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asInput__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_regions__ = __webpack_require__(51);
/**
 * @file inf-ui/x/components/Region.es6
 * @author leeight
 */








const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-region');

/* eslint-disable */
const template = `<template>
<div class="{{mainClass}}" style="{{mainStyle}}">
    <ui-multipicker
        disabled="{{disabled}}"
        datasource="{{datasource}}"
        value="{=value=}"
    />
</div>
</template>`;
/* eslint-enable */

const Region = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-multipicker': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_MultiPicker__["a" /* default */]
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            return klass;
        },
        mainStyle() {
            const style = cx.mainStyle(this);
            return style;
        }
    },
    initData() {
        return {
            datasource: __WEBPACK_IMPORTED_MODULE_4__data_regions__["a" /* default */],
            disabled: false,
            value: []
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 设置或者获取组件的值
         * @bindx
         * @default []
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].array,

        /**
         * 组件的数据源
         * @default 国标的新政区域划分
         */
        datasource: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].array
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__asInput__["a" /* asInput */])(Region));


/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @file components/data/regions.es6
 * @author Guoyao Wu(wuguoyao@baidu.com)
 */

/* harmony default export */ __webpack_exports__["a"] = ([
    {value: 110000, text: '北京市', children: [
        {value: 110100, text: '市辖区', children: [
            {value: 110101, text: '东城区'},
            {value: 110102, text: '西城区'},
            {value: 110103, text: '崇文区'},
            {value: 110104, text: '宣武区'},
            {value: 110105, text: '朝阳区'},
            {value: 110106, text: '丰台区'},
            {value: 110107, text: '石景山区'},
            {value: 110108, text: '海淀区'},
            {value: 110109, text: '门头沟区'},
            {value: 110111, text: '房山区'},
            {value: 110112, text: '通州区'},
            {value: 110113, text: '顺义区'},
            {value: 110114, text: '昌平区'},
            {value: 110115, text: '大兴区'},
            {value: 110116, text: '怀柔区'},
            {value: 110117, text: '平谷区'}
        ]},
        {value: 110200, text: '县', children: [
            {value: 110228, text: '密云县'},
            {value: 110229, text: '延庆县'}
        ]}
    ]},
    {value: 120000, text: '天津市', children: [
        {value: 120100, text: '市辖区', children: [
            {value: 120101, text: '和平区'},
            {value: 120102, text: '河东区'},
            {value: 120103, text: '河西区'},
            {value: 120104, text: '南开区'},
            {value: 120105, text: '河北区'},
            {value: 120106, text: '红桥区'},
            {value: 120110, text: '东丽区'},
            {value: 120111, text: '西青区'},
            {value: 120112, text: '津南区'},
            {value: 120113, text: '北辰区'},
            {value: 120114, text: '武清区'},
            {value: 120115, text: '宝坻区'},
            {value: 120116, text: '滨海新区'}
        ]},
        {value: 120200, text: '县', children: [
            {value: 120221, text: '宁河县'},
            {value: 120223, text: '静海县'},
            {value: 120225, text: '蓟县'}
        ]}
    ]},
    {value: 130000, text: '河北省', children: [
        {value: 130100, text: '石家庄市', children: [
            {value: 130101, text: '市辖区'},
            {value: 130102, text: '长安区'},
            {value: 130103, text: '桥东区'},
            {value: 130104, text: '桥西区'},
            {value: 130105, text: '新华区'},
            {value: 130107, text: '井陉矿区'},
            {value: 130108, text: '裕华区'},
            {value: 130121, text: '井陉县'},
            {value: 130123, text: '正定县'},
            {value: 130124, text: '栾城县'},
            {value: 130125, text: '行唐县'},
            {value: 130126, text: '灵寿县'},
            {value: 130127, text: '高邑县'},
            {value: 130128, text: '深泽县'},
            {value: 130129, text: '赞皇县'},
            {value: 130130, text: '无极县'},
            {value: 130131, text: '平山县'},
            {value: 130132, text: '元氏县'},
            {value: 130133, text: '赵县'},
            {value: 130181, text: '辛集市'},
            {value: 130182, text: '藁城市'},
            {value: 130183, text: '晋州市'},
            {value: 130184, text: '新乐市'},
            {value: 130185, text: '鹿泉市'}
        ]},
        {value: 130200, text: '唐山市', children: [
            {value: 130201, text: '市辖区'},
            {value: 130202, text: '路南区'},
            {value: 130203, text: '路北区'},
            {value: 130204, text: '古冶区'},
            {value: 130205, text: '开平区'},
            {value: 130207, text: '丰南区'},
            {value: 130208, text: '丰润区'},
            {value: 130223, text: '滦县'},
            {value: 130224, text: '滦南县'},
            {value: 130225, text: '乐亭县'},
            {value: 130227, text: '迁西县'},
            {value: 130229, text: '玉田县'},
            {value: 130230, text: '唐海县'},
            {value: 130281, text: '遵化市'},
            {value: 130283, text: '迁安市'}
        ]},
        {value: 130300, text: '秦皇岛市', children: [
            {value: 130301, text: '市辖区'},
            {value: 130302, text: '海港区'},
            {value: 130303, text: '山海关区'},
            {value: 130304, text: '北戴河区'},
            {value: 130321, text: '青龙满族自治县'},
            {value: 130322, text: '昌黎县'},
            {value: 130323, text: '抚宁县'},
            {value: 130324, text: '卢龙县'}
        ]},
        {value: 130400, text: '邯郸市', children: [
            {value: 130401, text: '市辖区'},
            {value: 130402, text: '邯山区'},
            {value: 130403, text: '丛台区'},
            {value: 130404, text: '复兴区'},
            {value: 130406, text: '峰峰矿区'},
            {value: 130421, text: '邯郸县'},
            {value: 130423, text: '临漳县'},
            {value: 130424, text: '成安县'},
            {value: 130425, text: '大名县'},
            {value: 130426, text: '涉县'},
            {value: 130427, text: '磁县'},
            {value: 130428, text: '肥乡县'},
            {value: 130429, text: '永年县'},
            {value: 130430, text: '邱县'},
            {value: 130431, text: '鸡泽县'},
            {value: 130432, text: '广平县'},
            {value: 130433, text: '馆陶县'},
            {value: 130434, text: '魏县'},
            {value: 130435, text: '曲周县'},
            {value: 130481, text: '武安市'}
        ]},
        {value: 130500, text: '邢台市', children: [
            {value: 130501, text: '市辖区'},
            {value: 130502, text: '桥东区'},
            {value: 130503, text: '桥西区'},
            {value: 130521, text: '邢台县'},
            {value: 130522, text: '临城县'},
            {value: 130523, text: '内丘县'},
            {value: 130524, text: '柏乡县'},
            {value: 130525, text: '隆尧县'},
            {value: 130526, text: '任县'},
            {value: 130527, text: '南和县'},
            {value: 130528, text: '宁晋县'},
            {value: 130529, text: '巨鹿县'},
            {value: 130530, text: '新河县'},
            {value: 130531, text: '广宗县'},
            {value: 130532, text: '平乡县'},
            {value: 130533, text: '威县'},
            {value: 130534, text: '清河县'},
            {value: 130535, text: '临西县'},
            {value: 130581, text: '南宫市'},
            {value: 130582, text: '沙河市'}
        ]},
        {value: 130600, text: '保定市', children: [
            {value: 130601, text: '市辖区'},
            {value: 130602, text: '新市区'},
            {value: 130603, text: '北市区'},
            {value: 130604, text: '南市区'},
            {value: 130621, text: '满城县'},
            {value: 130622, text: '清苑县'},
            {value: 130623, text: '涞水县'},
            {value: 130624, text: '阜平县'},
            {value: 130625, text: '徐水县'},
            {value: 130626, text: '定兴县'},
            {value: 130627, text: '唐县'},
            {value: 130628, text: '高阳县'},
            {value: 130629, text: '容城县'},
            {value: 130630, text: '涞源县'},
            {value: 130631, text: '望都县'},
            {value: 130632, text: '安新县'},
            {value: 130633, text: '易县'},
            {value: 130634, text: '曲阳县'},
            {value: 130635, text: '蠡县'},
            {value: 130636, text: '顺平县'},
            {value: 130637, text: '博野县'},
            {value: 130638, text: '雄县'},
            {value: 130681, text: '涿州市'},
            {value: 130682, text: '定州市'},
            {value: 130683, text: '安国市'},
            {value: 130684, text: '高碑店市'}
        ]},
        {value: 130700, text: '张家口市', children: [
            {value: 130701, text: '市辖区'},
            {value: 130702, text: '桥东区'},
            {value: 130703, text: '桥西区'},
            {value: 130705, text: '宣化区'},
            {value: 130706, text: '下花园区'},
            {value: 130721, text: '宣化县'},
            {value: 130722, text: '张北县'},
            {value: 130723, text: '康保县'},
            {value: 130724, text: '沽源县'},
            {value: 130725, text: '尚义县'},
            {value: 130726, text: '蔚县'},
            {value: 130727, text: '阳原县'},
            {value: 130728, text: '怀安县'},
            {value: 130729, text: '万全县'},
            {value: 130730, text: '怀来县'},
            {value: 130731, text: '涿鹿县'},
            {value: 130732, text: '赤城县'},
            {value: 130733, text: '崇礼县'}
        ]},
        {value: 130800, text: '承德市', children: [
            {value: 130801, text: '市辖区'},
            {value: 130802, text: '双桥区'},
            {value: 130803, text: '双滦区'},
            {value: 130804, text: '鹰手营子矿区'},
            {value: 130821, text: '承德县'},
            {value: 130822, text: '兴隆县'},
            {value: 130823, text: '平泉县'},
            {value: 130824, text: '滦平县'},
            {value: 130825, text: '隆化县'},
            {value: 130826, text: '丰宁满族自治县'},
            {value: 130827, text: '宽城满族自治县'},
            {value: 130828, text: '围场满族蒙古族自治县'}
        ]},
        {value: 130900, text: '沧州市', children: [
            {value: 130901, text: '市辖区'},
            {value: 130902, text: '新华区'},
            {value: 130903, text: '运河区'},
            {value: 130921, text: '沧县'},
            {value: 130922, text: '青县'},
            {value: 130923, text: '东光县'},
            {value: 130924, text: '海兴县'},
            {value: 130925, text: '盐山县'},
            {value: 130926, text: '肃宁县'},
            {value: 130927, text: '南皮县'},
            {value: 130928, text: '吴桥县'},
            {value: 130929, text: '献县'},
            {value: 130930, text: '孟村回族自治县'},
            {value: 130981, text: '泊头市'},
            {value: 130982, text: '任丘市'},
            {value: 130983, text: '黄骅市'},
            {value: 130984, text: '河间市'}
        ]},
        {value: 131000, text: '廊坊市', children: [
            {value: 131001, text: '市辖区'},
            {value: 131002, text: '安次区'},
            {value: 131003, text: '广阳区'},
            {value: 131022, text: '固安县'},
            {value: 131023, text: '永清县'},
            {value: 131024, text: '香河县'},
            {value: 131025, text: '大城县'},
            {value: 131026, text: '文安县'},
            {value: 131028, text: '大厂回族自治县'},
            {value: 131081, text: '霸州市'},
            {value: 131082, text: '三河市'}
        ]},
        {value: 131100, text: '衡水市', children: [
            {value: 131101, text: '市辖区'},
            {value: 131102, text: '桃城区'},
            {value: 131121, text: '枣强县'},
            {value: 131122, text: '武邑县'},
            {value: 131123, text: '武强县'},
            {value: 131124, text: '饶阳县'},
            {value: 131125, text: '安平县'},
            {value: 131126, text: '故城县'},
            {value: 131127, text: '景县'},
            {value: 131128, text: '阜城县'},
            {value: 131181, text: '冀州市'},
            {value: 131182, text: '深州市'}
        ]}
    ]},
    {value: 140000, text: '山西省', children: [
        {value: 140100, text: '太原市', children: [
            {value: 140101, text: '市辖区'},
            {value: 140105, text: '小店区'},
            {value: 140106, text: '迎泽区'},
            {value: 140107, text: '杏花岭区'},
            {value: 140108, text: '尖草坪区'},
            {value: 140109, text: '万柏林区'},
            {value: 140110, text: '晋源区'},
            {value: 140121, text: '清徐县'},
            {value: 140122, text: '阳曲县'},
            {value: 140123, text: '娄烦县'},
            {value: 140181, text: '古交市'}
        ]},
        {value: 140200, text: '大同市', children: [
            {value: 140201, text: '市辖区'},
            {value: 140202, text: '城区'},
            {value: 140203, text: '矿区'},
            {value: 140211, text: '南郊区'},
            {value: 140212, text: '新荣区'},
            {value: 140221, text: '阳高县'},
            {value: 140222, text: '天镇县'},
            {value: 140223, text: '广灵县'},
            {value: 140224, text: '灵丘县'},
            {value: 140225, text: '浑源县'},
            {value: 140226, text: '左云县'},
            {value: 140227, text: '大同县'}
        ]},
        {value: 140300, text: '阳泉市', children: [
            {value: 140301, text: '市辖区'},
            {value: 140302, text: '城区'},
            {value: 140303, text: '矿区'},
            {value: 140311, text: '郊区'},
            {value: 140321, text: '平定县'},
            {value: 140322, text: '盂县'}
        ]},
        {value: 140400, text: '长治市', children: [
            {value: 140401, text: '市辖区'},
            {value: 140402, text: '城区'},
            {value: 140411, text: '郊区'},
            {value: 140421, text: '长治县'},
            {value: 140423, text: '襄垣县'},
            {value: 140424, text: '屯留县'},
            {value: 140425, text: '平顺县'},
            {value: 140426, text: '黎城县'},
            {value: 140427, text: '壶关县'},
            {value: 140428, text: '长子县'},
            {value: 140429, text: '武乡县'},
            {value: 140430, text: '沁县'},
            {value: 140431, text: '沁源县'},
            {value: 140481, text: '潞城市'}
        ]},
        {value: 140500, text: '晋城市', children: [
            {value: 140501, text: '市辖区'},
            {value: 140502, text: '城区'},
            {value: 140521, text: '沁水县'},
            {value: 140522, text: '阳城县'},
            {value: 140524, text: '陵川县'},
            {value: 140525, text: '泽州县'},
            {value: 140581, text: '高平市'}
        ]},
        {value: 140600, text: '朔州市', children: [
            {value: 140601, text: '市辖区'},
            {value: 140602, text: '朔城区'},
            {value: 140603, text: '平鲁区'},
            {value: 140621, text: '山阴县'},
            {value: 140622, text: '应县'},
            {value: 140623, text: '右玉县'},
            {value: 140624, text: '怀仁县'}
        ]},
        {value: 140700, text: '晋中市', children: [
            {value: 140701, text: '市辖区'},
            {value: 140702, text: '榆次区'},
            {value: 140721, text: '榆社县'},
            {value: 140722, text: '左权县'},
            {value: 140723, text: '和顺县'},
            {value: 140724, text: '昔阳县'},
            {value: 140725, text: '寿阳县'},
            {value: 140726, text: '太谷县'},
            {value: 140727, text: '祁县'},
            {value: 140728, text: '平遥县'},
            {value: 140729, text: '灵石县'},
            {value: 140781, text: '介休市'}
        ]},
        {value: 140800, text: '运城市', children: [
            {value: 140801, text: '市辖区'},
            {value: 140802, text: '盐湖区'},
            {value: 140821, text: '临猗县'},
            {value: 140822, text: '万荣县'},
            {value: 140823, text: '闻喜县'},
            {value: 140824, text: '稷山县'},
            {value: 140825, text: '新绛县'},
            {value: 140826, text: '绛县'},
            {value: 140827, text: '垣曲县'},
            {value: 140828, text: '夏县'},
            {value: 140829, text: '平陆县'},
            {value: 140830, text: '芮城县'},
            {value: 140881, text: '永济市'},
            {value: 140882, text: '河津市'}
        ]},
        {value: 140900, text: '忻州市', children: [
            {value: 140901, text: '市辖区'},
            {value: 140902, text: '忻府区'},
            {value: 140921, text: '定襄县'},
            {value: 140922, text: '五台县'},
            {value: 140923, text: '代县'},
            {value: 140924, text: '繁峙县'},
            {value: 140925, text: '宁武县'},
            {value: 140926, text: '静乐县'},
            {value: 140927, text: '神池县'},
            {value: 140928, text: '五寨县'},
            {value: 140929, text: '岢岚县'},
            {value: 140930, text: '河曲县'},
            {value: 140931, text: '保德县'},
            {value: 140932, text: '偏关县'},
            {value: 140981, text: '原平市'}
        ]},
        {value: 141000, text: '临汾市', children: [
            {value: 141001, text: '市辖区'},
            {value: 141002, text: '尧都区'},
            {value: 141021, text: '曲沃县'},
            {value: 141022, text: '翼城县'},
            {value: 141023, text: '襄汾县'},
            {value: 141024, text: '洪洞县'},
            {value: 141025, text: '古县'},
            {value: 141026, text: '安泽县'},
            {value: 141027, text: '浮山县'},
            {value: 141028, text: '吉县'},
            {value: 141029, text: '乡宁县'},
            {value: 141030, text: '大宁县'},
            {value: 141031, text: '隰县'},
            {value: 141032, text: '永和县'},
            {value: 141033, text: '蒲县'},
            {value: 141034, text: '汾西县'},
            {value: 141081, text: '侯马市'},
            {value: 141082, text: '霍州市'}
        ]},
        {value: 141100, text: '吕梁市', children: [
            {value: 141101, text: '市辖区'},
            {value: 141102, text: '离石区'},
            {value: 141121, text: '文水县'},
            {value: 141122, text: '交城县'},
            {value: 141123, text: '兴县'},
            {value: 141124, text: '临县'},
            {value: 141125, text: '柳林县'},
            {value: 141126, text: '石楼县'},
            {value: 141127, text: '岚县'},
            {value: 141128, text: '方山县'},
            {value: 141129, text: '中阳县'},
            {value: 141130, text: '交口县'},
            {value: 141181, text: '孝义市'},
            {value: 141182, text: '汾阳市'}
        ]}
    ]},
    {value: 150000, text: '内蒙古自治区', children: [
        {value: 150100, text: '呼和浩特市', children: [
            {value: 150101, text: '市辖区'},
            {value: 150102, text: '新城区'},
            {value: 150103, text: '回民区'},
            {value: 150104, text: '玉泉区'},
            {value: 150105, text: '赛罕区'},
            {value: 150121, text: '土默特左旗'},
            {value: 150122, text: '托克托县'},
            {value: 150123, text: '和林格尔县'},
            {value: 150124, text: '清水河县'},
            {value: 150125, text: '武川县'}
        ]},
        {value: 150200, text: '包头市', children: [
            {value: 150201, text: '市辖区'},
            {value: 150202, text: '东河区'},
            {value: 150203, text: '昆都仑区'},
            {value: 150204, text: '青山区'},
            {value: 150205, text: '石拐区'},
            {value: 150206, text: '白云矿区'},
            {value: 150207, text: '九原区'},
            {value: 150221, text: '土默特右旗'},
            {value: 150222, text: '固阳县'},
            {value: 150223, text: '达尔罕茂明安联合旗'}
        ]},
        {value: 150300, text: '乌海市', children: [
            {value: 150301, text: '市辖区'},
            {value: 150302, text: '海勃湾区'},
            {value: 150303, text: '海南区'},
            {value: 150304, text: '乌达区'}
        ]},
        {value: 150400, text: '赤峰市', children: [
            {value: 150401, text: '市辖区'},
            {value: 150402, text: '红山区'},
            {value: 150403, text: '元宝山区'},
            {value: 150404, text: '松山区'},
            {value: 150421, text: '阿鲁科尔沁旗'},
            {value: 150422, text: '巴林左旗'},
            {value: 150423, text: '巴林右旗'},
            {value: 150424, text: '林西县'},
            {value: 150425, text: '克什克腾旗'},
            {value: 150426, text: '翁牛特旗'},
            {value: 150428, text: '喀喇沁旗'},
            {value: 150429, text: '宁城县'},
            {value: 150430, text: '敖汉旗'}
        ]},
        {value: 150500, text: '通辽市', children: [
            {value: 150501, text: '市辖区'},
            {value: 150502, text: '科尔沁区'},
            {value: 150521, text: '科尔沁左翼中旗'},
            {value: 150522, text: '科尔沁左翼后旗'},
            {value: 150523, text: '开鲁县'},
            {value: 150524, text: '库伦旗'},
            {value: 150525, text: '奈曼旗'},
            {value: 150526, text: '扎鲁特旗'},
            {value: 150581, text: '霍林郭勒市'}
        ]},
        {value: 150600, text: '鄂尔多斯市', children: [
            {value: 150602, text: '东胜区'},
            {value: 150621, text: '达拉特旗'},
            {value: 150622, text: '准格尔旗'},
            {value: 150623, text: '鄂托克前旗'},
            {value: 150624, text: '鄂托克旗'},
            {value: 150625, text: '杭锦旗'},
            {value: 150626, text: '乌审旗'},
            {value: 150627, text: '伊金霍洛旗'}
        ]},
        {value: 150700, text: '呼伦贝尔市', children: [
            {value: 150701, text: '市辖区'},
            {value: 150702, text: '海拉尔区'},
            {value: 150721, text: '阿荣旗'},
            {value: 150722, text: '莫力达瓦达斡尔族自治旗'},
            {value: 150723, text: '鄂伦春自治旗'},
            {value: 150724, text: '鄂温克族自治旗'},
            {value: 150725, text: '陈巴尔虎旗'},
            {value: 150726, text: '新巴尔虎左旗'},
            {value: 150727, text: '新巴尔虎右旗'},
            {value: 150781, text: '满洲里市'},
            {value: 150782, text: '牙克石市'},
            {value: 150783, text: '扎兰屯市'},
            {value: 150784, text: '额尔古纳市'},
            {value: 150785, text: '根河市'}
        ]},
        {value: 150800, text: '巴彦淖尔市', children: [
            {value: 150801, text: '市辖区'},
            {value: 150802, text: '临河区'},
            {value: 150821, text: '五原县'},
            {value: 150822, text: '磴口县'},
            {value: 150823, text: '乌拉特前旗'},
            {value: 150824, text: '乌拉特中旗'},
            {value: 150825, text: '乌拉特后旗'},
            {value: 150826, text: '杭锦后旗'}
        ]},
        {value: 150900, text: '乌兰察布市', children: [
            {value: 150901, text: '市辖区'},
            {value: 150902, text: '集宁区'},
            {value: 150921, text: '卓资县'},
            {value: 150922, text: '化德县'},
            {value: 150923, text: '商都县'},
            {value: 150924, text: '兴和县'},
            {value: 150925, text: '凉城县'},
            {value: 150926, text: '察哈尔右翼前旗'},
            {value: 150927, text: '察哈尔右翼中旗'},
            {value: 150928, text: '察哈尔右翼后旗'},
            {value: 150929, text: '四子王旗'},
            {value: 150981, text: '丰镇市'}
        ]},
        {value: 152200, text: '兴安盟', children: [
            {value: 152201, text: '乌兰浩特市'},
            {value: 152202, text: '阿尔山市'},
            {value: 152221, text: '科尔沁右翼前旗'},
            {value: 152222, text: '科尔沁右翼中旗'},
            {value: 152223, text: '扎赉特旗'},
            {value: 152224, text: '突泉县'}
        ]},
        {value: 152500, text: '锡林郭勒盟', children: [
            {value: 152501, text: '二连浩特市'},
            {value: 152502, text: '锡林浩特市'},
            {value: 152522, text: '阿巴嘎旗'},
            {value: 152523, text: '苏尼特左旗'},
            {value: 152524, text: '苏尼特右旗'},
            {value: 152525, text: '东乌珠穆沁旗'},
            {value: 152526, text: '西乌珠穆沁旗'},
            {value: 152527, text: '太仆寺旗'},
            {value: 152528, text: '镶黄旗'},
            {value: 152529, text: '正镶白旗'},
            {value: 152530, text: '正蓝旗'},
            {value: 152531, text: '多伦县'}
        ]},
        {value: 152900, text: '阿拉善盟', children: [
            {value: 152921, text: '阿拉善左旗'},
            {value: 152922, text: '阿拉善右旗'},
            {value: 152923, text: '额济纳旗'}
        ]}
    ]},
    {value: 210000, text: '辽宁省', children: [
        {value: 210100, text: '沈阳市', children: [
            {value: 210101, text: '市辖区'},
            {value: 210102, text: '和平区'},
            {value: 210103, text: '沈河区'},
            {value: 210104, text: '大东区'},
            {value: 210105, text: '皇姑区'},
            {value: 210106, text: '铁西区'},
            {value: 210111, text: '苏家屯区'},
            {value: 210112, text: '东陵区'},
            {value: 210113, text: '沈北新区'},
            {value: 210114, text: '于洪区'},
            {value: 210122, text: '辽中县'},
            {value: 210123, text: '康平县'},
            {value: 210124, text: '法库县'},
            {value: 210181, text: '新民市'}
        ]},
        {value: 210200, text: '大连市', children: [
            {value: 210201, text: '市辖区'},
            {value: 210202, text: '中山区'},
            {value: 210203, text: '西岗区'},
            {value: 210204, text: '沙河口区'},
            {value: 210211, text: '甘井子区'},
            {value: 210212, text: '旅顺口区'},
            {value: 210213, text: '金州区'},
            {value: 210224, text: '长海县'},
            {value: 210281, text: '瓦房店市'},
            {value: 210282, text: '普兰店市'},
            {value: 210283, text: '庄河市'}
        ]},
        {value: 210300, text: '鞍山市', children: [
            {value: 210301, text: '市辖区'},
            {value: 210302, text: '铁东区'},
            {value: 210303, text: '铁西区'},
            {value: 210304, text: '立山区'},
            {value: 210311, text: '千山区'},
            {value: 210321, text: '台安县'},
            {value: 210323, text: '岫岩满族自治县'},
            {value: 210381, text: '海城市'}
        ]},
        {value: 210400, text: '抚顺市', children: [
            {value: 210401, text: '市辖区'},
            {value: 210402, text: '新抚区'},
            {value: 210403, text: '东洲区'},
            {value: 210404, text: '望花区'},
            {value: 210411, text: '顺城区'},
            {value: 210421, text: '抚顺县'},
            {value: 210422, text: '新宾满族自治县'},
            {value: 210423, text: '清原满族自治县'}
        ]},
        {value: 210500, text: '本溪市', children: [
            {value: 210501, text: '市辖区'},
            {value: 210502, text: '平山区'},
            {value: 210503, text: '溪湖区'},
            {value: 210504, text: '明山区'},
            {value: 210505, text: '南芬区'},
            {value: 210521, text: '本溪满族自治县'},
            {value: 210522, text: '桓仁满族自治县'}
        ]},
        {value: 210600, text: '丹东市', children: [
            {value: 210601, text: '市辖区'},
            {value: 210602, text: '元宝区'},
            {value: 210603, text: '振兴区'},
            {value: 210604, text: '振安区'},
            {value: 210624, text: '宽甸满族自治县'},
            {value: 210681, text: '东港市'},
            {value: 210682, text: '凤城市'}
        ]},
        {value: 210700, text: '锦州市', children: [
            {value: 210701, text: '市辖区'},
            {value: 210702, text: '古塔区'},
            {value: 210703, text: '凌河区'},
            {value: 210711, text: '太和区'},
            {value: 210726, text: '黑山县'},
            {value: 210727, text: '义县'},
            {value: 210781, text: '凌海市'},
            {value: 210782, text: '北镇市'}
        ]},
        {value: 210800, text: '营口市', children: [
            {value: 210801, text: '市辖区'},
            {value: 210802, text: '站前区'},
            {value: 210803, text: '西市区'},
            {value: 210804, text: '鲅鱼圈区'},
            {value: 210811, text: '老边区'},
            {value: 210881, text: '盖州市'},
            {value: 210882, text: '大石桥市'}
        ]},
        {value: 210900, text: '阜新市', children: [
            {value: 210901, text: '市辖区'},
            {value: 210902, text: '海州区'},
            {value: 210903, text: '新邱区'},
            {value: 210904, text: '太平区'},
            {value: 210905, text: '清河门区'},
            {value: 210911, text: '细河区'},
            {value: 210921, text: '阜新蒙古族自治县'},
            {value: 210922, text: '彰武县'}
        ]},
        {value: 211000, text: '辽阳市', children: [
            {value: 211001, text: '市辖区'},
            {value: 211002, text: '白塔区'},
            {value: 211003, text: '文圣区'},
            {value: 211004, text: '宏伟区'},
            {value: 211005, text: '弓长岭区'},
            {value: 211011, text: '太子河区'},
            {value: 211021, text: '辽阳县'},
            {value: 211081, text: '灯塔市'}
        ]},
        {value: 211100, text: '盘锦市', children: [
            {value: 211101, text: '市辖区'},
            {value: 211102, text: '双台子区'},
            {value: 211103, text: '兴隆台区'},
            {value: 211121, text: '大洼县'},
            {value: 211122, text: '盘山县'}
        ]},
        {value: 211200, text: '铁岭市', children: [
            {value: 211201, text: '市辖区'},
            {value: 211202, text: '银州区'},
            {value: 211204, text: '清河区'},
            {value: 211221, text: '铁岭县'},
            {value: 211223, text: '西丰县'},
            {value: 211224, text: '昌图县'},
            {value: 211281, text: '调兵山市'},
            {value: 211282, text: '开原市'}
        ]},
        {value: 211300, text: '朝阳市', children: [
            {value: 211301, text: '市辖区'},
            {value: 211302, text: '双塔区'},
            {value: 211303, text: '龙城区'},
            {value: 211321, text: '朝阳县'},
            {value: 211322, text: '建平县'},
            {value: 211324, text: '喀喇沁左翼蒙古族自治县'},
            {value: 211381, text: '北票市'},
            {value: 211382, text: '凌源市'}
        ]},
        {value: 211400, text: '葫芦岛市', children: [
            {value: 211401, text: '市辖区'},
            {value: 211402, text: '连山区'},
            {value: 211403, text: '龙港区'},
            {value: 211404, text: '南票区'},
            {value: 211421, text: '绥中县'},
            {value: 211422, text: '建昌县'},
            {value: 211481, text: '兴城市'}
        ]}
    ]},
    {value: 220000, text: '吉林省', children: [
        {value: 220100, text: '长春市', children: [
            {value: 220101, text: '市辖区'},
            {value: 220102, text: '南关区'},
            {value: 220103, text: '宽城区'},
            {value: 220104, text: '朝阳区'},
            {value: 220105, text: '二道区'},
            {value: 220106, text: '绿园区'},
            {value: 220112, text: '双阳区'},
            {value: 220122, text: '农安县'},
            {value: 220181, text: '九台市'},
            {value: 220182, text: '榆树市'},
            {value: 220183, text: '德惠市'}
        ]},
        {value: 220200, text: '吉林市', children: [
            {value: 220201, text: '市辖区'},
            {value: 220202, text: '昌邑区'},
            {value: 220203, text: '龙潭区'},
            {value: 220204, text: '船营区'},
            {value: 220211, text: '丰满区'},
            {value: 220221, text: '永吉县'},
            {value: 220281, text: '蛟河市'},
            {value: 220282, text: '桦甸市'},
            {value: 220283, text: '舒兰市'},
            {value: 220284, text: '磐石市'}
        ]},
        {value: 220300, text: '四平市', children: [
            {value: 220301, text: '市辖区'},
            {value: 220302, text: '铁西区'},
            {value: 220303, text: '铁东区'},
            {value: 220322, text: '梨树县'},
            {value: 220323, text: '伊通满族自治县'},
            {value: 220381, text: '公主岭市'},
            {value: 220382, text: '双辽市'}
        ]},
        {value: 220400, text: '辽源市', children: [
            {value: 220401, text: '市辖区'},
            {value: 220402, text: '龙山区'},
            {value: 220403, text: '西安区'},
            {value: 220421, text: '东丰县'},
            {value: 220422, text: '东辽县'}
        ]},
        {value: 220500, text: '通化市', children: [
            {value: 220501, text: '市辖区'},
            {value: 220502, text: '东昌区'},
            {value: 220503, text: '二道江区'},
            {value: 220521, text: '通化县'},
            {value: 220523, text: '辉南县'},
            {value: 220524, text: '柳河县'},
            {value: 220581, text: '梅河口市'},
            {value: 220582, text: '集安市'}
        ]},
        {value: 220600, text: '白山市', children: [
            {value: 220601, text: '市辖区'},
            {value: 220602, text: '八道江区'},
            {value: 220604, text: '江源区'},
            {value: 220621, text: '抚松县'},
            {value: 220622, text: '靖宇县'},
            {value: 220623, text: '长白朝鲜族自治县'},
            {value: 220681, text: '临江市'}
        ]},
        {value: 220700, text: '松原市', children: [
            {value: 220701, text: '市辖区'},
            {value: 220702, text: '宁江区'},
            {value: 220721, text: '前郭尔罗斯蒙古族自治县'},
            {value: 220722, text: '长岭县'},
            {value: 220723, text: '乾安县'},
            {value: 220724, text: '扶余县'}
        ]},
        {value: 220800, text: '白城市', children: [
            {value: 220801, text: '市辖区'},
            {value: 220802, text: '洮北区'},
            {value: 220821, text: '镇赉县'},
            {value: 220822, text: '通榆县'},
            {value: 220881, text: '洮南市'},
            {value: 220882, text: '大安市'}
        ]},
        {value: 222400, text: '延边朝鲜族自治州', children: [
            {value: 222401, text: '延吉市'},
            {value: 222402, text: '图们市'},
            {value: 222403, text: '敦化市'},
            {value: 222404, text: '珲春市'},
            {value: 222405, text: '龙井市'},
            {value: 222406, text: '和龙市'},
            {value: 222424, text: '汪清县'},
            {value: 222426, text: '安图县'}
        ]}
    ]},
    {value: 230000, text: '黑龙江省', children: [
        {value: 230100, text: '哈尔滨市', children: [
            {value: 230101, text: '市辖区'},
            {value: 230102, text: '道里区'},
            {value: 230103, text: '南岗区'},
            {value: 230104, text: '道外区'},
            {value: 230108, text: '平房区'},
            {value: 230109, text: '松北区'},
            {value: 230110, text: '香坊区'},
            {value: 230111, text: '呼兰区'},
            {value: 230112, text: '阿城区'},
            {value: 230123, text: '依兰县'},
            {value: 230124, text: '方正县'},
            {value: 230125, text: '宾县'},
            {value: 230126, text: '巴彦县'},
            {value: 230127, text: '木兰县'},
            {value: 230128, text: '通河县'},
            {value: 230129, text: '延寿县'},
            {value: 230182, text: '双城市'},
            {value: 230183, text: '尚志市'},
            {value: 230184, text: '五常市'}
        ]},
        {value: 230200, text: '齐齐哈尔市', children: [
            {value: 230201, text: '市辖区'},
            {value: 230202, text: '龙沙区'},
            {value: 230203, text: '建华区'},
            {value: 230204, text: '铁锋区'},
            {value: 230205, text: '昂昂溪区'},
            {value: 230206, text: '富拉尔基区'},
            {value: 230207, text: '碾子山区'},
            {value: 230208, text: '梅里斯达斡尔族区'},
            {value: 230221, text: '龙江县'},
            {value: 230223, text: '依安县'},
            {value: 230224, text: '泰来县'},
            {value: 230225, text: '甘南县'},
            {value: 230227, text: '富裕县'},
            {value: 230229, text: '克山县'},
            {value: 230230, text: '克东县'},
            {value: 230231, text: '拜泉县'},
            {value: 230281, text: '讷河市'}
        ]},
        {value: 230300, text: '鸡西市', children: [
            {value: 230301, text: '市辖区'},
            {value: 230302, text: '鸡冠区'},
            {value: 230303, text: '恒山区'},
            {value: 230304, text: '滴道区'},
            {value: 230305, text: '梨树区'},
            {value: 230306, text: '城子河区'},
            {value: 230307, text: '麻山区'},
            {value: 230321, text: '鸡东县'},
            {value: 230381, text: '虎林市'},
            {value: 230382, text: '密山市'}
        ]},
        {value: 230400, text: '鹤岗市', children: [
            {value: 230401, text: '市辖区'},
            {value: 230402, text: '向阳区'},
            {value: 230403, text: '工农区'},
            {value: 230404, text: '南山区'},
            {value: 230405, text: '兴安区'},
            {value: 230406, text: '东山区'},
            {value: 230407, text: '兴山区'},
            {value: 230421, text: '萝北县'},
            {value: 230422, text: '绥滨县'}
        ]},
        {value: 230500, text: '双鸭山市', children: [
            {value: 230501, text: '市辖区'},
            {value: 230502, text: '尖山区'},
            {value: 230503, text: '岭东区'},
            {value: 230505, text: '四方台区'},
            {value: 230506, text: '宝山区'},
            {value: 230521, text: '集贤县'},
            {value: 230522, text: '友谊县'},
            {value: 230523, text: '宝清县'},
            {value: 230524, text: '饶河县'}
        ]},
        {value: 230600, text: '大庆市', children: [
            {value: 230601, text: '市辖区'},
            {value: 230602, text: '萨尔图区'},
            {value: 230603, text: '龙凤区'},
            {value: 230604, text: '让胡路区'},
            {value: 230605, text: '红岗区'},
            {value: 230606, text: '大同区'},
            {value: 230621, text: '肇州县'},
            {value: 230622, text: '肇源县'},
            {value: 230623, text: '林甸县'},
            {value: 230624, text: '杜尔伯特蒙古族自治县'}
        ]},
        {value: 230700, text: '伊春市', children: [
            {value: 230701, text: '市辖区'},
            {value: 230702, text: '伊春区'},
            {value: 230703, text: '南岔区'},
            {value: 230704, text: '友好区'},
            {value: 230705, text: '西林区'},
            {value: 230706, text: '翠峦区'},
            {value: 230707, text: '新青区'},
            {value: 230708, text: '美溪区'},
            {value: 230709, text: '金山屯区'},
            {value: 230710, text: '五营区'},
            {value: 230711, text: '乌马河区'},
            {value: 230712, text: '汤旺河区'},
            {value: 230713, text: '带岭区'},
            {value: 230714, text: '乌伊岭区'},
            {value: 230715, text: '红星区'},
            {value: 230716, text: '上甘岭区'},
            {value: 230722, text: '嘉荫县'},
            {value: 230781, text: '铁力市'}
        ]},
        {value: 230800, text: '佳木斯市', children: [
            {value: 230801, text: '市辖区'},
            {value: 230803, text: '向阳区'},
            {value: 230804, text: '前进区'},
            {value: 230805, text: '东风区'},
            {value: 230811, text: '郊区'},
            {value: 230822, text: '桦南县'},
            {value: 230826, text: '桦川县'},
            {value: 230828, text: '汤原县'},
            {value: 230833, text: '抚远县'},
            {value: 230881, text: '同江市'},
            {value: 230882, text: '富锦市'}
        ]},
        {value: 230900, text: '七台河市', children: [
            {value: 230901, text: '市辖区'},
            {value: 230902, text: '新兴区'},
            {value: 230903, text: '桃山区'},
            {value: 230904, text: '茄子河区'},
            {value: 230921, text: '勃利县'}
        ]},
        {value: 231000, text: '牡丹江市', children: [
            {value: 231001, text: '市辖区'},
            {value: 231002, text: '东安区'},
            {value: 231003, text: '阳明区'},
            {value: 231004, text: '爱民区'},
            {value: 231005, text: '西安区'},
            {value: 231024, text: '东宁县'},
            {value: 231025, text: '林口县'},
            {value: 231081, text: '绥芬河市'},
            {value: 231083, text: '海林市'},
            {value: 231084, text: '宁安市'},
            {value: 231085, text: '穆棱市'}
        ]},
        {value: 231100, text: '黑河市', children: [
            {value: 231101, text: '市辖区'},
            {value: 231102, text: '爱辉区'},
            {value: 231121, text: '嫩江县'},
            {value: 231123, text: '逊克县'},
            {value: 231124, text: '孙吴县'},
            {value: 231181, text: '北安市'},
            {value: 231182, text: '五大连池市'}
        ]},
        {value: 231200, text: '绥化市', children: [
            {value: 231201, text: '市辖区'},
            {value: 231202, text: '北林区'},
            {value: 231221, text: '望奎县'},
            {value: 231222, text: '兰西县'},
            {value: 231223, text: '青冈县'},
            {value: 231224, text: '庆安县'},
            {value: 231225, text: '明水县'},
            {value: 231226, text: '绥棱县'},
            {value: 231281, text: '安达市'},
            {value: 231282, text: '肇东市'},
            {value: 231283, text: '海伦市'}
        ]},
        {value: 232700, text: '大兴安岭地区', children: [
            {value: 232701, text: '加格达奇区'},
            {value: 232702, text: '松岭区'},
            {value: 232703, text: '新林区'},
            {value: 232704, text: '呼中区'},
            {value: 232721, text: '呼玛县'},
            {value: 232722, text: '塔河县'},
            {value: 232723, text: '漠河县'}
        ]}
    ]},
    {value: 310000, text: '上海市', children: [
        {value: 310100, text: '市辖区', children: [
            {value: 310101, text: '黄浦区'},
            {value: 310103, text: '卢湾区'},
            {value: 310104, text: '徐汇区'},
            {value: 310105, text: '长宁区'},
            {value: 310106, text: '静安区'},
            {value: 310107, text: '普陀区'},
            {value: 310108, text: '闸北区'},
            {value: 310109, text: '虹口区'},
            {value: 310110, text: '杨浦区'},
            {value: 310112, text: '闵行区'},
            {value: 310113, text: '宝山区'},
            {value: 310114, text: '嘉定区'},
            {value: 310115, text: '浦东新区'},
            {value: 310116, text: '金山区'},
            {value: 310117, text: '松江区'},
            {value: 310118, text: '青浦区'},
            {value: 310119, text: '南汇区'},
            {value: 310120, text: '奉贤区'}
        ]},
        {value: 310200, text: '县', children: [
            {value: 310230, text: '崇明县'}
        ]}
    ]},
    {value: 320000, text: '江苏省', children: [
        {value: 320100, text: '南京市', children: [
            {value: 320101, text: '市辖区'},
            {value: 320102, text: '玄武区'},
            {value: 320103, text: '白下区'},
            {value: 320104, text: '秦淮区'},
            {value: 320105, text: '建邺区'},
            {value: 320106, text: '鼓楼区'},
            {value: 320107, text: '下关区'},
            {value: 320111, text: '浦口区'},
            {value: 320113, text: '栖霞区'},
            {value: 320114, text: '雨花台区'},
            {value: 320115, text: '江宁区'},
            {value: 320116, text: '六合区'},
            {value: 320124, text: '溧水县'},
            {value: 320125, text: '高淳县'}
        ]},
        {value: 320200, text: '无锡市', children: [
            {value: 320201, text: '市辖区'},
            {value: 320202, text: '崇安区'},
            {value: 320203, text: '南长区'},
            {value: 320204, text: '北塘区'},
            {value: 320205, text: '锡山区'},
            {value: 320206, text: '惠山区'},
            {value: 320211, text: '滨湖区'},
            {value: 320281, text: '江阴市'},
            {value: 320282, text: '宜兴市'}
        ]},
        {value: 320300, text: '徐州市', children: [
            {value: 320301, text: '市辖区'},
            {value: 320302, text: '鼓楼区'},
            {value: 320303, text: '云龙区'},
            {value: 320304, text: '九里区'},
            {value: 320305, text: '贾汪区'},
            {value: 320311, text: '泉山区'},
            {value: 320321, text: '丰县'},
            {value: 320322, text: '沛县'},
            {value: 320323, text: '铜山县'},
            {value: 320324, text: '睢宁县'},
            {value: 320381, text: '新沂市'},
            {value: 320382, text: '邳州市'}
        ]},
        {value: 320400, text: '常州市', children: [
            {value: 320401, text: '市辖区'},
            {value: 320402, text: '天宁区'},
            {value: 320404, text: '钟楼区'},
            {value: 320405, text: '戚墅堰区'},
            {value: 320411, text: '新北区'},
            {value: 320412, text: '武进区'},
            {value: 320481, text: '溧阳市'},
            {value: 320482, text: '金坛市'}
        ]},
        {value: 320500, text: '苏州市', children: [
            {value: 320501, text: '市辖区'},
            {value: 320502, text: '沧浪区'},
            {value: 320503, text: '平江区'},
            {value: 320504, text: '金阊区'},
            {value: 320505, text: '虎丘区'},
            {value: 320506, text: '吴中区'},
            {value: 320507, text: '相城区'},
            {value: 320581, text: '常熟市'},
            {value: 320582, text: '张家港市'},
            {value: 320583, text: '昆山市'},
            {value: 320584, text: '吴江市'},
            {value: 320585, text: '太仓市'}
        ]},
        {value: 320600, text: '南通市', children: [
            {value: 320601, text: '市辖区'},
            {value: 320602, text: '崇川区'},
            {value: 320611, text: '港闸区'},
            {value: 320621, text: '海安县'},
            {value: 320623, text: '如东县'},
            {value: 320681, text: '启东市'},
            {value: 320682, text: '如皋市'},
            {value: 320683, text: '通州市'},
            {value: 320684, text: '海门市'}
        ]},
        {value: 320700, text: '连云港市', children: [
            {value: 320701, text: '市辖区'},
            {value: 320703, text: '连云区'},
            {value: 320705, text: '新浦区'},
            {value: 320706, text: '海州区'},
            {value: 320721, text: '赣榆县'},
            {value: 320722, text: '东海县'},
            {value: 320723, text: '灌云县'},
            {value: 320724, text: '灌南县'}
        ]},
        {value: 320800, text: '淮安市', children: [
            {value: 320801, text: '市辖区'},
            {value: 320802, text: '清河区'},
            {value: 320803, text: '楚州区'},
            {value: 320804, text: '淮阴区'},
            {value: 320811, text: '清浦区'},
            {value: 320826, text: '涟水县'},
            {value: 320829, text: '洪泽县'},
            {value: 320830, text: '盱眙县'},
            {value: 320831, text: '金湖县'}
        ]},
        {value: 320900, text: '盐城市', children: [
            {value: 320901, text: '市辖区'},
            {value: 320902, text: '亭湖区'},
            {value: 320903, text: '盐都区'},
            {value: 320921, text: '响水县'},
            {value: 320922, text: '滨海县'},
            {value: 320923, text: '阜宁县'},
            {value: 320924, text: '射阳县'},
            {value: 320925, text: '建湖县'},
            {value: 320981, text: '东台市'},
            {value: 320982, text: '大丰市'}
        ]},
        {value: 321000, text: '扬州市', children: [
            {value: 321001, text: '市辖区'},
            {value: 321002, text: '广陵区'},
            {value: 321003, text: '邗江区'},
            {value: 321011, text: '维扬区'},
            {value: 321023, text: '宝应县'},
            {value: 321081, text: '仪征市'},
            {value: 321084, text: '高邮市'},
            {value: 321088, text: '江都市'}
        ]},
        {value: 321100, text: '镇江市', children: [
            {value: 321101, text: '市辖区'},
            {value: 321102, text: '京口区'},
            {value: 321111, text: '润州区'},
            {value: 321112, text: '丹徒区'},
            {value: 321181, text: '丹阳市'},
            {value: 321182, text: '扬中市'},
            {value: 321183, text: '句容市'}
        ]},
        {value: 321200, text: '泰州市', children: [
            {value: 321201, text: '市辖区'},
            {value: 321202, text: '海陵区'},
            {value: 321203, text: '高港区'},
            {value: 321281, text: '兴化市'},
            {value: 321282, text: '靖江市'},
            {value: 321283, text: '泰兴市'},
            {value: 321284, text: '姜堰市'}
        ]},
        {value: 321300, text: '宿迁市', children: [
            {value: 321301, text: '市辖区'},
            {value: 321302, text: '宿城区'},
            {value: 321311, text: '宿豫区'},
            {value: 321322, text: '沭阳县'},
            {value: 321323, text: '泗阳县'},
            {value: 321324, text: '泗洪县'}
        ]}
    ]},
    {value: 330000, text: '浙江省', children: [
        {value: 330100, text: '杭州市', children: [
            {value: 330101, text: '市辖区'},
            {value: 330102, text: '上城区'},
            {value: 330103, text: '下城区'},
            {value: 330104, text: '江干区'},
            {value: 330105, text: '拱墅区'},
            {value: 330106, text: '西湖区'},
            {value: 330108, text: '滨江区'},
            {value: 330109, text: '萧山区'},
            {value: 330110, text: '余杭区'},
            {value: 330122, text: '桐庐县'},
            {value: 330127, text: '淳安县'},
            {value: 330182, text: '建德市'},
            {value: 330183, text: '富阳市'},
            {value: 330185, text: '临安市'}
        ]},
        {value: 330200, text: '宁波市', children: [
            {value: 330201, text: '市辖区'},
            {value: 330203, text: '海曙区'},
            {value: 330204, text: '江东区'},
            {value: 330205, text: '江北区'},
            {value: 330206, text: '北仑区'},
            {value: 330211, text: '镇海区'},
            {value: 330212, text: '鄞州区'},
            {value: 330225, text: '象山县'},
            {value: 330226, text: '宁海县'},
            {value: 330281, text: '余姚市'},
            {value: 330282, text: '慈溪市'},
            {value: 330283, text: '奉化市'}
        ]},
        {value: 330300, text: '温州市', children: [
            {value: 330301, text: '市辖区'},
            {value: 330302, text: '鹿城区'},
            {value: 330303, text: '龙湾区'},
            {value: 330304, text: '瓯海区'},
            {value: 330322, text: '洞头县'},
            {value: 330324, text: '永嘉县'},
            {value: 330326, text: '平阳县'},
            {value: 330327, text: '苍南县'},
            {value: 330328, text: '文成县'},
            {value: 330329, text: '泰顺县'},
            {value: 330381, text: '瑞安市'},
            {value: 330382, text: '乐清市'}
        ]},
        {value: 330400, text: '嘉兴市', children: [
            {value: 330401, text: '市辖区'},
            {value: 330402, text: '秀城区'},
            {value: 330411, text: '秀洲区'},
            {value: 330421, text: '嘉善县'},
            {value: 330424, text: '海盐县'},
            {value: 330481, text: '海宁市'},
            {value: 330482, text: '平湖市'},
            {value: 330483, text: '桐乡市'}
        ]},
        {value: 330500, text: '湖州市', children: [
            {value: 330501, text: '市辖区'},
            {value: 330502, text: '吴兴区'},
            {value: 330503, text: '南浔区'},
            {value: 330521, text: '德清县'},
            {value: 330522, text: '长兴县'},
            {value: 330523, text: '安吉县'}
        ]},
        {value: 330600, text: '绍兴市', children: [
            {value: 330601, text: '市辖区'},
            {value: 330602, text: '越城区'},
            {value: 330621, text: '绍兴县'},
            {value: 330624, text: '新昌县'},
            {value: 330681, text: '诸暨市'},
            {value: 330682, text: '上虞市'},
            {value: 330683, text: '嵊州市'}
        ]},
        {value: 330700, text: '金华市', children: [
            {value: 330701, text: '市辖区'},
            {value: 330702, text: '婺城区'},
            {value: 330703, text: '金东区'},
            {value: 330723, text: '武义县'},
            {value: 330726, text: '浦江县'},
            {value: 330727, text: '磐安县'},
            {value: 330781, text: '兰溪市'},
            {value: 330782, text: '义乌市'},
            {value: 330783, text: '东阳市'},
            {value: 330784, text: '永康市'}
        ]},
        {value: 330800, text: '衢州市', children: [
            {value: 330801, text: '市辖区'},
            {value: 330802, text: '柯城区'},
            {value: 330803, text: '衢江区'},
            {value: 330822, text: '常山县'},
            {value: 330824, text: '开化县'},
            {value: 330825, text: '龙游县'},
            {value: 330881, text: '江山市'}
        ]},
        {value: 330900, text: '舟山市', children: [
            {value: 330901, text: '市辖区'},
            {value: 330902, text: '定海区'},
            {value: 330903, text: '普陀区'},
            {value: 330921, text: '岱山县'},
            {value: 330922, text: '嵊泗县'}
        ]},
        {value: 331000, text: '台州市', children: [
            {value: 331001, text: '市辖区'},
            {value: 331002, text: '椒江区'},
            {value: 331003, text: '黄岩区'},
            {value: 331004, text: '路桥区'},
            {value: 331021, text: '玉环县'},
            {value: 331022, text: '三门县'},
            {value: 331023, text: '天台县'},
            {value: 331024, text: '仙居县'},
            {value: 331081, text: '温岭市'},
            {value: 331082, text: '临海市'}
        ]},
        {value: 331100, text: '丽水市', children: [
            {value: 331101, text: '市辖区'},
            {value: 331102, text: '莲都区'},
            {value: 331121, text: '青田县'},
            {value: 331122, text: '缙云县'},
            {value: 331123, text: '遂昌县'},
            {value: 331124, text: '松阳县'},
            {value: 331125, text: '云和县'},
            {value: 331126, text: '庆元县'},
            {value: 331127, text: '景宁畲族自治县'},
            {value: 331181, text: '龙泉市'}
        ]}
    ]},
    {value: 340000, text: '安徽省', children: [
        {value: 340100, text: '合肥市', children: [
            {value: 340101, text: '市辖区'},
            {value: 340102, text: '瑶海区'},
            {value: 340103, text: '庐阳区'},
            {value: 340104, text: '蜀山区'},
            {value: 340111, text: '包河区'},
            {value: 340121, text: '长丰县'},
            {value: 340122, text: '肥东县'},
            {value: 340123, text: '肥西县'}
        ]},
        {value: 340200, text: '芜湖市', children: [
            {value: 340201, text: '市辖区'},
            {value: 340202, text: '镜湖区'},
            {value: 340203, text: '弋江区'},
            {value: 340207, text: '鸠江区'},
            {value: 340208, text: '三山区'},
            {value: 340221, text: '芜湖县'},
            {value: 340222, text: '繁昌县'},
            {value: 340223, text: '南陵县'}
        ]},
        {value: 340300, text: '蚌埠市', children: [
            {value: 340301, text: '市辖区'},
            {value: 340302, text: '龙子湖区'},
            {value: 340303, text: '蚌山区'},
            {value: 340304, text: '禹会区'},
            {value: 340311, text: '淮上区'},
            {value: 340321, text: '怀远县'},
            {value: 340322, text: '五河县'},
            {value: 340323, text: '固镇县'}
        ]},
        {value: 340400, text: '淮南市', children: [
            {value: 340401, text: '市辖区'},
            {value: 340402, text: '大通区'},
            {value: 340403, text: '田家庵区'},
            {value: 340404, text: '谢家集区'},
            {value: 340405, text: '八公山区'},
            {value: 340406, text: '潘集区'},
            {value: 340421, text: '凤台县'}
        ]},
        {value: 340500, text: '马鞍山市', children: [
            {value: 340501, text: '市辖区'},
            {value: 340502, text: '金家庄区'},
            {value: 340503, text: '花山区'},
            {value: 340504, text: '雨山区'},
            {value: 340521, text: '当涂县'}
        ]},
        {value: 340600, text: '淮北市', children: [
            {value: 340601, text: '市辖区'},
            {value: 340602, text: '杜集区'},
            {value: 340603, text: '相山区'},
            {value: 340604, text: '烈山区'},
            {value: 340621, text: '濉溪县'}
        ]},
        {value: 340700, text: '铜陵市', children: [
            {value: 340701, text: '市辖区'},
            {value: 340702, text: '铜官山区'},
            {value: 340703, text: '狮子山区'},
            {value: 340711, text: '郊区'},
            {value: 340721, text: '铜陵县'}
        ]},
        {value: 340800, text: '安庆市', children: [
            {value: 340801, text: '市辖区'},
            {value: 340802, text: '迎江区'},
            {value: 340803, text: '大观区'},
            {value: 340811, text: '宜秀区'},
            {value: 340822, text: '怀宁县'},
            {value: 340823, text: '枞阳县'},
            {value: 340824, text: '潜山县'},
            {value: 340825, text: '太湖县'},
            {value: 340826, text: '宿松县'},
            {value: 340827, text: '望江县'},
            {value: 340828, text: '岳西县'},
            {value: 340881, text: '桐城市'}
        ]},
        {value: 341000, text: '黄山市', children: [
            {value: 341001, text: '市辖区'},
            {value: 341002, text: '屯溪区'},
            {value: 341003, text: '黄山区'},
            {value: 341004, text: '徽州区'},
            {value: 341021, text: '歙县'},
            {value: 341022, text: '休宁县'},
            {value: 341023, text: '黟县'},
            {value: 341024, text: '祁门县'}
        ]},
        {value: 341100, text: '滁州市', children: [
            {value: 341101, text: '市辖区'},
            {value: 341102, text: '琅琊区'},
            {value: 341103, text: '南谯区'},
            {value: 341122, text: '来安县'},
            {value: 341124, text: '全椒县'},
            {value: 341125, text: '定远县'},
            {value: 341126, text: '凤阳县'},
            {value: 341181, text: '天长市'},
            {value: 341182, text: '明光市'}
        ]},
        {value: 341200, text: '阜阳市', children: [
            {value: 341201, text: '市辖区'},
            {value: 341202, text: '颍州区'},
            {value: 341203, text: '颍东区'},
            {value: 341204, text: '颍泉区'},
            {value: 341221, text: '临泉县'},
            {value: 341222, text: '太和县'},
            {value: 341225, text: '阜南县'},
            {value: 341226, text: '颍上县'},
            {value: 341282, text: '界首市'}
        ]},
        {value: 341300, text: '宿州市', children: [
            {value: 341301, text: '市辖区'},
            {value: 341302, text: '埇桥区'},
            {value: 341321, text: '砀山县'},
            {value: 341322, text: '萧县'},
            {value: 341323, text: '灵璧县'},
            {value: 341324, text: '泗县'}
        ]},
        {value: 341400, text: '巢湖市', children: [
            {value: 341401, text: '市辖区'},
            {value: 341402, text: '居巢区'},
            {value: 341421, text: '庐江县'},
            {value: 341422, text: '无为县'},
            {value: 341423, text: '含山县'},
            {value: 341424, text: '和县'}
        ]},
        {value: 341500, text: '六安市', children: [
            {value: 341501, text: '市辖区'},
            {value: 341502, text: '金安区'},
            {value: 341503, text: '裕安区'},
            {value: 341521, text: '寿县'},
            {value: 341522, text: '霍邱县'},
            {value: 341523, text: '舒城县'},
            {value: 341524, text: '金寨县'},
            {value: 341525, text: '霍山县'}
        ]},
        {value: 341600, text: '亳州市', children: [
            {value: 341601, text: '市辖区'},
            {value: 341602, text: '谯城区'},
            {value: 341621, text: '涡阳县'},
            {value: 341622, text: '蒙城县'},
            {value: 341623, text: '利辛县'}
        ]},
        {value: 341700, text: '池州市', children: [
            {value: 341701, text: '市辖区'},
            {value: 341702, text: '贵池区'},
            {value: 341721, text: '东至县'},
            {value: 341722, text: '石台县'},
            {value: 341723, text: '青阳县'}
        ]},
        {value: 341800, text: '宣城市', children: [
            {value: 341801, text: '市辖区'},
            {value: 341802, text: '宣州区'},
            {value: 341821, text: '郎溪县'},
            {value: 341822, text: '广德县'},
            {value: 341823, text: '泾县'},
            {value: 341824, text: '绩溪县'},
            {value: 341825, text: '旌德县'},
            {value: 341881, text: '宁国市'}
        ]}
    ]},
    {value: 350000, text: '福建省', children: [
        {value: 350100, text: '福州市', children: [
            {value: 350101, text: '市辖区'},
            {value: 350102, text: '鼓楼区'},
            {value: 350103, text: '台江区'},
            {value: 350104, text: '仓山区'},
            {value: 350105, text: '马尾区'},
            {value: 350111, text: '晋安区'},
            {value: 350121, text: '闽侯县'},
            {value: 350122, text: '连江县'},
            {value: 350123, text: '罗源县'},
            {value: 350124, text: '闽清县'},
            {value: 350125, text: '永泰县'},
            {value: 350128, text: '平潭县'},
            {value: 350181, text: '福清市'},
            {value: 350182, text: '长乐市'}
        ]},
        {value: 350200, text: '厦门市', children: [
            {value: 350201, text: '市辖区'},
            {value: 350203, text: '思明区'},
            {value: 350205, text: '海沧区'},
            {value: 350206, text: '湖里区'},
            {value: 350211, text: '集美区'},
            {value: 350212, text: '同安区'},
            {value: 350213, text: '翔安区'}
        ]},
        {value: 350300, text: '莆田市', children: [
            {value: 350301, text: '市辖区'},
            {value: 350302, text: '城厢区'},
            {value: 350303, text: '涵江区'},
            {value: 350304, text: '荔城区'},
            {value: 350305, text: '秀屿区'},
            {value: 350322, text: '仙游县'}
        ]},
        {value: 350400, text: '三明市', children: [
            {value: 350401, text: '市辖区'},
            {value: 350402, text: '梅列区'},
            {value: 350403, text: '三元区'},
            {value: 350421, text: '明溪县'},
            {value: 350423, text: '清流县'},
            {value: 350424, text: '宁化县'},
            {value: 350425, text: '大田县'},
            {value: 350426, text: '尤溪县'},
            {value: 350427, text: '沙县'},
            {value: 350428, text: '将乐县'},
            {value: 350429, text: '泰宁县'},
            {value: 350430, text: '建宁县'},
            {value: 350481, text: '永安市'}
        ]},
        {value: 350500, text: '泉州市', children: [
            {value: 350501, text: '市辖区'},
            {value: 350502, text: '鲤城区'},
            {value: 350503, text: '丰泽区'},
            {value: 350504, text: '洛江区'},
            {value: 350505, text: '泉港区'},
            {value: 350521, text: '惠安县'},
            {value: 350524, text: '安溪县'},
            {value: 350525, text: '永春县'},
            {value: 350526, text: '德化县'},
            {value: 350527, text: '金门县'},
            {value: 350581, text: '石狮市'},
            {value: 350582, text: '晋江市'},
            {value: 350583, text: '南安市'}
        ]},
        {value: 350600, text: '漳州市', children: [
            {value: 350601, text: '市辖区'},
            {value: 350602, text: '芗城区'},
            {value: 350603, text: '龙文区'},
            {value: 350622, text: '云霄县'},
            {value: 350623, text: '漳浦县'},
            {value: 350624, text: '诏安县'},
            {value: 350625, text: '长泰县'},
            {value: 350626, text: '东山县'},
            {value: 350627, text: '南靖县'},
            {value: 350628, text: '平和县'},
            {value: 350629, text: '华安县'},
            {value: 350681, text: '龙海市'}
        ]},
        {value: 350700, text: '南平市', children: [
            {value: 350701, text: '市辖区'},
            {value: 350702, text: '延平区'},
            {value: 350721, text: '顺昌县'},
            {value: 350722, text: '浦城县'},
            {value: 350723, text: '光泽县'},
            {value: 350724, text: '松溪县'},
            {value: 350725, text: '政和县'},
            {value: 350781, text: '邵武市'},
            {value: 350782, text: '武夷山市'},
            {value: 350783, text: '建瓯市'},
            {value: 350784, text: '建阳市'}
        ]},
        {value: 350800, text: '龙岩市', children: [
            {value: 350801, text: '市辖区'},
            {value: 350802, text: '新罗区'},
            {value: 350821, text: '长汀县'},
            {value: 350822, text: '永定县'},
            {value: 350823, text: '上杭县'},
            {value: 350824, text: '武平县'},
            {value: 350825, text: '连城县'},
            {value: 350881, text: '漳平市'}
        ]},
        {value: 350900, text: '宁德市', children: [
            {value: 350901, text: '市辖区'},
            {value: 350902, text: '蕉城区'},
            {value: 350921, text: '霞浦县'},
            {value: 350922, text: '古田县'},
            {value: 350923, text: '屏南县'},
            {value: 350924, text: '寿宁县'},
            {value: 350925, text: '周宁县'},
            {value: 350926, text: '柘荣县'},
            {value: 350981, text: '福安市'},
            {value: 350982, text: '福鼎市'}
        ]}
    ]},
    {value: 360000, text: '江西省', children: [
        {value: 360100, text: '南昌市', children: [
            {value: 360101, text: '市辖区'},
            {value: 360102, text: '东湖区'},
            {value: 360103, text: '西湖区'},
            {value: 360104, text: '青云谱区'},
            {value: 360105, text: '湾里区'},
            {value: 360111, text: '青山湖区'},
            {value: 360121, text: '南昌县'},
            {value: 360122, text: '新建县'},
            {value: 360123, text: '安义县'},
            {value: 360124, text: '进贤县'}
        ]},
        {value: 360200, text: '景德镇市', children: [
            {value: 360201, text: '市辖区'},
            {value: 360202, text: '昌江区'},
            {value: 360203, text: '珠山区'},
            {value: 360222, text: '浮梁县'},
            {value: 360281, text: '乐平市'}
        ]},
        {value: 360300, text: '萍乡市', children: [
            {value: 360301, text: '市辖区'},
            {value: 360302, text: '安源区'},
            {value: 360313, text: '湘东区'},
            {value: 360321, text: '莲花县'},
            {value: 360322, text: '上栗县'},
            {value: 360323, text: '芦溪县'}
        ]},
        {value: 360400, text: '九江市', children: [
            {value: 360401, text: '市辖区'},
            {value: 360402, text: '庐山区'},
            {value: 360403, text: '浔阳区'},
            {value: 360421, text: '九江县'},
            {value: 360423, text: '武宁县'},
            {value: 360424, text: '修水县'},
            {value: 360425, text: '永修县'},
            {value: 360426, text: '德安县'},
            {value: 360427, text: '星子县'},
            {value: 360428, text: '都昌县'},
            {value: 360429, text: '湖口县'},
            {value: 360430, text: '彭泽县'},
            {value: 360481, text: '瑞昌市'}
        ]},
        {value: 360500, text: '新余市', children: [
            {value: 360501, text: '市辖区'},
            {value: 360502, text: '渝水区'},
            {value: 360521, text: '分宜县'}
        ]},
        {value: 360600, text: '鹰潭市', children: [
            {value: 360601, text: '市辖区'},
            {value: 360602, text: '月湖区'},
            {value: 360622, text: '余江县'},
            {value: 360681, text: '贵溪市'}
        ]},
        {value: 360700, text: '赣州市', children: [
            {value: 360701, text: '市辖区'},
            {value: 360702, text: '章贡区'},
            {value: 360721, text: '赣县'},
            {value: 360722, text: '信丰县'},
            {value: 360723, text: '大余县'},
            {value: 360724, text: '上犹县'},
            {value: 360725, text: '崇义县'},
            {value: 360726, text: '安远县'},
            {value: 360727, text: '龙南县'},
            {value: 360728, text: '定南县'},
            {value: 360729, text: '全南县'},
            {value: 360730, text: '宁都县'},
            {value: 360731, text: '于都县'},
            {value: 360732, text: '兴国县'},
            {value: 360733, text: '会昌县'},
            {value: 360734, text: '寻乌县'},
            {value: 360735, text: '石城县'},
            {value: 360781, text: '瑞金市'},
            {value: 360782, text: '南康市'}
        ]},
        {value: 360800, text: '吉安市', children: [
            {value: 360801, text: '市辖区'},
            {value: 360802, text: '吉州区'},
            {value: 360803, text: '青原区'},
            {value: 360821, text: '吉安县'},
            {value: 360822, text: '吉水县'},
            {value: 360823, text: '峡江县'},
            {value: 360824, text: '新干县'},
            {value: 360825, text: '永丰县'},
            {value: 360826, text: '泰和县'},
            {value: 360827, text: '遂川县'},
            {value: 360828, text: '万安县'},
            {value: 360829, text: '安福县'},
            {value: 360830, text: '永新县'},
            {value: 360881, text: '井冈山市'}
        ]},
        {value: 360900, text: '宜春市', children: [
            {value: 360901, text: '市辖区'},
            {value: 360902, text: '袁州区'},
            {value: 360921, text: '奉新县'},
            {value: 360922, text: '万载县'},
            {value: 360923, text: '上高县'},
            {value: 360924, text: '宜丰县'},
            {value: 360925, text: '靖安县'},
            {value: 360926, text: '铜鼓县'},
            {value: 360981, text: '丰城市'},
            {value: 360982, text: '樟树市'},
            {value: 360983, text: '高安市'}
        ]},
        {value: 361000, text: '抚州市', children: [
            {value: 361001, text: '市辖区'},
            {value: 361002, text: '临川区'},
            {value: 361021, text: '南城县'},
            {value: 361022, text: '黎川县'},
            {value: 361023, text: '南丰县'},
            {value: 361024, text: '崇仁县'},
            {value: 361025, text: '乐安县'},
            {value: 361026, text: '宜黄县'},
            {value: 361027, text: '金溪县'},
            {value: 361028, text: '资溪县'},
            {value: 361029, text: '东乡县'},
            {value: 361030, text: '广昌县'}
        ]},
        {value: 361100, text: '上饶市', children: [
            {value: 361101, text: '市辖区'},
            {value: 361102, text: '信州区'},
            {value: 361121, text: '上饶县'},
            {value: 361122, text: '广丰县'},
            {value: 361123, text: '玉山县'},
            {value: 361124, text: '铅山县'},
            {value: 361125, text: '横峰县'},
            {value: 361126, text: '弋阳县'},
            {value: 361127, text: '余干县'},
            {value: 361128, text: '鄱阳县'},
            {value: 361129, text: '万年县'},
            {value: 361130, text: '婺源县'},
            {value: 361181, text: '德兴市'}
        ]}
    ]},
    {value: 370000, text: '山东省', children: [
        {value: 370100, text: '济南市', children: [
            {value: 370101, text: '市辖区'},
            {value: 370102, text: '历下区'},
            {value: 370103, text: '市中区'},
            {value: 370104, text: '槐荫区'},
            {value: 370105, text: '天桥区'},
            {value: 370112, text: '历城区'},
            {value: 370113, text: '长清区'},
            {value: 370124, text: '平阴县'},
            {value: 370125, text: '济阳县'},
            {value: 370126, text: '商河县'},
            {value: 370181, text: '章丘市'}
        ]},
        {value: 370200, text: '青岛市', children: [
            {value: 370201, text: '市辖区'},
            {value: 370202, text: '市南区'},
            {value: 370203, text: '市北区'},
            {value: 370205, text: '四方区'},
            {value: 370211, text: '黄岛区'},
            {value: 370212, text: '崂山区'},
            {value: 370213, text: '李沧区'},
            {value: 370214, text: '城阳区'},
            {value: 370281, text: '胶州市'},
            {value: 370282, text: '即墨市'},
            {value: 370283, text: '平度市'},
            {value: 370284, text: '胶南市'},
            {value: 370285, text: '莱西市'}
        ]},
        {value: 370300, text: '淄博市', children: [
            {value: 370301, text: '市辖区'},
            {value: 370302, text: '淄川区'},
            {value: 370303, text: '张店区'},
            {value: 370304, text: '博山区'},
            {value: 370305, text: '临淄区'},
            {value: 370306, text: '周村区'},
            {value: 370321, text: '桓台县'},
            {value: 370322, text: '高青县'},
            {value: 370323, text: '沂源县'}
        ]},
        {value: 370400, text: '枣庄市', children: [
            {value: 370401, text: '市辖区'},
            {value: 370402, text: '市中区'},
            {value: 370403, text: '薛城区'},
            {value: 370404, text: '峄城区'},
            {value: 370405, text: '台儿庄区'},
            {value: 370406, text: '山亭区'},
            {value: 370481, text: '滕州市'}
        ]},
        {value: 370500, text: '东营市', children: [
            {value: 370501, text: '市辖区'},
            {value: 370502, text: '东营区'},
            {value: 370503, text: '河口区'},
            {value: 370521, text: '垦利县'},
            {value: 370522, text: '利津县'},
            {value: 370523, text: '广饶县'}
        ]},
        {value: 370600, text: '烟台市', children: [
            {value: 370601, text: '市辖区'},
            {value: 370602, text: '芝罘区'},
            {value: 370611, text: '福山区'},
            {value: 370612, text: '牟平区'},
            {value: 370613, text: '莱山区'},
            {value: 370634, text: '长岛县'},
            {value: 370681, text: '龙口市'},
            {value: 370682, text: '莱阳市'},
            {value: 370683, text: '莱州市'},
            {value: 370684, text: '蓬莱市'},
            {value: 370685, text: '招远市'},
            {value: 370686, text: '栖霞市'},
            {value: 370687, text: '海阳市'}
        ]},
        {value: 370700, text: '潍坊市', children: [
            {value: 370701, text: '市辖区'},
            {value: 370702, text: '潍城区'},
            {value: 370703, text: '寒亭区'},
            {value: 370704, text: '坊子区'},
            {value: 370705, text: '奎文区'},
            {value: 370724, text: '临朐县'},
            {value: 370725, text: '昌乐县'},
            {value: 370781, text: '青州市'},
            {value: 370782, text: '诸城市'},
            {value: 370783, text: '寿光市'},
            {value: 370784, text: '安丘市'},
            {value: 370785, text: '高密市'},
            {value: 370786, text: '昌邑市'}
        ]},
        {value: 370800, text: '济宁市', children: [
            {value: 370801, text: '市辖区'},
            {value: 370802, text: '市中区'},
            {value: 370811, text: '任城区'},
            {value: 370826, text: '微山县'},
            {value: 370827, text: '鱼台县'},
            {value: 370828, text: '金乡县'},
            {value: 370829, text: '嘉祥县'},
            {value: 370830, text: '汶上县'},
            {value: 370831, text: '泗水县'},
            {value: 370832, text: '梁山县'},
            {value: 370881, text: '曲阜市'},
            {value: 370882, text: '兖州市'},
            {value: 370883, text: '邹城市'}
        ]},
        {value: 370900, text: '泰安市', children: [
            {value: 370901, text: '市辖区'},
            {value: 370902, text: '泰山区'},
            {value: 370903, text: '岱岳区'},
            {value: 370921, text: '宁阳县'},
            {value: 370923, text: '东平县'},
            {value: 370982, text: '新泰市'},
            {value: 370983, text: '肥城市'}
        ]},
        {value: 371000, text: '威海市', children: [
            {value: 371001, text: '市辖区'},
            {value: 371002, text: '环翠区'},
            {value: 371081, text: '文登市'},
            {value: 371082, text: '荣成市'},
            {value: 371083, text: '乳山市'}
        ]},
        {value: 371100, text: '日照市', children: [
            {value: 371101, text: '市辖区'},
            {value: 371102, text: '东港区'},
            {value: 371103, text: '岚山区'},
            {value: 371121, text: '五莲县'},
            {value: 371122, text: '莒县'}
        ]},
        {value: 371200, text: '莱芜市', children: [
            {value: 371201, text: '市辖区'},
            {value: 371202, text: '莱城区'},
            {value: 371203, text: '钢城区'}
        ]},
        {value: 371300, text: '临沂市', children: [
            {value: 371301, text: '市辖区'},
            {value: 371302, text: '兰山区'},
            {value: 371311, text: '罗庄区'},
            {value: 371312, text: '河东区'},
            {value: 371321, text: '沂南县'},
            {value: 371322, text: '郯城县'},
            {value: 371323, text: '沂水县'},
            {value: 371324, text: '苍山县'},
            {value: 371325, text: '费县'},
            {value: 371326, text: '平邑县'},
            {value: 371327, text: '莒南县'},
            {value: 371328, text: '蒙阴县'},
            {value: 371329, text: '临沭县'}
        ]},
        {value: 371400, text: '德州市', children: [
            {value: 371401, text: '市辖区'},
            {value: 371402, text: '德城区'},
            {value: 371421, text: '陵县'},
            {value: 371422, text: '宁津县'},
            {value: 371423, text: '庆云县'},
            {value: 371424, text: '临邑县'},
            {value: 371425, text: '齐河县'},
            {value: 371426, text: '平原县'},
            {value: 371427, text: '夏津县'},
            {value: 371428, text: '武城县'},
            {value: 371481, text: '乐陵市'},
            {value: 371482, text: '禹城市'}
        ]},
        {value: 371500, text: '聊城市', children: [
            {value: 371501, text: '市辖区'},
            {value: 371502, text: '东昌府区'},
            {value: 371521, text: '阳谷县'},
            {value: 371522, text: '莘县'},
            {value: 371523, text: '茌平县'},
            {value: 371524, text: '东阿县'},
            {value: 371525, text: '冠县'},
            {value: 371526, text: '高唐县'},
            {value: 371581, text: '临清市'}
        ]},
        {value: 371600, text: '滨州市', children: [
            {value: 371601, text: '市辖区'},
            {value: 371602, text: '滨城区'},
            {value: 371621, text: '惠民县'},
            {value: 371622, text: '阳信县'},
            {value: 371623, text: '无棣县'},
            {value: 371624, text: '沾化县'},
            {value: 371625, text: '博兴县'},
            {value: 371626, text: '邹平县'}
        ]},
        {value: 371700, text: '菏泽市', children: [
            {value: 371701, text: '市辖区'},
            {value: 371702, text: '牡丹区'},
            {value: 371721, text: '曹县'},
            {value: 371722, text: '单县'},
            {value: 371723, text: '成武县'},
            {value: 371724, text: '巨野县'},
            {value: 371725, text: '郓城县'},
            {value: 371726, text: '鄄城县'},
            {value: 371727, text: '定陶县'},
            {value: 371728, text: '东明县'}
        ]}
    ]},
    {value: 410000, text: '河南省', children: [
        {value: 410100, text: '郑州市', children: [
            {value: 410101, text: '市辖区'},
            {value: 410102, text: '中原区'},
            {value: 410103, text: '二七区'},
            {value: 410104, text: '管城回族区'},
            {value: 410105, text: '金水区'},
            {value: 410106, text: '上街区'},
            {value: 410108, text: '惠济区'},
            {value: 410122, text: '中牟县'},
            {value: 410181, text: '巩义市'},
            {value: 410182, text: '荥阳市'},
            {value: 410183, text: '新密市'},
            {value: 410184, text: '新郑市'},
            {value: 410185, text: '登封市'}
        ]},
        {value: 410200, text: '开封市', children: [
            {value: 410201, text: '市辖区'},
            {value: 410202, text: '龙亭区'},
            {value: 410203, text: '顺河回族区'},
            {value: 410204, text: '鼓楼区'},
            {value: 410205, text: '禹王台区'},
            {value: 410211, text: '金明区'},
            {value: 410221, text: '杞县'},
            {value: 410222, text: '通许县'},
            {value: 410223, text: '尉氏县'},
            {value: 410224, text: '开封县'},
            {value: 410225, text: '兰考县'}
        ]},
        {value: 410300, text: '洛阳市', children: [
            {value: 410301, text: '市辖区'},
            {value: 410302, text: '老城区'},
            {value: 410303, text: '西工区'},
            {value: 410304, text: '廛河回族区'},
            {value: 410305, text: '涧西区'},
            {value: 410306, text: '吉利区'},
            {value: 410307, text: '洛龙区'},
            {value: 410322, text: '孟津县'},
            {value: 410323, text: '新安县'},
            {value: 410324, text: '栾川县'},
            {value: 410325, text: '嵩县'},
            {value: 410326, text: '汝阳县'},
            {value: 410327, text: '宜阳县'},
            {value: 410328, text: '洛宁县'},
            {value: 410329, text: '伊川县'},
            {value: 410381, text: '偃师市'}
        ]},
        {value: 410400, text: '平顶山市', children: [
            {value: 410401, text: '市辖区'},
            {value: 410402, text: '新华区'},
            {value: 410403, text: '卫东区'},
            {value: 410404, text: '石龙区'},
            {value: 410411, text: '湛河区'},
            {value: 410421, text: '宝丰县'},
            {value: 410422, text: '叶县'},
            {value: 410423, text: '鲁山县'},
            {value: 410425, text: '郏县'},
            {value: 410481, text: '舞钢市'},
            {value: 410482, text: '汝州市'}
        ]},
        {value: 410500, text: '安阳市', children: [
            {value: 410501, text: '市辖区'},
            {value: 410502, text: '文峰区'},
            {value: 410503, text: '北关区'},
            {value: 410505, text: '殷都区'},
            {value: 410506, text: '龙安区'},
            {value: 410522, text: '安阳县'},
            {value: 410523, text: '汤阴县'},
            {value: 410526, text: '滑县'},
            {value: 410527, text: '内黄县'},
            {value: 410581, text: '林州市'}
        ]},
        {value: 410600, text: '鹤壁市', children: [
            {value: 410601, text: '市辖区'},
            {value: 410602, text: '鹤山区'},
            {value: 410603, text: '山城区'},
            {value: 410611, text: '淇滨区'},
            {value: 410621, text: '浚县'},
            {value: 410622, text: '淇县'}
        ]},
        {value: 410700, text: '新乡市', children: [
            {value: 410701, text: '市辖区'},
            {value: 410702, text: '红旗区'},
            {value: 410703, text: '卫滨区'},
            {value: 410704, text: '凤泉区'},
            {value: 410711, text: '牧野区'},
            {value: 410721, text: '新乡县'},
            {value: 410724, text: '获嘉县'},
            {value: 410725, text: '原阳县'},
            {value: 410726, text: '延津县'},
            {value: 410727, text: '封丘县'},
            {value: 410728, text: '长垣县'},
            {value: 410781, text: '卫辉市'},
            {value: 410782, text: '辉县市'}
        ]},
        {value: 410800, text: '焦作市', children: [
            {value: 410801, text: '市辖区'},
            {value: 410802, text: '解放区'},
            {value: 410803, text: '中站区'},
            {value: 410804, text: '马村区'},
            {value: 410811, text: '山阳区'},
            {value: 410821, text: '修武县'},
            {value: 410822, text: '博爱县'},
            {value: 410823, text: '武陟县'},
            {value: 410825, text: '温县'},
            {value: 410881, text: '济源市'},
            {value: 410882, text: '沁阳市'},
            {value: 410883, text: '孟州市'}
        ]},
        {value: 410900, text: '濮阳市', children: [
            {value: 410901, text: '市辖区'},
            {value: 410902, text: '华龙区'},
            {value: 410922, text: '清丰县'},
            {value: 410923, text: '南乐县'},
            {value: 410926, text: '范县'},
            {value: 410927, text: '台前县'},
            {value: 410928, text: '濮阳县'}
        ]},
        {value: 411000, text: '许昌市', children: [
            {value: 411001, text: '市辖区'},
            {value: 411002, text: '魏都区'},
            {value: 411023, text: '许昌县'},
            {value: 411024, text: '鄢陵县'},
            {value: 411025, text: '襄城县'},
            {value: 411081, text: '禹州市'},
            {value: 411082, text: '长葛市'}
        ]},
        {value: 411100, text: '漯河市', children: [
            {value: 411101, text: '市辖区'},
            {value: 411102, text: '源汇区'},
            {value: 411103, text: '郾城区'},
            {value: 411104, text: '召陵区'},
            {value: 411121, text: '舞阳县'},
            {value: 411122, text: '临颍县'}
        ]},
        {value: 411200, text: '三门峡市', children: [
            {value: 411201, text: '市辖区'},
            {value: 411202, text: '湖滨区'},
            {value: 411221, text: '渑池县'},
            {value: 411222, text: '陕县'},
            {value: 411224, text: '卢氏县'},
            {value: 411281, text: '义马市'},
            {value: 411282, text: '灵宝市'}
        ]},
        {value: 411300, text: '南阳市', children: [
            {value: 411301, text: '市辖区'},
            {value: 411302, text: '宛城区'},
            {value: 411303, text: '卧龙区'},
            {value: 411321, text: '南召县'},
            {value: 411322, text: '方城县'},
            {value: 411323, text: '西峡县'},
            {value: 411324, text: '镇平县'},
            {value: 411325, text: '内乡县'},
            {value: 411326, text: '淅川县'},
            {value: 411327, text: '社旗县'},
            {value: 411328, text: '唐河县'},
            {value: 411329, text: '新野县'},
            {value: 411330, text: '桐柏县'},
            {value: 411381, text: '邓州市'}
        ]},
        {value: 411400, text: '商丘市', children: [
            {value: 411401, text: '市辖区'},
            {value: 411402, text: '梁园区'},
            {value: 411403, text: '睢阳区'},
            {value: 411421, text: '民权县'},
            {value: 411422, text: '睢县'},
            {value: 411423, text: '宁陵县'},
            {value: 411424, text: '柘城县'},
            {value: 411425, text: '虞城县'},
            {value: 411426, text: '夏邑县'},
            {value: 411481, text: '永城市'}
        ]},
        {value: 411500, text: '信阳市', children: [
            {value: 411501, text: '市辖区'},
            {value: 411502, text: '浉河区'},
            {value: 411503, text: '平桥区'},
            {value: 411521, text: '罗山县'},
            {value: 411522, text: '光山县'},
            {value: 411523, text: '新县'},
            {value: 411524, text: '商城县'},
            {value: 411525, text: '固始县'},
            {value: 411526, text: '潢川县'},
            {value: 411527, text: '淮滨县'},
            {value: 411528, text: '息县'}
        ]},
        {value: 411600, text: '周口市', children: [
            {value: 411601, text: '市辖区'},
            {value: 411602, text: '川汇区'},
            {value: 411621, text: '扶沟县'},
            {value: 411622, text: '西华县'},
            {value: 411623, text: '商水县'},
            {value: 411624, text: '沈丘县'},
            {value: 411625, text: '郸城县'},
            {value: 411626, text: '淮阳县'},
            {value: 411627, text: '太康县'},
            {value: 411628, text: '鹿邑县'},
            {value: 411681, text: '项城市'}
        ]},
        {value: 411700, text: '驻马店市', children: [
            {value: 411701, text: '市辖区'},
            {value: 411702, text: '驿城区'},
            {value: 411721, text: '西平县'},
            {value: 411722, text: '上蔡县'},
            {value: 411723, text: '平舆县'},
            {value: 411724, text: '正阳县'},
            {value: 411725, text: '确山县'},
            {value: 411726, text: '泌阳县'},
            {value: 411727, text: '汝南县'},
            {value: 411728, text: '遂平县'},
            {value: 411729, text: '新蔡县'}
        ]}
    ]},
    {value: 420000, text: '湖北省', children: [
        {value: 420100, text: '武汉市', children: [
            {value: 420101, text: '市辖区'},
            {value: 420102, text: '江岸区'},
            {value: 420103, text: '江汉区'},
            {value: 420104, text: '硚口区'},
            {value: 420105, text: '汉阳区'},
            {value: 420106, text: '武昌区'},
            {value: 420107, text: '青山区'},
            {value: 420111, text: '洪山区'},
            {value: 420112, text: '东西湖区'},
            {value: 420113, text: '汉南区'},
            {value: 420114, text: '蔡甸区'},
            {value: 420115, text: '江夏区'},
            {value: 420116, text: '黄陂区'},
            {value: 420117, text: '新洲区'}
        ]},
        {value: 420200, text: '黄石市', children: [
            {value: 420201, text: '市辖区'},
            {value: 420202, text: '黄石港区'},
            {value: 420203, text: '西塞山区'},
            {value: 420204, text: '下陆区'},
            {value: 420205, text: '铁山区'},
            {value: 420222, text: '阳新县'},
            {value: 420281, text: '大冶市'}
        ]},
        {value: 420300, text: '十堰市', children: [
            {value: 420301, text: '市辖区'},
            {value: 420302, text: '茅箭区'},
            {value: 420303, text: '张湾区'},
            {value: 420321, text: '郧县'},
            {value: 420322, text: '郧西县'},
            {value: 420323, text: '竹山县'},
            {value: 420324, text: '竹溪县'},
            {value: 420325, text: '房县'},
            {value: 420381, text: '丹江口市'}
        ]},
        {value: 420500, text: '宜昌市', children: [
            {value: 420501, text: '市辖区'},
            {value: 420502, text: '西陵区'},
            {value: 420503, text: '伍家岗区'},
            {value: 420504, text: '点军区'},
            {value: 420505, text: '猇亭区'},
            {value: 420506, text: '夷陵区'},
            {value: 420525, text: '远安县'},
            {value: 420526, text: '兴山县'},
            {value: 420527, text: '秭归县'},
            {value: 420528, text: '长阳土家族自治县'},
            {value: 420529, text: '五峰土家族自治县'},
            {value: 420581, text: '宜都市'},
            {value: 420582, text: '当阳市'},
            {value: 420583, text: '枝江市'}
        ]},
        {value: 420600, text: '襄樊市', children: [
            {value: 420601, text: '市辖区'},
            {value: 420602, text: '襄城区'},
            {value: 420606, text: '樊城区'},
            {value: 420607, text: '襄阳区'},
            {value: 420624, text: '南漳县'},
            {value: 420625, text: '谷城县'},
            {value: 420626, text: '保康县'},
            {value: 420682, text: '老河口市'},
            {value: 420683, text: '枣阳市'},
            {value: 420684, text: '宜城市'}
        ]},
        {value: 420700, text: '鄂州市', children: [
            {value: 420701, text: '市辖区'},
            {value: 420702, text: '梁子湖区'},
            {value: 420703, text: '华容区'},
            {value: 420704, text: '鄂城区'}
        ]},
        {value: 420800, text: '荆门市', children: [
            {value: 420801, text: '市辖区'},
            {value: 420802, text: '东宝区'},
            {value: 420804, text: '掇刀区'},
            {value: 420821, text: '京山县'},
            {value: 420822, text: '沙洋县'},
            {value: 420881, text: '钟祥市'}
        ]},
        {value: 420900, text: '孝感市', children: [
            {value: 420901, text: '市辖区'},
            {value: 420902, text: '孝南区'},
            {value: 420921, text: '孝昌县'},
            {value: 420922, text: '大悟县'},
            {value: 420923, text: '云梦县'},
            {value: 420981, text: '应城市'},
            {value: 420982, text: '安陆市'},
            {value: 420984, text: '汉川市'}
        ]},
        {value: 421000, text: '荆州市', children: [
            {value: 421001, text: '市辖区'},
            {value: 421002, text: '沙市区'},
            {value: 421003, text: '荆州区'},
            {value: 421022, text: '公安县'},
            {value: 421023, text: '监利县'},
            {value: 421024, text: '江陵县'},
            {value: 421081, text: '石首市'},
            {value: 421083, text: '洪湖市'},
            {value: 421087, text: '松滋市'}
        ]},
        {value: 421100, text: '黄冈市', children: [
            {value: 421101, text: '市辖区'},
            {value: 421102, text: '黄州区'},
            {value: 421121, text: '团风县'},
            {value: 421122, text: '红安县'},
            {value: 421123, text: '罗田县'},
            {value: 421124, text: '英山县'},
            {value: 421125, text: '浠水县'},
            {value: 421126, text: '蕲春县'},
            {value: 421127, text: '黄梅县'},
            {value: 421181, text: '麻城市'},
            {value: 421182, text: '武穴市'}
        ]},
        {value: 421200, text: '咸宁市', children: [
            {value: 421201, text: '市辖区'},
            {value: 421202, text: '咸安区'},
            {value: 421221, text: '嘉鱼县'},
            {value: 421222, text: '通城县'},
            {value: 421223, text: '崇阳县'},
            {value: 421224, text: '通山县'},
            {value: 421281, text: '赤壁市'}
        ]},
        {value: 421300, text: '随州市', children: [
            {value: 421301, text: '市辖区'},
            {value: 421302, text: '曾都区'},
            {value: 421381, text: '广水市'}
        ]},
        {value: 422800, text: '恩施土家族苗族自治州', children: [
            {value: 422801, text: '恩施市'},
            {value: 422802, text: '利川市'},
            {value: 422822, text: '建始县'},
            {value: 422823, text: '巴东县'},
            {value: 422825, text: '宣恩县'},
            {value: 422826, text: '咸丰县'},
            {value: 422827, text: '来凤县'},
            {value: 422828, text: '鹤峰县'}
        ]},
        {value: 429000, text: '省直辖行政单位', children: [
            {value: 429004, text: '仙桃市'},
            {value: 429005, text: '潜江市'},
            {value: 429006, text: '天门市'},
            {value: 429021, text: '神农架林区'}
        ]}
    ]},
    {value: 430000, text: '湖南省', children: [
        {value: 430100, text: '长沙市', children: [
            {value: 430101, text: '市辖区'},
            {value: 430102, text: '芙蓉区'},
            {value: 430103, text: '天心区'},
            {value: 430104, text: '岳麓区'},
            {value: 430105, text: '开福区'},
            {value: 430111, text: '雨花区'},
            {value: 430121, text: '长沙县'},
            {value: 430122, text: '望城县'},
            {value: 430124, text: '宁乡县'},
            {value: 430181, text: '浏阳市'}
        ]},
        {value: 430200, text: '株洲市', children: [
            {value: 430201, text: '市辖区'},
            {value: 430202, text: '荷塘区'},
            {value: 430203, text: '芦淞区'},
            {value: 430204, text: '石峰区'},
            {value: 430211, text: '天元区'},
            {value: 430221, text: '株洲县'},
            {value: 430223, text: '攸县'},
            {value: 430224, text: '茶陵县'},
            {value: 430225, text: '炎陵县'},
            {value: 430281, text: '醴陵市'}
        ]},
        {value: 430300, text: '湘潭市', children: [
            {value: 430301, text: '市辖区'},
            {value: 430302, text: '雨湖区'},
            {value: 430304, text: '岳塘区'},
            {value: 430321, text: '湘潭县'},
            {value: 430381, text: '湘乡市'},
            {value: 430382, text: '韶山市'}
        ]},
        {value: 430400, text: '衡阳市', children: [
            {value: 430401, text: '市辖区'},
            {value: 430405, text: '珠晖区'},
            {value: 430406, text: '雁峰区'},
            {value: 430407, text: '石鼓区'},
            {value: 430408, text: '蒸湘区'},
            {value: 430412, text: '南岳区'},
            {value: 430421, text: '衡阳县'},
            {value: 430422, text: '衡南县'},
            {value: 430423, text: '衡山县'},
            {value: 430424, text: '衡东县'},
            {value: 430426, text: '祁东县'},
            {value: 430481, text: '耒阳市'},
            {value: 430482, text: '常宁市'}
        ]},
        {value: 430500, text: '邵阳市', children: [
            {value: 430501, text: '市辖区'},
            {value: 430502, text: '双清区'},
            {value: 430503, text: '大祥区'},
            {value: 430511, text: '北塔区'},
            {value: 430521, text: '邵东县'},
            {value: 430522, text: '新邵县'},
            {value: 430523, text: '邵阳县'},
            {value: 430524, text: '隆回县'},
            {value: 430525, text: '洞口县'},
            {value: 430527, text: '绥宁县'},
            {value: 430528, text: '新宁县'},
            {value: 430529, text: '城步苗族自治县'},
            {value: 430581, text: '武冈市'}
        ]},
        {value: 430600, text: '岳阳市', children: [
            {value: 430601, text: '市辖区'},
            {value: 430602, text: '岳阳楼区'},
            {value: 430603, text: '云溪区'},
            {value: 430611, text: '君山区'},
            {value: 430621, text: '岳阳县'},
            {value: 430623, text: '华容县'},
            {value: 430624, text: '湘阴县'},
            {value: 430626, text: '平江县'},
            {value: 430681, text: '汨罗市'},
            {value: 430682, text: '临湘市'}
        ]},
        {value: 430700, text: '常德市', children: [
            {value: 430701, text: '市辖区'},
            {value: 430702, text: '武陵区'},
            {value: 430703, text: '鼎城区'},
            {value: 430721, text: '安乡县'},
            {value: 430722, text: '汉寿县'},
            {value: 430723, text: '澧县'},
            {value: 430724, text: '临澧县'},
            {value: 430725, text: '桃源县'},
            {value: 430726, text: '石门县'},
            {value: 430781, text: '津市市'}
        ]},
        {value: 430800, text: '张家界市', children: [
            {value: 430801, text: '市辖区'},
            {value: 430802, text: '永定区'},
            {value: 430811, text: '武陵源区'},
            {value: 430821, text: '慈利县'},
            {value: 430822, text: '桑植县'}
        ]},
        {value: 430900, text: '益阳市', children: [
            {value: 430901, text: '市辖区'},
            {value: 430902, text: '资阳区'},
            {value: 430903, text: '赫山区'},
            {value: 430921, text: '南县'},
            {value: 430922, text: '桃江县'},
            {value: 430923, text: '安化县'},
            {value: 430981, text: '沅江市'}
        ]},
        {value: 431000, text: '郴州市', children: [
            {value: 431001, text: '市辖区'},
            {value: 431002, text: '北湖区'},
            {value: 431003, text: '苏仙区'},
            {value: 431021, text: '桂阳县'},
            {value: 431022, text: '宜章县'},
            {value: 431023, text: '永兴县'},
            {value: 431024, text: '嘉禾县'},
            {value: 431025, text: '临武县'},
            {value: 431026, text: '汝城县'},
            {value: 431027, text: '桂东县'},
            {value: 431028, text: '安仁县'},
            {value: 431081, text: '资兴市'}
        ]},
        {value: 431100, text: '永州市', children: [
            {value: 431101, text: '市辖区'},
            {value: 431102, text: '零陵区'},
            {value: 431103, text: '冷水滩区'},
            {value: 431121, text: '祁阳县'},
            {value: 431122, text: '东安县'},
            {value: 431123, text: '双牌县'},
            {value: 431124, text: '道县'},
            {value: 431125, text: '江永县'},
            {value: 431126, text: '宁远县'},
            {value: 431127, text: '蓝山县'},
            {value: 431128, text: '新田县'},
            {value: 431129, text: '江华瑶族自治县'}
        ]},
        {value: 431200, text: '怀化市', children: [
            {value: 431201, text: '市辖区'},
            {value: 431202, text: '鹤城区'},
            {value: 431221, text: '中方县'},
            {value: 431222, text: '沅陵县'},
            {value: 431223, text: '辰溪县'},
            {value: 431224, text: '溆浦县'},
            {value: 431225, text: '会同县'},
            {value: 431226, text: '麻阳苗族自治县'},
            {value: 431227, text: '新晃侗族自治县'},
            {value: 431228, text: '芷江侗族自治县'},
            {value: 431229, text: '靖州苗族侗族自治县'},
            {value: 431230, text: '通道侗族自治县'},
            {value: 431281, text: '洪江市'}
        ]},
        {value: 431300, text: '娄底市', children: [
            {value: 431301, text: '市辖区'},
            {value: 431302, text: '娄星区'},
            {value: 431321, text: '双峰县'},
            {value: 431322, text: '新化县'},
            {value: 431381, text: '冷水江市'},
            {value: 431382, text: '涟源市'}
        ]},
        {value: 433100, text: '湘西土家族苗族自治州', children: [
            {value: 433101, text: '吉首市'},
            {value: 433122, text: '泸溪县'},
            {value: 433123, text: '凤凰县'},
            {value: 433124, text: '花垣县'},
            {value: 433125, text: '保靖县'},
            {value: 433126, text: '古丈县'},
            {value: 433127, text: '永顺县'},
            {value: 433130, text: '龙山县'}
        ]}
    ]},
    {value: 440000, text: '广东省', children: [
        {value: 440100, text: '广州市', children: [
            {value: 440101, text: '市辖区'},
            {value: 440103, text: '荔湾区'},
            {value: 440104, text: '越秀区'},
            {value: 440105, text: '海珠区'},
            {value: 440106, text: '天河区'},
            {value: 440111, text: '白云区'},
            {value: 440112, text: '黄埔区'},
            {value: 440113, text: '番禺区'},
            {value: 440114, text: '花都区'},
            {value: 440115, text: '南沙区'},
            {value: 440116, text: '萝岗区'},
            {value: 440183, text: '增城市'},
            {value: 440184, text: '从化市'}
        ]},
        {value: 440200, text: '韶关市', children: [
            {value: 440201, text: '市辖区'},
            {value: 440203, text: '武江区'},
            {value: 440204, text: '浈江区'},
            {value: 440205, text: '曲江区'},
            {value: 440222, text: '始兴县'},
            {value: 440224, text: '仁化县'},
            {value: 440229, text: '翁源县'},
            {value: 440232, text: '乳源瑶族自治县'},
            {value: 440233, text: '新丰县'},
            {value: 440281, text: '乐昌市'},
            {value: 440282, text: '南雄市'}
        ]},
        {value: 440300, text: '深圳市', children: [
            {value: 440301, text: '市辖区'},
            {value: 440303, text: '罗湖区'},
            {value: 440304, text: '福田区'},
            {value: 440305, text: '南山区'},
            {value: 440306, text: '宝安区'},
            {value: 440307, text: '龙岗区'},
            {value: 440308, text: '盐田区'}
        ]},
        {value: 440400, text: '珠海市', children: [
            {value: 440401, text: '市辖区'},
            {value: 440402, text: '香洲区'},
            {value: 440403, text: '斗门区'},
            {value: 440404, text: '金湾区'}
        ]},
        {value: 440500, text: '汕头市', children: [
            {value: 440501, text: '市辖区'},
            {value: 440507, text: '龙湖区'},
            {value: 440511, text: '金平区'},
            {value: 440512, text: '濠江区'},
            {value: 440513, text: '潮阳区'},
            {value: 440514, text: '潮南区'},
            {value: 440515, text: '澄海区'},
            {value: 440523, text: '南澳县'}
        ]},
        {value: 440600, text: '佛山市', children: [
            {value: 440601, text: '市辖区'},
            {value: 440604, text: '禅城区'},
            {value: 440605, text: '南海区'},
            {value: 440606, text: '顺德区'},
            {value: 440607, text: '三水区'},
            {value: 440608, text: '高明区'}
        ]},
        {value: 440700, text: '江门市', children: [
            {value: 440701, text: '市辖区'},
            {value: 440703, text: '蓬江区'},
            {value: 440704, text: '江海区'},
            {value: 440705, text: '新会区'},
            {value: 440781, text: '台山市'},
            {value: 440783, text: '开平市'},
            {value: 440784, text: '鹤山市'},
            {value: 440785, text: '恩平市'}
        ]},
        {value: 440800, text: '湛江市', children: [
            {value: 440801, text: '市辖区'},
            {value: 440802, text: '赤坎区'},
            {value: 440803, text: '霞山区'},
            {value: 440804, text: '坡头区'},
            {value: 440811, text: '麻章区'},
            {value: 440823, text: '遂溪县'},
            {value: 440825, text: '徐闻县'},
            {value: 440881, text: '廉江市'},
            {value: 440882, text: '雷州市'},
            {value: 440883, text: '吴川市'}
        ]},
        {value: 440900, text: '茂名市', children: [
            {value: 440901, text: '市辖区'},
            {value: 440902, text: '茂南区'},
            {value: 440903, text: '茂港区'},
            {value: 440923, text: '电白县'},
            {value: 440981, text: '高州市'},
            {value: 440982, text: '化州市'},
            {value: 440983, text: '信宜市'}
        ]},
        {value: 441200, text: '肇庆市', children: [
            {value: 441201, text: '市辖区'},
            {value: 441202, text: '端州区'},
            {value: 441203, text: '鼎湖区'},
            {value: 441223, text: '广宁县'},
            {value: 441224, text: '怀集县'},
            {value: 441225, text: '封开县'},
            {value: 441226, text: '德庆县'},
            {value: 441283, text: '高要市'},
            {value: 441284, text: '四会市'}
        ]},
        {value: 441300, text: '惠州市', children: [
            {value: 441301, text: '市辖区'},
            {value: 441302, text: '惠城区'},
            {value: 441303, text: '惠阳区'},
            {value: 441322, text: '博罗县'},
            {value: 441323, text: '惠东县'},
            {value: 441324, text: '龙门县'}
        ]},
        {value: 441400, text: '梅州市', children: [
            {value: 441401, text: '市辖区'},
            {value: 441402, text: '梅江区'},
            {value: 441421, text: '梅县'},
            {value: 441422, text: '大埔县'},
            {value: 441423, text: '丰顺县'},
            {value: 441424, text: '五华县'},
            {value: 441426, text: '平远县'},
            {value: 441427, text: '蕉岭县'},
            {value: 441481, text: '兴宁市'}
        ]},
        {value: 441500, text: '汕尾市', children: [
            {value: 441501, text: '市辖区'},
            {value: 441502, text: '城区'},
            {value: 441521, text: '海丰县'},
            {value: 441523, text: '陆河县'},
            {value: 441581, text: '陆丰市'}
        ]},
        {value: 441600, text: '河源市', children: [
            {value: 441601, text: '市辖区'},
            {value: 441602, text: '源城区'},
            {value: 441621, text: '紫金县'},
            {value: 441622, text: '龙川县'},
            {value: 441623, text: '连平县'},
            {value: 441624, text: '和平县'},
            {value: 441625, text: '东源县'}
        ]},
        {value: 441700, text: '阳江市', children: [
            {value: 441701, text: '市辖区'},
            {value: 441702, text: '江城区'},
            {value: 441721, text: '阳西县'},
            {value: 441723, text: '阳东县'},
            {value: 441781, text: '阳春市'}
        ]},
        {value: 441800, text: '清远市', children: [
            {value: 441801, text: '市辖区'},
            {value: 441802, text: '清城区'},
            {value: 441821, text: '佛冈县'},
            {value: 441823, text: '阳山县'},
            {value: 441825, text: '连山壮族瑶族自治县'},
            {value: 441826, text: '连南瑶族自治县'},
            {value: 441827, text: '清新县'},
            {value: 441881, text: '英德市'},
            {value: 441882, text: '连州市'}
        ]},
        {value: 441900, text: '东莞市', children: [
            {value: 441901, text: '东莞市市辖区'}
        ]},
        {value: 442000, text: '中山市', children: [
            {value: 442001, text: '中山市市辖区'}
        ]},
        {value: 445100, text: '潮州市', children: [
            {value: 445101, text: '市辖区'},
            {value: 445102, text: '湘桥区'},
            {value: 445121, text: '潮安县'},
            {value: 445122, text: '饶平县'}
        ]},
        {value: 445200, text: '揭阳市', children: [
            {value: 445201, text: '市辖区'},
            {value: 445202, text: '榕城区'},
            {value: 445221, text: '揭东县'},
            {value: 445222, text: '揭西县'},
            {value: 445224, text: '惠来县'},
            {value: 445281, text: '普宁市'}
        ]},
        {value: 445300, text: '云浮市', children: [
            {value: 445301, text: '市辖区'},
            {value: 445302, text: '云城区'},
            {value: 445321, text: '新兴县'},
            {value: 445322, text: '郁南县'},
            {value: 445323, text: '云安县'},
            {value: 445381, text: '罗定市'}
        ]}
    ]},
    {value: 450000, text: '广西壮族自治区', children: [
        {value: 450100, text: '南宁市', children: [
            {value: 450101, text: '市辖区'},
            {value: 450102, text: '兴宁区'},
            {value: 450103, text: '青秀区'},
            {value: 450105, text: '江南区'},
            {value: 450107, text: '西乡塘区'},
            {value: 450108, text: '良庆区'},
            {value: 450109, text: '邕宁区'},
            {value: 450122, text: '武鸣县'},
            {value: 450123, text: '隆安县'},
            {value: 450124, text: '马山县'},
            {value: 450125, text: '上林县'},
            {value: 450126, text: '宾阳县'},
            {value: 450127, text: '横县'}
        ]},
        {value: 450200, text: '柳州市', children: [
            {value: 450201, text: '市辖区'},
            {value: 450202, text: '城中区'},
            {value: 450203, text: '鱼峰区'},
            {value: 450204, text: '柳南区'},
            {value: 450205, text: '柳北区'},
            {value: 450221, text: '柳江县'},
            {value: 450222, text: '柳城县'},
            {value: 450223, text: '鹿寨县'},
            {value: 450224, text: '融安县'},
            {value: 450225, text: '融水苗族自治县'},
            {value: 450226, text: '三江侗族自治县'}
        ]},
        {value: 450300, text: '桂林市', children: [
            {value: 450301, text: '市辖区'},
            {value: 450302, text: '秀峰区'},
            {value: 450303, text: '叠彩区'},
            {value: 450304, text: '象山区'},
            {value: 450305, text: '七星区'},
            {value: 450311, text: '雁山区'},
            {value: 450321, text: '阳朔县'},
            {value: 450322, text: '临桂县'},
            {value: 450323, text: '灵川县'},
            {value: 450324, text: '全州县'},
            {value: 450325, text: '兴安县'},
            {value: 450326, text: '永福县'},
            {value: 450327, text: '灌阳县'},
            {value: 450328, text: '龙胜各族自治县'},
            {value: 450329, text: '资源县'},
            {value: 450330, text: '平乐县'},
            {value: 450331, text: '荔蒲县'},
            {value: 450332, text: '恭城瑶族自治县'}
        ]},
        {value: 450400, text: '梧州市', children: [
            {value: 450401, text: '市辖区'},
            {value: 450403, text: '万秀区'},
            {value: 450404, text: '蝶山区'},
            {value: 450405, text: '长洲区'},
            {value: 450421, text: '苍梧县'},
            {value: 450422, text: '藤县'},
            {value: 450423, text: '蒙山县'},
            {value: 450481, text: '岑溪市'}
        ]},
        {value: 450500, text: '北海市', children: [
            {value: 450501, text: '市辖区'},
            {value: 450502, text: '海城区'},
            {value: 450503, text: '银海区'},
            {value: 450512, text: '铁山港区'},
            {value: 450521, text: '合浦县'}
        ]},
        {value: 450600, text: '防城港市', children: [
            {value: 450601, text: '市辖区'},
            {value: 450602, text: '港口区'},
            {value: 450603, text: '防城区'},
            {value: 450621, text: '上思县'},
            {value: 450681, text: '东兴市'}
        ]},
        {value: 450700, text: '钦州市', children: [
            {value: 450701, text: '市辖区'},
            {value: 450702, text: '钦南区'},
            {value: 450703, text: '钦北区'},
            {value: 450721, text: '灵山县'},
            {value: 450722, text: '浦北县'}
        ]},
        {value: 450800, text: '贵港市', children: [
            {value: 450801, text: '市辖区'},
            {value: 450802, text: '港北区'},
            {value: 450803, text: '港南区'},
            {value: 450804, text: '覃塘区'},
            {value: 450821, text: '平南县'},
            {value: 450881, text: '桂平市'}
        ]},
        {value: 450900, text: '玉林市', children: [
            {value: 450901, text: '市辖区'},
            {value: 450902, text: '玉州区'},
            {value: 450921, text: '容县'},
            {value: 450922, text: '陆川县'},
            {value: 450923, text: '博白县'},
            {value: 450924, text: '兴业县'},
            {value: 450981, text: '北流市'}
        ]},
        {value: 451000, text: '百色市', children: [
            {value: 451001, text: '市辖区'},
            {value: 451002, text: '右江区'},
            {value: 451021, text: '田阳县'},
            {value: 451022, text: '田东县'},
            {value: 451023, text: '平果县'},
            {value: 451024, text: '德保县'},
            {value: 451025, text: '靖西县'},
            {value: 451026, text: '那坡县'},
            {value: 451027, text: '凌云县'},
            {value: 451028, text: '乐业县'},
            {value: 451029, text: '田林县'},
            {value: 451030, text: '西林县'},
            {value: 451031, text: '隆林各族自治县'}
        ]},
        {value: 451100, text: '贺州市', children: [
            {value: 451101, text: '市辖区'},
            {value: 451102, text: '八步区'},
            {value: 451121, text: '昭平县'},
            {value: 451122, text: '钟山县'},
            {value: 451123, text: '富川瑶族自治县'}
        ]},
        {value: 451200, text: '河池市', children: [
            {value: 451201, text: '市辖区'},
            {value: 451202, text: '金城江区'},
            {value: 451221, text: '南丹县'},
            {value: 451222, text: '天峨县'},
            {value: 451223, text: '凤山县'},
            {value: 451224, text: '东兰县'},
            {value: 451225, text: '罗城仫佬族自治县'},
            {value: 451226, text: '环江毛南族自治县'},
            {value: 451227, text: '巴马瑶族自治县'},
            {value: 451228, text: '都安瑶族自治县'},
            {value: 451229, text: '大化瑶族自治县'},
            {value: 451281, text: '宜州市'}
        ]},
        {value: 451300, text: '来宾市', children: [
            {value: 451301, text: '市辖区'},
            {value: 451302, text: '兴宾区'},
            {value: 451321, text: '忻城县'},
            {value: 451322, text: '象州县'},
            {value: 451323, text: '武宣县'},
            {value: 451324, text: '金秀瑶族自治县'},
            {value: 451381, text: '合山市'}
        ]},
        {value: 451400, text: '崇左市', children: [
            {value: 451401, text: '市辖区'},
            {value: 451402, text: '江洲区'},
            {value: 451421, text: '扶绥县'},
            {value: 451422, text: '宁明县'},
            {value: 451423, text: '龙州县'},
            {value: 451424, text: '大新县'},
            {value: 451425, text: '天等县'},
            {value: 451481, text: '凭祥市'}
        ]}
    ]},
    {value: 460000, text: '海南省', children: [
        {value: 460100, text: '海口市', children: [
            {value: 460101, text: '市辖区'},
            {value: 460105, text: '秀英区'},
            {value: 460106, text: '龙华区'},
            {value: 460107, text: '琼山区'},
            {value: 460108, text: '美兰区'}
        ]},
        {value: 460200, text: '三亚市', children: [
            {value: 460201, text: '市辖区'}
        ]},
        {value: 469000, text: '省直辖县级行政单位', children: [
            {value: 469001, text: '五指山市'},
            {value: 469002, text: '琼海市'},
            {value: 469003, text: '儋州市'},
            {value: 469005, text: '文昌市'},
            {value: 469006, text: '万宁市'},
            {value: 469007, text: '东方市'},
            {value: 469025, text: '定安县'},
            {value: 469026, text: '屯昌县'},
            {value: 469027, text: '澄迈县'},
            {value: 469028, text: '临高县'},
            {value: 469030, text: '白沙黎族自治县'},
            {value: 469031, text: '昌江黎族自治县'},
            {value: 469033, text: '乐东黎族自治县'},
            {value: 469034, text: '陵水黎族自治县'},
            {value: 469035, text: '保亭黎族苗族自治县'},
            {value: 469036, text: '琼中黎族苗族自治县'},
            {value: 469037, text: '西沙群岛'},
            {value: 469038, text: '南沙群岛'},
            {value: 469039, text: '中沙群岛的岛礁及其海域'}
        ]}
    ]},
    {value: 500000, text: '重庆市', children: [
        {value: 500100, text: '市辖区', children: [
            {value: 500101, text: '万州区'},
            {value: 500102, text: '涪陵区'},
            {value: 500103, text: '渝中区'},
            {value: 500104, text: '大渡口区'},
            {value: 500105, text: '江北区'},
            {value: 500106, text: '沙坪坝区'},
            {value: 500107, text: '九龙坡区'},
            {value: 500108, text: '南岸区'},
            {value: 500109, text: '北碚区'},
            {value: 500110, text: '万盛区'},
            {value: 500111, text: '双桥区'},
            {value: 500112, text: '渝北区'},
            {value: 500113, text: '巴南区'},
            {value: 500114, text: '黔江区'},
            {value: 500115, text: '长寿区'},
            {value: 500116, text: '江津区'},
            {value: 500117, text: '合川区'},
            {value: 500118, text: '永川区'},
            {value: 500119, text: '南川区'}
        ]},
        {value: 500200, text: '县', children: [
            {value: 500222, text: '綦江县'},
            {value: 500223, text: '潼南县'},
            {value: 500224, text: '铜梁县'},
            {value: 500225, text: '大足县'},
            {value: 500226, text: '荣昌县'},
            {value: 500227, text: '璧山县'},
            {value: 500228, text: '梁平县'},
            {value: 500229, text: '城口县'},
            {value: 500230, text: '丰都县'},
            {value: 500231, text: '垫江县'},
            {value: 500232, text: '武隆县'},
            {value: 500233, text: '忠县'},
            {value: 500234, text: '开县'},
            {value: 500235, text: '云阳县'},
            {value: 500236, text: '奉节县'},
            {value: 500237, text: '巫山县'},
            {value: 500238, text: '巫溪县'},
            {value: 500240, text: '石柱土家族自治县'},
            {value: 500241, text: '秀山土家族苗族自治县'},
            {value: 500242, text: '酉阳土家族苗族自治县'},
            {value: 500243, text: '彭水苗族土家族自治县'}
        ]}
    ]},
    {value: 510000, text: '四川省', children: [
        {value: 510100, text: '成都市', children: [
            {value: 510101, text: '市辖区'},
            {value: 510104, text: '锦江区'},
            {value: 510105, text: '青羊区'},
            {value: 510106, text: '金牛区'},
            {value: 510107, text: '武侯区'},
            {value: 510108, text: '成华区'},
            {value: 510112, text: '龙泉驿区'},
            {value: 510113, text: '青白江区'},
            {value: 510114, text: '新都区'},
            {value: 510115, text: '温江区'},
            {value: 510121, text: '金堂县'},
            {value: 510122, text: '双流县'},
            {value: 510124, text: '郫县'},
            {value: 510129, text: '大邑县'},
            {value: 510131, text: '蒲江县'},
            {value: 510132, text: '新津县'},
            {value: 510181, text: '都江堰市'},
            {value: 510182, text: '彭州市'},
            {value: 510183, text: '邛崃市'},
            {value: 510184, text: '崇州市'}
        ]},
        {value: 510300, text: '自贡市', children: [
            {value: 510301, text: '市辖区'},
            {value: 510302, text: '自流井区'},
            {value: 510303, text: '贡井区'},
            {value: 510304, text: '大安区'},
            {value: 510311, text: '沿滩区'},
            {value: 510321, text: '荣县'},
            {value: 510322, text: '富顺县'}
        ]},
        {value: 510400, text: '攀枝花市', children: [
            {value: 510401, text: '市辖区'},
            {value: 510402, text: '东区'},
            {value: 510403, text: '西区'},
            {value: 510411, text: '仁和区'},
            {value: 510421, text: '米易县'},
            {value: 510422, text: '盐边县'}
        ]},
        {value: 510500, text: '泸州市', children: [
            {value: 510501, text: '市辖区'},
            {value: 510502, text: '江阳区'},
            {value: 510503, text: '纳溪区'},
            {value: 510504, text: '龙马潭区'},
            {value: 510521, text: '泸县'},
            {value: 510522, text: '合江县'},
            {value: 510524, text: '叙永县'},
            {value: 510525, text: '古蔺县'}
        ]},
        {value: 510600, text: '德阳市', children: [
            {value: 510601, text: '市辖区'},
            {value: 510603, text: '旌阳区'},
            {value: 510623, text: '中江县'},
            {value: 510626, text: '罗江县'},
            {value: 510681, text: '广汉市'},
            {value: 510682, text: '什邡市'},
            {value: 510683, text: '绵竹市'}
        ]},
        {value: 510700, text: '绵阳市', children: [
            {value: 510701, text: '市辖区'},
            {value: 510703, text: '涪城区'},
            {value: 510704, text: '游仙区'},
            {value: 510722, text: '三台县'},
            {value: 510723, text: '盐亭县'},
            {value: 510724, text: '安县'},
            {value: 510725, text: '梓潼县'},
            {value: 510726, text: '北川羌族自治县'},
            {value: 510727, text: '平武县'},
            {value: 510781, text: '江油市'}
        ]},
        {value: 510800, text: '广元市', children: [
            {value: 510801, text: '市辖区'},
            {value: 510802, text: '市中区'},
            {value: 510811, text: '元坝区'},
            {value: 510812, text: '朝天区'},
            {value: 510821, text: '旺苍县'},
            {value: 510822, text: '青川县'},
            {value: 510823, text: '剑阁县'},
            {value: 510824, text: '苍溪县'}
        ]},
        {value: 510900, text: '遂宁市', children: [
            {value: 510901, text: '市辖区'},
            {value: 510903, text: '船山区'},
            {value: 510904, text: '安居区'},
            {value: 510921, text: '蓬溪县'},
            {value: 510922, text: '射洪县'},
            {value: 510923, text: '大英县'}
        ]},
        {value: 511000, text: '内江市', children: [
            {value: 511001, text: '市辖区'},
            {value: 511002, text: '市中区'},
            {value: 511011, text: '东兴区'},
            {value: 511024, text: '威远县'},
            {value: 511025, text: '资中县'},
            {value: 511028, text: '隆昌县'}
        ]},
        {value: 511100, text: '乐山市', children: [
            {value: 511101, text: '市辖区'},
            {value: 511102, text: '市中区'},
            {value: 511111, text: '沙湾区'},
            {value: 511112, text: '五通桥区'},
            {value: 511113, text: '金口河区'},
            {value: 511123, text: '犍为县'},
            {value: 511124, text: '井研县'},
            {value: 511126, text: '夹江县'},
            {value: 511129, text: '沐川县'},
            {value: 511132, text: '峨边彝族自治县'},
            {value: 511133, text: '马边彝族自治县'},
            {value: 511181, text: '峨眉山市'}
        ]},
        {value: 511300, text: '南充市', children: [
            {value: 511301, text: '市辖区'},
            {value: 511302, text: '顺庆区'},
            {value: 511303, text: '高坪区'},
            {value: 511304, text: '嘉陵区'},
            {value: 511321, text: '南部县'},
            {value: 511322, text: '营山县'},
            {value: 511323, text: '蓬安县'},
            {value: 511324, text: '仪陇县'},
            {value: 511325, text: '西充县'},
            {value: 511381, text: '阆中市'}
        ]},
        {value: 511400, text: '眉山市', children: [
            {value: 511401, text: '市辖区'},
            {value: 511402, text: '东坡区'},
            {value: 511421, text: '仁寿县'},
            {value: 511422, text: '彭山县'},
            {value: 511423, text: '洪雅县'},
            {value: 511424, text: '丹棱县'},
            {value: 511425, text: '青神县'}
        ]},
        {value: 511500, text: '宜宾市', children: [
            {value: 511501, text: '市辖区'},
            {value: 511502, text: '翠屏区'},
            {value: 511521, text: '宜宾县'},
            {value: 511522, text: '南溪县'},
            {value: 511523, text: '江安县'},
            {value: 511524, text: '长宁县'},
            {value: 511525, text: '高县'},
            {value: 511526, text: '珙县'},
            {value: 511527, text: '筠连县'},
            {value: 511528, text: '兴文县'},
            {value: 511529, text: '屏山县'}
        ]},
        {value: 511600, text: '广安市', children: [
            {value: 511601, text: '市辖区'},
            {value: 511602, text: '广安区'},
            {value: 511621, text: '岳池县'},
            {value: 511622, text: '武胜县'},
            {value: 511623, text: '邻水县'},
            {value: 511681, text: '华蓥市'}
        ]},
        {value: 511700, text: '达州市', children: [
            {value: 511701, text: '市辖区'},
            {value: 511702, text: '通川区'},
            {value: 511721, text: '达县'},
            {value: 511722, text: '宣汉县'},
            {value: 511723, text: '开江县'},
            {value: 511724, text: '大竹县'},
            {value: 511725, text: '渠县'},
            {value: 511781, text: '万源市'}
        ]},
        {value: 511800, text: '雅安市', children: [
            {value: 511801, text: '市辖区'},
            {value: 511802, text: '雨城区'},
            {value: 511821, text: '名山县'},
            {value: 511822, text: '荥经县'},
            {value: 511823, text: '汉源县'},
            {value: 511824, text: '石棉县'},
            {value: 511825, text: '天全县'},
            {value: 511826, text: '芦山县'},
            {value: 511827, text: '宝兴县'}
        ]},
        {value: 511900, text: '巴中市', children: [
            {value: 511901, text: '市辖区'},
            {value: 511902, text: '巴州区'},
            {value: 511921, text: '通江县'},
            {value: 511922, text: '南江县'},
            {value: 511923, text: '平昌县'}
        ]},
        {value: 512000, text: '资阳市', children: [
            {value: 512001, text: '市辖区'},
            {value: 512002, text: '雁江区'},
            {value: 512021, text: '安岳县'},
            {value: 512022, text: '乐至县'},
            {value: 512081, text: '简阳市'}
        ]},
        {value: 513200, text: '阿坝藏族羌族自治州', children: [
            {value: 513221, text: '汶川县'},
            {value: 513222, text: '理县'},
            {value: 513223, text: '茂县'},
            {value: 513224, text: '松潘县'},
            {value: 513225, text: '九寨沟县'},
            {value: 513226, text: '金川县'},
            {value: 513227, text: '小金县'},
            {value: 513228, text: '黑水县'},
            {value: 513229, text: '马尔康县'},
            {value: 513230, text: '壤塘县'},
            {value: 513231, text: '阿坝县'},
            {value: 513232, text: '若尔盖县'},
            {value: 513233, text: '红原县'}
        ]},
        {value: 513300, text: '甘孜藏族自治州', children: [
            {value: 513321, text: '康定县'},
            {value: 513322, text: '泸定县'},
            {value: 513323, text: '丹巴县'},
            {value: 513324, text: '九龙县'},
            {value: 513325, text: '雅江县'},
            {value: 513326, text: '道孚县'},
            {value: 513327, text: '炉霍县'},
            {value: 513328, text: '甘孜县'},
            {value: 513329, text: '新龙县'},
            {value: 513330, text: '德格县'},
            {value: 513331, text: '白玉县'},
            {value: 513332, text: '石渠县'},
            {value: 513333, text: '色达县'},
            {value: 513334, text: '理塘县'},
            {value: 513335, text: '巴塘县'},
            {value: 513336, text: '乡城县'},
            {value: 513337, text: '稻城县'},
            {value: 513338, text: '得荣县'}
        ]},
        {value: 513400, text: '凉山彝族自治州', children: [
            {value: 513401, text: '西昌市'},
            {value: 513422, text: '木里藏族自治县'},
            {value: 513423, text: '盐源县'},
            {value: 513424, text: '德昌县'},
            {value: 513425, text: '会理县'},
            {value: 513426, text: '会东县'},
            {value: 513427, text: '宁南县'},
            {value: 513428, text: '普格县'},
            {value: 513429, text: '布拖县'},
            {value: 513430, text: '金阳县'},
            {value: 513431, text: '昭觉县'},
            {value: 513432, text: '喜德县'},
            {value: 513433, text: '冕宁县'},
            {value: 513434, text: '越西县'},
            {value: 513435, text: '甘洛县'},
            {value: 513436, text: '美姑县'},
            {value: 513437, text: '雷波县'}
        ]}
    ]},
    {value: 520000, text: '贵州省', children: [
        {value: 520100, text: '贵阳市', children: [
            {value: 520101, text: '市辖区'},
            {value: 520102, text: '南明区'},
            {value: 520103, text: '云岩区'},
            {value: 520111, text: '花溪区'},
            {value: 520112, text: '乌当区'},
            {value: 520113, text: '白云区'},
            {value: 520114, text: '小河区'},
            {value: 520121, text: '开阳县'},
            {value: 520122, text: '息烽县'},
            {value: 520123, text: '修文县'},
            {value: 520181, text: '清镇市'}
        ]},
        {value: 520200, text: '六盘水市', children: [
            {value: 520201, text: '钟山区'},
            {value: 520203, text: '六枝特区'},
            {value: 520221, text: '水城县'},
            {value: 520222, text: '盘县'}
        ]},
        {value: 520300, text: '遵义市', children: [
            {value: 520301, text: '市辖区'},
            {value: 520302, text: '红花岗区'},
            {value: 520303, text: '汇川区'},
            {value: 520321, text: '遵义县'},
            {value: 520322, text: '桐梓县'},
            {value: 520323, text: '绥阳县'},
            {value: 520324, text: '正安县'},
            {value: 520325, text: '道真仡佬族苗族自治县'},
            {value: 520326, text: '务川仡佬族苗族自治县'},
            {value: 520327, text: '凤冈县'},
            {value: 520328, text: '湄潭县'},
            {value: 520329, text: '余庆县'},
            {value: 520330, text: '习水县'},
            {value: 520381, text: '赤水市'},
            {value: 520382, text: '仁怀市'}
        ]},
        {value: 520400, text: '安顺市', children: [
            {value: 520401, text: '市辖区'},
            {value: 520402, text: '西秀区'},
            {value: 520421, text: '平坝县'},
            {value: 520422, text: '普定县'},
            {value: 520423, text: '镇宁布依族苗族自治县'},
            {value: 520424, text: '关岭布依族苗族自治县'},
            {value: 520425, text: '紫云苗族布依族自治县'}
        ]},
        {value: 522200, text: '铜仁地区', children: [
            {value: 522201, text: '铜仁市'},
            {value: 522222, text: '江口县'},
            {value: 522223, text: '玉屏侗族自治县'},
            {value: 522224, text: '石阡县'},
            {value: 522225, text: '思南县'},
            {value: 522226, text: '印江土家族苗族自治县'},
            {value: 522227, text: '德江县'},
            {value: 522228, text: '沿河土家族自治县'},
            {value: 522229, text: '松桃苗族自治县'},
            {value: 522230, text: '万山特区'}
        ]},
        {value: 522300, text: '黔西南布依族苗族自治州', children: [
            {value: 522301, text: '兴义市'},
            {value: 522322, text: '兴仁县'},
            {value: 522323, text: '普安县'},
            {value: 522324, text: '晴隆县'},
            {value: 522325, text: '贞丰县'},
            {value: 522326, text: '望谟县'},
            {value: 522327, text: '册亨县'},
            {value: 522328, text: '安龙县'}
        ]},
        {value: 522400, text: '毕节地区', children: [
            {value: 522401, text: '毕节市'},
            {value: 522422, text: '大方县'},
            {value: 522423, text: '黔西县'},
            {value: 522424, text: '金沙县'},
            {value: 522425, text: '织金县'},
            {value: 522426, text: '纳雍县'},
            {value: 522427, text: '威宁彝族回族苗族自治县'},
            {value: 522428, text: '赫章县'}
        ]},
        {value: 522600, text: '黔东南苗族侗族自治州', children: [
            {value: 522601, text: '凯里市'},
            {value: 522622, text: '黄平县'},
            {value: 522623, text: '施秉县'},
            {value: 522624, text: '三穗县'},
            {value: 522625, text: '镇远县'},
            {value: 522626, text: '岑巩县'},
            {value: 522627, text: '天柱县'},
            {value: 522628, text: '锦屏县'},
            {value: 522629, text: '剑河县'},
            {value: 522630, text: '台江县'},
            {value: 522631, text: '黎平县'},
            {value: 522632, text: '榕江县'},
            {value: 522633, text: '从江县'},
            {value: 522634, text: '雷山县'},
            {value: 522635, text: '麻江县'},
            {value: 522636, text: '丹寨县'}
        ]},
        {value: 522700, text: '黔南布依族苗族自治州', children: [
            {value: 522701, text: '都匀市'},
            {value: 522702, text: '福泉市'},
            {value: 522722, text: '荔波县'},
            {value: 522723, text: '贵定县'},
            {value: 522725, text: '瓮安县'},
            {value: 522726, text: '独山县'},
            {value: 522727, text: '平塘县'},
            {value: 522728, text: '罗甸县'},
            {value: 522729, text: '长顺县'},
            {value: 522730, text: '龙里县'},
            {value: 522731, text: '惠水县'},
            {value: 522732, text: '三都水族自治县'}
        ]}
    ]},
    {value: 530000, text: '云南省', children: [
        {value: 530100, text: '昆明市', children: [
            {value: 530101, text: '市辖区'},
            {value: 530102, text: '五华区'},
            {value: 530103, text: '盘龙区'},
            {value: 530111, text: '官渡区'},
            {value: 530112, text: '西山区'},
            {value: 530113, text: '东川区'},
            {value: 530121, text: '呈贡县'},
            {value: 530122, text: '晋宁县'},
            {value: 530124, text: '富民县'},
            {value: 530125, text: '宜良县'},
            {value: 530126, text: '石林彝族自治县'},
            {value: 530127, text: '嵩明县'},
            {value: 530128, text: '禄劝彝族苗族自治县'},
            {value: 530129, text: '寻甸回族彝族自治县'},
            {value: 530181, text: '安宁市'}
        ]},
        {value: 530300, text: '曲靖市', children: [
            {value: 530301, text: '市辖区'},
            {value: 530302, text: '麒麟区'},
            {value: 530321, text: '马龙县'},
            {value: 530322, text: '陆良县'},
            {value: 530323, text: '师宗县'},
            {value: 530324, text: '罗平县'},
            {value: 530325, text: '富源县'},
            {value: 530326, text: '会泽县'},
            {value: 530328, text: '沾益县'},
            {value: 530381, text: '宣威市'}
        ]},
        {value: 530400, text: '玉溪市', children: [
            {value: 530401, text: '市辖区'},
            {value: 530402, text: '红塔区'},
            {value: 530421, text: '江川县'},
            {value: 530422, text: '澄江县'},
            {value: 530423, text: '通海县'},
            {value: 530424, text: '华宁县'},
            {value: 530425, text: '易门县'},
            {value: 530426, text: '峨山彝族自治县'},
            {value: 530427, text: '新平彝族傣族自治县'},
            {value: 530428, text: '元江哈尼族彝族傣族自治县'}
        ]},
        {value: 530500, text: '保山市', children: [
            {value: 530501, text: '市辖区'},
            {value: 530502, text: '隆阳区'},
            {value: 530521, text: '施甸县'},
            {value: 530522, text: '腾冲县'},
            {value: 530523, text: '龙陵县'},
            {value: 530524, text: '昌宁县'}
        ]},
        {value: 530600, text: '昭通市', children: [
            {value: 530601, text: '市辖区'},
            {value: 530602, text: '昭阳区'},
            {value: 530621, text: '鲁甸县'},
            {value: 530622, text: '巧家县'},
            {value: 530623, text: '盐津县'},
            {value: 530624, text: '大关县'},
            {value: 530625, text: '永善县'},
            {value: 530626, text: '绥江县'},
            {value: 530627, text: '镇雄县'},
            {value: 530628, text: '彝良县'},
            {value: 530629, text: '威信县'},
            {value: 530630, text: '水富县'}
        ]},
        {value: 530700, text: '丽江市', children: [
            {value: 530701, text: '市辖区'},
            {value: 530702, text: '古城区'},
            {value: 530721, text: '玉龙纳西族自治县'},
            {value: 530722, text: '永胜县'},
            {value: 530723, text: '华坪县'},
            {value: 530724, text: '宁蒗彝族自治县'}
        ]},
        {value: 530800, text: '普洱市      ', children: [
            {value: 530801, text: '市辖区'},
            {value: 530802, text: '思茅区      '},
            {value: 530821, text: '宁洱哈尼族彝族自治县      '},
            {value: 530822, text: '墨江哈尼族自治县'},
            {value: 530823, text: '景东彝族自治县'},
            {value: 530824, text: '景谷傣族彝族自治县'},
            {value: 530825, text: '镇沅彝族哈尼族拉祜族自治县'},
            {value: 530826, text: '江城哈尼族彝族自治县'},
            {value: 530827, text: '孟连傣族拉祜族佤族自治县'},
            {value: 530828, text: '澜沧拉祜族自治县'},
            {value: 530829, text: '西盟佤族自治县'}
        ]},
        {value: 530900, text: '临沧市', children: [
            {value: 530901, text: '市辖区'},
            {value: 530902, text: '临翔区'},
            {value: 530921, text: '凤庆县'},
            {value: 530922, text: '云县'},
            {value: 530923, text: '永德县'},
            {value: 530924, text: '镇康县'},
            {value: 530925, text: '双江拉祜族佤族布朗族傣族自治县'},
            {value: 530926, text: '耿马傣族佤族自治县'},
            {value: 530927, text: '沧源佤族自治县'}
        ]},
        {value: 532300, text: '楚雄彝族自治州', children: [
            {value: 532301, text: '楚雄市'},
            {value: 532322, text: '双柏县'},
            {value: 532323, text: '牟定县'},
            {value: 532324, text: '南华县'},
            {value: 532325, text: '姚安县'},
            {value: 532326, text: '大姚县'},
            {value: 532327, text: '永仁县'},
            {value: 532328, text: '元谋县'},
            {value: 532329, text: '武定县'},
            {value: 532331, text: '禄丰县'}
        ]},
        {value: 532500, text: '红河哈尼族彝族自治州', children: [
            {value: 532501, text: '个旧市'},
            {value: 532502, text: '开远市'},
            {value: 532522, text: '蒙自县'},
            {value: 532523, text: '屏边苗族自治县'},
            {value: 532524, text: '建水县'},
            {value: 532525, text: '石屏县'},
            {value: 532526, text: '弥勒县'},
            {value: 532527, text: '泸西县'},
            {value: 532528, text: '元阳县'},
            {value: 532529, text: '红河县'},
            {value: 532530, text: '金平苗族瑶族傣族自治县'},
            {value: 532531, text: '绿春县'},
            {value: 532532, text: '河口瑶族自治县'}
        ]},
        {value: 532600, text: '文山壮族苗族自治州', children: [
            {value: 532621, text: '文山县'},
            {value: 532622, text: '砚山县'},
            {value: 532623, text: '西畴县'},
            {value: 532624, text: '麻栗坡县'},
            {value: 532625, text: '马关县'},
            {value: 532626, text: '丘北县'},
            {value: 532627, text: '广南县'},
            {value: 532628, text: '富宁县'}
        ]},
        {value: 532800, text: '西双版纳傣族自治州', children: [
            {value: 532801, text: '景洪市'},
            {value: 532822, text: '勐海县'},
            {value: 532823, text: '勐腊县'}
        ]},
        {value: 532900, text: '大理白族自治州', children: [
            {value: 532901, text: '大理市'},
            {value: 532922, text: '漾濞彝族自治县'},
            {value: 532923, text: '祥云县'},
            {value: 532924, text: '宾川县'},
            {value: 532925, text: '弥渡县'},
            {value: 532926, text: '南涧彝族自治县'},
            {value: 532927, text: '巍山彝族回族自治县'},
            {value: 532928, text: '永平县'},
            {value: 532929, text: '云龙县'},
            {value: 532930, text: '洱源县'},
            {value: 532931, text: '剑川县'},
            {value: 532932, text: '鹤庆县'}
        ]},
        {value: 533100, text: '德宏傣族景颇族自治州', children: [
            {value: 533102, text: '瑞丽市'},
            {value: 533103, text: '潞西市'},
            {value: 533122, text: '梁河县'},
            {value: 533123, text: '盈江县'},
            {value: 533124, text: '陇川县'}
        ]},
        {value: 533300, text: '怒江傈僳族自治州', children: [
            {value: 533321, text: '泸水县'},
            {value: 533323, text: '福贡县'},
            {value: 533324, text: '贡山独龙族怒族自治县'},
            {value: 533325, text: '兰坪白族普米族自治县'}
        ]},
        {value: 533400, text: '迪庆藏族自治州', children: [
            {value: 533421, text: '香格里拉县'},
            {value: 533422, text: '德钦县'},
            {value: 533423, text: '维西傈僳族自治县'}
        ]}
    ]},
    {value: 540000, text: '西藏自治区', children: [
        {value: 540100, text: '拉萨市', children: [
            {value: 540101, text: '市辖区'},
            {value: 540102, text: '城关区'},
            {value: 540121, text: '林周县'},
            {value: 540122, text: '当雄县'},
            {value: 540123, text: '尼木县'},
            {value: 540124, text: '曲水县'},
            {value: 540125, text: '堆龙德庆县'},
            {value: 540126, text: '达孜县'},
            {value: 540127, text: '墨竹工卡县'}
        ]},
        {value: 542100, text: '昌都地区', children: [
            {value: 542121, text: '昌都县'},
            {value: 542122, text: '江达县'},
            {value: 542123, text: '贡觉县'},
            {value: 542124, text: '类乌齐县'},
            {value: 542125, text: '丁青县'},
            {value: 542126, text: '察雅县'},
            {value: 542127, text: '八宿县'},
            {value: 542128, text: '左贡县'},
            {value: 542129, text: '芒康县'},
            {value: 542132, text: '洛隆县'},
            {value: 542133, text: '边坝县'}
        ]},
        {value: 542200, text: '山南地区', children: [
            {value: 542221, text: '乃东县'},
            {value: 542222, text: '扎囊县'},
            {value: 542223, text: '贡嘎县'},
            {value: 542224, text: '桑日县'},
            {value: 542225, text: '琼结县'},
            {value: 542226, text: '曲松县'},
            {value: 542227, text: '措美县'},
            {value: 542228, text: '洛扎县'},
            {value: 542229, text: '加查县'},
            {value: 542231, text: '隆子县'},
            {value: 542232, text: '错那县'},
            {value: 542233, text: '浪卡子县'}
        ]},
        {value: 542300, text: '日喀则地区', children: [
            {value: 542301, text: '日喀则市'},
            {value: 542322, text: '南木林县'},
            {value: 542323, text: '江孜县'},
            {value: 542324, text: '定日县'},
            {value: 542325, text: '萨迦县'},
            {value: 542326, text: '拉孜县'},
            {value: 542327, text: '昂仁县'},
            {value: 542328, text: '谢通门县'},
            {value: 542329, text: '白朗县'},
            {value: 542330, text: '仁布县'},
            {value: 542331, text: '康马县'},
            {value: 542332, text: '定结县'},
            {value: 542333, text: '仲巴县'},
            {value: 542334, text: '亚东县'},
            {value: 542335, text: '吉隆县'},
            {value: 542336, text: '聂拉木县'},
            {value: 542337, text: '萨嘎县'},
            {value: 542338, text: '岗巴县'}
        ]},
        {value: 542400, text: '那曲地区', children: [
            {value: 542421, text: '那曲县'},
            {value: 542422, text: '嘉黎县'},
            {value: 542423, text: '比如县'},
            {value: 542424, text: '聂荣县'},
            {value: 542425, text: '安多县'},
            {value: 542426, text: '申扎县'},
            {value: 542427, text: '索县'},
            {value: 542428, text: '班戈县'},
            {value: 542429, text: '巴青县'},
            {value: 542430, text: '尼玛县'}
        ]},
        {value: 542500, text: '阿里地区', children: [
            {value: 542521, text: '普兰县'},
            {value: 542522, text: '札达县'},
            {value: 542523, text: '噶尔县'},
            {value: 542524, text: '日土县'},
            {value: 542525, text: '革吉县'},
            {value: 542526, text: '改则县'},
            {value: 542527, text: '措勤县'}
        ]},
        {value: 542600, text: '林芝地区', children: [
            {value: 542621, text: '林芝县'},
            {value: 542622, text: '工布江达县'},
            {value: 542623, text: '米林县'},
            {value: 542624, text: '墨脱县'},
            {value: 542625, text: '波密县'},
            {value: 542626, text: '察隅县'},
            {value: 542627, text: '朗县'}
        ]}
    ]},
    {value: 610000, text: '陕西省', children: [
        {value: 610100, text: '西安市', children: [
            {value: 610101, text: '市辖区'},
            {value: 610102, text: '新城区'},
            {value: 610103, text: '碑林区'},
            {value: 610104, text: '莲湖区'},
            {value: 610111, text: '灞桥区'},
            {value: 610112, text: '未央区'},
            {value: 610113, text: '雁塔区'},
            {value: 610114, text: '阎良区'},
            {value: 610115, text: '临潼区'},
            {value: 610116, text: '长安区'},
            {value: 610122, text: '蓝田县'},
            {value: 610124, text: '周至县'},
            {value: 610125, text: '户县'},
            {value: 610126, text: '高陵县'}
        ]},
        {value: 610200, text: '铜川市', children: [
            {value: 610201, text: '市辖区'},
            {value: 610202, text: '王益区'},
            {value: 610203, text: '印台区'},
            {value: 610204, text: '耀州区'},
            {value: 610222, text: '宜君县'}
        ]},
        {value: 610300, text: '宝鸡市', children: [
            {value: 610301, text: '市辖区'},
            {value: 610302, text: '渭滨区'},
            {value: 610303, text: '金台区'},
            {value: 610304, text: '陈仓区'},
            {value: 610322, text: '凤翔县'},
            {value: 610323, text: '岐山县'},
            {value: 610324, text: '扶风县'},
            {value: 610326, text: '眉县'},
            {value: 610327, text: '陇县'},
            {value: 610328, text: '千阳县'},
            {value: 610329, text: '麟游县'},
            {value: 610330, text: '凤县'},
            {value: 610331, text: '太白县'}
        ]},
        {value: 610400, text: '咸阳市', children: [
            {value: 610401, text: '市辖区'},
            {value: 610402, text: '秦都区'},
            {value: 610403, text: '杨凌区'},
            {value: 610404, text: '渭城区'},
            {value: 610422, text: '三原县'},
            {value: 610423, text: '泾阳县'},
            {value: 610424, text: '乾县'},
            {value: 610425, text: '礼泉县'},
            {value: 610426, text: '永寿县'},
            {value: 610427, text: '彬县'},
            {value: 610428, text: '长武县'},
            {value: 610429, text: '旬邑县'},
            {value: 610430, text: '淳化县'},
            {value: 610431, text: '武功县'},
            {value: 610481, text: '兴平市'}
        ]},
        {value: 610500, text: '渭南市', children: [
            {value: 610501, text: '市辖区'},
            {value: 610502, text: '临渭区'},
            {value: 610521, text: '华县'},
            {value: 610522, text: '潼关县'},
            {value: 610523, text: '大荔县'},
            {value: 610524, text: '合阳县'},
            {value: 610525, text: '澄城县'},
            {value: 610526, text: '蒲城县'},
            {value: 610527, text: '白水县'},
            {value: 610528, text: '富平县'},
            {value: 610581, text: '韩城市'},
            {value: 610582, text: '华阴市'}
        ]},
        {value: 610600, text: '延安市', children: [
            {value: 610601, text: '市辖区'},
            {value: 610602, text: '宝塔区'},
            {value: 610621, text: '延长县'},
            {value: 610622, text: '延川县'},
            {value: 610623, text: '子长县'},
            {value: 610624, text: '安塞县'},
            {value: 610625, text: '志丹县'},
            {value: 610626, text: '吴起县'},
            {value: 610627, text: '甘泉县'},
            {value: 610628, text: '富县'},
            {value: 610629, text: '洛川县'},
            {value: 610630, text: '宜川县'},
            {value: 610631, text: '黄龙县'},
            {value: 610632, text: '黄陵县'}
        ]},
        {value: 610700, text: '汉中市', children: [
            {value: 610701, text: '市辖区'},
            {value: 610702, text: '汉台区'},
            {value: 610721, text: '南郑县'},
            {value: 610722, text: '城固县'},
            {value: 610723, text: '洋县'},
            {value: 610724, text: '西乡县'},
            {value: 610725, text: '勉县'},
            {value: 610726, text: '宁强县'},
            {value: 610727, text: '略阳县'},
            {value: 610728, text: '镇巴县'},
            {value: 610729, text: '留坝县'},
            {value: 610730, text: '佛坪县'}
        ]},
        {value: 610800, text: '榆林市', children: [
            {value: 610801, text: '市辖区'},
            {value: 610802, text: '榆阳区'},
            {value: 610821, text: '神木县'},
            {value: 610822, text: '府谷县'},
            {value: 610823, text: '横山县'},
            {value: 610824, text: '靖边县'},
            {value: 610825, text: '定边县'},
            {value: 610826, text: '绥德县'},
            {value: 610827, text: '米脂县'},
            {value: 610828, text: '佳县'},
            {value: 610829, text: '吴堡县'},
            {value: 610830, text: '清涧县'},
            {value: 610831, text: '子洲县'}
        ]},
        {value: 610900, text: '安康市', children: [
            {value: 610901, text: '市辖区'},
            {value: 610902, text: '汉滨区'},
            {value: 610921, text: '汉阴县'},
            {value: 610922, text: '石泉县'},
            {value: 610923, text: '宁陕县'},
            {value: 610924, text: '紫阳县'},
            {value: 610925, text: '岚皋县'},
            {value: 610926, text: '平利县'},
            {value: 610927, text: '镇坪县'},
            {value: 610928, text: '旬阳县'},
            {value: 610929, text: '白河县'}
        ]},
        {value: 611000, text: '商洛市', children: [
            {value: 611001, text: '市辖区'},
            {value: 611002, text: '商州区'},
            {value: 611021, text: '洛南县'},
            {value: 611022, text: '丹凤县'},
            {value: 611023, text: '商南县'},
            {value: 611024, text: '山阳县'},
            {value: 611025, text: '镇安县'},
            {value: 611026, text: '柞水县'}
        ]}
    ]},
    {value: 620000, text: '甘肃省', children: [
        {value: 620100, text: '兰州市', children: [
            {value: 620101, text: '市辖区'},
            {value: 620102, text: '城关区'},
            {value: 620103, text: '七里河区'},
            {value: 620104, text: '西固区'},
            {value: 620105, text: '安宁区'},
            {value: 620111, text: '红古区'},
            {value: 620121, text: '永登县'},
            {value: 620122, text: '皋兰县'},
            {value: 620123, text: '榆中县'}
        ]},
        {value: 620200, text: '嘉峪关市', children: [
            {value: 620201, text: '市辖区'}
        ]},
        {value: 620300, text: '金昌市', children: [
            {value: 620301, text: '市辖区'},
            {value: 620302, text: '金川区'},
            {value: 620321, text: '永昌县'}
        ]},
        {value: 620400, text: '白银市', children: [
            {value: 620401, text: '市辖区'},
            {value: 620402, text: '白银区'},
            {value: 620403, text: '平川区'},
            {value: 620421, text: '靖远县'},
            {value: 620422, text: '会宁县'},
            {value: 620423, text: '景泰县'}
        ]},
        {value: 620500, text: '天水市', children: [
            {value: 620501, text: '市辖区'},
            {value: 620502, text: '秦城区'},
            {value: 620503, text: '北道区'},
            {value: 620521, text: '清水县'},
            {value: 620522, text: '秦安县'},
            {value: 620523, text: '甘谷县'},
            {value: 620524, text: '武山县'},
            {value: 620525, text: '张家川回族自治县'}
        ]},
        {value: 620600, text: '武威市', children: [
            {value: 620601, text: '市辖区'},
            {value: 620602, text: '凉州区'},
            {value: 620621, text: '民勤县'},
            {value: 620622, text: '古浪县'},
            {value: 620623, text: '天祝藏族自治县'}
        ]},
        {value: 620700, text: '张掖市', children: [
            {value: 620701, text: '市辖区'},
            {value: 620702, text: '甘州区'},
            {value: 620721, text: '肃南裕固族自治县'},
            {value: 620722, text: '民乐县'},
            {value: 620723, text: '临泽县'},
            {value: 620724, text: '高台县'},
            {value: 620725, text: '山丹县'}
        ]},
        {value: 620800, text: '平凉市', children: [
            {value: 620801, text: '市辖区'},
            {value: 620802, text: '崆峒区'},
            {value: 620821, text: '泾川县'},
            {value: 620822, text: '灵台县'},
            {value: 620823, text: '崇信县'},
            {value: 620824, text: '华亭县'},
            {value: 620825, text: '庄浪县'},
            {value: 620826, text: '静宁县'}
        ]},
        {value: 620900, text: '酒泉市', children: [
            {value: 620901, text: '市辖区'},
            {value: 620902, text: '肃州区'},
            {value: 620921, text: '金塔县'},
            {value: 620922, text: '瓜州县'},
            {value: 620923, text: '肃北蒙古族自治县'},
            {value: 620924, text: '阿克塞哈萨克族自治县'},
            {value: 620981, text: '玉门市'},
            {value: 620982, text: '敦煌市'}
        ]},
        {value: 621000, text: '庆阳市', children: [
            {value: 621001, text: '市辖区'},
            {value: 621002, text: '西峰区'},
            {value: 621021, text: '庆城县'},
            {value: 621022, text: '环县'},
            {value: 621023, text: '华池县'},
            {value: 621024, text: '合水县'},
            {value: 621025, text: '正宁县'},
            {value: 621026, text: '宁县'},
            {value: 621027, text: '镇原县'}
        ]},
        {value: 621100, text: '定西市', children: [
            {value: 621101, text: '市辖区'},
            {value: 621102, text: '安定区'},
            {value: 621121, text: '通渭县'},
            {value: 621122, text: '陇西县'},
            {value: 621123, text: '渭源县'},
            {value: 621124, text: '临洮县'},
            {value: 621125, text: '漳县'},
            {value: 621126, text: '岷县'}
        ]},
        {value: 621200, text: '陇南市', children: [
            {value: 621201, text: '市辖区'},
            {value: 621202, text: '武都区'},
            {value: 621221, text: '成县'},
            {value: 621222, text: '文县'},
            {value: 621223, text: '宕昌县'},
            {value: 621224, text: '康县'},
            {value: 621225, text: '西和县'},
            {value: 621226, text: '礼县'},
            {value: 621227, text: '徽县'},
            {value: 621228, text: '两当县'}
        ]},
        {value: 622900, text: '临夏回族自治州', children: [
            {value: 622901, text: '临夏市'},
            {value: 622921, text: '临夏县'},
            {value: 622922, text: '康乐县'},
            {value: 622923, text: '永靖县'},
            {value: 622924, text: '广河县'},
            {value: 622925, text: '和政县'},
            {value: 622926, text: '东乡族自治县'},
            {value: 622927, text: '积石山保安族东乡族撒拉族自治县'}
        ]},
        {value: 623000, text: '甘南藏族自治州', children: [
            {value: 623001, text: '合作市'},
            {value: 623021, text: '临潭县'},
            {value: 623022, text: '卓尼县'},
            {value: 623023, text: '舟曲县'},
            {value: 623024, text: '迭部县'},
            {value: 623025, text: '玛曲县'},
            {value: 623026, text: '碌曲县'},
            {value: 623027, text: '夏河县'}
        ]}
    ]},
    {value: 630000, text: '青海省', children: [
        {value: 630100, text: '西宁市', children: [
            {value: 630101, text: '市辖区'},
            {value: 630102, text: '城东区'},
            {value: 630103, text: '城中区'},
            {value: 630104, text: '城西区'},
            {value: 630105, text: '城北区'},
            {value: 630121, text: '大通回族土族自治县'},
            {value: 630122, text: '湟中县'},
            {value: 630123, text: '湟源县'}
        ]},
        {value: 632100, text: '海东地区', children: [
            {value: 632121, text: '平安县'},
            {value: 632122, text: '民和回族土族自治县'},
            {value: 632123, text: '乐都县'},
            {value: 632126, text: '互助土族自治县'},
            {value: 632127, text: '化隆回族自治县'},
            {value: 632128, text: '循化撒拉族自治县'}
        ]},
        {value: 632200, text: '海北藏族自治州', children: [
            {value: 632221, text: '门源回族自治县'},
            {value: 632222, text: '祁连县'},
            {value: 632223, text: '海晏县'},
            {value: 632224, text: '刚察县'}
        ]},
        {value: 632300, text: '黄南藏族自治州', children: [
            {value: 632321, text: '同仁县'},
            {value: 632322, text: '尖扎县'},
            {value: 632323, text: '泽库县'},
            {value: 632324, text: '河南蒙古族自治县'}
        ]},
        {value: 632500, text: '海南藏族自治州', children: [
            {value: 632521, text: '共和县'},
            {value: 632522, text: '同德县'},
            {value: 632523, text: '贵德县'},
            {value: 632524, text: '兴海县'},
            {value: 632525, text: '贵南县'}
        ]},
        {value: 632600, text: '果洛藏族自治州', children: [
            {value: 632621, text: '玛沁县'},
            {value: 632622, text: '班玛县'},
            {value: 632623, text: '甘德县'},
            {value: 632624, text: '达日县'},
            {value: 632625, text: '久治县'},
            {value: 632626, text: '玛多县'}
        ]},
        {value: 632700, text: '玉树藏族自治州', children: [
            {value: 632721, text: '玉树县'},
            {value: 632722, text: '杂多县'},
            {value: 632723, text: '称多县'},
            {value: 632724, text: '治多县'},
            {value: 632725, text: '囊谦县'},
            {value: 632726, text: '曲麻莱县'}
        ]},
        {value: 632800, text: '海西蒙古族藏族自治州', children: [
            {value: 632801, text: '格尔木市'},
            {value: 632802, text: '德令哈市'},
            {value: 632821, text: '乌兰县'},
            {value: 632822, text: '都兰县'},
            {value: 632823, text: '天峻县'},
            {value: 632824, text: '芒崖            '},
            {value: 632825, text: '冷湖'},
            {value: 632826, text: '大柴旦      '}
        ]}
    ]},
    {value: 640000, text: '宁夏回族自治区', children: [
        {value: 640100, text: '银川市', children: [
            {value: 640101, text: '市辖区'},
            {value: 640104, text: '兴庆区'},
            {value: 640105, text: '西夏区'},
            {value: 640106, text: '金凤区'},
            {value: 640121, text: '永宁县'},
            {value: 640122, text: '贺兰县'},
            {value: 640181, text: '灵武市'}
        ]},
        {value: 640200, text: '石嘴山市', children: [
            {value: 640201, text: '市辖区'},
            {value: 640202, text: '大武口区'},
            {value: 640205, text: '惠农区'},
            {value: 640221, text: '平罗县'}
        ]},
        {value: 640300, text: '吴忠市', children: [
            {value: 640301, text: '市辖区'},
            {value: 640302, text: '利通区'},
            {value: 640323, text: '盐池县'},
            {value: 640324, text: '同心县'},
            {value: 640381, text: '青铜峡市'}
        ]},
        {value: 640400, text: '固原市', children: [
            {value: 640401, text: '市辖区'},
            {value: 640402, text: '原州区'},
            {value: 640422, text: '西吉县'},
            {value: 640423, text: '隆德县'},
            {value: 640424, text: '泾源县'},
            {value: 640425, text: '彭阳县'}
        ]},
        {value: 640500, text: '中卫市', children: [
            {value: 640501, text: '市辖区'},
            {value: 640502, text: '沙坡头区'},
            {value: 640521, text: '中宁县'},
            {value: 640522, text: '海原县'}
        ]}
    ]},
    {value: 650000, text: '新疆维吾尔自治区', children: [
        {value: 650100, text: '乌鲁木齐市', children: [
            {value: 650101, text: '市辖区'},
            {value: 650102, text: '天山区'},
            {value: 650103, text: '沙依巴克区'},
            {value: 650104, text: '新市区'},
            {value: 650105, text: '水磨沟区'},
            {value: 650106, text: '头屯河区'},
            {value: 650107, text: '达坂城区'},
            {value: 650108, text: '东山区'},
            {value: 650121, text: '乌鲁木齐县'}
        ]},
        {value: 650200, text: '克拉玛依市', children: [
            {value: 650201, text: '市辖区'},
            {value: 650202, text: '独山子区'},
            {value: 650203, text: '克拉玛依区'},
            {value: 650204, text: '白碱滩区'},
            {value: 650205, text: '乌尔禾区'}
        ]},
        {value: 650300, text: '石河子市'},
        {value: 652100, text: '吐鲁番地区', children: [
            {value: 652101, text: '吐鲁番市'},
            {value: 652122, text: '鄯善县'},
            {value: 652123, text: '托克逊县'}
        ]},
        {value: 652200, text: '哈密地区', children: [
            {value: 652201, text: '哈密市'},
            {value: 652222, text: '巴里坤哈萨克自治县'},
            {value: 652223, text: '伊吾县'}
        ]},
        {value: 652300, text: '昌吉回族自治州', children: [
            {value: 652301, text: '昌吉市'},
            {value: 652302, text: '阜康市'},
            {value: 652303, text: '米泉市'},
            {value: 652323, text: '呼图壁县'},
            {value: 652324, text: '玛纳斯县'},
            {value: 652325, text: '奇台县'},
            {value: 652327, text: '吉木萨尔县'},
            {value: 652328, text: '木垒哈萨克自治县'}
        ]},
        {value: 652700, text: '博尔塔拉蒙古自治州', children: [
            {value: 652701, text: '博乐市'},
            {value: 652722, text: '精河县'},
            {value: 652723, text: '温泉县'}
        ]},
        {value: 652800, text: '巴音郭楞蒙古自治州', children: [
            {value: 652801, text: '库尔勒市'},
            {value: 652822, text: '轮台县'},
            {value: 652823, text: '尉犁县'},
            {value: 652824, text: '若羌县'},
            {value: 652825, text: '且末县'},
            {value: 652826, text: '焉耆回族自治县'},
            {value: 652827, text: '和静县'},
            {value: 652828, text: '和硕县'},
            {value: 652829, text: '博湖县'}
        ]},
        {value: 652900, text: '阿克苏地区', children: [
            {value: 652901, text: '阿克苏市'},
            {value: 652922, text: '温宿县'},
            {value: 652923, text: '库车县'},
            {value: 652924, text: '沙雅县'},
            {value: 652925, text: '新和县'},
            {value: 652926, text: '拜城县'},
            {value: 652927, text: '乌什县'},
            {value: 652928, text: '阿瓦提县'},
            {value: 652929, text: '柯坪县'}
        ]},
        {value: 653000, text: '克孜勒苏柯尔克孜自治州', children: [
            {value: 653001, text: '阿图什市'},
            {value: 653022, text: '阿克陶县'},
            {value: 653023, text: '阿合奇县'},
            {value: 653024, text: '乌恰县'}
        ]},
        {value: 653100, text: '喀什地区', children: [
            {value: 653101, text: '喀什市'},
            {value: 653121, text: '疏附县'},
            {value: 653122, text: '疏勒县'},
            {value: 653123, text: '英吉沙县'},
            {value: 653124, text: '泽普县'},
            {value: 653125, text: '莎车县'},
            {value: 653126, text: '叶城县'},
            {value: 653127, text: '麦盖提县'},
            {value: 653128, text: '岳普湖县'},
            {value: 653129, text: '伽师县'},
            {value: 653130, text: '巴楚县'},
            {value: 653131, text: '塔什库尔干塔吉克自治县'}
        ]},
        {value: 653200, text: '和田地区', children: [
            {value: 653201, text: '和田市'},
            {value: 653221, text: '和田县'},
            {value: 653222, text: '墨玉县'},
            {value: 653223, text: '皮山县'},
            {value: 653224, text: '洛浦县'},
            {value: 653225, text: '策勒县'},
            {value: 653226, text: '于田县'},
            {value: 653227, text: '民丰县'}
        ]},
        {value: 654000, text: '伊犁哈萨克自治州', children: [
            {value: 654002, text: '伊宁市'},
            {value: 654003, text: '奎屯市'},
            {value: 654021, text: '伊宁县'},
            {value: 654022, text: '察布查尔锡伯自治县'},
            {value: 654023, text: '霍城县'},
            {value: 654024, text: '巩留县'},
            {value: 654025, text: '新源县'},
            {value: 654026, text: '昭苏县'},
            {value: 654027, text: '特克斯县'},
            {value: 654028, text: '尼勒克县'}
        ]},
        {value: 654200, text: '塔城地区', children: [
            {value: 654201, text: '塔城市'},
            {value: 654202, text: '乌苏市'},
            {value: 654221, text: '额敏县'},
            {value: 654223, text: '沙湾县'},
            {value: 654224, text: '托里县'},
            {value: 654225, text: '裕民县'},
            {value: 654226, text: '和布克赛尔蒙古自治县'}
        ]},
        {value: 654300, text: '阿勒泰地区', children: [
            {value: 654301, text: '阿勒泰市'},
            {value: 654321, text: '布尔津县'},
            {value: 654322, text: '富蕴县'},
            {value: 654323, text: '福海县'},
            {value: 654324, text: '哈巴河县'},
            {value: 654325, text: '青河县'},
            {value: 654326, text: '吉木乃县'}
        ]},
        {value: 659000, text: '省直辖行政单位', children: [
            {value: 659001, text: '石河子市'},
            {value: 659002, text: '阿拉尔市'},
            {value: 659003, text: '图木舒克市'},
            {value: 659004, text: '五家渠市'}
        ]}
    ]}
]);



/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_asInput__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_TextBox__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inf_ui_x_components_Loading__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_inf_ui_x_components_Layer__ = __webpack_require__(8);
/**
 * @file components/UserPicker.es6
 * @author leeight
 */










const cx = Object(__WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_util__["f" /* create */])('ui-userpicker');

// /api/product/center/uid/search
// {keyword: string}
// {
//   success: true,
//   result: {
//     items: [
//       {
//         departmentName: string,
//         displayName: string,
//         email: string,
//         name: string,
//         username: string
//       }
//     }
//   }
// }

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}" on-click="onClick">
<div class="${cx('preview')}">
    <div class="${cx('preview-item')}" s-for="item, i in value">
        {{item.username}}<i class="iconfont icon-close" on-click="removeItem($event, i)"></i>
    </div>
    <ui-textbox
        s-ref="input"
        value="{=keyword=}"
        on-input="onInput"
        on-focus="onFoucs"
        on-blur="onBlur"
        on-enter="onEnter"
        on-keyup="onKeyUp($event)"
        on-keydown="onKeyDown($event)"
    />
</div>
<ui-layer open="{=layerOpened=}" follow-scroll="{{false}}">
    <div class="${cx('layer')} ${cx('layer-x')}" style="{{layerStyle}}">
        <div class="${cx('layer-main')}">
            <ui-loading s-if="loading" size="small" />
            <ul s-elif="!items.length"><li>暂无数据</li></ul>
            <ul s-else>
                <li class="{{selectedIndex === i ? '${cx('layer-item', 'layer-actived-item')}' : '${cx('layer-item')}'}}"
                    on-click="addItem(item)"
                    s-for="item, i in items">
                    <slot name="layer-item" var-item="{{item}}">{{item.displayName}}</slot>
                </li>
            </ul>
        </div>
    </div>
</ui-layer>
</div>`;
/* eslint-enable */

function kDefaultTransformer(result) {
    return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(result.items, item => {
        const accountId = item.email.replace(/@.*/, '');
        const username = item.name;
        const displayName = item.displayName;
        return {
            accountId, username, displayName
        };
    });
}

const UUAP = Object(__WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'ui-loading': __WEBPACK_IMPORTED_MODULE_6_inf_ui_x_components_Loading__["a" /* default */],
        'ui-layer': __WEBPACK_IMPORTED_MODULE_7_inf_ui_x_components_Layer__["a" /* default */],
        'ui-textbox': __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_TextBox__["a" /* default */]
    },
    messages: {
        'input-comp-value-changed'() {
            // 忽略子控件的消息
        }
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const active = this.data.get('active');
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
                klass.push(cx('x-active'));
            }
            return klass;
        },
        mainStyle() {
            return cx.mainStyle(this);
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
                style.width = Object(__WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_util__["h" /* hasUnit */])(realLayerWidth) ? realLayerWidth : `${realLayerWidth}px`;
            }
            return style;
        }
    },
    initData() {
        return {
            active: false,
            loading: false, // 是不是正在查询中
            keyword: '',
            keywordName: 'keyword',
            searchApi: '/api/product/center/uid/search',
            searchRequester: null,
            layerOpened: false,
            layerWidth: null,
            autoLayerWidth: null,
            value: [],
            selectedIndex: 0,
            itemsTransformer: kDefaultTransformer,
            items: [] // 预览数据
        };
    },
    dataTypes: {
        /**
         * 是否是聚焦的状态，当点击内容可输入区域的时候，自动设置未 true
         * @default false
         */
        active: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 数据是否正在加载
         * @default false
         */
        loading: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 用户输入的关键词
         */
        keyword: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 搜索的时候，关键词的名字
         * @default keyword
         */
        keywordName: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 搜索 API 的地址
         * @default /api/product/center/uid/search
         */
        searchApi: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 自定义的请求函数，如果设置了 search-requester，那么会忽略 search-api 的配置<br>
         * function({[keywordName]: keyword}): Promise&lt;{items: object[]}, Error&gt;
         */
        searchRequester: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].func,

        /**
         * 浮层是否打开
         * @bindx
         * @default false
         */
        layerOpened: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 手工设置浮层的宽度，如果没有设置的话，会在展开的时候动态计算
         */
        layerWidth: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].number,

        /**
         * UserPicker 的内容
         * <pre><code>{
         *   username: string,
         *   accountId: string
         * }</code></pre>
         * @bindx
         * @default []
         */
        value: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].array,

        /**
         * 转化后端返回的数据格式<br>
         * function({items: object[]}): object[]
         */
        itemsTransformer: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].func,

        /**
         * 浮层里面所展示的数据源
         * <pre><code>{
         *   username: string,
         *   accountId: string,
         *   displayName: string
         * }</code></pre>
         * 每一项的格式需要符合下面的约束，如果后端API返回的数据格式不同<br>
         * 那么可以通过设置 items-transformer 来调整数据格式
         * @default []
         */
        items: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].array
    },
    inited() {
        this.searchByKeyword = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.debounce((...args) => this.doSearch(...args), 300);
        const value = this.data.get('value');
        if (!value || !__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(value)) {
            this.data.set('value', []);
        }
        this.watch('value', value => this.fire('change', {value}));
    },
    attached() {
        this.__setLayerWidth();
    },
    onClick() {
        // focus the input area
        this.focusInput();
    },
    focusInput() {
        const input = this.ref('input');
        if (input) {
            input.focus();
        }
    },
    doSearch(keyword) {
        const {searchRequester, searchApi, keywordName} = this.data.get();
        if (typeof searchRequester === 'function') {
            return searchRequester(keyword)
                .then(items => {
                    if (this.data.get('keyword') !== keyword) {
                        return;
                    }
                    this.data.set('loading', false);
                    this.data.set('selectedIndex', 0);
                    this.data.set('items', items);
                })
                .catch(error => {
                    if (this.data.get('keyword') !== keyword) {
                        return;
                    }
                    this.data.set('loading', false);
                    this.data.set('items', []);
                });
        }

        const payload = {[keywordName]: keyword};
        return this.$post(searchApi, payload)
            .then(result => {
                if (this.data.get('keyword') !== keyword) {
                    return;
                }
                const itemsTransformer = this.data.get('itemsTransformer');
                this.data.set('loading', false);
                this.data.set('selectedIndex', 0);
                if (typeof itemsTransformer === 'function') {
                    this.data.set('items', itemsTransformer(result));
                }
                else {
                    this.data.set('items', result.items);
                }
            })
            .catch(error => {
                if (this.data.get('keyword') !== keyword) {
                    return;
                }
                this.data.set('loading', false);
                this.data.set('items', []);
            });
    },
    onInput() {
        this.nextTick(() => {
            const keyword = this.data.get('keyword');
            if (!keyword) {
                this.data.set('layerOpened', false);
                this.data.set('loading', false);
            }
            else {
                // 虽然还没有真正的发起请求，不过先展示一个 loading 的提示再说
                this.data.set('layerOpened', true);
                this.data.set('loading', true);
                this.searchByKeyword(keyword);
            }
        });
    },
    onFoucs() {
        this.data.set('active', true);
    },
    onBlur() {
        this.data.set('active', false);
    },
    onKeyDown(e) {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 8 && !e.target.value) {
            this.__shouldRemovePreviousItem = true;
        }
        else {
            this.__shouldRemovePreviousItem = false;
        }
    },
    onKeyUp(e) {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 8 && this.__shouldRemovePreviousItem) {
            const length = this.data.get('value.length');
            if (length > 0) {
                this.data.removeAt('value', length - 1);
                this.focusInput();
            }
        }
        else if (keyCode === 40) {
            // down arrow
            this.data.set('selectedIndex', this.getNextIndex());
        }
        else if (keyCode === 38) {
            // up arrow
            this.data.set('selectedIndex', this.getPrevIndex());
        }
        this.__shouldRemovePreviousItem = false;
    },
    onEnter() {
        const i = this.data.get('selectedIndex');
        const item = this.data.get(`items[${i}]`);
        if (item) {
            this.addItem(item);
        }
    },
    getNextIndex() {
        const itemSize = this.data.get('items.length');
        const selectedIndex = this.data.get('selectedIndex');
        if (itemSize > 0) {
            if (selectedIndex + 1 >= itemSize) {
                return 0;
            }
            return selectedIndex + 1;
        }
        return 0;
    },
    getPrevIndex() {
        const itemSize = this.data.get('items.length');
        const selectedIndex = this.data.get('selectedIndex');
        if (itemSize > 0) {
            if (selectedIndex <= 0) {
                return itemSize - 1;
            }
            return selectedIndex - 1;
        }
        return 0;
    },
    addItem(item) {
        const value = this.data.get('value');
        // 检查有没有重复的
        const found = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.find(value, o => o.accountId === item.accountId);
        if (!found) {
            this.data.push('value', __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(item, 'accountId', 'username'));
        }
        this.data.set('layerOpened', false);
        this.data.set('keyword', '');
        this.focusInput();
    },
    removeItem(nativeEvent, index) {
        nativeEvent.stopPropagation();
        this.data.removeAt('value', index);
    },
    __setLayerWidth() {
        const layerWidth = this.data.get('layerWidth');
        if (layerWidth == null) {
            this.data.set('autoLayerWidth', this.el.clientWidth + 2);
        }
    }
});


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_asInput__["a" /* asInput */])(UUAP));


/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loading__ = __webpack_require__(15);
/**
 * @file components/CKEditor.es6
 * @author leeight
 */

/* global CKEDITOR */






const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-ckeditor');

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <ui-loading s-if="loading" />
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <div s-ref="ghost" style="{{mainStyle}}"></div>
</div>
</template>`;
/* eslint-enable */

window.CKEDITOR_BASEPATH = window.require.toUrl('ckeditor').replace(/\?.*/, '') + '/';

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-loading': __WEBPACK_IMPORTED_MODULE_2__Loading__["a" /* default */]
    },
    computed: {
        mainStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            loading: true,
            error: null,
            value: null,
            options: {
                language: 'zh-cn',
                toolbarCanCollapse: true
            }
        };
    },
    dataTypes: {
        /**
         * 获取编辑器的值，不支持双绑
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 编辑器的配置项目
         * @default {language: 'zh-cn', toolbarCanCollapse: true}
         */
        options: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].object
    },
    inited() {
        /**
        this.watch('value', value => {
            if (this.editor) {
                const editorData = this.editor.getData();
                if (value !== editorData) {
                    this.editor.setData(value);
                }
            }
        });
        */
    },
    attached() {
        window.require(['inf-ria/js!ckeditor/ckeditor.js'], () => {
            this.data.set('loading', false);
            const ghost = this.ref('ghost');
            const options = this.data.get('options');
            const editor = this.editor = CKEDITOR.replace(ghost.id, options);
            editor.on('instanceReady', () => {
                const value = this.data.get('value');
                if (value) {
                    editor.setData(value);
                }
            });

            editor.on('change', () => {
                const value = editor.getData();
                this.data.set('value', value);
                this.fire('change', {value});
            });
        });
    },
    disposed() {
        if (this.editor) {
            try {
                this.editor.destroy();
            }
            catch (ex) {
            }
        }
    }
}));


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Loading__ = __webpack_require__(15);
/**
 * @file components/RichTextEditor.es6
 * @author leeight
 */

/* global UE */








const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-richtexteditor');

const kDefaultEditorOptions = {
    // 如果配置了 urlArgs，那么后续用 UEDITOR_HOME_URL 拼接路径的时候就出问题了，因此把这个部分删掉
    UEDITOR_HOME_URL: window.require.toUrl('ueditor/').replace(/\?.*/, ''),
    // initialFrameWidth: 770,
    initialFrameHeight: 250,
    autoFloatEnabled: false,
    elementPathEnabled: false,
    autoHeightEnabled: false,
    iframeUrlMap: {
        link: window.require.toUrl('ueditor/dialogs/link/link.html')
    },
    serverUrl: '/api/mc/imageUpload',
    initialStyle: [
        `p, ol{
            line-height: 1.5em;
            color: #494949;
            font-family: Microsoft Yahei, Tahoma, Arial, Helvetica, STHeiti;
            font-size: 12px;
        }`
    ],
    toolbars: [[
        'source', 'undo', 'redo', 'insertunorderedlist', 'insertorderedlist', 'unlink',
        'link', 'bold', 'underline', 'fontborder', 'strikethrough', 'forecolor',
        'backcolor', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
        'removeformat', 'fontfamily', 'fontsize', '|', 'simpleupload', 'imagenone',
        'imageleft', 'imageright', 'imagecenter', 'blockquote', 'cleardoc', 'formatmatch',
        'indent', 'lineheight', 'paragraph', 'rowspacing', 'date', ''
    ]]
};

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <ui-loading s-if="loading" />
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <div s-ref="ghost" style="{{mainStyle}}"></div>
</div>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
    template,
    components: {
        'ui-loading': __WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]
    },
    computed: {
        mainStyle() {
            const loading = this.data.get('loading');
            const style = cx.mainStyle(this);
            style.display = loading ? 'none' : 'block';
            return style;
        },
        editorOptions() {
            const options = this.data.get('options');
            return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend({}, kDefaultEditorOptions, options);
        }
    },
    initData() {
        return {
            loading: true,
            error: null,
            width: '100%',
            height: null,
            options: null
        };
    },
    dataTypes: {
        /**
         * 获取编辑器的值，不支持双绑
         */
        value: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 编辑器的配置项
         * @default {...}
         */
        options: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].object,

        /**
         * 编辑器的宽度
         * @default 100%
         */
        width: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 编辑器的高度
         */
        height: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string
    },
    inited() {
        /** TODO(leeight) 暂时不支持在运行时动态的修改 editor 的内容
        this.watch('value', value => {
            if (this.editor) {
                this.editor.setContent(value);
            }
        });
        */
    },
    attached() {
        window.require(['zeroclipboard', 'inf-ria/js!ueditor/ueditor.all.min.js'], ZeroClipboard => {
            this.data.set('loading', false);

            // TODO(leeight) FIX ZeroClipboard
            window.ZeroClipboard = ZeroClipboard;

            const editorOptions = this.data.get('editorOptions');
            const value = this.data.get('value');
            const ghost = this.ref('ghost');

            if (!ghost) {
                this.data.set('error', new Error('RichTextEditor初始化失败'));
                return;
            }

            const editor = this.editor = new UE.ui.Editor(editorOptions);
            editor.render(ghost);
            if (value) {
                editor.addListener('ready', () => {
                    if (this.editor) {
                        this.editor.setContent(value);
                    }
                });
            }
            editor.addListener('contentchange', () => {
                if (this.editor) {
                    const value = this.editor.getContent();
                    // FIXME(leeight) 递归的问题如何处理呢？
                    this.data.set('value', value);
                }
            });
        });
    },
    disposed() {
        if (this.editor) {
            try {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#edui_fixedlayer').remove();
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#ueditor_textarea_editorValue').remove();
                this.editor.destroy();
                this.editor = null;
            }
            catch (ex) {
            }
        }
    }
}));


/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = registerFormItem;
/* harmony export (immutable) */ __webpack_exports__["a"] = asForm;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_async_validator__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_async_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_async_validator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ExpressionEvaluator__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buildValidator__ = __webpack_require__(71);
/**
 * @file inf-ui/x/forms/asForm.es6
 * @author leeight
 */











const cx = Object(__WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_util__["f" /* create */])('as-form');
const cx2 = Object(__WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_util__["f" /* create */])('ui-form');
const kFormItemComponents = {};
const kFormItemBuilders = {};
const Schema = __WEBPACK_IMPORTED_MODULE_3_async_validator__["default"];

// FIXME(leeight) 如何跟 forms/FormItem.es6 复用呢?
const FormItem = Object(__WEBPACK_IMPORTED_MODULE_4_inf_ui_sanx__["b" /* defineComponent */])({
    template: `<div class="{{mainClass}}">
        <div class="{{labelClass}}" s-if="label">{{label | raw}}：</div>
        <div class="{{contentClass}}">
            <slot />
            <div class="{{errorClass}}" s-if="!preview && error">{{error | raw}}</div>
            <div class="{{helpClass}}" s-if="!preview && help">{{help | raw}}</div>
        </div>
    </div>`,
    messages: {
        'input-comp-value-changed'(arg) {
            const payload = arg.value;
            const name = this.data.get('name');
            this.dispatch('form-element-changed', {name, value: payload.value});
        }
    },
    computed: {
        errorClass() {
            return [cx2('item-invalid-label')];
        },
        helpClass() {
            return [cx2('item-help')];
        },
        mainClass() {
            const klass = [cx2('item')];
            const name = this.data.get('name');
            const inline = this.data.get('inline');
            if (inline) {
                klass.push(cx2('item-inline'));
            }
            if (name) {
                klass.push(cx2(`item-${name}`));
            }
            return klass;
        },
        labelClass() {
            const klass = [cx2('item-label')];
            const required = this.data.get('required');
            if (required) {
                klass.push('required-label');
            }
            return klass;
        },
        contentClass() {
            const klass = [cx2('item-content')];
            return klass;
        }
    },
    initData() {
        return {
            name: null,
            label: null,
            error: null,
            help: null,
            required: false,
            preview: false,
            inline: true
        };
    }
});

function asFormItem(item, prefix, content) {
    return `
    <as-form-item
        inline
        name="${item.name}"
        label="{{${prefix}.label}}"
        help="{{${prefix}.help}}"
        required="{{requiredOn.${item.name}}}"
        error="{{formErrors.${item.name}}}"
        preview="{{preview}}"
    >${content}</as-form-item>
    `;
}

function appendList(root, key, value) {
    if (!root[key]) {
        root[key] = [];
    }
    root[key].push(value);
}

function schemaTraversal(controls, cb) {
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(controls, item => {
        if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(item)) {
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(item, colItem => cb(colItem));
        }
        else {
            cb(item);
        }
    });
}

function generateTemplate(controls) {
    const template = [];

    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(controls, (item, i) => {
        if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(item)) {
            template.push(`<div class="${cx('row')}">`);
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(item, (colItem, j) => {
                const builder = kFormItemBuilders[colItem.type];
                if (typeof builder !== 'function') {
                    throw new Error('invalid control type = ' + colItem.type);
                }
                const prefix = `schema[${i}][${j}]`;
                template.push(`<div class="${cx('col')}"
                    s-if="{{!hiddenOn.${colItem.name} && visibleOn.${colItem.name} !== false}}">`);
                template.push(asFormItem(colItem, prefix, builder(colItem, prefix)));
                template.push('</div>');
            });
            template.push('</div>');
        }
        else {
            const builder = kFormItemBuilders[item.type];
            if (typeof builder !== 'function') {
                throw new Error('invalid control type = ' + item.type);
            }
            const prefix = `schema[${i}]`;
            template.push(`<div class="${cx('row')}"
                s-if="{{!hiddenOn.${item.name} && visibleOn.${item.name} !== false}}">`);
            template.push(asFormItem(item, prefix, builder(item, prefix)));
            template.push('</div>');
        }
    });

    return template.join('\n');
}

function registerFormItem({type, tagName, Component, builder}) {
    if (kFormItemBuilders[type]) {
        throw new Error(`${type} already registered!`);
    }

    const $tagName = tagName || 'ui-' + type;
    kFormItemComponents[$tagName] = Component;
    kFormItemBuilders[type] = builder;
}

function asForm(schema) {
    const controls = schema.controls;
    const components = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend({
        'as-form-item': FormItem
    }, kFormItemComponents);

    /* eslint-disable */
    const template = `<template>
    <div class="${cx()}">
        <div class="${cx('title')}" s-if="title">
            <h4>{{title}}</h4>
            <slot name="actions" s-if="editable">
                <div class="${cx('title-actions')}">
                    <ui-button on-click="startEditing" s-if="!editing">编辑</ui-button>
                    <ui-button disabled="{{submitting}}" on-click="submitEditing" skin="primary" s-if="editing">{{submitting ? '保存中...' : '保存'}}</ui-button>
                    <ui-button disabled="{{submitting}}" on-click="cancelEditing" s-if="editing">取消修改</ui-button>
                </div>
            </slot>
        </div>
        <div class="${cx2('x')}">${generateTemplate(controls)}</div>
    </div>
    </template>`;
    /* eslint-enable */

    // text, number, select, switch, calendar, uploader
    const Form = Object(__WEBPACK_IMPORTED_MODULE_4_inf_ui_sanx__["b" /* defineComponent */])({
        template,
        components,
        computed: {},
        filters: {
            filename(url) {
                if (!url) {
                    return '';
                }
                const lastSlashIndex = url.lastIndexOf('/');
                try {
                    return decodeURIComponent(url.substr(lastSlashIndex + 1));
                }
                catch (ex) {
                    return url.substr(lastSlashIndex + 1);
                }
            },
            datetime(value, format) {
                if (!format) {
                    format = 'YYYY-MM-DD';    // eslint-disable-line
                }
                return __WEBPACK_IMPORTED_MODULE_1_moment___default()(value).format(format);
            }
        },
        messages: {
            'form-element-changed'(arg) { // eslint-disable-line
                const instantValidation = this.data.get('instantValidation');
                if (instantValidation) {
                    const payload = arg.value;
                    this.validateFormItem(payload.name);
                }
            }
        },
        initData() {
            return {
                title: null,
                instantValidation: true,
                preview: false, // 预览模式
                editing: false, // 编辑状态
                submitting: false, // 提交状态
                editable: false, // 预览模式下是否允许编辑
                schema: controls,
                formData: {},
                formErrors: null,
                visibleOn: {},
                hiddenOn: {},
                requiredOn: {}

                // disabledOn: {},
            };
        },

        inited() {
            // 根据 Name 来快速定位相关的配置
            const itemsMap = {};

            // {
            //   当 formData.a 变化的时候，需要重新计算 hiddenOn.b 和 hiddenOn.c 的值
            //   计算的逻辑就参考 schema 里面配置的内容
            //   1. 如果 hiddenOn 是字符串，就从 formData 中获取对应的值
            //   然后按照 js 里面 value to boolean 的逻辑计算结果，通常是 !!this.data.get('formData.$deps');
            //
            //   2. 如果 hiddenOn 是一个对象，那么就需要考虑多种比较的情况了，比如 $in, $nin, $eq, $ne, $gt, $lt, $gte, $lte 等等
            //   实际上是(MongoDb Comparison Query Operators的语法)
            //
            //   'a': ['b', 'c']
            // }
            const hiddenOn = {};
            const visibleOn = {};
            const requiredOn = {};
            const requiredOnInitValues = {};

            function appendToMap(item) {
                itemsMap[item.name] = item;
                requiredOnInitValues[item.name] = !!item.required;

                if (item.visibleOn) {
                    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isString(item.visibleOn)) {
                        appendList(visibleOn, item.visibleOn, item.name);
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isPlainObject(item.visibleOn)) {
                        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(item.visibleOn, (config, key) => appendList(visibleOn, key, item.name));
                    }
                }

                if (item.hiddenOn) {
                    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isString(item.hiddenOn)) {
                        appendList(hiddenOn, item.hiddenOn, item.name);
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isPlainObject(item.hiddenOn)) {
                        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(item.hiddenOn, (config, key) => appendList(hiddenOn, key, item.name));
                    }
                }

                if (item.requiredOn) {
                    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isString(item.requiredOn)) {
                        appendList(requiredOn, item.requiredOn, item.name);
                    }
                    else if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isPlainObject(item.requiredOn)) {
                        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(item.requiredOn, (config, key) => appendList(requiredOn, key, item.name));
                    }
                }
            }

            const controls = this.data.get('schema');
            schemaTraversal(controls, item => item.name && appendToMap(item));

            this.itemsMap = itemsMap;
            this.visibleOn = visibleOn;
            this.hiddenOn = hiddenOn;
            this.requiredOn = requiredOn;

            // 监控特定数据项的变化
            const triggerKeys = this.__getTriggerKeys();
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(triggerKeys, name => this.watch(`formData.${name}`, () => this.__refreshRelatedFields(name)));
            this.watch('submitting', submitting => {
                if (!submitting) {
                    this.data.set('editing', false);
                    this.data.set('preview', true);
                }
            });

            // 给 requiredOn 加上默认值，从 config.required 解析出来的
            this.data.set('requiredOn', requiredOnInitValues);
        },

        attached() {
            const triggerKeys = this.__getTriggerKeys();
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(triggerKeys, name => this.__refreshRelatedFields(name));
        },

        __getTriggerKeys() {
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.uniq([
                ...__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.keys(this.visibleOn),
                ...__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.keys(this.hiddenOn),
                ...__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.keys(this.requiredOn)
            ]);
        },

        __refreshRelatedFields(name) {
            this.nextTick(() => {
                const get = name => this.data.get(`formData.${name}`);
                const scope = {get};

                if (this.visibleOn[name]) {
                    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(this.visibleOn[name], itemName => {
                        const config = this.itemsMap[itemName];
                        const visible = Object(__WEBPACK_IMPORTED_MODULE_6__ExpressionEvaluator__["a" /* evalExpr */])(config.visibleOn, scope);
                        this.data.set(`visibleOn.${itemName}`, visible);
                        if (!visible && config.unsetValueOnInvisible) {
                            this.data.set(`formData.${itemName}`, undefined);
                        }
                    });
                }

                if (this.hiddenOn[name]) {
                    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(this.hiddenOn[name], itemName => {
                        const config = this.itemsMap[itemName];
                        const hidden = Object(__WEBPACK_IMPORTED_MODULE_6__ExpressionEvaluator__["a" /* evalExpr */])(config.hiddenOn, scope);
                        this.data.set(`hiddenOn.${itemName}`, hidden);
                        if (hidden && config.unsetValueOnInvisible) {
                            this.data.set(`formData.${itemName}`, undefined);
                        }
                    });
                }

                if (this.requiredOn[name]) {
                    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(this.requiredOn[name], itemName => {
                        const config = this.itemsMap[itemName];
                        const required = Object(__WEBPACK_IMPORTED_MODULE_6__ExpressionEvaluator__["a" /* evalExpr */])(config.requiredOn, scope);
                        this.data.set(`requiredOn.${itemName}`, required);
                    });
                }
            });
        },

        getFormKey() {
            const formKey = this.data.get('formKey');
            if (formKey != null) {
                return formKey;
            }

            const bindExpr = this.aNode.binds.get('formData');
            if (bindExpr && bindExpr.x) {
                // 双绑
                return bindExpr.expr.raw;
            }
            else if (bindExpr) {
                return bindExpr.raw;
            }
            throw new Error('Please specify `form-key` prop');
        },

        startEditing() {
            // 保存一下当前数据的快照，如果 cancelEditing 之后，就恢复当时的数据
            this.dataSnapshot = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(this.data.get('formData'), Form.$fields);

            this.data.set('editing', true);
            this.data.set('preview', false);
            this.data.set('formErrors', null);
        },

        cancelEditing() {
            if (this.dataSnapshot) {
                __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(Form.$fields, name => {
                    if (this.dataSnapshot[name] != null) {
                        this.data.set(`formData.${name}`, this.dataSnapshot[name]);
                    }
                });
                this.dataSnapshot = null;
            }
            this.nextTick(() => {
                this.data.set('editing', false);
                this.data.set('preview', true);
                this.data.set('formErrors', null);
            });
        },

        submitEditing() {
            this.validateForm().then(() => {
                const formKey = this.getFormKey();
                const formData = this.getFormData();
                this.data.set('submitting', true);
                this.dispatch('submit', {formKey, formData});
            });
        },

        buildFormItemValidator(name, config) {
            const rules = [];
            const {validator, validations, validationErrors} = config;
            if (validator) {
                // 自定义的验证规则
                rules.push({validator});
            }

            if (validations) {
                // amis 的验证规则，转化一下
                rules.push.apply(rules, Object(__WEBPACK_IMPORTED_MODULE_7__buildValidator__["a" /* buildValidator */])(validations, validationErrors));
            }

            const required = this.data.get(`requiredOn.${name}`);
            if (required) {
                const message = validationErrors && validationErrors.required
                    ? validationErrors.required
                    : `${config.label || name}必填`;

                let type = 'string';
                if (config.requiredRuleType) {
                    // 针对一些自定义的组件，如果设置了 required: true，那么生成验证规则的时候
                    // 需要考虑到 value 的类型
                    type = config.requiredRuleType;
                }
                else {
                    if (config.type === 'select' && config.multi) {
                        type = 'array';
                    }
                    else if (config.type === 'calendar') {
                        type = 'date';
                    }
                    else if (config.type === 'number') {
                        type = 'number';
                    }
                    else if (config.type === 'switch') {
                        type = 'boolean';
                    }
                }
                rules.push({type, required, message});
            }
            // TODO(leeight) max, min, maxLength 等配置的处理
            // TODO(leeight) value 等配置的处理
            return rules;
        },

        buildFormValidator(name) {
            const formValidator = {};
            if (name) {
                const config = this.itemsMap[name];
                const rules = this.buildFormItemValidator(name, config);
                if (rules.length) {
                    formValidator[name] = rules;
                }
            }
            else {
                __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(this.itemsMap, (config, name) => {
                    const rules = this.buildFormItemValidator(name, config);
                    if (rules.length) {
                        formValidator[name] = rules;
                    }
                });
            }
            return new Schema(formValidator);
        },

        validateFormItem(name) {
            const preview = this.data.get('preview');
            if (preview) {
                return __WEBPACK_IMPORTED_MODULE_2_promise___default.a.resolve();
            }

            return new __WEBPACK_IMPORTED_MODULE_2_promise___default.a((resolve, reject) => {
                const formData = this.getFormData();
                const validator = this.buildFormValidator(name);
                validator.validate(formData, (errors, fields) => {
                    // 不要改变整个 formErrors ，只修改它特定的 item
                    const key = `formErrors.${name}`;
                    if (!errors) {
                        this.data.set(key, null);
                        resolve();
                    }
                    else {
                        const errorMessages = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(errors, e => e.message).join('<br/>');
                        this.data.set(key, errorMessages);
                        reject(errors);
                    }
                });
            });
        },

        validateForm() {
            const preview = this.data.get('preview');
            if (preview) {
                return __WEBPACK_IMPORTED_MODULE_2_promise___default.a.resolve();
            }

            return new __WEBPACK_IMPORTED_MODULE_2_promise___default.a((resolve, reject) => {
                const formData = this.getFormData();
                const validator = this.buildFormValidator();
                validator.validate(formData, (errors, fields) => {
                    if (!errors) {
                        this.data.set('formErrors', null);
                        resolve();
                        return;
                    }

                    const formErrors = {};
                    for (let i = 0; i < errors.length; i++) {
                        const item = errors[i];
                        const visible = this.data.get(`visibleOn.${item.field}`);
                        const hidden = this.data.get(`hiddenOn.${item.field}`);
                        // TODO(leeight) disable 的情况
                        if (!hidden && visible !== false) {
                            // 如果输入项是可见的，那么才考虑这个错误信息
                            formErrors[item.field] = item.message;
                        }
                    }

                    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isEmpty(formErrors)) {
                        this.data.set('formErrors', null);
                        resolve();
                    }

                    this.data.set('formErrors', formErrors);
                    reject(formErrors);
                });
            });
        },

        getFormData() {
            const formData = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(this.data.get('formData'), Form.$fields);
            // 转化一下类型
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(formData, (value, key) => {
                const config = this.itemsMap[key];
                if (value == null) {
                    return;
                }
                if (config.type === 'number') {
                    // 把 string 类型转化为 number 类型，否则验证的时候会失败
                    formData[key] = parseFloat(value, 10);
                }
                else if (config.type === 'text') {
                    // 把 其它 类型转化为 string 类型，否则验证的时候会失败
                    formData[key] = String(value);
                }
                // TODO(leeight)
                // 其它的类型应该如何处理呢？或许考虑换一个 validator 的库了??
            });
            return formData;
        }
    });

    const $fields = [];
    schemaTraversal(controls, item => {
        if (item.name) {
            $fields.push(item.name);
        }
    });
    Form.$fields = $fields;

    return Form;
}


/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createForm;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asForm__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__builtins_Number__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__builtins_Text__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__builtins_Select__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__builtins_Calendar__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__builtins_Uploader__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__builtins_Switch__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__builtins_BoxGroup__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__builtins_RangeCalendar__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__builtins_NumberTextline__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__builtins_Dragger__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__builtins_RadioSelect__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__builtins_Tip__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__builtins_MultiPicker__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__builtins_Region__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__builtins_UserPicker__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__builtins_ACEEditor__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__builtins_CKEditor__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__builtins_RichTextEditor__ = __webpack_require__(89);
/**
 * @file inf-ui/x/forms/createForm.es6
 * @author leeight
 */





















Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_1__builtins_Number__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_2__builtins_Text__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_3__builtins_Select__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_4__builtins_Calendar__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_5__builtins_Uploader__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_6__builtins_Switch__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_7__builtins_BoxGroup__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_9__builtins_NumberTextline__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_10__builtins_Dragger__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_11__builtins_RadioSelect__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_12__builtins_Tip__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_13__builtins_MultiPicker__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_14__builtins_Region__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_15__builtins_UserPicker__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_8__builtins_RangeCalendar__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_16__builtins_ACEEditor__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_17__builtins_CKEditor__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["b" /* registerFormItem */])(__WEBPACK_IMPORTED_MODULE_18__builtins_RichTextEditor__["a" /* default */]);

function createForm(schema) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__asForm__["a" /* asForm */])(schema);
}


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

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = evalExpr;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/**
 * 本来 san 提供了 san.parseExpr 接口，但是没有开放 san.evalExpr 接口 :-(
 *
 * @file inf-ui/x/forms/ExpressionEvaluator.es6
 * @author leeight
 */



function expressionComparison(oper, expectedValue, realValue) {
    switch (oper) {
        case '$contains':
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.includes(realValue, expectedValue);
        case '$in':
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.indexOf(expectedValue, realValue) !== -1;
        case '$nin':
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.indexOf(expectedValue, realValue) === -1;
        case '$eq':
            return expectedValue === realValue;
        case '$ne':
            return expectedValue !== realValue;
        case '$gt':
            return realValue > expectedValue;
        case '$lt':
            return realValue < expectedValue;
        case '$gte':
            return realValue >= expectedValue;
        case '$lte':
            return realValue <= expectedValue;
        default:
            return false;
    }
}

/**
 * 计算一个表达式的值
 *
 * @param {string|Object} expression The expression.
 * @param {Object} scope The value scope.
 * @return {boolean}
 */
function evalExpr(expression, scope) {
    if (!expression) {
        return true;
    }

    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isString(expression)) {
        return !!scope.get(expression);
    }

    // {
    //   a: <value>
    //   b: {
    //     <oper1>: <value>,
    //     <oper2>: <value>,
    //     <oper3>: <value>
    //   }
    // }
    // <oper>: [$in, $nin, $eq, $ne, $gt, $lt, $gte, $lte]
    // 如果计算的过程中，有任何一个值是 false，那么就停止计算，返回 false，否则返回 true

    const keys = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.keys(expression);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const realValue = scope.get(key);
        const value = expression[key];
        if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isPlainObject(value)) {
            const opers = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.keys(value);
            for (let j = 0; j < opers.length; j++) {
                const oper = opers[j];
                const expectedValue = value[oper];
                if (!expressionComparison(oper, expectedValue, realValue)) {
                    return false;
                }
            }
        }
        else {
            // 如果没有 <oper>，实际上等于
            // a: {
            //   $eq: <value>
            // }
            const expectedValue = value;
            if (!expressionComparison('$eq', expectedValue, realValue)) {
                return false;
            }
        }
    }

    return true;
}


/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = buildValidator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/**
 * @file inf-ui/x/forms/buildValidator.es6
 * @author leeight
 */



function jsonValidator(errorMessage) {
    return {
        type: 'string',
        validator(rule, value, callback) {
            try {
                JSON.parse(value);
                callback();
            }
            catch (ex) {
                callback(errorMessage || 'JSON不合法');
            }
        }
    };
}

function toAsyncValidatorRule(type, param, message) {
    switch (type) {
        case 'isEmail':
            return {type: 'email', message: message || '邮箱格式不正确'};
        case 'isUrl':
            return {type: 'url', message: message || 'URL格式不正确'};
        case 'isNumeric':
            // 这里用 {type: 'number'} 有些问题
            // 因为输入组件可能返回的是 string 类型，如果 string 类型的值交给 validator 是无法通过的
            // return {type: 'number', message: message || '请输入数字'};
            return {type: 'string', pattern: /^\d+(\.\d+)?$/, message: message || '请输入数字'};
        case 'isInt':
            return {type: 'string', pattern: /^\d+$/, message: message || '请输入整数'};
        case 'isFloat':
            return {type: 'string', pattern: /^\d+?\.\d+$/, message: message || '请输入浮点数'};
        case 'isBool':
            return {type: 'boolean', message};
        case 'isJson':
            return jsonValidator(message);
        case 'isAlphanumeric':
            return {type: 'string', pattern: /^[a-zA-Z0-9]+$/, message: message || '只能输入字母或者数字'};
        case 'minLength':
            return {type: 'string', min: parseInt(param, 10), message: message || `最少输入${param}个字符`};
        case 'maxLength':
            return {type: 'string', max: parseInt(param, 10), message: message || `最多输入${param}个字符`};
        case 'minimum':
            return {type: 'number', min: parseFloat(param, 10), message: message || `最小值${param}`};
        case 'maximum':
            return {type: 'number', max: parseFloat(param, 10), message: message || `最大值${param}`};
        case 'matchRegexp':
            return {type: 'string', pattern: new RegExp(param), message};
        default:
            return null;
    }
}

/**
 * 从 schema 里面的配置，生成表单可用的验证逻辑
 * 更多的内容请参考：http://amis.baidu.com/docs/renderers 提到的 validations 部分
 *
 * 当前支持的规则如下：
 * matchRegexp:/foo/ 必须命中某个正则
 * minLength:length 最小长度
 * maxLength:length 最大长度
 * maximum:length 最大值
 * minimum:length 最小值
 * isEmail 必须是 Email
 * isUrl 必须是 Url
 * isNumeric 必须是 数值
 * isAlphanumeric 必须是 字母或者数字
 * isInt 必须是 整形
 * isFloat 必须是 浮点形
 * isJson 是否是合法的 Json 字符串
 *
 * @param {Array.<string>} validations 数组（为了避免正则里面出现 , 导致切分的问题，这里是数组，而不是类似 amis 里面的字符串）.
 * @param {Object?} validationErrors 针对每个规则配置的失败之后的错误信息，如果没有的话，就用默认的逻辑来生成
 *
 * @return {Array.<Object>}
 */
function buildValidator(validations, validationErrors) {
    if (!validationErrors) {
        validationErrors = {}; // eslint-disable-line
    }

    const rules = [];

    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(validations, item => {
        let type = item;
        let param = null;
        let message = validationErrors[type];
        if (/^(matchRegexp|minLength|maxLength|maximum|minimum):/.test(item)) {
            type = RegExp.$1;
            param = item.substr(type.length + 1);
            if (!param) {
                // 如果没有所需要的参数值，直接忽略这条规则即可
                return;
            }
            message = validationErrors[type];
        }
        const rule = toAsyncValidatorRule(type, param, message);
        if (rule) {
            rules.push(rule);
        }
    });

    return rules;
}


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_TextBox__ = __webpack_require__(7);
/**
 * @file inf-ui/x/forms/builtins/Number.es6
 * @author leeight
 */



const tagName = 'ui-form-textbox';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'number',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_TextBox__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                type="number"
                width="{{${prefix}.width}}"
                placeholder="{{${prefix}.placeholder}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_TextBox__ = __webpack_require__(7);
/**
 * @file inf-ui/x/forms/builtins/Text.es6
 * @author leeight
 */



const tagName = 'ui-form-textbox';

/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'text',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_TextBox__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                type="text"
                multiline="{{${prefix}.multiline}}"
                width="{{${prefix}.width}}"
                placeholder="{{${prefix}.placeholder}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Select__ = __webpack_require__(13);
/**
 * @file inf-ui/x/forms/builtins/Select.es6
 * @author leeight
 */



const tagName = 'ui-form-select';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'select',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Select__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                datasource="{{${prefix}.datasource}}"
                width="{{${prefix}.width}}"
                multi="{{${prefix}.multi}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Calendar__ = __webpack_require__(33);
/**
 * @file inf-ui/x/forms/builtins/Calendar.es6
 * @author leeight
 */



const tagName = 'ui-form-calendar';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'calendar',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Calendar__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName} s-if="!preview"
                range="{{${prefix}.range}}"
                prev="{{${prefix}.prev}}"
                next="{{${prefix}.next}}"
                value="{=formData.${item.name}=}" />
            <span s-else>{{formData.${item.name} | datetime(${item.format})}}</span>`;
    }
});


/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Uploader__ = __webpack_require__(46);
/**
 * @file inf-ui/x/forms/builtins/Uploader.es6
 * @author leeight
 */



const tagName = 'ui-form-uploader';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'uploader',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0__Uploader__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName} s-if="!preview" value="{=formData.${item.name}=}" />
            <a s-else href="{{formData.${item.name}}}" target="_blank">
                {{formData.${item.name} | filename}}
            </a>`;
    }
});


/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Switch__ = __webpack_require__(22);
/**
 * @file inf-ui/x/forms/builtins/Switch.es6
 * @author leeight
 */



const tagName = 'ui-form-switch';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'switch',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Switch__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName} s-if="!preview" checked="{=formData.${item.name}=}" />
            <span s-else>{{formData.${item.name} === true ? 'ON' : 'OFF'}}</span>`;
    }
});


/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_BoxGroup__ = __webpack_require__(27);
/**
 * @file inf-ui/x/forms/builtins/BoxGroup.es6
 * @author liyuan
 */



const tagName = 'ui-form-boxgroup';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'boxgroup',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_BoxGroup__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                box-type="{{${prefix}.boxType}}"
                datasource="{{${prefix}.datasource}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_RangeCalendar__ = __webpack_require__(37);
/**
 * @file inf-ui/x/forms/builtins/RangeCalendar.es6
 * @author liyuan
 */



const tagName = 'ui-form-rangecalendar';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'rangecalendar',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_RangeCalendar__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                range="{{${prefix}.range}}"
                shortcut="{{${prefix}.shortcut}}"
                time="{{${prefix}.time}}"
                value="{=formData.${item.name}=}"/>
            <span s-else>
                {{formData.${item.name}.begin | datetime(${item.format})}}
                -
                {{formData.${item.name}.end | datetime(${item.format})}}
            </span>`;
    }
});


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


/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_NumberTextline__ = __webpack_require__(47);
/**
 * @file inf-ui/x/forms/builtins/NumberTextline.es6
 * @author liyuan
 */



const tagName = 'ui-form-numbertextline';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'numbertextline',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_NumberTextline__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                min="{{${prefix}.min}}"
                max="{{${prefix}.max}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Dragger__ = __webpack_require__(49);
/**
 * @file inf-ui/x/forms/builtins/Dragger.es6
 * @author liyuan
 */



const tagName = 'ui-form-dragger';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'dragger',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Dragger__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                min="{{${prefix}.min}}"
                max="{{${prefix}.max}}"
                length="{{${prefix}.length}}"
                unit="{{${prefix}.unit}}"
                step="{{${prefix}.step}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_RadioSelect__ = __webpack_require__(38);
/**
 * @file inf-ui/x/forms/builtins/RadioSelect.es6
 * @author liyuan
 */



const tagName = 'ui-form-radioselect';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'radioselect',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_RadioSelect__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                datasource="{{${prefix}.datasource}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Tip__ = __webpack_require__(23);
/**
 * @file inf-ui/x/forms/builtins/Tip.es6
 * @author liyuan
 */



const tagName = 'ui-form-tip';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'tip',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Tip__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                message="{{${prefix}.message}}"
                position="{{${prefix}.position}}"
            />`;
    }
});


/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_MultiPicker__ = __webpack_require__(28);
/**
 * @file inf-ui/x/forms/builtins/MultiPicker.es6
 * @author liyuan
 */



const tagName = 'ui-form-multipicker';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'multipicker',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_MultiPicker__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                datasource="{{${prefix}.datasource}}"
                loader="{{${prefix}.loader}}"
                layer-width="{{${prefix}.layerWidth}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Region__ = __webpack_require__(50);
/**
 * @file inf-ui/x/forms/builtins/Region.es6
 * @author leeight
 */



const tagName = 'ui-form-region';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'region',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_Region__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                datasource="{{${prefix}.datasource}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_UserPicker__ = __webpack_require__(52);
/**
 * @file inf-ui/x/forms/builtins/UserPicker.es6
 * @author liyuan
 */



const tagName = 'ui-form-userpicker';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'userpicker',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_UserPicker__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                search-requester="{{${prefix}.searchRequester}}"
                search-api="{{${prefix}.searchApi}}"
                keyword-name="{{${prefix}.keywordName}}"
                keyword="{{${prefix}.keyword}}"
                layer-width="{{${prefix}.layerWidth}}"
                auto-layer-width="{{${prefix}.autoLayerWidth}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_ACEEditor__ = __webpack_require__(42);
/**
 * @file inf-ui/x/forms/builtins/ACEEditor.es6
 * @author liyuan
 */



const tagName = 'ui-form-aceeditor';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'aceeditor',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_ACEEditor__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                width="{{${prefix}.width}}"
                height="{{${prefix}.height}}"
                mode="{{${prefix}.mode}}"
                theme="{{${prefix}.theme}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_CKEditor__ = __webpack_require__(53);
/**
 * @file inf-ui/x/forms/builtins/CKEditor.es6
 * @author liyuan
 */



const tagName = 'ui-form-ckeditor';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'ckeditor',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_CKEditor__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                options="{{${prefix}.options}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_RichTextEditor__ = __webpack_require__(54);
/**
 * @file inf-ui/x/forms/builtins/RichTextEditor.es6
 * @author liyuan
 */



const tagName = 'ui-form-richtexteditor';
/* harmony default export */ __webpack_exports__["a"] = ({
    type: 'richtexteditor',
    tagName,
    Component: __WEBPACK_IMPORTED_MODULE_0_inf_ui_x_components_RichTextEditor__["a" /* default */],
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                options="{{${prefix}.options}}"
                width="{{${prefix}.width}}"
                height="{{${prefix}.height}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
});


/***/ })

},[316])});;