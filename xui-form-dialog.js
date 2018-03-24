define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([41],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/**
 * @file demos/xui-form-dialog.js
 * @author chenbo09
 */

function toList() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.map(function (v) {
        return {
            text: v,
            value: v
        };
    });
}

var ClintInfo = {
    controls: [{
        label: '最终客户名称',
        name: 'customerName',
        help: '项目实施的最终主体',
        type: 'text',
        required: true
    }, {
        label: '是否有分包',
        name: 'hasSubContract',
        type: 'select',
        required: true,
        datasource: toList('是', '否')
    }, {
        label: '分包商名称',
        name: 'subContracts',
        required: true,
        requiredRuleType: 'array',
        type: 'combo',
        multiple: true,
        max: 3,
        previewKey: 'name',
        controls: [{
            name: 'type',
            type: 'select',
            required: true,
            datasource: toList('新分包商', '老分包商')
        }, {
            name: 'name',
            type: 'text',
            required: true,
            placeholder: '分包商全称'
        }],
        requiredOn: {
            hasSubContract: '是'
        },
        visibleOn: {
            hasSubContract: '是'
        }
    }]
};

/* eslint-disable */
var template = '<template>\n    <xui-toastlabel>\n        FormDialog\u4F5C\u4E3A\u5185\u90E8\u4E3AForm\u7684\u5F39\u51FA\u6846\uFF0C\u5176formComp \u53C2\u6570 \u53EF\u4EE5\u901A\u8FC7createForm\u914D\u5408schema\u83B7\u53D6\u3002\n    </xui-toastlabel>\n<x-row label="[default]">\n    <xui-button on-click="native:showFormDialog(\'viewClintInfo\')" skin="primary">\u663E\u793AFormDialog</xui-button>\n    <br />\n</x-row>\n\n<x-row label="[formData\u5F53\u524D\u503C]">\n    <xui-hljs code="{{formData | stringify}}" />\n    <br />\n</x-row>\n\n<xui-form-dialog\n    s-if="viewClintInfo"\n    title="\u5BA2\u6237\u4FE1\u606F"\n    confirm="{{preview}}"\n    preview="{{preview}}"\n    width="{{800}}"\n    height="{{600}}"\n    on-ok="merge($event, \'viewClintInfo\', \'formData.clintInfo\')"\n    on-close="closeFormDialog(\'viewClintInfo\')"\n    form-comp="{{ClintInfo}}"\n    form-data="{{formData.clintInfo}}"\n/>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-form-dialog': _sanXui.FormDialog,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-button': _sanXui.Button,
        'xui-hljs': _sanXui.SyntaxHighlighter
    },
    filters: {
        stringify: function stringify(data) {
            return JSON.stringify(data, null, 2);
        }
    },
    initData: function initData() {
        return {
            instantValidation: true,
            preview: false,
            link: 'https://wx2.sinaimg.cn/mw690/6a087a4bgy1fnienlcytzj20j60bhtbe.jpg',
            formData: {
                clintInfo: {
                    customerName: '客户名称'
                },
                basicInfo: {
                    projectName: '项目名称'
                }

            },
            ClintInfo: (0, _sanXui.createForm)(ClintInfo)
        };
    },
    merge: function merge(formData, key, expr) {
        if (key) {
            this.closeFormDialog(key);
        }
        this.data.merge(expr, formData);
        if (typeof this.validateForm === 'function') {
            this.validateForm();
        }
    },
    showFormDialog: function showFormDialog(key) {
        this.data.set(key, true);
    },
    closeFormDialog: function closeFormDialog(key) {
        this.data.set(key, false);
    }
});

/***/ })

},[408])});;