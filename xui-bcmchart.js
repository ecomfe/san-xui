define(["san","echarts"], function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_322__) { return webpackJsonp([3],{

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

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_BcmChart__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Row__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__examples_bcmData__ = __webpack_require__(324);
/**
 * @file demos/xui-bcmchart.es6
 * @author leeight
 */









function delayRequester(data, ms = 500) {
    return function () {
        return new __WEBPACK_IMPORTED_MODULE_1_promise___default.a((resolve, reject) => {
            setTimeout(() => resolve(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.cloneDeep(data)), ms);
        });
    };
}

/* eslint-disable */
const template = `<template>
<!--x-row label="error">
    <xui-bcmchart
        title="CPU使用率"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vCPUUsagePercent(CPU使用率)"
        unit="百分比"
    />
</x-row-->

<x-row label="withFilter">
    <xui-bcmchart
        with-filter
        width="{{800}}"
        height="{{300}}"
        title="CPU使用率"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vCPUUsagePercent(CPU使用率)"
        requester="{{requester1}}"
        unit="百分比"
    />
</x-row>

<x-row label="default">
    <xui-bcmchart
        showbigable
        title="CPU使用率"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vCPUUsagePercent(CPU使用率)"
        requester="{{requester1}}"
        unit="百分比"
    />

    <xui-bcmchart
        showbigable
        title="每秒磁盘IO读写次数"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vDiskReadOpCountPerSecond(每秒磁盘IO读取次数),vDiskWriteOpCountPerSecond(每秒磁盘IO写入次数)"
        requester="{{requester2}}"
        unit="次/秒"
    />

    <xui-bcmchart
        showbigable
        title="每秒磁盘IO读写量"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vDiskReadBytesPerSecond(每秒磁盘IO读取量),vDiskWriteBytesPerSecond(每秒磁盘IO写入量)"
        requester="{{requester3}}"
        unit="字节/秒"
    />

    <xui-bcmchart
        showbigable
        title="网络监控"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vNicInBytes(网卡输入流量),vNicOutBytes(网卡输出流量),WebInBytes(从外网进入的流量),WebOutBytes(流向外网的流量)"
        requester="{{requester4}}"
        unit="字节"
    />

    <xui-bcmchart
        showbigable
        title="出口带宽"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="WebOutBitsPerSecond(出口带宽)"
        requester="{{requester5}}"
        unit="bps"
    />

    <xui-bcmchart
        showbigable
        title="内存使用量"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="MemUsedBytes(内存使用量)"
        requester="{{requester6}}"
        unit="字节"
    />

    <xui-bcmchart
        showbigable
        title="内存使用率"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="MemUsedPercent(内存使用率)"
        requester="{{requester7}}"
        unit="百分比"
    />

    <xui-bcmchart
        showbigable
        title="磁盘空间使用量"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="HomeUsedBytes(HOME磁盘空间使用量),RootUsedBytes(根磁盘空间使用量)"
        requester="{{requester8}}"
        unit="字节"
    />
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_2_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_4__Row__["a" /* default */],
        'xui-bcmchart': __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_BcmChart__["a" /* default */]
    },
    initData() {
        return {
            requester1: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["a" /* Data1 */]),
            requester2: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["b" /* Data2 */]),
            requester3: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["c" /* Data3 */]),
            requester4: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["d" /* Data4 */]),
            requester5: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["e" /* Data5 */]),
            requester6: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["f" /* Data6 */]),
            requester7: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["g" /* Data7 */]),
            requester8: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["h" /* Data8 */])
        };
    }
}));



/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Chart__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Select__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Tip__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Loading__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mixins_ajax__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__asDialog__ = __webpack_require__(228);
/**
 * @file components/BcmChart.es6
 * @author leeight
 */














const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-bcmchart');
const kMetricName = 'metricName';

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
<div class="${cx('box')}">
    <h1 s-if="title && !withFilter">
        {{title}}
        <div on-click="showBigView" class="${cx('showbig')}" s-if="!loading && showbigable"></div>
    </h1>
    <div class="${cx('filter')}" s-if="withFilter">
        统计项：<ui-select datasource="{{ds.statistics}}" value="{=statistics=}" on-change="loadMetrics" />
        采样周期：<ui-select datasource="{{ds.period}}" value="{=period=}" on-change="loadMetrics" />
        最近：<ui-select datasource="{{ds.timeRange}}" value="{=time=}" on-change="loadMetrics" />
        <ui-tip skin="warning" message="最多支持1440个数据点的查询显示，请选择合适的采样周期和聚合时间段。" />
        <ui-button icon="refresh" on-click="loadMetrics" />
    </div>
    <div class="${cx('chart')}" style="{{chartStyle}}">
        <ui-loading s-if="!chartOption && loading" />
        <div class="${cx('error')}" s-elif="error">{{error | raw}}</div>
        <div class="${cx('no-data')}" s-elif="isEmpty">{{noData | raw}}</div>
        <ui-chart s-else option="{{chartOption}}" loading="{{loading}}" width="{{width}}" height="{{height}}" not-merge />
    </div>
</div>
</div>`;
/* eslint-enable */

function parseMetrics(metrics) {
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(metrics)) {
        return metrics;
    }
    else if (metrics) {
        return __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].parseMetrics(metrics);
    }
    return [];
}

function getDefaultUrl(apiType) {
    return apiType === 'dimensions'
        ? '/api/bcm/metricdata/v2/datas/dimensions'
        : '/api/bcm/metricdata/v2/datas/metricname';
}

const BcmChart = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({ // eslint-disable-line
    template,
    components: {
        'ui-select': __WEBPACK_IMPORTED_MODULE_5__Select__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_7__Button__["a" /* default */],
        'ui-tip': __WEBPACK_IMPORTED_MODULE_6__Tip__["a" /* default */],
        'ui-loading': __WEBPACK_IMPORTED_MODULE_8__Loading__["a" /* default */],
        'ui-chart': __WEBPACK_IMPORTED_MODULE_4__Chart__["a" /* default */]
    },
    dataTypes: {
        /**
         * BcmChart 的标题
         */
        title: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * WTF??
         */
        lazy: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否展示过滤的功能，一般在对话框的里面才会设置这个值
         * @default false
         */
        withFilter: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否支持弹框放大的功能
         * @default false
         */
        showbigable: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 没有数据的时候，需要展示的文案
         */
        noData: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 配合 noData 来用
         */
        isEmpty: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * Chart的宽度
         * @default 550
         */
        width: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * Chart的高度
         * @default 200
         */
        height: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 是否是加载中
         * @default true
         */
        loading: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 如果出错了，展示的错误信息
         */
        error: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any,

        /**
         * 获取监控数据回掉函数<br>
         * function(payload:object):Promise.&lt;{series: any[]}, Error&gt;
         */
        requester: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].func,

        /**
         * 如BCE_BCC
         */
        scope: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 趋势图维度类型：多维度|多指标，可以设置的值有 metricName, dimensions
         * @default metricName
         */
        apiType: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 维度信息，可以是字符串或者数组
         * InstanceId:1;Node:2|3
         * ["InstanceId:1;Node:2", "InstanceId:1;Node:3"]
         */
        dimensions: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any,

        /**
         * 监控指标
         * 如：CPUUsagePercent(CPU使用率)
         * @default ''
         */
        metrics: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 统计方式：
         *  average: '平均值'
         *  maximum: '最大值'
         *  minimum: '最小值'
         *  sum: '和值'
         *  sampleCount: '样本数'
         * @default average
         */
        statistics: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 聚合周期，单位秒
         * @default 60
         */
        period: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 聚合区间，目前只支持最近多长时间
         * 如：1h：最近1小时
         * @default 1h
         */
        time: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 指标单位
         * @default ''
         */
        unit: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            return klass;
        },
        mainStyle() {
            const style = cx.mainStyle(this);
            // width 和 height 是给 chart 设置的
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.omit(style, 'width', 'height');
        },
        chartStyle() {
            const style = cx.mainStyle(this);
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(style, 'width', 'height');
        },
        metricConfig() {
            const metrics = this.data.get('metrics');
            const unit = this.data.get('unit');
            const statistics = this.data.get('statistics');

            return {
                unit,
                statistics,
                metrics: parseMetrics(metrics)
            };
        },
        conf() {
            // 这些参数实际上跟 https://cloud.baidu.com/doc/BCM/API.html#.E6.9F.A5.E8.AF.A2.E6.95.B0.E6.8D.AE.E6.8E.A5.E5.8F.A3 有关系
            // 保持跟之前的命名规则一致
            const conf = {};

            const statistics = this.data.get('statistics');
            const scope = this.data.get('scope');
            const time = this.data.get('time');
            const period = this.data.get('period');
            const apiType = this.data.get('apiType');
            const dimensions = this.data.get('dimensions');
            const metrics = this.data.get('metrics');

            const metricMap = parseMetrics(metrics);
            const {startTime, endTime} = __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].getUTCTimeRange(time, +period);

            if (apiType === kMetricName) {
                conf.dimensions = dimensions;
                conf.metricNames = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(metricMap, o => o.value);
            }
            else {
                // 是数组，表示已经解析好了，不需要再次解析
                if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(dimensions)) {
                    conf.dimensions = dimensions;
                }
                else {
                    conf.dimensions = __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].parseDimensions(dimensions);
                }
                conf.metricName = metricMap[0].value;
            }

            conf.statistics = statistics;
            conf.scope = scope;
            conf.periodInSecond = +period;
            conf.startTime = startTime;
            conf.endTime = endTime;

            /**
            if (scope === 'BCE_BOS' && 'x' === 'space') {
                delete conf.dimensions;
            }
            */

            return conf;
        }
    },
    initData() {
        return {
            lazy: true,
            withFilter: false,
            unit: '',
            metrics: '',
            width: 550,
            height: 200,
            apiType: kMetricName,
            period: 60,
            time: '1h',
            statistics: 'average',
            noData: '暂无数据<p style="font-size:12px;color:#aaa;">请检查是否安装了BCM客户端</p>',
            ds: {
                statistics: [
                    {text: '平均值', value: 'average'},
                    {text: '和值', value: 'sum'},
                    {text: '最大值', value: 'maximum'},
                    {text: '最小值', value: 'minimum'},
                    {text: '样本数', value: 'sampleCount'}
                ],
                period: [
                    {text: '1分钟', value: 60},
                    {text: '5分钟', value: 300},
                    {text: '20分钟', value: 1200},
                    {text: '1小时', value: 3600},
                    {text: '6小时', value: 21600},
                    {text: '12小时', value: 43200},
                    {text: '1天', value: 86400}
                ],
                timeRange: [
                    {text: '1小时', value: '1h'},
                    {text: '6小时', value: '6h'},
                    {text: '1天', value: '1d'},
                    {text: '7天', value: '7d'},
                    {text: '14天', value: '14d'},
                    {text: '40天', value: '40d'}
                ]
            }
        };
    },
    inited() {
        const requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            const apiType = this.data.get('apiType');
            const url = requester && typeof requester === 'string' ? requester : getDefaultUrl(apiType);
            this.data.set('requester', payload => Object(__WEBPACK_IMPORTED_MODULE_9__mixins_ajax__["a" /* $post */])(url, payload));
        }
    },
    attached() {
        this.loadMetrics();
    },

    loadMetrics() {
        const requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            this.data.set('error', '请设置 requester 参数');
            return;
        }

        const payload = this.data.get('conf');
        this.data.set('loading', true);
        this.data.set('error', null);
        return requester(payload)
            .then(data => {
                this.data.set('loading', false);
                this.renderChart(data);
            })
            .catch(error => {
                this.data.set('loading', false);
                this.data.set('error', error && error.global ? error.global : error);
            });
    },

    renderChart(data) {
        const conf = this.data.get('conf');

        const isEmpty = __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].isMonitorTrendEmpty(data.series, conf.statistics);
        this.data.set('isEmpty', isEmpty);
        if (isEmpty) {
            return;
        }

        __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].adjustSeriesData(data, conf.statistics);
        const metricConfig = this.data.get('metricConfig');
        const chartOption = __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].getChartOptions(data, metricConfig, {type: 'line'}, {period: conf.periodInSecond});
        this.data.set('chartOption', chartOption);
    },

    showBigView() {
        if (this.dialog) {
            this.dialog.dispose();
            this.dialog = null;
        }

        const DialogComponent = Object(__WEBPACK_IMPORTED_MODULE_10__asDialog__["a" /* asDialog */])(BcmChart);
        const payload = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.defaults({withFilter: true, width: 740, height: 350}, this.data.get());
        const data = {
            title: payload.title,
            foot: false,
            width: 800,
            payload
        };
        const dialog = this.dialog = new DialogComponent({data});
        dialog.on('close', () => this.dialog = null);
        dialog.attach(document.body);
    },

    disposed() {
        if (this.dialog) {
            this.dialog.dispose();
        }
    }
});

