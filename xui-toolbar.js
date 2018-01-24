define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([26],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

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

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_biz_Toolbar__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Toast__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_ToastLabel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Row__ = __webpack_require__(5);
/**
 * @file inf-ui/x/demos/xui-toolbar.es6
 * @author leeight
 */








/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成工具栏(Toolbar)区域的组件。当前支持的类型：button, button-group, link, divider</xui-toastlabel>

<x-row label="[default]">
    <xui-toolbar controls="{{controls}}" on-item-clicked="onItemClicked" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_4__Row__["a" /* default */],
        'xui-toolbar': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_biz_Toolbar__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_ToastLabel__["a" /* default */]
    },
    initData() {
        return {
            controls: [
                {
                    type: 'button',
                    icon: 'plus',
                    disabled: false,
                    skin: 'primary',
                    label: 'Create'
                },
                {
                    type: 'button-group',
                    disabled: false,
                    datasource: [
                        {text: 'FOO', value: 'FOO'},
                        {text: 'BAR', value: 'BAR'},
                        {text: '123', value: '123'}
                    ]
                },
                {
                    type: 'link',
                    link: 'https://www.baidu.com',
                    label: 'www.baidu.com'
                }
            ]
        };
    },
    onItemClicked(event) {
        __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Toast__["a" /* default */].success(JSON.stringify(event));
    }
}));


/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_RadioSelect__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper__ = __webpack_require__(67);
/**
 * 左侧工具栏的区域，包括 Button, ButtonGroupp, 链接 等等
 * @file inf-ui/x/biz/Toolbar.es6
 * @author leeight
 */








/* eslint-disable */
const template = `<template>
<ui-ghost s-for="item in controls">
    <ui-button
        s-if="item.type === 'button'"
        on-click="onToolbarEvent(item)"
        disabled="{{item.disabled}}"
        icon="{{item.icon}}"
        label="{{item.label}}"
        skin="{{item.skin}}"
        />
    <ui-radioselect
        s-if="item.type === 'button-group'"
        value="{{item.value}}"
        disabled="{{item.disabled}}"
        on-change="onToolbarEvent($event)"
        datasource="{{item.datasource}}"
        />
    <a
        s-if="item.type === 'link'"
        target="_blank"
        href="{{item.link}}">{{item.label}}</a>
    <span s-if="item.type === 'divider'">&nbsp;</span>
</ui-ghost>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'ui-ghost': __WEBPACK_IMPORTED_MODULE_4__helper__["a" /* Ghost */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Button__["a" /* default */],
        'ui-radioselect': __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_RadioSelect__["a" /* default */]
    },
    dataTypes: {
        controls: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].array
    },
    onToolbarEvent(event) {
        this.fire('item-clicked', event);
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



/***/ })

},[383])});;