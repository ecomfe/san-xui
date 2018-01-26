define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([11],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui_x_components_WebUploader__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-webuploader.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>

<x-row label="initialize error">
    <xui-webuploader />
</x-row>

<x-row label="[default]">
    <xui-webuploader
        url="/api/null/upload"
        on-accept="onAccept($event)"
    />
</x-row>

<x-row label="hide & show">
    <xui-button on-click="toggleUploader">{{show ? 'Hide' : 'Show'}}</xui-button>
    <xui-webuploader
        url="/api/null/upload"
        on-accept="onAccept($event)"
        style="{{uploaderStyle}}"
    />
</x-row>

<x-row label="jpg,gif,png;auto-start=false;multiple=true;options=...">
    <xui-webuploader
        url="/api/null/upload"
        auto-start="{{false}}"
        multiple
        label="请选择图片"
        options="{{uploader.options}}"
    />
</x-row>

<x-row label="disabled">
    <xui-switch checked="{=uploader.disabled=}" />
    <xui-webuploader
        disabled="{=uploader.disabled=}"
        url="/api/null/upload"
    />
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_1_san_xui__["H" /* Switch */],
        'xui-webuploader': __WEBPACK_IMPORTED_MODULE_2_san_xui_x_components_WebUploader__["a" /* default */]
    },
    computed: {
        uploaderStyle() {
            const show = this.data.get('show');
            const style = {
                display: show ? 'inline-block' : 'none'
            };
            return style;
        }
    },
    initData() {
        return {
            show: false,
            uploader: {
                disabled: true,
                options: {
                    accept: {
                        title: 'Files',
                        extensions: 'jpg,jpeg,gif,png',
                        mimeTypes: 'image/jpeg,image/gif,image/png'
                    }
                }
            }
        };
    },
    toggleUploader() {
        const show = this.data.get('show');
        this.data.set('show', !show);
    },
    onAccept(event) {
        const ret = event.ret;
        if (ret.success) {
            __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */].success('上传成功');
        }
    }
}));


/***/ })

},[487])});;