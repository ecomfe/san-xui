define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _formSchemas = __webpack_require__(394);

/* eslint-enable */

/* eslint-disable */
var template = '<template>\n<x-row label="[default]">\n    <xui-select width="300" on-change="onExampleChanged" datasource="{{examples.datasource}}"></xui-select>\n    <xui-button on-click="buildForm" skin="primary">\u751F\u6210\u8868\u5355</xui-button>\n    <br />\n    <br />\n    <xui-aceeditor s-if="schemaCode" value="{=schemaCode=}" mode="ace/mode/json" />\n    <br />\n    <table class="typedefs as-form-preview" s-if="schemaCode">\n        <colgroup>\n            <col width="700px" />\n            <col width="200px" />\n        </colgroup>\n        <tbody>\n            <tr><th>\u8868\u5355</th><th>\u8868\u5355\u6570\u636E</th></tr>\n            <tr>\n                <td class="as-form-instance">\n                    <div s-ref="form-container"></div>\n                    <div>\n                        \u5F00\u542F\u5B9E\u65F6\u9A8C\u8BC1\uFF1A<xui-switch checked="{=instantValidation=}" on-change="onInstantValidationChanged" />\n                        \u9884\u89C8\u6A21\u5F0F\uFF1A<xui-switch checked="{=preview=}" on-change="onPreviewChanged" />\n                        <xui-button skin="primary" on-click="validateForm">\u9A8C\u8BC1\u8868\u5355</xui-button>\n                    </div>\n                </td>\n                <td class="as-form-data"><xui-hljs code="{{formData | stringify}}" /></td>\n            </tr>\n        </tbody>\n    </table>\n</x-row>\n</template>';
/* eslint-enable */

/* eslint-disable */
/**
 * @file demos/xui-as-form.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-toastlabel': _sanXui.ToastLabel,
        'xui-select': _sanXui.Select,
        'xui-switch': _sanXui.Switch,
        'xui-button': _sanXui.Button,
        'xui-hljs': _sanXui.SyntaxHighlighter,
        'xui-aceeditor': _sanXui.ACEEditor
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
            examples: {
                datasource: [{ text: '默认情况', value: _formSchemas.kDefaultSchema }, { text: '表单联动 visibleOn: $eq, $ne', value: _formSchemas.kSchema$eq }, { text: '表单联动 visibleOn: $in, $nin', value: _formSchemas.kSchema$in }, { text: '表单联动 $gt, $lt, $gte, $lte', value: _formSchemas.kSchema$gt }, { text: '表单验证', value: _formSchemas.kSchema$validations }, { text: '表单验证 requiredOn', value: _formSchemas.kSchema$requiredOn }]
            },
            formData: {},
            schemaCode: null
        };
    },
    buildForm: function buildForm() {
        var value = this.data.get('schemaCode');
        try {
            var schema = JSON.parse(value);
            if (!schema && !schema.controls) {
                throw new Error('Invalid json format');
            }
            this.buildFormBySchema({ value: schema });
        } catch (ex) {
            _sanXui.Toast.error('JSON 不合法，请检查');
        }
    },
    onExampleChanged: function onExampleChanged(_ref) {
        var value = _ref.value;

        var schemaCode = JSON.stringify(value, null, 2);
        this.data.set('schemaCode', schemaCode);
        this.buildFormBySchema({ value: value });
    },
    onInstantValidationChanged: function onInstantValidationChanged(_ref2) {
        var value = _ref2.value;

        if (this.formInstance) {
            this.formInstance.data.set('instantValidation', value);
            this.validateForm();
        }
    },
    onPreviewChanged: function onPreviewChanged(_ref3) {
        var value = _ref3.value;

        if (this.formInstance) {
            this.formInstance.data.set('preview', value);
        }
    },
    buildFormBySchema: function buildFormBySchema(_ref4) {
        var _this = this;

        var value = _ref4.value;

        this.nextTick(function () {
            var formContainer = _this.ref('form-container');
            if (formContainer) {
                if (_this.formInstance) {
                    _this.formInstance.dispose();
                    formContainer.innerHTML = '';
                }
                _this.data.set('formData', {});
                var instantValidation = _this.data.get('instantValidation');
                var FormComponent = (0, _sanXui.createForm)(value);
                var formInstance = new FormComponent({ data: { instantValidation: instantValidation } });
                formInstance.watch('formData', function (formData) {
                    return _this.data.set('formData', formData);
                });
                formInstance.attach(formContainer);
                _this.formInstance = formInstance;
            }
        });
    },
    validateForm: function validateForm() {
        if (!this.formInstance) {
            return;
        }
        this.formInstance.validateForm().then(function () {
            return _sanXui.Toast.success('验证通过');
        }).catch(function () {
            return _sanXui.Toast.error('验证失败');
        });
    }
});

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file demos/examples/formSchemas.js
 * @author leeight
 */

