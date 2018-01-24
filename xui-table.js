define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([4],{

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

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TextBox__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Select__ = __webpack_require__(13);
/**
 * @file SearchBox.es6
 * @author leeight
 */









const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-searchbox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-select
        s-if="datasource.length"
        on-change="onKeywordTypeChanged($event)"
        datasource="{{datasource}}"
        layer-offset-top="{{1}}"
        layer-offset-left="{{-1}}"
        layer-width="{{layerWidth}}"
        value="{=keywordType=}"
        />
    <ui-textbox
        on-enter="onSearch"
        on-focus="onFocus"
        on-blur="onBlur"
        placeholder="{{placeholder}}"
        value="{=value=}"
        disabled="{{disabled}}"
        width="{{width}}"
        />
    <ui-button on-click="onSearch" icon="magnifier" disabled="{{disabled}}" s-if="searchBtn" />
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'ui-select': __WEBPACK_IMPORTED_MODULE_5__Select__["a" /* default */],
        'ui-textbox': __WEBPACK_IMPORTED_MODULE_4__TextBox__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_3__Button__["a" /* default */]
    },
    initData() {
        return {
            disabled: false,
            active: false,
            value: '',
            searchBtn: true,
            placeholder: '',
            datasource: null,
            keywordType: null,
            width: null,
            layerWidth: null
        };
    },
    dataTypes: {
        /**
         * 用户输入的内容
         * @bindx
         * @default ''
         */
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 组件的聚焦状态
         * @default false
         */
        active: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否展示搜索按钮
         * @default true
         */
        searchBtn: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 搜索框的 placeholder
         * @default ''
         */
        placeholder: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * Select 的数据源，每一项的格式如下：
         * <pre><code>{
         *   text: string,
         *   value: any,
         *   disabled?: bool
         * }</code></pre>
         */
        datasource: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].array,

        /**
         * 设置或者获取 Select 的值
         * @bindx
         */
        keywordType: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any,

        /**
         * 输入框的宽度
         */
        width: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * layer的宽度
         */
        layerWidth: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const searchBtn = this.data.get('searchBtn');
            if (!searchBtn) {
                klass.push(cx('nobtn'));
            }
            const active = this.data.get('active');
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
                klass.push(cx('x-active'));
            }
            return klass;
        }
    },
    attached() {
        const keywordType = this.data.get('keywordType');
        this.__updatePlaceholder(keywordType);
    },
    onKeywordTypeChanged({value}) {
        this.__updatePlaceholder(value);
    },
    __updatePlaceholder(keywordType) {
        const datasource = this.data.get('datasource');
        if (datasource && keywordType) {
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(datasource, item => {
                if (item.value === keywordType) {
                    this.data.set('placeholder', `请输入${item.text}进行搜索`);
                }
            });
        }
    },
    onSearch() {
        this.fire('search');
    },
    onFocus() {
        this.data.set('active', true);
    },
    onBlur() {
        this.data.set('active', false);
    }
}));


/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Table__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_TableColumnToggle__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_FrozenColumnTable__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_SearchBox__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_BoxGroup__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_inf_ui_x_components_Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-table.es
 * @author leeight
 */











/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-table
        schema="{{table.schema}}"
        cell-builder="{{table.cellRenderer}}"
        on-command="onCommand($event)"
        loading="{{table.loading}}"
        error="{{table.error}}"
        datasource="{{table.datasource}}">
        <div class="ui-table-loading" slot="loading">自定义加载中....</div>
        <div class="ui-table-error" slot="error">
            啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
        </div>
    </xui-table>
</x-row>

<x-row label="select=multi">
    <div class="xui-table-demo-toolbar">
        <xui-searchbox search-btn="{{false}}" />
        <xui-table-column-toggle
            on-change="toggleTableColumns"
            layer-align="right"
            value="{=tct.value=}"
            datasource="{{tct.datasource}}"
            />
    </div>

    <xui-table select="multi"
        schema="{{table.schema}}"
        loading="{{table.loading}}"
        error="{{table.error}}"
        datasource="{{table.datasource}}"
        selected-index="{=table.selectedIndex=}"
        on-selected-change="onTableRowSelected($event)">

        <div class="ui-table-loading" slot="loading">自定义加载中....</div>
        <div class="ui-table-error" slot="error">
            啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
        </div>
    </xui-table>
    <p>Table Selected Index: {{table.selectedIndex}}</p>
