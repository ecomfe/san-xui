define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([39],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-instanteditor.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <table border="1" cellpadding="5" class="bordered-table">
        <tbody>
            <tr>
                <th width="50px">名称</th>
                <td>
                    {{formData.name}}
                    <xui-instanteditor
                        active="{=active.name=}"
                        submiting="{=submiting.name=}"
                        error="{=error.name=}"
                        on-submit="onInstantEditSubmit($event, 'name')">
                        <xui-textbox value="{{formData.name}}" />
                    </xui-instanteditor>
                </td>
            </tr>
            <tr>
                <th>描述</th>
                <td>
                    {{formData.description}}
                    <xui-instanteditor
                        active="{=active.description=}"
                        submiting="{=submiting.description=}"
                        error="{=error.description=}"
                        on-submit="onInstantEditSubmit($event, 'description')">
                        <xui-select
                            datasource="{{ee.datasource}}"
                            value="{{formData.description}}" />
                    </xui-instanteditor>
                </td>
            </tr>
        </tbody>
    </table>
</x-row>
</template>`;
/* eslint-enable */

function doSubmit(key, value) {
    return new __WEBPACK_IMPORTED_MODULE_0_promise___default.a((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() >= .8) {
                reject(new Error('RANDOM error happened!'));
            }
            else {
                resolve();
            }
        }, 1000);
    });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-textbox': __WEBPACK_IMPORTED_MODULE_2_san_xui__["N" /* TextBox */],
        'xui-select': __WEBPACK_IMPORTED_MODULE_2_san_xui__["F" /* Select */],
        'xui-instanteditor': __WEBPACK_IMPORTED_MODULE_2_san_xui__["r" /* InstantEditor */]
    },
    initData() {
        return {
            ee: {
                datasource: [
                    {text: 'Option 1', value: 'foo'},
                    {text: 'Option 2', value: 'bar'}
                ]
            },
            formData: {
                name: 'i-5cSGjffb',
                description: '无'
            }
        };
    },
    onInstantEditSubmit({value}, key) {
        this.data.set(`submiting.${key}`, true);
        doSubmit(key, value)
            .then(() => {
                this.data.set(`submiting.${key}`, false);
                this.data.set(`active.${key}`, false);
                this.data.set(`formData.${key}`, value);
            })
            .catch(error => {
                this.data.set(`submiting.${key}`, false);
                this.data.set(`error.${key}`, error);
            });
    }
}));


/***/ })

},[453])});;