/* harmony default export */ __webpack_exports__["a"] = (BcmChart);



/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_i18n__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_echarts__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_echarts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__formatter__ = __webpack_require__(323);
/**
 * @file inf-ria/utils/mtools.es6
 * @author leeight
 */









const IS_V3 = /^3\./.test(__WEBPACK_IMPORTED_MODULE_4_echarts___default.a.version);

/**
 * 将utc时间转换为本地时间
 *
 * @param {number} time 时间戳
 * @param {string} pattern 格式化字符串
 * @return {string}
 */
function utc2local(time, pattern) {
    pattern = pattern || 'MM-DD HH:mm';
    return __WEBPACK_IMPORTED_MODULE_0_moment___default()(time).format(pattern);
}

/**
 * 将本地时间戳转换为utc时间字符串
 *
 * @param {number} time 时间戳
 * @param {string} pattern 格式化字符串
 * @return {string}
 */
function local2utc(time, pattern) {
    pattern = pattern || 'YYYY-MM-DDTHH:mm:ss';
    return __WEBPACK_IMPORTED_MODULE_0_moment___default()(time).utc().format(pattern) + 'Z';
}

/**
 * 获取当前的utc时间区间
 *
 * @param {string} timeRange 时间段标识
 * @param {number} period 时间区间
 * @return {Object}
 */
function getUTCTimeRange(timeRange, period) {
    let mt = timeRange.match(/(\d+)(\w+)/);
    let value = mt[1];
    let unit = mt[2];
    let m = __WEBPACK_IMPORTED_MODULE_0_moment___default()();

    let endTime = local2utc(m);
    let startTime = '';

    if (arguments.length === 1) {
        // 格式化时间：秒为0，起始时间加1分钟，解决时间区间超过范围问题
        startTime = local2utc(m.add('m', 1).subtract(unit, value), 'YYYY-MM-DDTHH:mm:00');
    }
    else {
        if (period < 60 * 60) {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('m', 1).subtract(unit, value).format('YYYY-MM-DDTHH:mm:00')));
        }
        else if (period < 60 * 60 * 24) {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('h', 1).subtract(unit, value).format('YYYY-MM-DDTHH:00:00')));
        }
        else {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('d', 1).subtract(unit, value).format('YYYY-MM-DDT00:00:00')));
        }
    }
    return {
        endTime: endTime,
        startTime: startTime
    };
}

