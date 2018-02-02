define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _asyncValidator = __webpack_require__(223);

var AsyncValidator = _interopRequireWildcard(_asyncValidator);

var _Form = __webpack_require__(439);

var _Form2 = _interopRequireDefault(_Form);

var _FormItem = __webpack_require__(440);

var _FormItem2 = _interopRequireDefault(_FormItem);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

var _rules = __webpack_require__(441);

var rules = _interopRequireWildcard(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Schema = AsyncValidator.default; /**
                                      * @file demos/xui-form.es6
                                      * @author leeight
                                      */

var formValidator = new Schema({
    userName: [{ required: true, message: '用户名必填' }, { min: 6, max: 32, message: '用户名长度必须是 6 到 32 个字符之间' }, rules.noInvalidChar('用户名')],
    nativeInput: [{ required: true, message: '必填' }],
    nativeSelect: [{ required: true, message: '必填' }],
    select: [{ required: true, message: '必填' }],
    boxgroup: [{ required: true, message: '必填' }],
    verifyCode: [{ required: true, message: '短信验证码必填' }],
    mobile: [{ required: true, message: '手机号必填' }, { pattern: /^\d{11}$/, message: '手机号格式不正确' }],
    password: [{ required: true, message: '密码必填' }, { min: 6, max: 32, message: '密码长度必须是 6 到 32 个字符之间' }, rules.password('密码'), rules.noInvalidChar('密码')],
    confirmPassword: [{ required: true, message: '确认密码必填' }, { min: 6, max: 32, message: '确认密码长度必须是 6 到 32 个字符之间' }, rules.password('确认密码'), rules.noInvalidChar('确认密码'), rules.equals('password')]
});

/* eslint-disable */
var template = '<template>\n<x-row label="[default]">\n    <xui-form s-ref="form" rules="{{rules}}" formData="{=formData=}" errors="{=formErrors=}">\n        <xui-item name="nativeInput">\n            <input type="text" value="{=formData.nativeInput=}" />\n        </xui-item>\n        <xui-item name="nativeSelect">\n            <select value="{=formData.nativeSelect=}">\n                <option value="">--</option>\n                <option value="foo">Foo</option>\n                <option value="bar">Bar</option>\n            </select>\n        </xui-item>\n        <xui-item name="userName" help="This is the help text"><xui-textbox\n            placeholder="\u7528\u6237\u540D"\n            type="text"\n            value="{=formData.userName=}" /></xui-item>\n        <xui-item name="password"><xui-textbox\n            placeholder="\u5BC6\u7801"\n            type="password"\n            value="{=formData.password=}" /></xui-item>\n        <xui-item name="confirmPassword"><xui-textbox\n            placeholder="\u786E\u8BA4\u5BC6\u7801"\n            type="password"\n            value="{=formData.confirmPassword=}" /></xui-item>\n        <xui-item name="mobile"><xui-textbox\n            placeholder="\u624B\u673A\u53F7"\n            type="number"\n            name="mobile"\n            value="{=formData.mobile=}" /></xui-item>\n        <xui-item name="select">\n            <xui-select\n                value="{=formData.select=}"\n                datasource="{{select.datasource}}" />\n        </xui-item>\n        <xui-item name="boxgroup">\n            <xui-boxgroup\n                box-type="checkbox"\n                datasource="{{boxgroup.datasource}}"\n                value="{=formData.boxgroup=}"\n                />\n        </xui-item>\n        <xui-item name="verifyCode">\n            <xui-smscode width="{{110}}" />\n        </xui-item>\n        <xui-item>\n            <xui-button on-click="doSubmit" skin="primary">\n                {{loading ? \'\u63D0\u4EA4\u4E2D...\' : \'\u540C\u610F\u6761\u6B3E\u5E76\u6CE8\u518C\'}}\n            </xui-button>\n        </xui-item>\n    </xui-form>\n</x-row>\n\n<x-row label="inline,label,label-width">\n    <xui-form label-width="{{200}}" formData="{=formData2=}" errors="{=formErrors2=}" >\n        <xui-item name="name" required inline label="\u540D\u79F0">\n            <xui-textbox placeholder="\u7528\u6237\u540D" type="text" value="{=formData2.name=}" />\n        </xui-item>\n        <xui-item label-width="{{300}}" name="age" required inline label="\u5E74\u9F84">\n            <xui-textbox placeholder="\u5E74\u9F84" type="text" value="{=formData2.age=}" />\n        </xui-item>\n    </xui-form>\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-select': _sanXui.Select,
        'xui-boxgroup': _sanXui.BoxGroup,
        'xui-textbox': _sanXui.TextBox,
        'xui-smscode': _sanXui.SMSCodeBox,
        'xui-button': _sanXui.Button,
        'xui-form': _Form2.default,
        'xui-item': _FormItem2.default
    },
    initData: function initData() {
        return {
            loading: false,
            rules: formValidator,
            formData: {},
            formErrors: null,
            formData2: {},
            formErrors2: null,
            select: {
                datasource: [{ text: 'Empty', value: '' }, { text: 'foo', value: 'foo' }, { text: 'bar', value: 'bar' }]
            },
            boxgroup: {
                datasource: [{ text: 'foo', value: 'foo' }, { text: 'bar', value: 'bar' }, { text: '123', value: '123', disabled: true }]
            }
        };
    },
    doSubmit: function doSubmit() {
        var _this = this;

        var form = this.ref('form');
        form.validateForm().then(function () {
            _this.data.set('loading', true);
            setTimeout(function () {
                _this.data.set('loading', false);
                _sanXui.Toast.success('创建成功');
            }, 1000);
        }).catch(function (error) {
            return _this.data.set('error', error);
        });
    }
});

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _promise = __webpack_require__(9);

