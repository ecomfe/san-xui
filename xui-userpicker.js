define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([22],{

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

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_UserPicker__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-userpicker.es6
 * @author leeight
 */






function searchRequester(keyword) {
    return fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(response => {
            const results = response.results;
            return results.map(o => {
                // 必须要有 accountId 和 username 两个属性
                o.accountId = o.email;
                o.username = o.name.first + ' ' + o.name.last;
                return o;
            });
        });
}

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    请输入用户名：
    <xui-userpicker
        search-requester="{{searchRequester}}"
    >
        <div slot="layer-item">
            <img width="30" height="30" src="{{item.picture.thumbnail}}" />
            <span>{{item.name.title}} {{item.username}}</span>
        </div>
    </xui-userpicker>
</x-row>
<x-row label="initialized by value">
    <xui-userpicker
        search-requester="{{searchRequester}}"
        value="{=value=}"
    >
        <div slot="layer-item">
            <img width="30" height="30" src="{{item.picture.thumbnail}}" />
            <span>{{item.name.title}} {{item.username}}</span>
        </div>
    </xui-userpicker>
    <pre><code>{{value | stringify}}</code></pre>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-userpicker': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_UserPicker__["a" /* default */]
    },
    filters: {
        stringify(value) {
            return JSON.stringify(value, null, 2);
        }
    },
    initData() {
        return {
            value: [
                {username: '李玉北', accountId: 'liyubei'}
            ],
            searchRequester
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

},[386])});;