/**
 * 对目标字符串按gbk编码截取字节长度
 *
 * @param {string} source 目标字符串
 * @param {number} length 需要截取的字节长度
 * @param {string} [tail] 追加字符串,可选.
 * @return {string}
 */
function truncate(source, length, tail) {
    source = String(source);
    tail = tail || '';
    let byteLength = source.replace('/[^\x00-\xff]/g', '**').length;
    if (length < 0 || byteLength <= length) {
        return source;
    }

    length = length - 2;
    source = source.substr(0, length).replace(/([^\x00-\xff])/g, '\x241 ') // 双字节字符替换成两个
        .substr(0, length) // 截取长度
        .replace(/[^\x00-\xff]$/, '') // 去掉临界双字节字符
        .replace(/([^\x00-\xff]) /g, '\x241'); // 还原
    return source + tail;
}

let chartTheme = [
    '#4aaaff', '#f2605d', '#01B09B', '#E74684',
    '#6EC50F', '#FE863D',
    '#A45BFF', '#F6D622', '#0AC1D7', '#B569D4'
];

/**
 * 趋势图默认配置
 *
 * @type {Object}
 */
let defaultChartOptions = {
    color: chartTheme,
    calculable: false,
    animation: false,
    grid: {
        x: 65,
        x2: 35,
        y: 50,
        y2: IS_V3 ? 60 : 50
    }
};
let statisticsMap = {
    average: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('平均值'),
    maximum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('最大值'),
    minimum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('最小值'),
    sum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('和值'),
    sampleCount: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('样本数')
};

/**
 * 与默认配置进行合并，得到最终的配置信息
 *
 * @param {Object} opt 扩充对象
 * @return {Object} 最终配置
 */
function mergeChartOptions(opt) {
    return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend({}, defaultChartOptions, opt);
}

/**
 * 将后端返回的数据，转换为echarts可以使用的配置信息
 *
 * @param {Object} data
 *  {series:[{name:'监控项名称', data:[数据点]}], category:[]}
 * @param {Object} metric 监控项配置
 *  - metric.unit {String}
 *  - metric.statistics {String}
 *  - metric.names {Object}
 *  - metric.names[value] = name
 *  - metric.metrics {Array}
 *  - metric.src 针对枚举类型的数值
 * @param {Object} opt
 *  - opt.type 图表类型line, bar, pie ...
 *  - opt.chart 图表特殊配置
 * @param {Object} addition 附加条件
 * @return {Object}
 */
function getChartOptions(data, metric, opt, addition) {
    let category = [];
    let unit = metric.unit;
    let zoomStart = 0;
    let legend = [];
    let tmpData = {};
    let seriesOpt = {};
    let seriesData = [];
    opt = opt || {
        type: 'line'
    };
    if (opt.type === 'line') {
        seriesOpt = {
            type: 'line',
            smooth: true,
            symbol: 'none',
            symbolSize: 2,
            showAllSymbol: true,
            itemStyle: {
                borderWidth: 1,
                normal: {
                    // areaStyle: {
                    //     type: 'default'
                    // },
                    lineStyle: {
                        width: 1
                    }
                }
            }
        };
    }
    else if (opt.type === 'bar') {
        seriesOpt = {
            type: 'bar'
        };
    }

    seriesOpt = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend(seriesOpt, opt.chart || {});

    let spliteNumber = 5;
    let yAxisFormatter;
    let yAxisMax;
    let tooltipFormatter = function (params) {
        let arr = [];
        if (params.length > 0) {
            arr.push(params[0].name + ' (' + statisticsMap[metric.statistics] + ')');
        }

        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item) {
            let label = truncate(item.seriesName, 22, '…');
            arr.push(label + '：' + item.value);
        });
        return arr.join('<br/>');
    };
    if (data.category.length === 0) {
        category.push(utc2local(__WEBPACK_IMPORTED_MODULE_0_moment___default()().utc()).replace(' ', '\n'));
        category.push(utc2local()); // .replace(' ', '\n'));
        category.push(utc2local()); // .replace(' ', '\n'));
    }
    else {
        let pattern = 'MM-DD HH:mm';
        if (addition && addition.period) {
            if (addition.period >= 60 * 60 * 24) {
                pattern = 'MM-DD';
            }

            // 精确到毫秒的格式
            if (addition.period < 1) {
                pattern = 'MM-DD HH:mm:ss.SSS';
            }
        }

        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.category, function (item) {
            category.push(utc2local(item, pattern));
        });
    }
    if (metric.nullPointMode === 0) {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.series, function (item) {
            let values = [];

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
                if (typeof value === 'undefined') {
                    value = 0;
                }

                values.push(value);
            });
            if (values.length === 0) {
                for (let i = 0, len = category.length; i < len; i++) {
                    values[i] = 0;
                }
            }

            tmpData[item.name] = values;
        });
    }
    else {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.series, function (item) {
            let values = [];
            let tmpvalue = '';

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
                if (typeof value === 'undefined') {
                    value = '-';
                }

                // 对于孤立数据点，以圆点的方式展示
                if (tmpvalue === '-' && value !== '-') {
                    values.push({
                        value: value,
                        symbol: 'emptyCircle'
                    });
                }
                else {
                    values.push(value);
                    if (value !== '-' && values.length > 1) {
                        values[values.length - 2] = tmpvalue;
                    }
                }
                tmpvalue = value;
            });
            if (values.length === 0) {
                for (let i = 0, len = category.length; i < len; i++) {
                    values[i] = '-';
                }
            }

            tmpData[item.name] = values;
        });
    }

    if (addition && addition.dataZoom) {
        zoomStart = addition.dataZoom.start;
    }
    else {
        zoomStart = Math.max((1 - 100 / category.length) * 100, 0);
    }

    let metricNames = {};
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metric.metrics, function (item, key) {
        metricNames[item.value] = item.name;
    });
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(tmpData, function (item, key) {
        let name = metricNames[key] || key;
        let obj = __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.extend(true, {}, seriesOpt, {
            name: name,
            data: item
        });
        legend.push(name);
        seriesData.push(obj);
    });
    if (metric.statistics === 'sampleCount') {
        unit = '个';
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                if (isNaN(value)) {
                    value = 0;
                }

                str += value + '<br/>';
            });
            return str;
        };
    }
    // 状态的监控项需对返回值映射成文本
    else if (unit === 'enum') {
        unit = '';
        let enums = metric.src || {};
        let count = __WEBPACK_IMPORTED_MODULE_1_lodash___default()(enums).value().length;
        if (count < 6) {
            spliteNumber = count - 1;
        }

        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name;
            }

            str += ' (' + statisticsMap[metric.statistics] + ')';
            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                let value = item.value;
                str += '<br/>' + truncate(item.seriesName, 22, '…') + '：' + value;
                if (value !== '-') {
                    str += '（' + (enums[value] || value) + '）';
                }

            });
            return str;
        };
    }
    else if (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('字节') || unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('字节/秒')) {
        let suffix = (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('字节') ? '' : '/s');
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let prefix;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    prefix = value < 0 ? '-' : '';
                    value = Math.abs(value);

                    value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes(value, 2, metric.byteUnit);
                    valueStr = prefix + value + suffix;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            let prefix = value < 0 ? '-' : '';
            value = Math.abs(value);
            value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes(value, 1, metric.byteUnit);
            return prefix + value + suffix;
        };
    }
    else if (unit === 'bps') {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let prefix;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    prefix = value < 0 ? '-' : '';
                    value = Math.abs(value);

                    value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bits(value, 2, metric.bitUnit).toUpperCase();
                    valueStr = prefix + value + unit;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            let prefix = value < 0 ? '-' : '';
            value = Math.abs(value);
            // 保留1位小数的话
            // 当纵坐标是0 0.125 0.15 0.175 0.2的时候
            // 就会出现三个0.1
            value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bits(value, 2, metric.bitUnit).toUpperCase();
            return prefix + value;
        };
    }
    else if (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('百分比')) {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…')
                    + '：' + item.value + (item.value === '-' ? '' : '%') + '<br/>';
            });
            return str;
        };
        yAxisFormatter = '{value}%';
        yAxisMax = 100;
    }
    else {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str = params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    valueStr = item.value;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            return __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].number(value, 0);
        };
    }

    let opts = {
        legend: {
            data: legend,
            x: 'center',
            padding: 2,
            itemGap: 2
        },
        tooltip: {
            trigger: 'axis',
            formatter: tooltipFormatter,
            textStyle: {
                fontSize: 12
            }
        },
        dataZoom: {
            start: zoomStart,
            show: true,
            height: 20,
            filterColor: 'rgba(74,170,255, 0.3)'
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: opt.type === 'bar',
                data: category,
                splitLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: unit || '',
                max: yAxisMax,
                splitNumber: spliteNumber,
                axisLabel: {
                    formatter: yAxisFormatter
                },
                splitLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
        ],
        series: seriesData
    };
    let forceOpt = opt.chartOptions || {};
    deepExtend(opts, forceOpt);
    return mergeChartOptions(opts);
}