</x-row>

<x-row label="select=single">
    <xui-table select="single"
        schema="{{table.schema}}"
        loading="{{table.loading}}"
        error="{{table.error}}"
        datasource="{{table.datasource}}"
        on-selected-change="onTableRowSelected($event)">

        <div class="ui-table-loading" slot="loading">自定义加载中....</div>
        <div class="ui-table-error" slot="error">
            啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
        </div>
    </xui-table>
</x-row>

<x-row label="select=multi,freezed,左冻结列">
    <xui-frozen-column-table
        select="multi"
        selected-index="{=freezedLeftTable.selectedIndex=}"
        schema="{{freezedLeftTable.schema}}"
        datasource="{{freezedLeftTable.datasource}}"
        />
    <p>Table Selected Index: {{freezedLeftTable.selectedIndex}}</p>
</x-row>

<x-row label="select=multi,freezed,左右冻结列">
    <div class="xui-table-demo-toolbar">
        <xui-button on-click="resetFreezedTableDatasource">Reset Datasource</xui-button>
    </div>
    <xui-frozen-column-table
        select="multi"
        selected-index="{=freezedTable.selectedIndex=}"
        schema="{{freezedTable.schema}}"
        datasource="{{freezedTable.datasource}}"
        />
    <p>Table Selected Index: {{freezedTable.selectedIndex}}</p>
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_7__Row__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_6_inf_ui_x_components_Button__["a" /* default */],
        'xui-boxgroup': __WEBPACK_IMPORTED_MODULE_5_inf_ui_x_components_BoxGroup__["a" /* default */],
        'xui-searchbox': __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_SearchBox__["a" /* default */],
        'xui-table': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Table__["a" /* default */],
        'xui-frozen-column-table': __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_FrozenColumnTable__["a" /* default */],
        'xui-table-column-toggle': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_TableColumnToggle__["a" /* default */]
    },
    initData() {
        return {
            tct: {
                value: ['name', 'age', 'gender'],
                datasource: [
                    {text: 'name', value: 'name'},
                    {text: 'age', value: 'age'},
                    {text: 'gender', value: 'gender'}
                ]
            },
            freezedLeftTable: {
                selectedIndex: [1, 3],
                schema: [
                    {name: 'name', label: '标签/tag', freezed: true},
                    {name: 'DCC', label: '专属实例', freezed: true},
                    {name: 'BCC', label: 'BCC实例'},
                    {name: 'abc', label: '专属子XX'},
                    {name: 'CDS', label: '云磁盘'},
                    {name: 'EIP', label: '弹性公网'},
                    {name: 'BOS', label: '云存储'},
                    {name: 'RDS', label: '关系型数据库', width: 500},
                    {name: 'SG', label: '安全组', width: 500},
                    {name: 'BLB', label: '负载均衡'},
                    {name: 'EEE', label: '操作'}
                ],
                datasource: [
                    {name: 'tag1', DCC: 1, BCC: 1, abc: 1, CDS: 1, EIP: 1, BOS: 1, RDS: 1, SG: 1, BLB: 1, EEE: 'sdfdsf'},
                    {name: 'tag2', DCC: 2, BCC: '2<br>3<br>4', abc: 2, CDS: 2, EIP: 2, BOS: 2, RDS: 2, SG: 2, BLB: 2, EEE: 'eee'},
                    {name: 'tag3', DCC: 3, BCC: 3, abc: 3, CDS: 3, EIP: 3, BOS: 3, RDS: 3, SG: 3, BLB: 3, EEE: 'xxx'},
                    {name: 'tag4', DCC: 4, BCC: 4, abc: 4, CDS: 4, EIP: 4, BOS: 4, RDS: 4, SG: 4, BLB: 4, EEE: 'xxx'}
                ]
            },
            freezedTable: {
                selectedIndex: [1, 3],
                schema: [
                    {name: 'name', label: '标签/tag', freezed: true},
                    {name: 'DCC', label: '专属实例', freezed: true},
                    {name: 'BCC', label: 'BCC实例'},
                    {name: 'abc', label: '专属子XX'},
                    {name: 'CDS', label: '云磁盘'},
                    {name: 'EIP', label: '弹性公网'},
                    {name: 'BOS', label: '云存储'},
                    {name: 'RDS', label: '关系型数据库', width: 500},
                    {name: 'SG', label: '安全组', width: 500},
                    {name: 'BLB', label: '负载均衡'},
                    {name: 'EEE', label: '操作', freezed: true}
                ],
                datasource: [
                    {name: 'tag1', DCC: 1, BCC: 1, abc: 1, CDS: 1, EIP: 1, BOS: 1, RDS: 1, SG: 1, BLB: 1, EEE: 'sdfdsf'},
                    {name: 'tag2', DCC: 2, BCC: '2<br>3<br>4', abc: 2, CDS: 2, EIP: 2, BOS: 2, RDS: 2, SG: 2, BLB: 2, EEE: 'eee'},
                    {name: 'tag3', DCC: 3, BCC: 3, abc: 3, CDS: 3, EIP: 3, BOS: 3, RDS: 3, SG: 3, BLB: 3, EEE: 'xxx'},
                    {name: 'tag4', DCC: 4, BCC: 4, abc: 4, CDS: 4, EIP: 4, BOS: 4, RDS: 4, SG: 4, BLB: 4, EEE: 'xxx'}
                ]
            },
            table: {
                selectedIndex: [1],
                schema: [
                    {name: 'name', label: '姓名', labelClassName: 'col-name'},
                    {
                        name: 'age',
                        label: '年龄',
                        width: 500,
                        sortable: true,
                        filter: {
                            options: [
                                {text: '全部', value: 'foo'},
                                {text: '未审核', value: 'foo1'},
                                {text: '已审核', value: 'foo2'},
                                {text: '已通过', value: 'foo3'}
                            ]
                        }
                    },
                    {name: 'gender', label: '性别', sortable: true}
                ],
                datasource: [
                    {name: 'foo', age: 10, gender: 'M'},
                    {name: 'bar', age: 20, gender: 'F', xui__disabled: true},
                    {name: 'xxx', age: 20, gender: '未知'}
                ],
                cellRenderer(item, key, col, rowIndex) {
                    if (key === 'gender') {
                        return '<a data-command="DELETE" href="javascript:void(0)">删除</a>';
                    }
                    return item[key];
                }
            }
        };
    },
    onTableRowSelected() {
        console.log('Table row selected');
    },
    onCommand({type, payload, rowIndex}) {
        console.log(type, payload, rowIndex);
        this.data.removeAt('table.datasource', rowIndex - 1);
    },
    toggleTableColumns() {
        const columnNames = this.data.get('tct.value');
        const schema = this.data.get('table.schema');
        for (let i = 0; i < schema.length; i++) {
            // 如果不存在，说明需要隐藏
            const xuiHidden = columnNames.indexOf(schema[i].name) === -1;
            this.data.set(`table.schema[${i}].xui__hidden`, xuiHidden);
        }
    },
    resetFreezedTableDatasource() {
        const key = 'freezedTable.datasource[1].BCC';
        const bcc = this.data.get(key);
        this.data.set(key, bcc === '2' ? '2<br>3<br>4' : '2');
    }
}));