var kDefaultSchema = exports.kDefaultSchema = {
    '//': '暂时支持 6 种控件类型，如果需要扩展，调用 registerFormItem 即可',
    'controls': [{
        label: '文本类型',
        placeholder: '请输入姓名',
        type: 'text',
        required: true,
        name: 'aText',
        validations: ['minLength:10', 'maxLength:20', 'isUrl'],
        help: '最少10个字符，最多20个字符，URL格式'
    }, {
        label: '多行文本类型',
        placeholder: '请输入描述信息',
        type: 'text',
        multiline: true,
        required: true,
        name: 'aMultilineText'
    }, {
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
    }, {
        label: 'SELECT',
        type: 'select',
        required: true,
        name: 'cSelect',
        datasource: [{ text: '选型1', value: 'O1' }, { text: '选型2', value: 'O2' }, { text: '选型3', value: 'O3' }, { text: '选型4', value: 'O4' }]
    }, {
        label: '多选(MULTI SELECT)',
        type: 'select',
        required: true,
        name: 'dSelect',
        multi: true,
        width: 200,
        datasource: [{ text: '选型1', value: 'O1' }, { text: '选型2', value: 'O2' }, { text: '选型3', value: 'O3' }, { text: '选型4', value: 'O4' }]
    }, {
        label: '日期',
        type: 'calendar',
        required: true,
        name: 'eCalendar'
    }, {
        label: '文件上传',
        type: 'uploader',
        required: true,
        name: 'fUploader'
    }, {
        label: '开关',
        type: 'switch',
        required: true,
        name: 'gSwitch'
    }, {
        label: 'BoxGroup',
        type: 'boxgroup',
        required: true,
        requiredRuleType: 'number',
        datasource: [{ text: 'FOO', value: 0 }, { text: 'BAR', value: 1 }],
        name: 'gBoxgroup'
    }, {
        label: 'Dragger',
        type: 'dragger',
        required: true,
        requiredRuleType: 'number',
        name: 'gDragger'
    }, {
        label: 'NumberTextline',
        type: 'numbertextline',
        required: true,
        requiredRuleType: 'number',
        min: 10,
        max: 20,
        name: 'gNtl'
    }, {
        label: 'RadioSelect',
        type: 'radioselect',
        required: true,
        name: 'gRs',
        datasource: [{ text: '1个月', value: 'foo' }, { text: '2', value: 'bar' }, { text: '3', value: '123', disabled: true }]
    }, {
        label: 'Region',
        type: 'region',
        required: true,
        requiredRuleType: 'array',
        name: 'gRegion'
    }, {
        label: 'MultiPicker',
        type: 'multipicker',
        required: true,
        requiredRuleType: 'array',
        name: 'gMp',
        datasource: [{
            text: 'CentOS',
            value: 'CentOS'
        }, {
            text: 'Debian',
            value: 'Debian'
        }, {
            text: 'Ubuntu',
            value: 'Ubuntu',
            disabled: true
        }, {
            text: 'Windows Server',
            value: 'Windows Server'
        }]
    }, {
        label: 'UserPicker',
        type: 'userpicker',
        required: true,
        requiredRuleType: 'array',
        name: 'gUp',
        searchRequester: function searchRequester(keyword) {
            return fetch('https://randomuser.me/api/?results=5').then(function (response) {
                return response.json();
            }).then(function (response) {
                var results = response.results;
                return results.map(function (o) {
                    // 必须要有 accountId 和 username 两个属性
                    o.accountId = o.email;
                    o.username = o.name.first + ' ' + o.name.last;
                    o.displayName = o.username;
                    return o;
                });
            });
        }
    }, {
        label: 'RangeCalendar',
        type: 'rangecalendar',
        required: true,
        requiredRuleType: 'object',
        name: 'gRc'
    }, {
        label: 'ACEEditor',
        type: 'aceeditor',
        required: true,
        width: 300,
        name: 'gACE'
    }, {
        label: 'SubForm',
        name: 'subform',
        type: 'sub-form',
        buttonLabel: '查看明细',
        buttonWidth: 200,
        width: 100,
        form: {
            title: '子表单',
            controls: [{
                label: '文本类型',
                placeholder: '请输入姓名',
                type: 'text',
                required: true,
                name: 'aText',
                validations: ['minLength:10', 'maxLength:20', 'isUrl'],
                help: '最少10个字符，最多20个字符，URL格式'
            }, {
                label: '文本类型',
                placeholder: '请输入姓名',
                type: 'text',
                required: true,
                name: 'bText'
            }]
        }
    }, {
        label: 'SubForm',
        name: 'subform2',
        type: 'sub-form',
        buttonLabel: '子表单pick模式',
        pickName: 'todo',
        buttonWidth: 200,
        width: 100,
        form: {
            title: '子表单pick模式',
            controls: [{
                label: '待办事项',
                name: 'todo',
                type: 'combo',
                required: true,
                requiredRuleType: 'array',
                multiple: true,
                controls: [{
                    name: 'isDone',
                    type: 'checkbox',
                    title: '完成',
                    width: 40
                }, {
                    name: 'description',
                    placeholder: '事项说明',
                    type: 'text'
                }, {
                    name: 'signDeadline',
                    type: 'calendar',
                    width: 80
                }]
            }]
        }
    }]
};