function getPieChartOptions(config) {
    let options = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/> {c} ({d}%)'
        },
        color: [
            '#4aaaff', '#f2605d', '#F6D622',
            '#6EC50F', '#FE863D', '#B569D4',
            '#A45BFF', '#01B09B', '#E74684', '#0AC1D7'
        ],
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: config.legend
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['30%', '50%'],
                minAngle: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: config.series
            }
        ]
    };
    return options;
}

/**
 * 深度扩展
 *
 * @param {Object} src 目标对象
 * @param {Object} opt 扩充对象
 */
function deepExtend(src, opt) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(opt, function (item, key) {
        if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isArray(item)) {
            deepExtend(src[key] = src[key] || [], item);
        }
        else if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isObject(item)) {
            deepExtend(src[key] = src[key] || {}, item);
        }
        else {
            src[key] = item;
        }
    });
}

/**
 * 判断给定的数据点是否为空（空即表示没有数据）
 *
 * @param {Array} series 数据点
 * @return {boolean}
 */
function isSeriesEmpty(series) {
    let empty = true;
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(series, function (item, i) {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
            if (typeof value !== 'undefined') {
                empty = false;
                return false;
            }

        });
        return empty;
    });
    return empty;
}

/**
 * 转换数据为按图分组
 *
 * @param {Array} metrics 监控项列表
 * @return {Object}
 */
function adjustToChartMetric(metrics) {
    let chartMetric = {};
    let defaultStatistics = 'average';
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metrics, function (item, key) {
        chartMetric[key] = {
            metrics: [],
            unit: item.unit,
            names: {},
            nullPointMode: item.nullPointMode || null, // 可选值： 0， null(显示为 '-')
            statistics: item.statistics || defaultStatistics
        };
        item.chartType && (chartMetric[key].type = item.chartType);
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.metrics, function (metric, i) {
            let value = metric.value;
            chartMetric[key].metrics.push(value);
            chartMetric[key].names[value] = metric.name;
        });

    });
    return chartMetric;
}

/**
 * 数据转换，只获取data中属性为key的数值
 *
 * @param {Object} result 目标对象
 * @param {string} key 过滤值
 * @return {*}
 */
function adjustSeriesData(result, key) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(result.series, function (item) {
        item.data = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.map(item.data, key);
    });
    return result;
}

/**
 * 翻译事件状态变化
 *
 * @param {string} eventType 事件类型
 * @param {string} eventData 事件对象
 * @return {string}
 */
function transferAlarmEventType(eventType, eventData) {
    let EVENT_TYPE = {
        ConfigurationUpdate: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('配置变更'),
        StateUpdate: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('状态变化'),
        Action: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('触发报警')
    };
    let type = EVENT_TYPE[eventType] || eventType;
    let ico = '';
    if (eventData) {
        let data = {};
        try {
            data = new Function('return ' + eventData)();
        }
        catch (e) {}

        switch (data.curAlarmStatus) {
            case 'NORMAL':
                ico = 'normal';
                break;
            case 'ABNORMAL':
                ico = 'abnormal';
                break;
            case 'INSUFFICIENT_DATA':
                ico = 'insufficient';
                break;
        }
    }

    return '<span class="alarmStateUpdate"><span class="' + ico + '">' + type + '</span></span>';
}

/**
 * 过滤metrics配置
 *
 * @param {Array} metrics 监控项列表
 * @param {string} filterName 过滤字段名
 * @param {string} value 过滤字段值
 */
function filterMetrics(metrics, filterName, value) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metrics, function (item, k) {
        if (item.filter === filterName) {
            for (let i = item.metrics.length - 1; i >= 0; i--) {
                if (item.metrics[i].filter === filterName && item.metrics[i].filterValue !== value) {
                    item.metrics.splice(i, 1);
                }

            }
            if (item.metrics.length === 0) {
                delete metrics[k];
            }
        }

    });
}

/**
 * 判断一个趋势图是否为空
 *
 * @param {Array} series 数据点
 * @param {string} statistics 统计类型
 * @return {boolean}
 */
function isMonitorTrendEmpty(series, statistics) {
    let empty = true;
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(series, function (item, i) {
        let itemData = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (v, k) {
            let value = v[statistics];
            if (typeof value !== 'undefined') {
                itemData.push(value);
            }

        });
        if (itemData.length > 0) {
            empty = false;
        }

    });
    return empty;
}

/**
  * 解析metric
  *  格式: 指标名称(中文名称)，多个之间用逗号分割
  *  如：CPUUsagePercent(CPU使用率),DiskUsageCount(磁盘使用量)
  *
  * @param {string} str 目标字符串
  * @return {Array} 指标对象数组
  */
function parseMetrics(str) {
    let reg = /([^\(]+)(?:\((.+)\))*/;
    let ret = [];
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(str.split(','), function (item) {
        if (item) {
            let tmp = item.match(reg);
            ret.push({
                name: tmp[2] || tmp[1],
                value: tmp[1]
            });
        }

    });
    return ret;
}

/**
 * 解析Dimension
 *  格式: 维度key1:维度值1|维度值2;维度key2:维度值3
 *  如：TaskId:1;Idc:jx|nj
 *
 * @param {string} str 目标字符串
 * @return {Array} 维度列表 ["TaskId:1;Idc:jx", "TaskId:1;Idc:nj"]
 */
function parseDimensions(str) {
    let darr = [];
    let arr = str.split(';');
    function xc(src, dist) {
        let ret = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(dist.value, function (item) {
            if (src.length === 0) {
                ret.push([dist.key + ':' + item]);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(src, function (it) {
                    let tmp = [];
                    [].push.apply(tmp, it);
                    tmp.push(dist.key + ':' + item);
                    ret.push(tmp);
                });
            }
        });
        return ret;
    }
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(arr, function (item) {
        if (item) {
            let it = item.split(':');
            if (it[1]) {
                let key = it[0];
                let value = it[1].split('|');
                darr.push({
                    key: key,
                    value: value
                });
            }
        }

    });
    let src = [];
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(darr, function (item) {
        src = xc(src, item);
    });
    src = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.map(src, function (item) {
        return item.join(';');
    });
    return src;
}

/* eslint-disable */
/* harmony default export */ __webpack_exports__["a"] = ({
    utc2local: utc2local,
    local2utc: local2utc,
    getUTCTimeRange: getUTCTimeRange,
    getChartOptions: getChartOptions,
    getPieChartOptions: getPieChartOptions,
    isSeriesEmpty: isSeriesEmpty,
    adjustToChartMetric: adjustToChartMetric,
    adjustSeriesData: adjustSeriesData,
    formatBytes: __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes,
    transferAlarmEventType: transferAlarmEventType,
    filterMetrics: filterMetrics,
    parseMetrics: parseMetrics,
    parseDimensions: parseDimensions,
    isMonitorTrendEmpty: isMonitorTrendEmpty
});


/***/ }),