/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Table__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Loading__ = __webpack_require__(15);
/**
 * 实现方案是两个 Table 重叠起来
 * @file components/FrozenColumnTable.es6
 * @author leeight
 */








const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-frozen-column-table');

function fixWidth(col) {
    if (col.width == null || Object(__WEBPACK_IMPORTED_MODULE_3__util__["h" /* hasUnit */])(col.width)) {
        // 必须要有宽度，如果没有设置，添加一个默认值
        // 不能设置 xx%, 40px 之类的，必须是一个 number 类型
        col.width = 100;
    }
}

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <style type="text/css">{{__syncHeightStyles}}</style>
    <div class="${cx('loading')}" s-if="loading">
        <slot name="loading"><ui-loading /></slot>
    </div>
    <div class="${cx('error')}" s-if="error">
        <slot name="error">{{error}}</slot>
    </div>
    <div
        s-if="!loading && !error"
        class="{{bodyClass}}"
        style="{{bodyStyle}}"
        >
        <div class="${cx('cell', 'cell-left')}" style="{{leftCellStyle}}" s-if="leftSchema.length">
            <ui-table
                s-ref="left"
                empty-text="{{emptyText}}"
                disabled-select-all="{{disabledSelectAll}}"
                select="{{select}}"
                cell-builder="{{cellBuilder}}"
                selected-index="{=selectedIndex=}"
                datasource="{{datasource}}"
                schema="{{leftSchema}}"

                on-row-enter="onEnterRow($event)"
                on-row-leave="onLeaveRow($event)"
                on-selected-change="onSelectedChange($event)"
                on-filter="onFilter($event)"
                on-sort="onSort($event)"
                on-command="onCommand($event)"
                />
        </div>
        <div class="${cx('cell', 'cell-middle')}" s-if="middleSchema.length">
            <ui-table
                s-ref="middle"
                empty-text="{{emptyText}}"
                disabled-select-all="{{disabledSelectAll}}"
                select="{{select}}"
                cell-builder="{{cellBuilder}}"
                selected-index="{=selectedIndex=}"
                datasource="{{datasource}}"
                schema="{{middleSchema}}"

                on-scroll="onScroll($event)"
                on-row-enter="onEnterRow($event)"
                on-row-leave="onLeaveRow($event)"
                on-selected-change="onSelectedChange($event)"
                on-filter="onFilter($event)"
                on-sort="onSort($event)"
                on-command="onCommand($event)"
                />
        </div>
        <div class="${cx('cell', 'cell-right')}" style="{{rightCellStyle}}" s-if="rightSchema.length">
            <ui-table
                s-ref="right"
                empty-text="{{emptyText}}"
                cell-builder="{{cellBuilder}}"
                datasource="{{datasource}}"
                schema="{{rightSchema}}"

                on-row-enter="onEnterRow($event)"
                on-row-leave="onLeaveRow($event)"
                on-filter="onFilter($event)"
                on-sort="onSort($event)"
                on-command="onCommand($event)"
                />
        </div>
    </div>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
    template,
    components: {
        'ui-table': __WEBPACK_IMPORTED_MODULE_4__Table__["a" /* default */],
        'ui-loading': __WEBPACK_IMPORTED_MODULE_5__Loading__["a" /* default */]
    },
    initData() {
        return {
            __syncHeightStyles: '',
            bodyHeight: 0,
            scrollPosition: 'left'
        };
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        bodyClass() {
            const klass = [cx('body')];
            const scrollPosition = this.data.get('scrollPosition');
            if (scrollPosition) {
                klass.push(cx('scroll-position-' + scrollPosition));
            }
            return klass;
        },
        bodyStyle() {
            const style = {
                height: this.data.get('bodyHeight') + 'px'
            };
            return style;
        },
        leftCellWidth() {
            const leftSchema = this.data.get('leftSchema');
            const select = this.data.get('select');
            const initialValue = (select === 'multi' || select === 'single') ? 46 : 0;
            const width = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(leftSchema, (sum, col) => sum + col.width, initialValue);
            return width;
        },
        rightCellWidth() {
            const rightSchema = this.data.get('rightSchema');
            const initialValue = 0;
            const width = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(rightSchema, (sum, col) => sum + col.width, initialValue);
            return width;
        },
        leftCellStyle() {
            const width = this.data.get('leftCellWidth');
            return {
                width: `${width}px`
            };
        },
        rightCellStyle() {
            const width = this.data.get('rightCellWidth');
            return {
                width: `${width}px`
            };
        },
        leftSchema() {
            const schema = this.data.get('schema');
            const leftSchema = [];
            for (let i = 0; i < schema.length; i++) {
                const col = schema[i];
                if (col.freezed) {
                    fixWidth(col);
                    leftSchema.push(col);
                }
                else {
                    break;
                }
            }
            return leftSchema;
        },
        middleSchema() {
            const schema = this.data.get('schema');
            __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(schema, col => fixWidth(col));
            return schema;
        },
        rightSchema() {
            const schema = this.data.get('schema');
            const rightSchema = [];
            for (let i = schema.length - 1; i >= 0; i--) {
                const col = schema[i];
                if (col.freezed) {
                    fixWidth(col);
                    rightSchema.unshift(col);
                }
                else {
                    break;
                }
            }
            return rightSchema;
        }
    },
    __syncHeight() {
        this.data.set('__syncHeightStyles', '');
        this.nextTick(() => {
            const left = this.ref('left');
            const middle = this.ref('middle');
            const right = this.ref('right');
            if (left && left.el && middle && middle.el) {
                this.data.set('bodyHeight', __WEBPACK_IMPORTED_MODULE_1_jquery___default()(middle.el).height());
                const leftRows = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(left.el).find('tbody tr');
                const middleRows = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(middle.el).find('tbody tr');
                const rightRows = (right && right.el) ? __WEBPACK_IMPORTED_MODULE_1_jquery___default()(right.el).find('tbody tr') : [];

                const styles = [];

                for (let i = 0; i < leftRows.length; i++) {
                    const leftRow = leftRows[i];
                    const middleRow = middleRows[i];
                    const rightRow = rightRows[i];

                    // XXX(user) 这里不能用 $(leftRow).height() 因为在 firefox 下面有兼容性问题，获取的值包含了 border-bottom 的宽度（chrome没这个问题）
                    // 这里也不能用 $(leftRow).find('td:first-child').height()，因为在 chrome 下面也有问题，获取的值也包含了 border-bottom 的宽度（firefox没这个问题）
                    // 所以改用了 prop('clientHeight') 目前看起来两种浏览器获取的值都是一样的
                    let leftRowHeight = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(leftRow).find('td:first-child').prop('clientHeight');
                    let middleRowHeight = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(middleRow).find('td:first-child').prop('clientHeight');
                    let rightRowHeight = rightRow ? __WEBPACK_IMPORTED_MODULE_1_jquery___default()(rightRow).find('td:first-child').prop('clientHeight') : 0;

                    if (rightRow) {
                        if (leftRowHeight === middleRowHeight
                            && leftRowHeight === rightRowHeight) {
                            continue;
                        }
                        const maxRowHeight = Math.max(leftRowHeight, middleRowHeight, rightRowHeight);
                        if (leftRowHeight < maxRowHeight) {
                            styles.push(`#${leftRow.id}{height: ${maxRowHeight + 1}px !important;}`);
                        }
                        if (middleRowHeight < maxRowHeight) {
                            styles.push(`#${middleRow.id}{height: ${maxRowHeight + 1}px !important;}`);
                        }
                        if (rightRowHeight < maxRowHeight) {
                            styles.push(`#${rightRow.id}{height: ${maxRowHeight + 1}px !important;}`);
                        }
                    }
                    else {
                        if (leftRowHeight === middleRowHeight) {
                            continue;
                        }

                        const maxRowHeight = Math.max(leftRowHeight, middleRowHeight);
                        if (leftRowHeight < maxRowHeight) {
                            styles.push(`#${leftRow.id}{height: ${maxRowHeight + 1}px !important;}`);
                        }
                        else if (middleRowHeight < maxRowHeight) {
                            styles.push(`#${middleRow.id}{height: ${maxRowHeight + 1}px !important;}`);
                        }
                    }
                }

                if (styles.length) {
                    this.data.set('__syncHeightStyles', styles.join('\n'));
                }
            }
        });
    },
    __syncHoverState(rowIndex, add) {
        const tables = [this.ref('left'), this.ref('middle'), this.ref('right')];
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(tables, table => {
            if (table && table.el) {
                if (add) {
                    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(table.el).find(`tbody tr:nth-child(${rowIndex + 1})`).addClass('ui-table-row-hover');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(table.el).find(`tbody tr:nth-child(${rowIndex + 1})`).removeClass('ui-table-row-hover');
                }
            }
        });
    },
    onSelectedChange(event) {
        this.fire('on-selected-change', event);
    },
    onFilter(event) {
        this.fire('filter', event);
    },
    onSort(event) {
        this.fire('sort', event);
    },
    onCommand(event) {
        this.fire('command', event);
    },
    onEnterRow({rowIndex}) {
        this.__syncHoverState(rowIndex, true);
        this.fire('row-enter', {rowIndex});
    },
    onLeaveRow({rowIndex}) {
        this.__syncHoverState(rowIndex, false);
        this.fire('row-leave', {rowIndex});
    },
    onScroll(event) {
        const containerWidth = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(event.target).width();
        const tableWidth = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(event.target.firstElementChild).width();
        const scrollEnd = Math.max(tableWidth - containerWidth, 0);

        const scrollLeft = event.target.scrollLeft;
        if (scrollLeft > 0) {
            this.data.set('scrollPosition', scrollLeft === scrollEnd ? 'right' : 'middle');
        }
        else {
            this.data.set('scrollPosition', 'left');
        }
    },
    inited() {
        this.watch('datasource', () => this.__syncHeight());
    },
    attached() {
        this.__syncHeight();
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


/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Layer__ = __webpack_require__(8);
/**
 * @file components/TableColumnToggle.es6
 * @author leeight
 */







const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-table-column-toggle');
const cx2 = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-select');

/* eslint-disable */
const template = `<div class="${cx()}">
<ui-button disabled="{{disabled}}" icon="iot-device-list" on-click="toggleLayer" />
<ui-layer
    follow-scroll="{{false}}"
    open="{=active=}"
    offset-left="{{layerOffsetLeft}}"
    offset-top="{{layerOffsetTop}}"
    align="{{layerAlign}}"
    width="{{layerWidth}}">
    <ul class="${cx2('layer')} ${cx2('layer-x')}" style="{{layerStyle}}">
        <li class="{{item | itemClass}}"
            on-click="onItemClick(item)"
            s-for="item in datasource">
            <label>
                <input type="checkbox"
                    value="{{item.value}}"
                    class="${cx2('selected-box')}"
                    disabled="{{item.disabled}}"
                    checked="{=value=}" />
                <span>{{item.text}}</span>
            </label>
        </li>
    </ul>
</ui-layer>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-button': __WEBPACK_IMPORTED_MODULE_2__Button__["a" /* default */],
        'ui-layer': __WEBPACK_IMPORTED_MODULE_3__Layer__["a" /* default */]
    },
    initData() {
        return {
            active: false,
            disabled: false,
            layerAlign: 'left',
            layerWidth: 200,
            layerOffsetLeft: 0,
            layerOffsetTop: 0,
            // 0, 1, 2, 3
            value: [],
            // item.text, item.value, item.disabled
            datasource: []
        };
    },
    computed: {
        layerStyle() {
            const style = {};
            const layerWidth = this.data.get('layerWidth');
            if (layerWidth != null) {
                style.width = Object(__WEBPACK_IMPORTED_MODULE_1__util__["h" /* hasUnit */])(layerWidth) ? layerWidth : `${layerWidth}px`;
            }
            return style;
        }
    },
    filters: {
        itemClass(item) {
            const klass = [cx2('item', 'item-multi')];
            // TODO(leeight) 针对 multi 的情况，还未处理
            if (item.disabled) {
                klass.push(cx2('item-disabled'));
            }
            return klass;
        }
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        this.data.set('active', !active);
    },
    onItemClick(item) {
        if (item.disabled) {
            return;
        }
        this.nextTick(() => this.fire('change'));
    }
}));


/***/ })

},[377])});;