define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([55],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Toast__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Button__ = __webpack_require__(9);
/**
 * @file demos/xui-toast.es6
 * @author leeight
 */





/* eslint-disable */
const template = `<template>
<xui-button on-click="showToast('success')">Show Success Toast</xui-button>
<xui-button on-click="showToast('info')">Show Info Toast</xui-button>
<xui-button on-click="showToast('warning')">Show Warning Toast</xui-button>
<xui-button on-click="showToast('error')">Show Error Toast</xui-button>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'xui-button': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Button__["a" /* default */],
        'xui-toast': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Toast__["a" /* default */]
    },
    initData() {
        return {
        };
    },
    showToast(level) {
        if (typeof __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Toast__["a" /* default */][level] === 'function') {
            const message = 'This is a toast message';
            __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Toast__["a" /* default */][level](message);
        }
        else {
            alert('Unsupported toast level = ' + level);
        }
    }
}));


/***/ })

},[381])});;