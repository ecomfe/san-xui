define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([53],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uuid__ = __webpack_require__(223);
/**
 * @file demos/xui-bosuploader.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<x-row label="initialize error">
    <xui-bosuploader />
</x-row>

<x-row label="normal">
    <xui-bosuploader
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>

<x-row label="multiple,key-cb,ak,sk,bos-endpoint,on-complete">
    <xui-bosuploader
        multiple
        key-cb="{{keyCb}}"
        bos-endpoint="https://bce-bos-uploader.bj.bcebos.com"
        ak="ydFi9KR2YOrvHlmGD3oYKEWW"
        sk="KGCc1x4KEpSVmXUu1gOfutqMDmxf0Hvn"
        on-complete="onComplete"
    >
        <div slot="preview">
            <div s-for="f in files">
                <a s-if="f.url" href="{{f.url}}" target="_blank">{{f.name}}</a>
                <span s-else>{{f.name}} ({{f.progress}})</span>
            </div>
        </div>
    </xui-bosuploader>
</x-row>

<x-row label="auto-start=true">
    <xui-bosuploader
        auto-start
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>

<x-row label="disabled">
    <xui-bosuploader
        disabled
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-bosuploader': __WEBPACK_IMPORTED_MODULE_1_san_xui__["c" /* BosUploader */]
    },
    initData() {
        return {
            keyCb(file) {
                const uuid = __WEBPACK_IMPORTED_MODULE_3__uuid__["a" /* default */].generate();
                const extIndex = file.name.lastIndexOf('.');
                if (extIndex === -1) {
                    return uuid;
                }
                const ext = file.name.substr(extIndex);
                return uuid + ext;
            }
        };
    },
    onComplete({files}) {
        __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */].success('上传完毕，文件数量：' + files.length);
    }
}));


/***/ })

},[431])});;