var _promise2 = _interopRequireDefault(_promise);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = (0, _util.create)('ui-form'); /**
                                        * @file forms/Form.es6
                                        * @author leeight
                                        */

exports.default = (0, _san.defineComponent)({
    roleType: 'Form',
    template: '<form class="{{mainClass}}"><slot/></form>',
    computed: {
        mainClass: function mainClass() {
            return cx.mainClass(this);
        }
    },
    messages: {
        'form-element-changed': function formElementChanged(arg) {
            // eslint-disable-line
            var formItem = arg.target;
            var payload = arg.value;
            this.onFormElementChanged(formItem, payload);
        }
    },
    initData: function initData() {
        return {
            errors: null,
            labelWidth: null,
            formData: {}
        };
    },
    onFormElementChanged: function onFormElementChanged(formItem, payload) {
        var validator = this.data.get('rules');
        if (!validator) {
            return;
        }

        var name = formItem.data.get('name');
        if (!validator.rules[name]) {
            // 没有对应的验证规则
            return;
        }

        this.data.set('formData.' + name, payload.value);
        this.validateFormItem(name);
    },
    validateFormItem: function validateFormItem(name) {
        var _this = this;

        return new _promise2.default(function (resolve, reject) {
            var formData = _this.data.get('formData');
            if (!formData) {
                reject();
                return;
            }
            var validator = _this.data.get('rules');
            validator.validate(formData, function (errors, fields) {
                if (!errors) {
                    errors = []; // eslint-disable-line
                }

                var found = false;
                for (var i = 0; i < errors.length; i++) {
                    var item = errors[i];
                    if (item.field === name) {
                        found = true;
                        _this.data.set('errors.' + name, item.message);
                        reject(name, item.message);
                        break;
                    }
                }
                if (!found) {
                    _this.data.set('errors.' + name, null);
                    resolve();
                }

                var hasError = false;
                var formErrors = _this.data.get('errors');
                for (var key in formErrors) {
                    // eslint-disable-line
                    if (formErrors[key]) {
                        hasError = true;
                        break;
                    }
                }
                if (!hasError) {
                    _this.data.set('errors', null);
                }
            });
        });
    },
    validateForm: function validateForm() {
        var _this2 = this;

        return new _promise2.default(function (resolve, reject) {
            var formData = _this2.data.get('formData');
            if (!formData) {
                reject();
                return;
            }
            var validator = _this2.data.get('rules');
            validator.validate(formData, function (errors, fields) {
                if (!errors) {
                    _this2.data.set('errors', null);
                    resolve();
                    return;
                }

                var errorsMap = {};
                for (var i = 0; i < errors.length; i++) {
                    var item = errors[i];
                    errorsMap[item.field] = item.message;
                }
                _this2.data.set('errors', errorsMap);
                reject(errorsMap);
            });
        });
    },
    inited: function inited() {
        var _this3 = this;

        this.watch('errors', function (errors) {
            var defaultSlot = _this3.slot();
            var children = defaultSlot.length ? defaultSlot[0].children : [];
            for (var i = 0; i < children.length; i++) {
                var formItem = children[i];
                var name = formItem.data && formItem.data.get('name');
                if (!name) {
                    continue;
                }
                formItem.data.set('error', errors ? errors[name] : null);
            }
        });
    }
});

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _util = __webpack_require__(2);

