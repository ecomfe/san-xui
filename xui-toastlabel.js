define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([42],{

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

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_i18n__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_ToastLabel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-toastlabel.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<x-row label="[default]level=alert">
    <xui-toastlabel text="hello toastlabel" />
</x-row>
<x-row label="level=normal">
    <xui-toastlabel text="{{'预付费'| i18n}} i18n" level="normal" />
</x-row>
<x-row label="level=error">
    <xui-toastlabel text="{{aaa}}, i18n" level="error" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_ToastLabel__["a" /* default */]
    },
    initData() {
        return {
            aaa: Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["a" /* default */])('预付费')
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



/***/ })

},[382])});;