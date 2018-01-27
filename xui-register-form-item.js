define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([28],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-register-form-item.es6
 * @author leeight
 */






/**
 * 注册一个 type: 'color' 类型的组件，一般来说，为了命名避免冲突，建议加上业务的前缀比较稳妥
 * 控件需要支持 value 属性的双绑
 */
const Color = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template: `<template>
    <div class="ui-color-picker">
       <input type="color" value="{=value=}" />
    </div>
    </template>`
});

Object(__WEBPACK_IMPORTED_MODULE_1_san_xui__["W" /* registerFormItem */])({
    type: 'color',
    tagName: 'ui-form-item-color', // 需要跟下面 builder 里面用的保持一致
    Component: Color,
    builder(item, prefix) {
        // preview 和 formData 是内置的，直接用
        // 如果不需要处理预览模式，就不需要使用 s-if 和 s-else 了
        // 例如：return `<ui-form-item-color value="{=formData.${item.name}=}" />`;
        return `
        <ui-form-item-color s-if="!preview" value="{=formData.${item.name}=}" />
        <span s-else>{{formData.${item.name}}}</span>`;
    }
});

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
默认情况下，提供的 form-item 类型是不够的，如果需要扩展，调用 registerFormItem() 来完成<br/>
<code style="font-family: monospace">
registerFormItem({<br/>
&nbsp;&nbsp;type: string,<br/>
&nbsp;&nbsp;tagName: string?,<br/>
&nbsp;&nbsp;Component: &lt;san.Component&gt;<br/>
&nbsp;&nbsp;builder(item: Object, prefix: string): string<br/>
})
</code>
</xui-toastlabel>
<x-row label="registerFormItem">
    <xui-form form-data="{=formData=}" style="{{formStyle}}" />
    <pre>{{formData | stringify}}</pre>
</x-row>
</template>`;
/* eslint-enable */

const kFormSchema = {
    controls: [
        {
            label: '内置的组件',
            type: 'text',
            required: true,
            name: 'bar'
        },
        {
            label: '自定义的组件',
            type: 'color',
            required: true,
            name: 'foo'
        }
    ]
};

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-form': Object(__WEBPACK_IMPORTED_MODULE_1_san_xui__["V" /* createForm */])(kFormSchema),
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */]
    },
    filters: {
        stringify(data) {
            return JSON.stringify(data, null, 2);
        }
    },
    initData() {
        return {
            formData: {},
            formStyle: {
                'border': '1px solid #ccc',
                'display': 'block',
                'margin-top': '10px'
            }
        };
    }
}));


/***/ })

},[452])});;