/***/ 322:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_322__;

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_i18n__ = __webpack_require__(26);
/**
 * @file inf-ria/utils/formatter.es6
 * @author leeight
 */



const kByteUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
const kBitUnit = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y', 'b'];

/* harmony default export */ __webpack_exports__["a"] = ({
    percent(value) {
        return value + '%';
    },
    bytes(value, number = 2, byteUnit = 1024) {
        let idx = 0;
        let len = kByteUnit.length - 1;
        while (value >= byteUnit && idx < len) {
            value = value / byteUnit;
            idx++;
        }
        return value.toFixed(number) + kByteUnit[idx];
    },
    bits(value, number = 2, bitUnit = 1024) {
        let idx = 0;
        let len = kBitUnit.length - 1;
        while (value >= bitUnit && idx < len) {
            value = value / bitUnit;
            idx++;
        }
        return value.toFixed(number) + kBitUnit[idx];
    },
    number(value, number = 1) {
        if (value < 10000) {
            return value;
        }
        // 15000、20000，当number为0的时候，都是2万
        // 所以需要判断一下value是否能整除，不能整除的至少保留一位小数
        else if (value < 1000000) {
            return (value / 10000).toFixed((value % 10000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["a" /* default */])('万');
        }
        else if (value < 10000000) {
            return (value / 1000000).toFixed((value % 1000000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["a" /* default */])('百万');
        }

        return (value / 10000000.0).toFixed((value % 10000000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["a" /* default */])('千万');
    }
});


/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @file examples/bcmData.es6
 * @author leeight
 */

/* eslint-disable */

const Data1 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "vCPUUsagePercent",
            "data": [
                {
                    "average": "41"
                }, {
                    "average": "18"
                }, {
                    "average": "27"
                }, {
                    "average": "24"
                }, {
                    "average": "44"
                }, {
                    "average": "23"
                }, {
                    "average": "26"
                }, {
                    "average": "26"
                }, {
                    "average": "29"
                }, {
                    "average": "40"
                }, {
                    "average": "43"
                }, {
                    "average": "26"
                }, {
                    "average": "36"
                }, {
                    "average": "25"
                }, {
                    "average": "29"
                }, {
                    "average": "28"
                }, {
                    "average": "23"
                }, {
                    "average": "23"
                }, {
                    "average": "20"
                }, {
                    "average": "19"
                }, {
                    "average": "45"
                }, {
                    "average": "23"
                }, {
                    "average": "21"
                }, {
                    "average": "17"
                }, {
                    "average": "20"
                }, {
                    "average": "40"
                }, {
                    "average": "32"
                }, {
                    "average": "30"
                }, {
                    "average": "29"
                }, {
                    "average": "28"
                }, {
                    "average": "24"
                }, {
                    "average": "37"
                }, {
                    "average": "36"
                }, {
                    "average": "42"
                }, {
                    "average": "43"
                }, {
                    "average": "37"
                }, {
                    "average": "41"
                }, {
                    "average": "19"
                }, {
                    "average": "33"
                }, {
                    "average": "43"
                }, {
                    "average": "18"
                }, {
                    "average": "35"
                }, {
                    "average": "41"
                }, {
                    "average": "34"
                }, {
                    "average": "37"
                }, {
                    "average": "38"
                }, {
                    "average": "29"
                }, {
                    "average": "37"
                }, {
                    "average": "42"
                }, {
                    "average": "29"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Data1;


const Data2 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "vDiskReadOpCountPerSecond",
            "data": [
                {
                    "average": "89"
                }, {
                    "average": "105"
                }, {
                    "average": "95"
                }, {
                    "average": "91"
                }, {
                    "average": "106"
                }, {
                    "average": "87"
                }, {
                    "average": "93"
                }, {
                    "average": "96"
                }, {
                    "average": "77"
                }, {
                    "average": "84"
                }, {
                    "average": "89"
                }, {
                    "average": "88"
                }, {
                    "average": "79"
                }, {
                    "average": "93"
                }, {
                    "average": "91"
                }, {
                    "average": "97"
                }, {
                    "average": "96"
                }, {
                    "average": "92"
                }, {
                    "average": "82"
                }, {
                    "average": "94"
                }, {
                    "average": "83"
                }, {
                    "average": "88"
                }, {
                    "average": "89"
                }, {
                    "average": "98"
                }, {
                    "average": "98"
                }, {
                    "average": "98"
                }, {
                    "average": "95"
                }, {
                    "average": "80"
                }, {
                    "average": "94"
                }, {
                    "average": "94"
                }, {
                    "average": "77"
                }, {
                    "average": "100"
                }, {
                    "average": "95"
                }, {
                    "average": "92"
                }, {
                    "average": "85"
                }, {
                    "average": "88"
                }, {
                    "average": "98"
                }, {
                    "average": "94"
                }, {
                    "average": "98"
                }, {
                    "average": "105"
                }, {
                    "average": "95"
                }, {
                    "average": "85"
                }, {
                    "average": "90"
                }, {
                    "average": "97"
                }, {
                    "average": "88"
                }, {
                    "average": "102"
                }, {
                    "average": "83"
                }, {
                    "average": "89"
                }, {
                    "average": "93"
                }, {
                    "average": "104"
                }
            ]
        }, {
            "name": "vDiskWriteOpCountPerSecond",
            "data": [
                {
                    "average": "37"
                }, {
                    "average": "57"
                }, {
                    "average": "49"
                }, {
                    "average": "31"
                }, {
                    "average": "33"
                }, {
                    "average": "29"
                }, {
                    "average": "43"
                }, {
                    "average": "37"
                }, {
                    "average": "33"
                }, {
                    "average": "54"
                }, {
                    "average": "49"
                }, {
                    "average": "31"
                }, {
                    "average": "46"
                }, {
                    "average": "43"
                }, {
                    "average": "36"
                }, {
                    "average": "58"
                }, {
                    "average": "35"
                }, {
                    "average": "29"
                }, {
                    "average": "55"
                }, {
                    "average": "51"
                }, {
                    "average": "55"
                }, {
                    "average": "44"
                }, {
                    "average": "38"
                }, {
                    "average": "33"
                }, {
                    "average": "55"
                }, {
                    "average": "29"
                }, {
                    "average": "38"
                }, {
                    "average": "58"
                }, {
                    "average": "51"
                }, {
                    "average": "38"
                }, {
                    "average": "38"
                }, {
                    "average": "46"
                }, {
                    "average": "31"
                }, {
                    "average": "47"
                }, {
                    "average": "35"
                }, {
                    "average": "54"
                }, {
                    "average": "49"
                }, {
                    "average": "40"
                }, {
                    "average": "39"
                }, {
                    "average": "34"
                }, {
                    "average": "39"
                }, {
                    "average": "34"
                }, {
                    "average": "51"
                }, {
                    "average": "50"
                }, {
                    "average": "44"
                }, {
                    "average": "47"
                }, {
                    "average": "47"
                }, {
                    "average": "52"
                }, {
                    "average": "31"
                }, {
                    "average": "29"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["b"] = Data2;


const Data3 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "vDiskReadBytesPerSecond",
            "data": [
                {
                    "average": "56"
                }, {
                    "average": "45"
                }, {
                    "average": "52"
                }, {
                    "average": "67"
                }, {
                    "average": "49"
                }, {
                    "average": "67"
                }, {
                    "average": "41"
                }, {
                    "average": "49"
                }, {
                    "average": "52"
                }, {
                    "average": "45"
                }, {
                    "average": "53"
                }, {
                    "average": "48"
                }, {
                    "average": "52"
                }, {
                    "average": "67"
                }, {
                    "average": "49"
                }, {
                    "average": "68"
                }, {
                    "average": "44"
                }, {
                    "average": "59"
                }, {
                    "average": "50"
                }, {
                    "average": "61"
                }, {
                    "average": "55"
                }, {
                    "average": "66"
                }, {
                    "average": "66"
                }, {
                    "average": "59"
                }, {
                    "average": "63"
                }, {
                    "average": "49"
                }, {
                    "average": "66"
                }, {
                    "average": "60"
                }, {
                    "average": "53"
                }, {
                    "average": "65"
                }, {
                    "average": "52"
                }, {
                    "average": "55"
                }, {
                    "average": "46"
                }, {
                    "average": "57"
                }, {
                    "average": "65"
                }, {
                    "average": "51"
                }, {
                    "average": "70"
                }, {
                    "average": "51"
                }, {
                    "average": "59"
                }, {
                    "average": "56"
                }, {
                    "average": "61"
                }, {
                    "average": "42"
                }, {
                    "average": "47"
                }, {
                    "average": "67"
                }, {
                    "average": "53"
                }, {
                    "average": "69"
                }, {
                    "average": "54"
                }, {
                    "average": "53"
                }, {
                    "average": "63"
                }, {
                    "average": "52"
                }
            ]
        }, {
            "name": "vDiskWriteBytesPerSecond",
            "data": [
                {
                    "average": "88"
                }, {
                    "average": "101"
                }, {
                    "average": "89"
                }, {
                    "average": "85"
                }, {
                    "average": "99"
                }, {
                    "average": "93"
                }, {
                    "average": "109"
                }, {
                    "average": "94"
                }, {
                    "average": "97"
                }, {
                    "average": "111"
                }, {
                    "average": "104"
                }, {
                    "average": "97"
                }, {
                    "average": "95"
                }, {
                    "average": "112"
                }, {
                    "average": "103"
                }, {
                    "average": "103"
                }, {
                    "average": "105"
                }, {
                    "average": "109"
                }, {
                    "average": "93"
                }, {
                    "average": "97"
                }, {
                    "average": "94"
                }, {
                    "average": "92"
                }, {
                    "average": "107"
                }, {
                    "average": "113"
                }, {
                    "average": "99"
                }, {
                    "average": "84"
                }, {
                    "average": "93"
                }, {
                    "average": "85"
                }, {
                    "average": "87"
                }, {
                    "average": "108"
                }, {
                    "average": "89"
                }, {
                    "average": "89"
                }, {
                    "average": "101"
                }, {
                    "average": "103"
                }, {
                    "average": "111"
                }, {
                    "average": "90"
                }, {
                    "average": "93"
                }, {
                    "average": "110"
                }, {
                    "average": "88"
                }, {
                    "average": "111"
                }, {
                    "average": "90"
                }, {
                    "average": "112"
                }, {
                    "average": "109"
                }, {
                    "average": "105"
                }, {
                    "average": "103"
                }, {
                    "average": "91"
                }, {
                    "average": "87"
                }, {
                    "average": "94"
                }, {
                    "average": "110"
                }, {
                    "average": "93"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["c"] = Data3;


const Data4 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "vNicInBytes",
            "data": [
                {
                    "average": "89"
                }, {
                    "average": "99"
                }, {
                    "average": "97"
                }, {
                    "average": "105"
                }, {
                    "average": "96"
                }, {
                    "average": "81"
                }, {
                    "average": "78"
                }, {
                    "average": "85"
                }, {
                    "average": "94"
                }, {
                    "average": "98"
                }, {
                    "average": "80"
                }, {
                    "average": "77"
                }, {
                    "average": "95"
                }, {
                    "average": "79"
                }, {
                    "average": "83"
                }, {
                    "average": "88"
                }, {
                    "average": "100"
                }, {
                    "average": "97"
                }, {
                    "average": "88"
                }, {
                    "average": "102"
                }, {
                    "average": "103"
                }, {
                    "average": "81"
                }, {
                    "average": "106"
                }, {
                    "average": "81"
                }, {
                    "average": "81"
                }, {
                    "average": "100"
                }, {
                    "average": "81"
                }, {
                    "average": "94"
                }, {
                    "average": "80"
                }, {
                    "average": "101"
                }, {
                    "average": "88"
                }, {
                    "average": "86"
                }, {
                    "average": "78"
                }, {
                    "average": "89"
                }, {
                    "average": "84"
                }, {
                    "average": "87"
                }, {
                    "average": "98"
                }, {
                    "average": "99"
                }, {
                    "average": "96"
                }, {
                    "average": "103"
                }, {
                    "average": "104"
                }, {
                    "average": "88"
                }, {
                    "average": "83"
                }, {
                    "average": "79"
                }, {
                    "average": "104"
                }, {
                    "average": "100"
                }, {
                    "average": "81"
                }, {
                    "average": "94"
                }, {
                    "average": "85"
                }, {
                    "average": "85"
                }
            ]
        }, {
            "name": "vNicOutBytes",
            "data": [
                {
                    "average": "84"
                }, {
                    "average": "93"
                }, {
                    "average": "76"
                }, {
                    "average": "90"
                }, {
                    "average": "99"
                }, {
                    "average": "100"
                }, {
                    "average": "98"
                }, {
                    "average": "102"
                }, {
                    "average": "87"
                }, {
                    "average": "83"
                }, {
                    "average": "88"
                }, {
                    "average": "102"
                }, {
                    "average": "74"
                }, {
                    "average": "86"
                }, {
                    "average": "97"
                }, {
                    "average": "101"
                }, {
                    "average": "96"
                }, {
                    "average": "75"
                }, {
                    "average": "76"
                }, {
                    "average": "83"
                }, {
                    "average": "75"
                }, {
                    "average": "91"
                }, {
                    "average": "92"
                }, {
                    "average": "81"
                }, {
                    "average": "86"
                }, {
                    "average": "90"
                }, {
                    "average": "89"
                }, {
                    "average": "76"
                }, {
                    "average": "92"
                }, {
                    "average": "102"
                }, {
                    "average": "91"
                }, {
                    "average": "89"
                }, {
                    "average": "76"
                }, {
                    "average": "91"
                }, {
                    "average": "96"
                }, {
                    "average": "88"
                }, {
                    "average": "87"
                }, {
                    "average": "88"
                }, {
                    "average": "90"
                }, {
                    "average": "96"
                }, {
                    "average": "80"
                }, {
                    "average": "92"
                }, {
                    "average": "89"
                }, {
                    "average": "80"
                }, {
                    "average": "75"
                }, {
                    "average": "81"
                }, {
                    "average": "93"
                }, {
                    "average": "97"
                }, {
                    "average": "94"
                }, {
                    "average": "95"
                }
            ]
        }, {
            "name": "WebInBytes",
            "data": [
                {
                    "average": "6"
                }, {
                    "average": "2"
                }, {
                    "average": "3"
                }, {
                    "average": "24"
                }, {
                    "average": "12"
                }, {
                    "average": "21"
                }, {
                    "average": "4"
                }, {
                    "average": "17"
                }, {
                    "average": "22"
                }, {
                    "average": "27"
                }, {
                    "average": "1"
                }, {
                    "average": "26"
                }, {
                    "average": "11"
                }, {
                    "average": "16"
                }, {
                    "average": "12"
                }, {
                    "average": "22"
                }, {
                    "average": "12"
                }, {
                    "average": "30"
                }, {
                    "average": "14"
                }, {
                    "average": "26"
                }, {
                    "average": "29"
                }, {
                    "average": "29"
                }, {
                    "average": "20"
                }, {
                    "average": "24"
                }, {
                    "average": "14"
                }, {
                    "average": "6"
                }, {
                    "average": "19"
                }, {
                    "average": "29"
                }, {
                    "average": "30"
                }, {
                    "average": "27"
                }, {
                    "average": "20"
                }, {
                    "average": "24"
                }, {
                    "average": "19"
                }, {
                    "average": "23"
                }, {
                    "average": "4"
                }, {
                    "average": "30"
                }, {
                    "average": "7"
                }, {
                    "average": "7"
                }, {
                    "average": "22"
                }, {
                    "average": "22"
                }, {
                    "average": "22"
                }, {
                    "average": "28"
                }, {
                    "average": "17"
                }, {
                    "average": "24"
                }, {
                    "average": "3"
                }, {
                    "average": "20"
                }, {
                    "average": "3"
                }, {
                    "average": "4"
                }, {
                    "average": "20"
                }, {
                    "average": "28"
                }
            ]
        }, {
            "name": "WebOutBytes",
            "data": [
                {
                    "average": "25"
                }, {
                    "average": "39"
                }, {
                    "average": "39"
                }, {
                    "average": "24"
                }, {
                    "average": "24"
                }, {
                    "average": "27"
                }, {
                    "average": "28"
                }, {
                    "average": "24"
                }, {
                    "average": "21"
                }, {
                    "average": "23"
                }, {
                    "average": "33"
                }, {
                    "average": "32"
                }, {
                    "average": "24"
                }, {
                    "average": "14"
                }, {
                    "average": "37"
                }, {
                    "average": "23"
                }, {
                    "average": "36"
                }, {
                    "average": "16"
                }, {
                    "average": "34"
                }, {
                    "average": "28"
                }, {
                    "average": "34"
                }, {
                    "average": "42"
                }, {
                    "average": "18"
                }, {
                    "average": "24"
                }, {
                    "average": "26"
                }, {
                    "average": "23"
                }, {
                    "average": "37"
                }, {
                    "average": "33"
                }, {
                    "average": "32"
                }, {
                    "average": "35"
                }, {
                    "average": "18"
                }, {
                    "average": "33"
                }, {
                    "average": "38"
                }, {
                    "average": "33"
                }, {
                    "average": "40"
                }, {
                    "average": "19"
                }, {
                    "average": "21"
                }, {
                    "average": "27"
                }, {
                    "average": "42"
                }, {
                    "average": "31"
                }, {
                    "average": "24"
                }, {
                    "average": "19"
                }, {
                    "average": "35"
                }, {
                    "average": "17"
                }, {
                    "average": "42"
                }, {
                    "average": "27"
                }, {
                    "average": "21"
                }, {
                    "average": "34"
                }, {
                    "average": "28"
                }, {
                    "average": "15"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["d"] = Data4;


const Data5 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "WebOutBitsPerSecond",
            "data": [
                {
                    "average": "77"
                }, {
                    "average": "80"
                }, {
                    "average": "84"
                }, {
                    "average": "67"
                }, {
                    "average": "73"
                }, {
                    "average": "81"
                }, {
                    "average": "70"
                }, {
                    "average": "63"
                }, {
                    "average": "67"
                }, {
                    "average": "67"
                }, {
                    "average": "65"
                }, {
                    "average": "69"
                }, {
                    "average": "63"
                }, {
                    "average": "65"
                }, {
                    "average": "72"
                }, {
                    "average": "89"
                }, {
                    "average": "78"
                }, {
                    "average": "78"
                }, {
                    "average": "63"
                }, {
                    "average": "69"
                }, {
                    "average": "76"
                }, {
                    "average": "88"
                }, {
                    "average": "82"
                }, {
                    "average": "86"
                }, {
                    "average": "84"
                }, {
                    "average": "78"
                }, {
                    "average": "65"
                }, {
                    "average": "70"
                }, {
                    "average": "74"
                }, {
                    "average": "60"
                }, {
                    "average": "78"
                }, {
                    "average": "70"
                }, {
                    "average": "63"
                }, {
                    "average": "80"
                }, {
                    "average": "68"
                }, {
                    "average": "66"
                }, {
                    "average": "65"
                }, {
                    "average": "78"
                }, {
                    "average": "87"
                }, {
                    "average": "65"
                }, {
                    "average": "75"
                }, {
                    "average": "71"
                }, {
                    "average": "68"
                }, {
                    "average": "65"
                }, {
                    "average": "82"
                }, {
                    "average": "60"
                }, {
                    "average": "75"
                }, {
                    "average": "72"
                }, {
                    "average": "75"
                }, {
                    "average": "87"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["e"] = Data5;


const Data6 = {
    "category": [],
    "series": [
        {
            "name": "MemUsedBytes",
            "data": []
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["f"] = Data6;


const Data7 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "MemUsedPercent",
            "data": [
                {
                    "average": "106"
                }, {
                    "average": "123"
                }, {
                    "average": "96"
                }, {
                    "average": "99"
                }, {
                    "average": "102"
                }, {
                    "average": "98"
                }, {
                    "average": "103"
                }, {
                    "average": "120"
                }, {
                    "average": "100"
                }, {
                    "average": "114"
                }, {
                    "average": "114"
                }, {
                    "average": "122"
                }, {
                    "average": "113"
                }, {
                    "average": "114"
                }, {
                    "average": "102"
                }, {
                    "average": "107"
                }, {
                    "average": "119"
                }, {
                    "average": "99"
                }, {
                    "average": "94"
                }, {
                    "average": "107"
                }, {
                    "average": "122"
                }, {
                    "average": "101"
                }, {
                    "average": "101"
                }, {
                    "average": "105"
                }, {
                    "average": "115"
                }, {
                    "average": "93"
                }, {
                    "average": "104"
                }, {
                    "average": "120"
                }, {
                    "average": "99"
                }, {
                    "average": "103"
                }, {
                    "average": "121"
                }, {
                    "average": "97"
                }, {
                    "average": "123"
                }, {
                    "average": "107"
                }, {
                    "average": "123"
                }, {
                    "average": "94"
                }, {
                    "average": "106"
                }, {
                    "average": "106"
                }, {
                    "average": "104"
                }, {
                    "average": "103"
                }, {
                    "average": "98"
                }, {
                    "average": "110"
                }, {
                    "average": "107"
                }, {
                    "average": "113"
                }, {
                    "average": "121"
                }, {
                    "average": "98"
                }, {
                    "average": "105"
                }, {
                    "average": "103"
                }, {
                    "average": "103"
                }, {
                    "average": "98"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["g"] = Data7;


const Data8 = {
    "category": [],
    "series": [
        {
            "name": "HomeUsedBytes",
            "data": []
        }, {
            "name": "RootUsedBytes",
            "data": [
                {},
                {},
                {},
                {},
                {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["h"] = Data8;



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

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResizeObserver__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResizeObserver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ResizeObserver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/**
 * @file components/Chart.es6
 * @author leeight
 */







const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-chart');

const template = '<div class="{{mainClass}}" style="{{mainStyle}}"></div>';

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    computed: {
        mainStyle() {
            const width = this.data.get('width');
            const height = this.data.get('height');
            return {
                'width': `${width}px`,
                'height': `${height}px`,
                'line-height': `${height}px`
            };
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            loading: true,
            autoResize: false,
            width: 300,
            height: 300,
            option: {},
            notMerge: false
        };
    },
    dataTypes: {
        loading: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,
        autoResize: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,
        width: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,
        height: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,
        option: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].object,
        notMerge: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool
    },
    getChart() {
        return this.chart;
    },

    clearEmptyRing() {
        if (this.chart && this.ring) {
            this.chart.getZr().remove(this.ring);
            this.ring = null;
        }
    },

    __drawEmptyRing(echarts) {
        // 这里把 echarts 当做参数传递进来，是因为不想直接写 imports echarts from 'inf-ria/echarts'
        // 这样子导致初始化 echarts+zrender 的时候有 300ms ~ 500ms 的延迟
        // 所以改成了异步的加载 echarts
        return () => {
            const chart = this.chart;
            const width = chart.getWidth();
            const height = chart.getHeight();
            const size = Math.min(width, height) / 2;
            const minRadius = echarts.number.parsePercent('50%', size);
            const maxRadius = echarts.number.parsePercent('80%', size);
            this.ring = new echarts.graphic.Ring({
                shape: {
                    r0: minRadius,
                    r: maxRadius,
                    cx: width / 2,
                    cy: height / 2
                },
                style: {
                    stroke: '#ccc',
                    fill: 'none'
                }
            });
            chart.getZr().add(this.ring);
        };
    },

    __loadEcharts(delay = 300) {
        return new __WEBPACK_IMPORTED_MODULE_0_promise___default.a((resolve, reject) => {
            setTimeout(() => window.require(['inf-ria/echarts', 'zrender/vml/vml'], resolve), delay);
        });
    },

    attached() {
        this.watch('loading', loading => {
            if (this.chart) {
                loading ? this.chart.showLoading() : this.chart.hideLoading();
            }
        });

        this.watch('option', option => {
            if (this.chart && option) {
                this.chart.setOption(option, !!this.data.get('notMerge'));
                this.chart.hideLoading();
            }
        });

        this.__loadEcharts().then(echarts => {
            this.drawEmptyRing = this.__drawEmptyRing(echarts);

            this.data.set('loading', false);
            this.chart = echarts.init(this.el);
            this.chart.showLoading();
            const option = this.data.get('option');
            if (option) {
                this.chart.setOption(option);
                this.chart.hideLoading();
            }

            if (this.data.get('autoResize')) {
                const {clientWidth, clientHeight} = this.el.parentNode;
                this.chart.resize({
                    width: clientWidth,
                    height: clientHeight
                });
            }

            this.fire('chart-initialized');
        });

        if (this.data.get('autoResize')) {
            this.observer = new __WEBPACK_IMPORTED_MODULE_2__ResizeObserver___default.a(entries => {
                if (this.chart && this.chart.resize) {
                    const entry = entries[0];
                    this.chart.resize({
                        width: entry.clientWidth(),
                        height: entry.clientHeight()
                    });
                }
            }).observe(this.el.parentNode);
        }
    },

    disposed() {
        if (this.observer) {
            this.observer.disconnect();
        }

        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
}));


/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * https://wicg.github.io/ResizeObserver/
 *
 * @file ResizeObserver.js
 * @author devrelm
 */

/* eslint-disable */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    var resizeObservers = [];

    function ResizeObserver(callback) {
        resizeObservers.push(this);
        this.__callback = callback;
        this.__observationTargets = [];
        this.__activeTargets = [];
    }

    ResizeObserver.prototype.observe = function(target) {
        var resizeObservationIndex = findTargetIndex(this.__observationTargets, target);
        if (resizeObservationIndex >= 0) {
            return;
        }

        var resizeObservation = new ResizeObservation(target);
        this.__observationTargets.push(resizeObservation);
    };

    ResizeObserver.prototype.unobserve = function(target) {
        var resizeObservationIndex = findTargetIndex(this.__observationTargets, target);
        if (resizeObservationIndex === -1) {
            return;
        }

        this.__observationTargets.splice(resizeObservationIndex, 1);
    };

    ResizeObserver.prototype.disconnect = function() {
        this.__observationTargets = [];
        this.__activeTargets = [];
    };

    ResizeObserver.prototype.__populateActiveTargets = function() {
        this.__activeTargets = [];
        for (var key in this.__observationTargets) {
            var resizeObservation = this.__observationTargets[key];
            if (resizeObservation.isActive()) {
                this.__activeTargets.push(resizeObservation);
            }
        }
    };

    function ResizeObserverEntry(target) {
        this.__target = target;
        this.__clientWidth = getWidth(target);
        this.__clientHeight = getHeight(target);
    }

    ResizeObserverEntry.prototype.target = function() {
        return this.__target;
    };

    ResizeObserverEntry.prototype.clientWidth = function() {
        return this.__clientWidth;
    };

    ResizeObserverEntry.prototype.clientHeight = function() {
        return this.__clientHeight;
    };

    function ResizeObservation(target) {
        this.__target = target;
        this.__lastBroadcastWidth = getWidth(target);
        this.__lastBroadcastHeight = getHeight(target);
    }

    ResizeObservation.prototype.target = function() {
        return this.__target;
    };

    ResizeObservation.prototype.lastBroadcastWidth = function() {
        return this.__lastBroadcastWidth;
    };

    ResizeObservation.prototype.lastBroadcastHeight = function() {
        return this.__lastBroadcastHeight;
    };

    ResizeObservation.prototype.isActive = function() {
        if (getWidth(this.__target) !== this.lastBroadcastWidth() ||
            getHeight(this.__target) !== this.lastBroadcastHeight()) {
            return true;
        }
        return false;
    };

    function findTargetIndex(collection, target) {
        for (var index = 0; index < collection.length; index += 1) {
            if (collection[index].target() === target) {
                return index;
            }
        }
    }

    function getWidth(target) {
        return target.getBoundingClientRect().width;
    }

    function getHeight(target) {
        return target.getBoundingClientRect().height;
    }

    function gatherActiveObservers() {
        for (var index = 0; index < resizeObservers.length; index += 1) {
            resizeObservers[index].__populateActiveTargets();
        }
    }

    function broadcastActiveObservations() {
        for (var roIndex = 0; roIndex < resizeObservers.length; roIndex++) {
            var resizeObserver = resizeObservers[roIndex];
            if (resizeObserver.__activeTargets.length === 0) {
                continue;
            }

            var entries = [];

            for (var atIndex = 0; atIndex < resizeObserver.__activeTargets.length; atIndex += 1) {
                var resizeObservation = resizeObserver.__activeTargets[atIndex];
                var entry = new ResizeObserverEntry(resizeObservation.target());
                entries.push(entry);
                resizeObservation.__lastBroadcastWidth = getWidth(resizeObservation.target());
                resizeObservation.__lastBroadcastHeight = getHeight(resizeObservation.target());
            }

            resizeObserver.__callback(entries);
            resizeObserver.__activeTargets = [];
        }
    }

    function frameHandler() {
        gatherActiveObservers();
        broadcastActiveObservations();

        setFrameWait(frameHandler);
    }

    function setFrameWait(callback) {
        if (typeof window.requestAnimationFrame === 'undefined') {
            window.setTimeout(callback, 1000 / 60);
        } else {
            window.requestAnimationFrame(callback);
        }
    }

    setFrameWait(frameHandler);

    return ResizeObserver;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* eslint-enable */


/***/ })

},[319])});;