define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([40],{

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

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_ACEEditor__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-aceeditor.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-aceeditor value="{=editor.value=}" />
    <strong class="large">
        <pre>{{editor.value}}</pre>
    </strong>
</x-row>

<x-row label="width=100,height=100">
    <xui-aceeditor
        width="{{100}}"
        height="{{100}}"
        value="{=editor.value=}" />
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-aceeditor': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_ACEEditor__["a" /* default */]
    },
    initData() {
        return {
            editor: {
                value: 'hello world'
            }
        };
    }
}));


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

},[313])});;