define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([38],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

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

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_RadioSelect__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-radioselect.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-radioselect
        value="{=radioselect.value=}"
        datasource="{{radioselect.datasource}}" />
    <strong class="large">
        Value is: {{radioselect.value}}
    </strong>
</x-row>

<x-row label="disabled">
    <xui-radioselect
        disabled
        value="{=radioselect.value=}"
        datasource="{{radioselect.datasource}}" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-radioselect': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_RadioSelect__["a" /* default */]
    },
    initData() {
        return {
            radioselect: {
                value: 'abc1',
                datasource: [
                    {text: '1个月', value: 'foo'},
                    {text: '2', value: 'bar'},
                    {text: '3', value: '123', disabled: true},
                    {text: '4', value: 'abc1'},
                    {text: '5', value: 'abc6'},
                    {text: '6', value: 'abc7'},
                    {text: '1年', value: 'abc8', tip: '注：购买1年8.3折'},
                    {text: '2年', value: 'abc9', tip: '注：购买2年7.5折'},
                    {text: '3年', value: 'abc0', tip: '注：购买3年5折'}
                ]
            }
        };
    }
}));


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

},[361])});;