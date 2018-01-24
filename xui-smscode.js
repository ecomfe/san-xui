define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([37],{

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

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_SMSCodeBox__ = __webpack_require__(94);
/**
 * @file demos/xui-smscode.es6
 * @author leeight
 */




/* eslint-disable */
const template = `<template>
<xui-smscode
    value="{=smscode.mobile=}"
    freeze-time="{{10}}" />
<strong class="large">
    Value is: {{smscode.mobile}}
</strong>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'xui-smscode': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_SMSCodeBox__["a" /* default */]
    },
    initData() {
        return {
            smscode: {
                mobile: '13062694617'
            }
        };
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

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextBox__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__asInput__ = __webpack_require__(3);
/**
 * @file SMSCodeBox.es6
 * @author leeight
 */








const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-smscode');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-textbox type="number"
        on-input="onInput"
        placeholder="{{placeholder}}"
        width="{{width}}"
        value="{=value=}"
        disabled="{{disabled}}" />
    <ui-button on-click="onBtnClick"
        width="{{60}}"
        disabled="{{freezed || disabled}}">{{btnText}}</ui-button>
</div>`;
/* eslint-enable */

const SMSCodeBox = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-textbox': __WEBPACK_IMPORTED_MODULE_3__TextBox__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_2__Button__["a" /* default */]
    },
    initData() {
        return {
            freezed: false,
            disabled: false,
            freezeTime: 60,
            btnText: '获取验证码',
            value: '',
            width: null,
            placeholder: '请输入验证码'
        };
    },
    dataTypes: {
        /**
         * 用户输入的手机号
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 输入框的宽度
         */
        width: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 发送短信之后的冷冻时间
         * @default 60
         */
        freezeTime: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 按钮上面的文案
         * @default 获取验证码
         */
        btnText: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 输入框的 placeholder
         * @default 请输入验证码
         */
        placeholder: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const freezed = this.data.get('freezed');
            if (freezed) {
                klass.push('state-freezed');
                klass.push(cx('freezed'));
            }
            return klass;
        }
    },
    onInput() {
        this.fire('input');
    },
    onBtnClick() {
        this.fire('click');
        this.data.set('freezed', true);
        let freezeTime = this.data.get('freezeTime');
        const countdown = () => {
            if (freezeTime <= 0) {
                this.data.set('freezed', false);
                this.data.set('btnText', '获取验证码');
            }
            else {
                this.data.set('btnText', '剩余 ' + freezeTime-- + ' 秒');
                setTimeout(countdown, 1000);
            }
        };
        countdown();
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_4__asInput__["a" /* asInput */])(SMSCodeBox));


/***/ })

},[370])});;