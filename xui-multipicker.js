define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([23],{

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

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_MultiPicker__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-multipicker.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-multipicker
        datasource="{{mp.datasource}}"
        value="{=mp.value=}"
        />
    <strong class="large">
        Value is: {{mp.value}}
    </strong>
</x-row>

<x-row label="操作系统">
    <xui-multipicker
        datasource="{{os.datasource}}"
        value="{=os.value=}"
        />
    <strong class="large">
        操作系统: {{os.value}}
    </strong>
</x-row>

<x-row label="lazy-loading,loader">
    <xui-multipicker
        datasource="{{lazy.datasource}}"
        loader="{{lazy.loader}}"
        value="{=lazy.value=}"
        />
    <strong class="large">
        操作系统: {{lazy.value}}
    </strong>
</x-row>

<x-row label="disabled">
    <xui-multipicker
        disabled
        datasource="{{mp.datasource}}"
        value="{=mp.value=}"
        />
    <strong class="large">
        Value is: {{mp.value}}
    </strong>
</x-row>
</template>`;
/* eslint-enable */

function getImages(osType) {
    switch (osType) {
        case 'CentOS':
            return [
                {text: '7.1 x86_64 (64bit)', value: 'da93d591-4130-4870-81a9-d84daf9a8c4c'},
                {text: '6.8 x86_64 (64bit)', value: 'b8639e78-b3e9-4fa5-b69e-32294b9f4b4b'},
                {text: '6.5 x86_64 (64bit)', value: '2b366fe9-63ac-4c63-8c78-516bc5acb950'},
                {text: '7.2 x86_64 (64bit)', value: 'bad85757-b6c6-4026-b34c-e7677435c149'},
                {text: '6.5 i386 (32bit)', value: '60422670-4389-4026-ae22-b77f2be48210'}
            ];
        case 'Debian':
            return [
                {text: '8.1.0 amd64 (64bit)', value: '166df269-54b6-4841-a2c2-4672e0505b82'},
                {text: '7.5.0 amd64 (64bit)', value: 'f7369fc5-9419-41c5-833f-28401d87dda3'}
            ];
        case 'Ubuntu':
            return [
                {text: '12.04.4 LTS amd64 (64bit)', value: 'ed97a9ef-7b1e-48ec-96ee-c8a01a13e1e5'},
                {text: '14.04.1 LTS amd64 (64bit)', value: '3fa6fedb-c62a-4acb-b198-373b0d00e069'},
                {text: '16.04 LTS amd64 (64bit)', value: '3c9832ea-3277-4716-926c-925489aa165d'},
                {text: '16.04 LTS i386 (32bit)', value: '0cbe2924-1325-4d94-8e96-2989dd0a0aad'},
                {text: '14.04.1 LTS i386 (32bit)', value: '1cce752d-fa3c-4af7-8e5d-9e7d3b603c9d'},
                {text: '12.04.4 LTS i386 (32bit)', value: '37fcf765-f6fb-43b7-94c9-ee4153b58953'}
            ];
        case 'Windows Server':
            return [
                {text: '2008 R2 x86_64 (64bit) 中文版', value: '7beb02e6-5daf-4b5c-b7a0-e68f4bbcc916', disabled: true},
                {text: '2012 R2 x86_64 (64bit) 中文版', value: '4af300d1-5dca-4fce-a919-5e25e96ec887'},
                {text: '2016 x86_64 (64bit) 中文版', value: 'f30c74f2-07dc-4e1d-a5e6-2d5f03f737cf'}
            ];
        default:
            return [];
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-multipicker': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_MultiPicker__["a" /* default */]
    },
    initData() {
        return {
            lazy: {
                value: [],
                loader: values => {   // eslint-disable-line
                    return new __WEBPACK_IMPORTED_MODULE_0_promise___default.a((resolve, reject) => {
                        setTimeout(() => {
                            if (values.length === 1) {
                                const osType = values[0];
                                if (Math.random() > .8) {
                                    reject(new Error('RANDOM error happened'));
                                    return;
                                }

                                const children = getImages(osType);
                                if (osType === 'CentOS') {
                                    children[0].expandable = true;
                                }

                                resolve(children);
                            }
                            else if (values.length === 2) {
                                const imageId = values[1];
                                if (imageId === 'da93d591-4130-4870-81a9-d84daf9a8c4c') {
                                    resolve([
                                        {text: 'xxx', value: 'xxx'},
                                        {text: 'yyy', value: 'yyy'},
                                        {text: 'zzz', value: 'zzz'}
                                    ]);
                                }
                                else {
                                    resolve([]);
                                }
                            }
                        }, 500);
                    });
                },
                datasource: [
                    {
                        text: 'CentOS',
                        value: 'CentOS',
                        expandable: true
                    },
                    {
                        text: 'Debian',
                        value: 'Debian',
                        expandable: true
                    },
                    {
                        text: 'Ubuntu',
                        value: 'Ubuntu',
                        expandable: true,
                        disabled: true
                    },
                    {
                        text: 'Windows Server',
                        value: 'Windows Server',
                        expandable: true
                    }
                ]
            },
            os: {
                value: ['Windows Server', 'f30c74f2-07dc-4e1d-a5e6-2d5f03f737cf'],
                datasource: [
                    {
                        text: 'CentOS',
                        value: 'CentOS',
                        children: getImages('CentOS')
                    },
                    {
                        text: 'Debian',
                        value: 'Debian',
                        children: getImages('Debian')
                    },
                    {
                        text: 'Ubuntu',
                        value: 'Ubuntu',
                        disabled: true,
                        children: getImages('Ubuntu')
                    },
                    {
                        text: 'Windows Server',
                        value: 'Windows Server',
                        children: getImages('Windows Server')
                    }
                ]
            },
            mp: {
                value: ['xyz', 'xyz1', 'xyz1_1'],
                datasource: [
                    {
                        text: 'foo',
                        value: 'foo',
                        children: [
                            {text: 'foo1', value: 'foo1'},
                            {text: 'foo2', value: 'foo2'},
                            {text: 'foo3', value: 'foo3'},
                            {text: 'foo4', value: 'foo4'},
                            {text: 'foo5', value: 'foo5'}
                        ]
                    },
                    {
                        text: 'bar',
                        value: 'bar',
                        children: [
                            {text: 'bar1', value: 'bar1'},
                            {text: 'bar2', value: 'bar2'},
                            {text: 'bar3', value: 'bar3'},
                            {text: 'bar4', value: 'bar4'},
                            {text: 'bar5', value: 'bar5'}
                        ]
                    },
                    {
                        text: 'xyz',
                        value: 'xyz',
                        children: [
                            {
                                text: 'xyz1',
                                value: 'xyz1',
                                children: [
                                    {text: 'xyz1_1', value: 'xyz1_1'},
                                    {
                                        text: 'xyz1_2',
                                        value: 'xyz1_2',
                                        children: [
                                            {text: 'xyz1_2_1', value: 'xyz1_2_1'},
                                            {text: 'xyz1_2_2', value: 'xyz1_2_2'},
                                            {text: 'xyz1_2_3', value: 'xyz1_2_3'},
                                            {text: 'xyz1_2_4', value: 'xyz1_2_4'},
                                            {text: 'xyz1_2_5', value: 'xyz1_2_5'}
                                        ]
                                    },
                                    {text: 'xyz1_3', value: 'xyz1_3'},
                                    {text: 'xyz1_4', value: 'xyz1_4'},
                                    {text: 'xyz1_5', value: 'xyz1_5'},
                                    {text: 'xyz1_6', value: 'xyz1_6'}
                                ]
                            },
                            {text: 'xyz2', value: 'xyz2'},
                            {text: 'xyz3', value: 'xyz3'},
                            {text: 'xyz4', value: 'xyz4'},
                            {text: 'xyz5', value: 'xyz5'}
                        ]
                    }
                ]
            }
        };
    }
}));


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

},[355])});;