define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([53],{

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

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Go__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_ToastLabel__ = __webpack_require__(16);
/**
 * @file demos/xui-go.es6
 * @author leeight
 */






__WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Go__["a" /* default */].setSwitchHandler((event, comp) => {
    // XXX 真实场景下，在 common 里面会实现这个逻辑；在 DEMO 里面，就随便写写好了。
    const hash = comp.data.get('href');
    location.hash = hash;
    return __WEBPACK_IMPORTED_MODULE_0_promise___default.a.resolve();
});

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
在百度云控制台中，从 <code>服务A</code> 跳转到 <code>服务B</code> 的时候，涉及到比较复杂的加载机制。<br />
直接用 &lt;a&gt; 会导致公共的代码重复加载，所以这里特殊处理一下，&lt;xui-go href=&quot;/billing/#/foo/bar&quot;&gt;...&lt;/xui-go&gt;。
</xui-toastlabel>
<br />
<xui-go href="#comp=xui-button">Goto xui-button</xui-go>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_ToastLabel__["a" /* default */],
        'xui-go': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Go__["a" /* default */]
    },
    initData() {
        return {
        };
    }
}));



/***/ })

},[345])});;