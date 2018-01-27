define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([13],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-userpicker.es6
 * @author leeight
 */






function searchRequester(keyword) {
    return fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(response => {
            const results = response.results;
            return results.map(o => {
                // 必须要有 accountId 和 username 两个属性
                o.accountId = o.email;
                o.username = o.name.first + ' ' + o.name.last;
                return o;
            });
        });
}

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    请输入用户名：
    <xui-userpicker
        search-requester="{{searchRequester}}"
    >
        <div slot="layer-item">
            <img width="30" height="30" src="{{item.picture.thumbnail}}" />
            <span>{{item.name.title}} {{item.username}}</span>
        </div>
    </xui-userpicker>
</x-row>
<x-row label="initialized by value">
    <xui-userpicker
        search-requester="{{searchRequester}}"
        value="{=value=}"
    >
        <div slot="layer-item">
            <img width="30" height="30" src="{{item.picture.thumbnail}}" />
            <span>{{item.name.title}} {{item.username}}</span>
        </div>
    </xui-userpicker>
    <pre><code>{{value | stringify}}</code></pre>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-userpicker': __WEBPACK_IMPORTED_MODULE_1_san_xui__["S" /* UserPicker */]
    },
    filters: {
        stringify(value) {
            return JSON.stringify(value, null, 2);
        }
    },
    initData() {
        return {
            value: [
                {username: '李玉北', accountId: 'liyubei'}
            ],
            searchRequester
        };
    }
}));



/***/ })

},[471])});;