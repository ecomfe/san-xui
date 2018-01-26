define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__examples_formSchemas__ = __webpack_require__(403);
/**
 * @file demos/xui-as-form.es6
 * @author leeight
 */





/* eslint-disable */

/* eslint-enable */

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-select width="300" on-change="onExampleChanged" datasource="{{examples.datasource}}"></xui-select>
    <xui-button on-click="buildForm" skin="primary">生成表单</xui-button>
    <br />
    <br />
    <xui-aceeditor s-if="schemaCode" value="{=schemaCode=}" mode="ace/mode/json" />
    <br />
    <table class="typedefs as-form-preview" s-if="schemaCode">
        <colgroup>
            <col width="700px" />
            <col width="200px" />
        </colgroup>
        <tbody>
            <tr><th>表单</th><th>表单数据</th></tr>
            <tr>
                <td class="as-form-instance">
                    <div s-ref="form-container"></div>
                    <div>
                        开启实时验证：<xui-switch checked="{=instantValidation=}" on-change="onInstantValidationChanged" />
                        预览模式：<xui-switch checked="{=preview=}" on-change="onPreviewChanged" />
                        <xui-button skin="primary" on-click="validateForm">验证表单</xui-button>
                    </div>
                </td>
                <td class="as-form-data"><xui-hljs code="{{formData | stringify}}" /></td>
            </tr>
        </tbody>
    </table>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_1_san_xui__["Q" /* ToastLabel */],
        'xui-select': __WEBPACK_IMPORTED_MODULE_1_san_xui__["F" /* Select */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_1_san_xui__["H" /* Switch */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_1_san_xui__["e" /* Button */],
        'xui-hljs': __WEBPACK_IMPORTED_MODULE_1_san_xui__["I" /* SyntaxHighlighter */],
        'xui-aceeditor': __WEBPACK_IMPORTED_MODULE_1_san_xui__["a" /* ACEEditor */]
    },
    filters: {
        stringify(data) {
            return JSON.stringify(data, null, 2);
        }
    },
    initData() {
        return {
            instantValidation: true,
            preview: false,
            examples: {
                datasource: [
                    {text: '默认情况', value: __WEBPACK_IMPORTED_MODULE_3__examples_formSchemas__["a" /* kDefaultSchema */]},
                    {text: '表单联动 visibleOn: $eq, $ne', value: __WEBPACK_IMPORTED_MODULE_3__examples_formSchemas__["b" /* kSchema$eq */]},
                    {text: '表单联动 visibleOn: $in, $nin', value: __WEBPACK_IMPORTED_MODULE_3__examples_formSchemas__["d" /* kSchema$in */]},
                    {text: '表单联动 $gt, $lt, $gte, $lte', value: __WEBPACK_IMPORTED_MODULE_3__examples_formSchemas__["c" /* kSchema$gt */]},
                    {text: '表单验证', value: __WEBPACK_IMPORTED_MODULE_3__examples_formSchemas__["f" /* kSchema$validations */]},
                    {text: '表单验证 requiredOn', value: __WEBPACK_IMPORTED_MODULE_3__examples_formSchemas__["e" /* kSchema$requiredOn */]}
                ]
            },
            formData: {},
            schemaCode: null
        };
    },
    buildForm() {
        const value = this.data.get('schemaCode');
        try {
            const schema = JSON.parse(value);
            if (!schema && !schema.controls) {
                throw new Error('Invalid json format');
            }
            this.buildFormBySchema({value: schema});
        }
        catch (ex) {
            __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */].error('JSON 不合法，请检查');
        }
    },
    onExampleChanged({value}) {
        const schemaCode = JSON.stringify(value, null, 2);
        this.data.set('schemaCode', schemaCode);
        this.buildFormBySchema({value});
    },
    onInstantValidationChanged({value}) {
        if (this.formInstance) {
            this.formInstance.data.set('instantValidation', value);
            this.validateForm();
        }
    },
    onPreviewChanged({value}) {
        if (this.formInstance) {
            this.formInstance.data.set('preview', value);
        }
    },
    buildFormBySchema({value}) {
        this.nextTick(() => {
            const formContainer = this.ref('form-container');
            if (formContainer) {
                if (this.formInstance) {
                    this.formInstance.dispose();
                    formContainer.innerHTML = '';
                }
                this.data.set('formData', {});
                const instantValidation = this.data.get('instantValidation');
                const FormComponent = Object(__WEBPACK_IMPORTED_MODULE_1_san_xui__["U" /* createForm */])(value);
                const formInstance = new FormComponent({data: {instantValidation}});
                formInstance.watch('formData', formData => this.data.set('formData', formData));
                formInstance.attach(formContainer);
                this.formInstance = formInstance;
            }
        });
    },
    validateForm() {
        if (!this.formInstance) {
            return;
        }
        this.formInstance.validateForm()
            .then(() => __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */].success('验证通过'))
            .catch(() => __WEBPACK_IMPORTED_MODULE_1_san_xui__["P" /* Toast */].error('验证失败'));
    }
}));


