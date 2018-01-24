define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([52],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Clipboard__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Icon__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-clipboard.es6
 * @author leeight
 */








/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">
        <xui-icon name="copy" />
    </xui-clipboard>
</x-row>

<x-row label="btns">
    <xui-clipboard text="Hello World" on-aftercopy="onAfterCopy">
        <xui-button>{{clipboard.btnText}}</xui-button>
    </xui-clipboard>

    <xui-clipboard text="Hello World">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="e">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="w">
        <xui-button icon="copy" />
    </xui-clipboard>

    <xui-clipboard text="Hello World" tip-position="n">
        <xui-button icon="copy" />
    </xui-clipboard>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_4__Row__["a" /* default */],
        'xui-icon': __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Icon__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Button__["a" /* default */],
        'xui-clipboard': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Clipboard__["a" /* default */]
    },
    initData() {
        return {
            clipboard: {
                btnText: '点我复制'
            }
        };
    },
    onAfterCopy() {
        this.data.set('clipboard.btnText', '复制成功');
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

},[336])});;