define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([45],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

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

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Switch__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Button__ = __webpack_require__(9);
/**
 * @file demos/xui-switch.es6
 * @author leeight
 */





/* eslint-disable */
const template = `<template>
<xui-switch checked="{=switch.checked=}" />
<xui-switch checked="{{false}}" />
<xui-switch checked="{{false}}" disabled />
<xui-button disabled="{{!switch.checked}}">Hello xui-switch</xui-button>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'xui-button': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Button__["a" /* default */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Switch__["a" /* default */]
    },
    initData() {
        return {
            'switch': {
                checked: true
            }
        };
    }
}));


/***/ })

},[373])});;