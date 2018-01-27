define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([49],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
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

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-buybucket': __WEBPACK_IMPORTED_MODULE_1_san_xui__["g" /* BuyBucket */]
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


/***/ })

},[423])});;