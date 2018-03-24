define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([24],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/**
 * 注册一个 type: 'color' 类型的组件，一般来说，为了命名避免冲突，建议加上业务的前缀比较稳妥
 * 控件需要支持 value 属性的双绑
 */
/**
 * @file demos/xui-register-form-item.js
 * @author leeight
 */

var Color = (0, _san.defineComponent)({
    template: '<template>\n    <div class="ui-color-picker">\n       <input type="color" value="{=value=}" />\n    </div>\n    </template>'
});

(0, _sanXui.registerFormItem)({
    type: 'color',
    tagName: 'ui-form-item-color', // 需要跟下面 builder 里面用的保持一致
    Component: Color,
    builder: function builder(item, prefix) {
        // preview 和 formData 是内置的，直接用
        // 如果不需要处理预览模式，就不需要使用 s-if 和 s-else 了
        // 例如：return `<ui-form-item-color value="{=formData.${item.name}=}" />`;
        return '\n        <ui-form-item-color s-if="!preview" value="{=formData.' + item.name + '=}" />\n        <span s-else>{{formData.' + item.name + '}}</span>';
    }
});

/* eslint-disable */
var template = '<template>\n<xui-toastlabel>\n\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u63D0\u4F9B\u7684 form-item \u7C7B\u578B\u662F\u4E0D\u591F\u7684\uFF0C\u5982\u679C\u9700\u8981\u6269\u5C55\uFF0C\u8C03\u7528 registerFormItem() \u6765\u5B8C\u6210<br/>\n<code style="font-family: monospace">\nregisterFormItem({<br/>\n&nbsp;&nbsp;type: string,<br/>\n&nbsp;&nbsp;tagName: string?,<br/>\n&nbsp;&nbsp;Component: &lt;san.Component&gt;<br/>\n&nbsp;&nbsp;builder(item: Object, prefix: string): string<br/>\n})\n</code>\n</xui-toastlabel>\n<x-row label="registerFormItem">\n    <xui-form form-data="{=formData=}" style="{{formStyle}}" />\n    <pre>{{formData | stringify}}</pre>\n</x-row>\n</template>';
/* eslint-enable */

var kFormSchema = {
    controls: [{
        label: '内置的组件',
        type: 'text',
        required: true,
        name: 'bar'
    }, {
        label: '自定义的组件',
        type: 'color',
        required: true,
        name: 'foo'
    }]
};

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-form': (0, _sanXui.createForm)(kFormSchema),
        'xui-toastlabel': _sanXui.ToastLabel
    },
    filters: {
        stringify: function stringify(data) {
            return JSON.stringify(data, null, 2);
        }
    },
    initData: function initData() {
        return {
            formData: {},
            formStyle: {
                'border': '1px solid #ccc',
                'display': 'block',
                'margin-top': '10px'
            }
        };
    }
});

/***/ })

},[429])});;