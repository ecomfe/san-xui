define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([41],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_ViewStep__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-viewstep.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-viewstep
        steps="{{steps}}" />
</x-row>

<x-row label="step-index=3">
    <xui-viewstep
        step-index="{{3}}"
        steps="{{steps}}" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-viewstep': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_ViewStep__["a" /* default */]
    },
    initData() {
        return {
            steps: [
                {text: '选择云服务器'},
                {text: '确认订单'},
                {text: '在线支付'},
                {text: '支付成功'}
            ]
        };
    }
}));


/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/**
 * @file components/ViewStep.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-viewstep');

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
    <ul>
        <li class="{{i <= stepIndex ? '${cx('item-active')}' : ''}}"
            s-for="item, i in steps" on-click="itemClick(i)"><i>{{i + 1}}</i><span>{{item.text}}</span></li>
    </ul>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        mainStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            stepIndex: 0,
            steps: []
        };
    },
    dataTypes: {
        /**
         * 当前属于第几步，从 0 开始
         * @default 0
         */
        stepIndex: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 步骤的配置项，每一项的格式如下：
         * <pre><code>{
         *   text: string
         * }</code></pre>
         * @default []
         */
        steps: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].array
    },
    itemClick(index) {
        if (index <= this.data.get('stepIndex')) {
            this.fire('click', {index});
        }
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

},[387])});;