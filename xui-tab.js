define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([20],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-tab.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
<xui-tab>
    <xui-tab-panel title="图片处理">
        <xui-button>图片处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="图像审核">
        <xui-button>图像审核</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="音视频处理">
        <xui-button>音视频处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="Android批量打包">
        <xui-monthview />
    </xui-tab-panel>
</xui-tab>
</x-row>

<x-row label="[skin=card]">
<xui-tab skin="card">
    <xui-tab-panel title="图片处理">
        <xui-button>图片处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="图像审核">
        <xui-button>图像审核</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="音视频处理">
        <xui-button>音视频处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="Android批量打包">
        <xui-monthview />
    </xui-tab-panel>
</xui-tab>
</x-row>

<x-row label="[skin=sub]">
<xui-tab skin="sub">
    <xui-tab-panel title="图片处理">
        <xui-button>图片处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="图像审核">
        <xui-button>图像审核</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="音视频处理">
        <xui-button>音视频处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="Android批量打包">
        <xui-monthview />
    </xui-tab-panel>
</xui-tab>
</x-row>

<x-row label="dynamic tabs">
<xui-button on-click="toggleTab" skin="primary">Toggle Tab</xui-button>
<br/>
<br/>
<xui-tab s-ref="tab">
    <xui-tab-panel title="图片处理">
        <xui-button>图片处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="图像审核">
        <xui-button>图像审核</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="音视频处理" s-if="show">
        <xui-button>音视频处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="Android批量打包">
        <xui-monthview />
    </xui-tab-panel>
</xui-tab>
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-monthview': __WEBPACK_IMPORTED_MODULE_1_san_xui__["u" /* MonthView */],
        'xui-tab': __WEBPACK_IMPORTED_MODULE_1_san_xui__["J" /* Tab */],
        'xui-tab-panel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["K" /* TabPanel */]
    },
    initData() {
        return {
            show: false
        };
    },
    toggleTab() {
        const show = this.data.get('show');
        this.data.set('show', !show);
        Object(__WEBPACK_IMPORTED_MODULE_0_san__["nextTick"])(() => {
            const tab = this.ref('tab');
            if (tab) {
                // XXX(leeight) 临时解决方案
                tab.refreshTabs();
            }
        });
    }
}));


/***/ })

},[474])});;