/**
 * @file forms/FormItem.es6
 * @author leeight
 */

var cx = (0, _util.create)('ui-form-item');

function getEventName(tagName) {
    switch (tagName) {
        case 'select':
            return 'change';
        default:
            return 'input';
    }
}

var template = '<div class="{{mainClass}}">\n    <div class="{{labelClass}}" style="{{labelStyle}}" s-if="label"><slot name="label">{{label}}</slot></div>\n    <div class="' + cx('content') + '">\n        <slot/>\n        <slot name="error"><label class="' + cx('invalid-label') + '" s-if="error">{{error}}</label></slot>\n        <slot name="help"><div class="' + cx('help') + '" s-if="help">{{help | raw}}</div></slot>\n    </div>\n</div>';
exports.default = (0, _san.defineComponent)({
    role: 'FormItem',
    template: template,
    computed: {
        isRequired: function isRequired() {
            var a = this.data.get('require');
            var b = this.data.get('required');
            return a || b;
        },
        labelClass: function labelClass() {
            var klass = [cx('label')];
            var isRequired = this.data.get('isRequired');
            if (isRequired) {
                klass.push('require-label required-label');
            }
            return klass;
        },
        labelStyle: function labelStyle() {
            var style = {};
            var labelWidth = this.data.get('labelWidth');
            if (labelWidth != null) {
                style.width = (0, _util.hasUnit)(labelWidth) ? labelWidth : labelWidth + 'px';
            }
            return style;
        },
        mainClass: function mainClass() {
            var klass = [cx()];
            var name = this.data.get('name');
            var error = this.data.get('error');
            var inline = this.data.get('inline');
            if (name) {
                klass.push(cx(name));
            }
            if (error) {
                klass.push(cx('invalid'));
            }
            if (inline) {
                klass.push(cx('inline'));
            }
            return klass;
        }
    },
    messages: {
        // 消息来自 InputComponent 的子类
        'input-comp-value-changed': function inputCompValueChanged(arg) {
            var payload = arg.value;
            var name = this.data.get('name');
            this.dispatch('form-element-changed', { name: name, value: payload.value });
        }
    },
    initData: function initData() {
        return {
            labelWidth: null
        };
    },
    attached: function attached() {
        var _this = this;

        var name = this.data.get('name');
        if (!name) {
            return;
        }

        // 如果可能的话，从 form 里面初始化相应的数据
        var labelWidth = this.data.get('labelWidth');
        if (labelWidth == null) {
            var formComp = this._getFormComponent();
            if (formComp) {
                var formLabelWidth = formComp.data.get('labelWidth');
                if (formLabelWidth != null) {
                    this.data.set('labelWidth', formLabelWidth);
                }
            }
        }

        var defaultSlot = this.slot();
        var child = defaultSlot.length ? defaultSlot[0].children[0] : null;
        if (!(0, _util.isComponent)(child) && /input|select|textarea/.test(child.tagName)) {
            child._onEl(getEventName(child.tagName), function () {
                _this.dispatch('form-element-changed', {
                    name: name,
                    value: child.el.value
                });
            });
        }
    },
    _getFormComponent: function _getFormComponent() {
        if (this._formComponent) {
            return this._formComponent;
        }

        var comp = this.parentComponent;
        while (comp) {
            if (comp.constructor.prototype.roleType === 'Form') {
                this._formComponent = comp;
                return this._formComponent;
            }
            comp = comp.parentComponent;
        }
        return null;
    }
});

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.noInvalidChar = noInvalidChar;
exports.password = password;
exports.equals = equals;
/**
 * @file demos/rules.es6
 * @author leeight
 */

function noInvalidChar(label) {
    return {
        validator: function validator(rule, value, callback) {
            if (/[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(value)) {
                return callback(label + '不能包含特殊字符');
            }
            callback();
        }
    };
}

function password(label) {
    return {
        validator: function validator(rule, value, callback) {
            var a = [/[A-Z]/, /[a-z]/, /\d/];
            var b = true;
            var c = a.length;
            for (; c;) {
                b = a[--c].test(value) && b;
            }
            if (!b) {
                return callback(label + '必须包含数字、大小写英文字母');
            }
            callback();
        }
    };
}

function equals(key) {
    return {
        validator: function validator(rule, value, callback, source) {
            if (value !== source[key]) {
                return callback('两次输入的内容不一致');
            }
            callback();
        }
    };
}

/***/ })

},[438])});;