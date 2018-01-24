define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([46],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/**
 * @file components/StopScroll.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template: '<div on-wheel="onWheel"><slot/></div>',
    initData() {
        return {
            disabled: false
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].bool
    },
    onWheel(e) {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }

        const layer = e.currentTarget;
        if (!layer) {
            return;
        }
        if (layer.scrollTop + e.deltaY + layer.clientHeight >= layer.scrollHeight) {
            e.preventDefault();
            layer.scrollTop = layer.scrollHeight;
        }
        if (layer.scrollTop + e.deltaY <= 0) {
            e.preventDefault();
            layer.scrollTop = 0;
        }
    }
}));


/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_StopScroll__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-ss.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-ss style="{{myStyle}}">
        这个容器，滚动到底部，不会影响页面
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </xui-ss>

    <div style="{{myStyle}}">
        这个容器，滚动到底部，页面开始滚动
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-ss': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_StopScroll__["a" /* default */]
    },
    initData() {
        return {
            myStyle: {
                'display': 'inline-block',
                'margin-right': '10px',
                'width': '150px',
                'height': '50px',
                'overflow': 'hidden',
                'border': '1px solid #000',
                'overflow-y': 'auto'
            }
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

},[371])});;