/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @file demos/examples/formSchemas.es6
 * @author leeight
 */

const kDefaultSchema = {
    '//': '暂时支持 6 种控件类型，如果需要扩展，调用 registerFormItem 即可',
    'controls': [
        {
            label: '文本类型',
            placeholder: '请输入姓名',
            type: 'text',
            required: true,
            name: 'aText',
            validations: [
                'minLength:10',
                'maxLength:20',
                'isUrl'
            ],
            help: '最少10个字符，最多20个字符，URL格式'
        },
        {
            label: '多行文本类型',
            placeholder: '请输入描述信息',
            type: 'text',
            multiline: true,
            required: true,
            name: 'aMultilineText'
        },
        {
            label: '数值类型',
            placeholder: '请输入年龄',
            type: 'number',
            required: true,
            name: 'bNumber',
            validations: ['minimum:10', 'maximum:30'],
            validationErrors: {
                minimum: '年龄最小值10',
                maximum: '年龄最大值30'
            },
            help: '最小值10，最大值30'
        },
        {
            label: 'SELECT',
            type: 'select',
            required: true,
            name: 'cSelect',
            datasource: [
                {text: '选型1', value: 'O1'},
                {text: '选型2', value: 'O2'},
                {text: '选型3', value: 'O3'},
                {text: '选型4', value: 'O4'}
            ]
        },
        {
            label: '多选(MULTI SELECT)',
            type: 'select',
            required: true,
            name: 'dSelect',
            multi: true,
            width: 200,
            datasource: [
                {text: '选型1', value: 'O1'},
                {text: '选型2', value: 'O2'},
                {text: '选型3', value: 'O3'},
                {text: '选型4', value: 'O4'}
            ]
        },
        {
            label: '日期',
            type: 'calendar',
            required: true,
            name: 'eCalendar'
        },
        {
            label: '文件上传',
            type: 'uploader',
            required: true,
            name: 'fUploader'
        },
        {
            label: '开关',
            type: 'switch',
            required: true,
            name: 'gSwitch'
        },
        {
            label: 'BoxGroup',
            type: 'boxgroup',
            required: true,
            requiredRuleType: 'number',
            datasource: [
                {text: 'FOO', value: 0},
                {text: 'BAR', value: 1}
            ],
            name: 'gBoxgroup'
        },
        {
            label: 'Dragger',
            type: 'dragger',
            required: true,
            requiredRuleType: 'number',
            name: 'gDragger'
        },
        {
            label: 'NumberTextline',
            type: 'numbertextline',
            required: true,
            requiredRuleType: 'number',
            min: 10,
            max: 20,
            name: 'gNtl'
        },
        {
            label: 'RadioSelect',
            type: 'radioselect',
            required: true,
            name: 'gRs',
            datasource: [
                {text: '1个月', value: 'foo'},
                {text: '2', value: 'bar'},
                {text: '3', value: '123', disabled: true}
            ]
        },
        {
            label: 'Region',
            type: 'region',
            required: true,
            requiredRuleType: 'array',
            name: 'gRegion'
        },
        {
            label: 'MultiPicker',
            type: 'multipicker',
            required: true,
            requiredRuleType: 'array',
            name: 'gMp',
            datasource: [
                {
                    text: 'CentOS',
                    value: 'CentOS'
                },
                {
                    text: 'Debian',
                    value: 'Debian'
                },
                {
                    text: 'Ubuntu',
                    value: 'Ubuntu',
                    disabled: true
                },
                {
                    text: 'Windows Server',
                    value: 'Windows Server'
                }
            ]
        },
        {
            label: 'UserPicker',
            type: 'userpicker',
            required: true,
            requiredRuleType: 'array',
            name: 'gUp',
            searchRequester(keyword) {
                return fetch('https://randomuser.me/api/?results=5')
                    .then(response => response.json())
                    .then(response => {
                        const results = response.results;
                        return results.map(o => {
                            // 必须要有 accountId 和 username 两个属性
                            o.accountId = o.email;
                            o.username = o.name.first + ' ' + o.name.last;
                            o.displayName = o.username;
                            return o;
                        });
                    });
            }
        },
        {
            label: 'RangeCalendar',
            type: 'rangecalendar',
            required: true,
            requiredRuleType: 'object',
            name: 'gRc'
        },
        {
            label: 'ACEEditor',
            type: 'aceeditor',
            required: true,
            width: 300,
            name: 'gACE'
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["a"] = kDefaultSchema;


const kSchema$eq = {
    '//': '演示 $eq, $ne 的用法',
    'controls': [
        {
            label: 'SELECT',
            type: 'select',
            name: 'aSelect',
            datasource: [
                {text: 'A', value: 'A'},
                {text: 'B', value: 'B'},
                {text: 'C', value: 'C'},
                {text: 'D', value: 'D'}
            ]
        },
        {
            label: '选择"A"的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aSelect: 'A'
            }
        },
        {
            label: '选择"B"的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aSelect: {
                    $eq: 'B'
                }
            }
        },
        {
            label: '不等于"C"的时候出现',
            type: 'text',
            name: 'dText',
            visibleOn: {
                aSelect: {
                    $ne: 'C'
                }
            }
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["b"] = kSchema$eq;


const kSchema$in = {
    '//': '演示 $in, $nin 的用法',
    'controls': [
        {
            label: 'SELECT',
            type: 'select',
            name: 'aSelect',
            datasource: [
                {text: 'A', value: 'A'},
                {text: 'B', value: 'B'},
                {text: 'C', value: 'C'},
                {text: 'D', value: 'D'}
            ]
        },
        {
            label: '选择"A" / "B" 的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aSelect: {
                    $in: ['A', 'B']
                }
            }
        },
        {
            label: '选择"C" / "D" 的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aSelect: {
                    $nin: ['A', 'B']
                }
            }
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["d"] = kSchema$in;



const kSchema$gt = {
    '//': '演示 $gt, $gte, $lt, $lte 的用法',
    'controls': [
        {
            label: '数值类型',
            type: 'number',
            name: 'aNumber'
        },
        {
            label: '大于 10 的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aNumber: {
                    $gt: 10
                }
            }
        },
        {
            label: '大于等于 10 的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aNumber: {
                    $gte: 10
                }
            }
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["c"] = kSchema$gt;



const kSchema$validations = {
    '//': '演示验证规则的用法',
    'controls': [
        {
            label: 'minLength,maxLength',
            type: 'text',
            name: 'username',
            required: true,
            validations: [
                'minLength:5',
                'maxLength:20'
            ]
        },
        {
            label: 'maximum,minimum',
            type: 'number',
            name: 'age',
            required: true,
            validations: [
                'minimum:10',
                'maximum:30'
            ]
        },
        {
            label: 'matchRegexp',
            type: 'text',
            name: 'matchRegexp',
            required: true,
            validations: [
                'matchRegexp:^\\d+$'
            ]
        },
        {
            label: 'isEmail',
            type: 'text',
            name: 'isEmail',
            required: true,
            validations: ['isEmail']
        },
        {
            label: 'isUrl',
            type: 'text',
            name: 'isUrl',
            required: true,
            validations: ['isUrl']
        },
        {
            label: 'isNumeric',
            type: 'text',
            name: 'isNumeric',
            required: true,
            validations: ['isNumeric']
        },
        {
            label: 'isAlphanumeric',
            type: 'text',
            name: 'isAlphanumeric',
            required: true,
            validations: ['isAlphanumeric']
        },
        {
            label: 'isInt',
            type: 'text',
            name: 'isInt',
            required: true,
            validations: ['isInt']
        },
        {
            label: 'isFloat',
            type: 'text',
            name: 'isFloat',
            required: true,
            validations: ['isFloat']
        },
        {
            label: 'isBool',
            type: 'switch',
            name: 'isBool',
            required: true,
            validations: ['isBool']
        },
        {
            label: 'isJson',
            type: 'text',
            multiline: true,
            name: 'isJson',
            required: true,
            validations: ['isJson']
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["f"] = kSchema$validations;


const kSchema$requiredOn = {
    '//': '介绍 requiredOn 的用法',
    'controls': [
        {
            label: '性别',
            type: 'select',
            name: 'gender',
            required: true,
            datasource: [
                {text: '女', value: '女'},
                {text: '男', value: '男'}
            ]
        },
        {
            label: '年龄',
            type: 'number',
            name: 'age',
            requiredOn: {
                gender: '女'
            }
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["e"] = kSchema$requiredOn;



/***/ })

},[402])});;