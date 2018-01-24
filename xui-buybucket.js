define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([50],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_BuyBucket__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-buybucket.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default],previous">
    <xui-buybucket
        previous
        datasource="{{buybucket.datasource}}" />
</x-row>
<x-row label="disabled,tip=This is a tip message">
    <xui-buybucket
        disabled
        previous
        tip="{{buybucket.tip}}"
        datasource="{{buybucket.datasource}}" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-buybucket': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_BuyBucket__["a" /* default */]
    },
    initData() {
        return {
            buybucket: {
                tip: '温馨提示：按需计费类型的集群子节点已经售罄，百度云正在积极扩容中，建议您先购买包年包月类型的集群， 或者提<a href="javascript:void(0)">工单</a>申请按需资源，谢谢。',
                datasource: [
                    {title: '地域', content: '华北 - 北京'},
                    {title: '可用区', content: '可用区A'},
                    {title: '购买配置', content: 'CPU：1核、内存：1GB、本地磁盘：20GB、公网带宽1Mbps'},
                    {title: '购买配额', content: '1台 * 1月'},
                    {title: '购买配额(2)', content: '2台 * 2月', hidden: true},
                    {title: '配置费用', content: '￥1296.00'}
                ]
            }
        };
    }
}));


/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button__ = __webpack_require__(9);
/**
 * @file BuyBucket.es6
 * @author leeight
 */

// import u from 'lodash';





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-buybucket');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div class="${cx('title')}">
        <span>所选配置</span>
        <ui-button on-click="onReset" skin="stringfy" disabled="{{disabled}}">清空配置</ui-button>
    </div>
    <div class="${cx('body')}">
        <div class="${cx('body-item')}" s-for="item in datasource">
            <div s-if="!item.hidden">
                <label class="${cx('body-title')}">{{item.title|raw}}：</label>
                <div class="${cx('body-content')}">{{item.content|raw}}</div>
            </div>
        </div>
    </div>
    <div class="${cx('bottom', 'previous-true')}" s-if="previous">
        <ui-button on-click="onPrevious" disabled="{{disabled}}">上一步</ui-button>
        <ui-button on-click="onConfirm" skin="primary" disabled="{{disabled}}">立即购买</ui-button>
    </div>
    <div class="${cx('bottom')}" s-else>
        <ui-button on-click="onConfirm" skin="primary" disabled="{{disabled}}">立即购买</ui-button>
    </div>
    <div class="${cx('tip')}" s-if="tip">{{tip|raw}}</div>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-button': __WEBPACK_IMPORTED_MODULE_2__Button__["a" /* default */]
    },
    initData() {
        return {
            previous: false
        };
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    onConfirm() {
        this.fire('confirm');
    },
    onPrevious() {
        this.fire('previous');
    },
    onReset() {
        this.fire('reset');
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

},[330])});;