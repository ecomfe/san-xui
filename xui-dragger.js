define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([30],{

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

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Dragger__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-dragger.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-dragger max="{{200}}" value="{{35}}" unit="Mbps" />
</x-row>
<x-row label="min=0,max=1,step=0.01">
    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.01}}" />
</x-row>
<x-row label="min=0,max=1,step=0.2">
    <xui-dragger min="{{0}}" max="{{1}}" step="{{0.2}}" />
</x-row>
<x-row label="length=500,max=300,value=135">
    <xui-dragger length="{{500}}" max="{{300}}" value="{{135}}" unit="Mbps" />
</x-row>
<x-row label="disabled">
    <xui-dragger disabled unit="Mbps" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-dragger': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Dragger__["a" /* default */]
    },
    initData() {
        return {
        };
    }
}));


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


/***/ })

},[338])});;