var kSchema$eq = exports.kSchema$eq = {
    '//': '演示 $eq, $ne 的用法',
    'controls': [{
        label: 'SELECT',
        type: 'select',
        name: 'aSelect',
        datasource: [{ text: 'A', value: 'A' }, { text: 'B', value: 'B' }, { text: 'C', value: 'C' }, { text: 'D', value: 'D' }]
    }, {
        label: '选择"A"的时候出现',
        type: 'text',
        name: 'bText',
        visibleOn: {
            aSelect: 'A'
        }
    }, {
        label: '选择"B"的时候出现',
        type: 'text',
        name: 'cText',
        visibleOn: {
            aSelect: {
                $eq: 'B'
            }
        }
    }, {
        label: '不等于"C"的时候出现',
        type: 'text',
        name: 'dText',
        visibleOn: {
            aSelect: {
                $ne: 'C'
            }
        }
    }]
};

var kSchema$in = exports.kSchema$in = {
    '//': '演示 $in, $nin 的用法',
    'controls': [{
        label: 'SELECT',
        type: 'select',
        name: 'aSelect',
        datasource: [{ text: 'A', value: 'A' }, { text: 'B', value: 'B' }, { text: 'C', value: 'C' }, { text: 'D', value: 'D' }]
    }, {
        label: '选择"A" / "B" 的时候出现',
        type: 'text',
        name: 'bText',
        visibleOn: {
            aSelect: {
                $in: ['A', 'B']
            }
        }
    }, {
        label: '选择"C" / "D" 的时候出现',
        type: 'text',
        name: 'cText',
        visibleOn: {
            aSelect: {
                $nin: ['A', 'B']
            }
        }
    }]
};

var kSchema$gt = exports.kSchema$gt = {
    '//': '演示 $gt, $gte, $lt, $lte 的用法',
    'controls': [{
        label: '数值类型',
        type: 'number',
        name: 'aNumber'
    }, {
        label: '大于 10 的时候出现',
        type: 'text',
        name: 'bText',
        visibleOn: {
            aNumber: {
                $gt: 10
            }
        }
    }, {
        label: '大于等于 10 的时候出现',
        type: 'text',
        name: 'cText',
        visibleOn: {
            aNumber: {
                $gte: 10
            }
        }
    }]
};

var kSchema$validations = exports.kSchema$validations = {
    '//': '演示验证规则的用法',
    'controls': [{
        label: 'minLength,maxLength',
        type: 'text',
        name: 'username',
        required: true,
        validations: ['minLength:5', 'maxLength:20']
    }, {
        label: 'maximum,minimum',
        type: 'number',
        name: 'age',
        required: true,
        validations: ['minimum:10', 'maximum:30']
    }, {
        label: 'matchRegexp',
        type: 'text',
        name: 'matchRegexp',
        required: true,
        validations: ['matchRegexp:^\\d+$']
    }, {
        label: 'isEmail',
        type: 'text',
        name: 'isEmail',
        required: true,
        validations: ['isEmail']
    }, {
        label: 'isUrl',
        type: 'text',
        name: 'isUrl',
        required: true,
        validations: ['isUrl']
    }, {
        label: 'isNumeric',
        type: 'text',
        name: 'isNumeric',
        required: true,
        validations: ['isNumeric']
    }, {
        label: 'isAlphanumeric',
        type: 'text',
        name: 'isAlphanumeric',
        required: true,
        validations: ['isAlphanumeric']
    }, {
        label: 'isInt',
        type: 'text',
        name: 'isInt',
        required: true,
        validations: ['isInt']
    }, {
        label: 'isFloat',
        type: 'text',
        name: 'isFloat',
        required: true,
        validations: ['isFloat']
    }, {
        label: 'isBool',
        type: 'switch',
        name: 'isBool',
        required: true,
        validations: ['isBool']
    }, {
        label: 'isJson',
        type: 'text',
        multiline: true,
        name: 'isJson',
        required: true,
        validations: ['isJson']
    }]
};

var kSchema$requiredOn = exports.kSchema$requiredOn = {
    '//': '介绍 requiredOn 的用法',
    'controls': [{
        label: '性别',
        type: 'select',
        name: 'gender',
        required: true,
        datasource: [{ text: '女', value: '女' }, { text: '男', value: '男' }]
    }, {
        label: '年龄',
        type: 'number',
        name: 'age',
        requiredOn: {
            gender: '女'
        }
    }]
};

/***/ })

},[393])});;