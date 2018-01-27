define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([25],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-select.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<xui-toastlabel>Layer 暂时还不支持多级菜单的情况，不过控制台现在存在这种用法</xui-toastlabel>

<x-row label="[default]">
    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
    <xui-select datasource="{{select.datasource}}"  />
    <xui-select datasource="{{select.datasource}}" disabled />
    <xui-button on-click="showContainer">{{container.show ? '隐藏' : '显示'}} Select</xui-button>
    <div style="{{containerStyle}}">
        <xui-select datasource="{{select.datasource}}"  />
    </div>
    <strong class="large">
        Selected value: {{select.value}}
    </strong>
</x-row>
<x-row label="multi=true">
    <xui-select
        multi
        value="{=select.multi.value=}"
        datasource="{{select.datasource}}" />
    <strong class="large">
        Selected value: {{select.multi.value}}
    </strong>
</x-row>
<x-row label="multi=true,filter=true,layer-width=300">
    <xui-select
        multi
        filter
        filter-placeholder="输入域名查询，多个搜索项以空格分隔"
        layer-width="300"
        value="{=select.multi.value=}"
        datasource="{{select.datasource}}" />
    <strong class="large">
        Selected value: {{select.multi.value}}
    </strong>
</x-row>
<x-row label="filter=true,layer-width=300">
    <xui-select
        filter
        filter-placeholder="输入域名查询，多个搜索项以空格分隔"
        layer-width="300"
        value="{=select.value=}"
        datasource="{{select.datasource}}" />
    <strong class="large">
        Selected value: {{select.value}}
    </strong>
</x-row>
<x-row label="分组展示,filter=true,layer-width=300">
    <xui-select
        filter
        filter-placeholder="输入域名查询，多个搜索项以空格分隔"
        layer-width="300"
        value="{=groupSelect.value=}"
        datasource="{{groupSelect.datasource}}" />
    <strong class="large">
        Selected value: {{groupSelect.value}}
    </strong>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */],
        'xui-select': __WEBPACK_IMPORTED_MODULE_1_san_xui__["F" /* Select */]
    },
    computed: {
        containerStyle() {
            const show = this.data.get('container.show');
            const style = {
                display: show ? 'inline-block' : 'none'
            };
            return style;
        }
    },
    initData() {
        return {
            container: {
                show: false
            },
            select: {
                value: 'abc7',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true, tip: 'Disabled item'},
                    {text: 'abc1', value: 'abc1', tip: 'hello world'},
                    {text: 'abc2', value: 'abc2'},
                    {text: 'abc3', value: 'abc3'},
                    {text: 'abc4', value: 'abc4'},
                    {text: 'abc5', value: 'abc5'},
                    {text: 'abc6', value: 'abc6'},
                    {text: 'abc7', value: 'abc7'},
                    {text: 'abc8', value: 'abc8'},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            },
            groupSelect: {
                value: 'abc7',
                datasource: [
                    {group: '分组1', text: 'foo', value: 'foo'},
                    {group: '分组1', text: 'bar', value: 'bar'},
                    {group: '分组1', text: '123', value: '123', disabled: true, tip: 'Disabled item'},
                    {group: '分组2', text: 'abc1', value: 'abc1', tip: 'hello world'},
                    {group: '分组2', text: 'abc2', value: 'abc2'},
                    {group: '分组2', text: 'abc3', value: 'abc3'},
                    {group: '分组2', text: 'abc4', value: 'abc4'},
                    {group: '分组2', text: 'abc5', value: 'abc5'},
                    {group: '分组3', text: 'abc6', value: 'abc6'},
                    {group: '分组4', text: 'abc7', value: 'abc7'},
                    {group: '分组4', text: 'abc8', value: 'abc8'},
                    {group: '分组4', text: 'abc9', value: 'abc9'},
                    {group: '分组4', text: 'abc0', value: 'abc0'}
                ]
            }
        };
    },
    showContainer() {
        const show = this.data.get('container.show');
        this.data.set('container.show', !show);
    }
}));


/***/ })

},[457])});;