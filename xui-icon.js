define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([41],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-icon.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<xui-loading s-if="loading" />
<div s-else>
    <xui-textbox value="{=keyword=}" placeholder="Find icon by name" />
    Total count: {{filteredIcons.length}}
    <br />
    <x-row label="{{g.name}} ({{g.icons.length}})" s-for="g in groupedIcons">
        <div class="icons">
            <div s-for="icon in g.icons" class="tooltipped tooltipped-n" aria-label="{{icon}}">
                <xui-icon name="{{icon}}" /><br />{{icon}}
            </div>
        </div>
    </x-row>
</div>
</template>`;
/* eslint-enable */

function getIcons() {
    return fetch('https://cdn.bdstatic.com/iconfont/iconfont.css')
        .then(response => response.text())
        .then(response => {
            // .icon-artec:before
            const pattern = /\.icon\-([^:]+):before/g;
            const icons = [];

            let match = null;
            while (match = pattern.exec(response)) {
                icons.push(match[1]);
            }

            icons.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

            return icons;
        });
}

function groupIcons(icons) {
    const groups = [];

    let group = null;
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(icons, icon => {
        const groupName = icon.substr(0, 1).toUpperCase();
        if (!group || group.name !== groupName) {
            group = {
                name: groupName,
                icons: []
            };
            groups.push(group);
        }
        group.icons.push(icon);
    });

    return groups;
}

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-loading': __WEBPACK_IMPORTED_MODULE_2_san_xui__["t" /* Loading */],
        'xui-textbox': __WEBPACK_IMPORTED_MODULE_2_san_xui__["N" /* TextBox */],
        'xui-icon': __WEBPACK_IMPORTED_MODULE_2_san_xui__["p" /* Icon */]
    },
    initData() {
        return {
            loading: true,
            keyword: '',
            groupedIcons: [],
            icons: []
        };
    },
    computed: {
        groupedIcons() {
            return groupIcons(this.data.get('filteredIcons'));
        },
        filteredIcons() {
            const keyword = this.data.get('keyword');
            const icons = this.data.get('icons');
            if (!keyword) {
                return icons;
            }
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.filter(icons, icon => icon.indexOf(keyword) !== -1);
        }
    },
    attached() {
        getIcons().then(icons => {
            this.data.set('icons', icons);
            this.data.set('loading', false);
        });
    }
}));


/***/ })

},[451])});;