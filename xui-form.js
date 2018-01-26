define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_async_validator__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui_x_forms_Form__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_san_xui_x_forms_FormItem__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Row__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rules__ = __webpack_require__(448);
/**
 * @file demos/xui-form.es6
 * @author leeight
 */










const Schema = __WEBPACK_IMPORTED_MODULE_1_async_validator__["a" /* default */];

const formValidator = new Schema({
    userName: [
        {required: true, message: '用户名必填'},
        {min: 6, max: 32, message: '用户名长度必须是 6 到 32 个字符之间'},
        __WEBPACK_IMPORTED_MODULE_6__rules__["b" /* noInvalidChar */]('用户名')
    ],
    nativeInput: [
        {required: true, message: '必填'}
    ],
    nativeSelect: [
        {required: true, message: '必填'}
    ],
    select: [
        {required: true, message: '必填'}
    ],
    boxgroup: [
        {required: true, message: '必填'}
    ],
    verifyCode: [
        {required: true, message: '短信验证码必填'}
    ],
    mobile: [
        {required: true, message: '手机号必填'},
        {pattern: /^\d{11}$/, message: '手机号格式不正确'}
    ],
    password: [
        {required: true, message: '密码必填'},
        {min: 6, max: 32, message: '密码长度必须是 6 到 32 个字符之间'},
        __WEBPACK_IMPORTED_MODULE_6__rules__["c" /* password */]('密码'),
        __WEBPACK_IMPORTED_MODULE_6__rules__["b" /* noInvalidChar */]('密码')
    ],
    confirmPassword: [
        {required: true, message: '确认密码必填'},
        {min: 6, max: 32, message: '确认密码长度必须是 6 到 32 个字符之间'},
        __WEBPACK_IMPORTED_MODULE_6__rules__["c" /* password */]('确认密码'),
        __WEBPACK_IMPORTED_MODULE_6__rules__["b" /* noInvalidChar */]('确认密码'),
        __WEBPACK_IMPORTED_MODULE_6__rules__["a" /* equals */]('password')
    ]
});


/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-form s-ref="form" rules="{{rules}}" formData="{=formData=}" errors="{=formErrors=}">
        <xui-item name="nativeInput">
            <input type="text" value="{=formData.nativeInput=}" />
        </xui-item>
        <xui-item name="nativeSelect">
            <select value="{=formData.nativeSelect=}">
                <option value="">--</option>
                <option value="foo">Foo</option>
                <option value="bar">Bar</option>
            </select>
        </xui-item>
        <xui-item name="userName" help="This is the help text"><xui-textbox
            placeholder="用户名"
            type="text"
            value="{=formData.userName=}" /></xui-item>
        <xui-item name="password"><xui-textbox
            placeholder="密码"
            type="password"
            value="{=formData.password=}" /></xui-item>
        <xui-item name="confirmPassword"><xui-textbox
            placeholder="确认密码"
            type="password"
            value="{=formData.confirmPassword=}" /></xui-item>
        <xui-item name="mobile"><xui-textbox
            placeholder="手机号"
            type="number"
            name="mobile"
            value="{=formData.mobile=}" /></xui-item>
        <xui-item name="select">
            <xui-select
                value="{=formData.select=}"
                datasource="{{select.datasource}}" />
        </xui-item>
        <xui-item name="boxgroup">
            <xui-boxgroup
                box-type="checkbox"
                datasource="{{boxgroup.datasource}}"
                value="{=formData.boxgroup=}"
                />
        </xui-item>
        <xui-item name="verifyCode">
            <xui-smscode width="{{110}}" />
        </xui-item>
        <xui-item>
            <xui-button on-click="doSubmit" skin="primary">
                {{loading ? '提交中...' : '同意条款并注册'}}
            </xui-button>
        </xui-item>
    </xui-form>
</x-row>

<x-row label="inline,label,label-width">
    <xui-form label-width="{{200}}" formData="{=formData2=}" errors="{=formErrors2=}" >
        <xui-item name="name" required inline label="名称">
            <xui-textbox placeholder="用户名" type="text" value="{=formData2.name=}" />
        </xui-item>
        <xui-item label-width="{{300}}" name="age" required inline label="年龄">
            <xui-textbox placeholder="年龄" type="text" value="{=formData2.age=}" />
        </xui-item>
    </xui-form>
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_5__Row__["a" /* default */],
        'xui-select': __WEBPACK_IMPORTED_MODULE_4_san_xui__["F" /* Select */],
        'xui-boxgroup': __WEBPACK_IMPORTED_MODULE_4_san_xui__["d" /* BoxGroup */],
        'xui-textbox': __WEBPACK_IMPORTED_MODULE_4_san_xui__["N" /* TextBox */],
        'xui-smscode': __WEBPACK_IMPORTED_MODULE_4_san_xui__["D" /* SMSCodeBox */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_4_san_xui__["e" /* Button */],
        'xui-form': __WEBPACK_IMPORTED_MODULE_2_san_xui_x_forms_Form__["a" /* default */],
        'xui-item': __WEBPACK_IMPORTED_MODULE_3_san_xui_x_forms_FormItem__["a" /* default */]
    },
    initData() {
        return {
            loading: false,
            rules: formValidator,
            formData: {},
            formErrors: null,
            formData2: {},
            formErrors2: null,
            select: {
                datasource: [
                    {text: 'Empty', value: ''},
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'}
                ]
            },
            boxgroup: {
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true}
                ]
            }
        };
    },
    doSubmit() {
        const form = this.ref('form');
        form.validateForm().then(() => {
            this.data.set('loading', true);
            setTimeout(() => {
                this.data.set('loading', false);
                __WEBPACK_IMPORTED_MODULE_4_san_xui__["P" /* Toast */].success('创建成功');
            }, 1000);
        }).catch(error => this.data.set('error', error));
    }
}));


/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_util__ = __webpack_require__(2);
/**
 * @file forms/Form.es6
 * @author leeight
 */






const cx = Object(__WEBPACK_IMPORTED_MODULE_2__components_util__["f" /* create */])('ui-form');

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    roleType: 'Form',
    template: '<form class="{{mainClass}}"><slot/></form>',
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    messages: {
        'form-element-changed'(arg) { // eslint-disable-line
            const formItem = arg.target;
            const payload = arg.value;
            this.onFormElementChanged(formItem, payload);
        }
    },
    initData() {
        return {
            errors: null,
            labelWidth: null,
            formData: {}
        };
    },
    onFormElementChanged(formItem, payload) {
        const validator = this.data.get('rules');
        if (!validator) {
            return;
        }

        const name = formItem.data.get('name');
        if (!validator.rules[name]) {
            // 没有对应的验证规则
            return;
        }

        this.data.set('formData.' + name, payload.value);
        this.validateFormItem(name);
    },
    validateFormItem(name) {
        return new __WEBPACK_IMPORTED_MODULE_1_promise___default.a((resolve, reject) => {
            const formData = this.data.get('formData');
            if (!formData) {
                reject();
                return;
            }
            const validator = this.data.get('rules');
            validator.validate(formData, (errors, fields) => {
                if (!errors) {
                    errors = []; // eslint-disable-line
                }

                let found = false;
                for (let i = 0; i < errors.length; i++) {
                    const item = errors[i];
                    if (item.field === name) {
                        found = true;
                        this.data.set('errors.' + name, item.message);
                        reject(name, item.message);
                        break;
                    }
                }
                if (!found) {
                    this.data.set('errors.' + name, null);
                    resolve();
                }

                let hasError = false;
                const formErrors = this.data.get('errors');
                for (const key in formErrors) { // eslint-disable-line
                    if (formErrors[key]) {
                        hasError = true;
                        break;
                    }
                }
                if (!hasError) {
                    this.data.set('errors', null);
                }
            });
        });
    },
    validateForm() {
        return new __WEBPACK_IMPORTED_MODULE_1_promise___default.a((resolve, reject) => {
            const formData = this.data.get('formData');
            if (!formData) {
                reject();
                return;
            }
            const validator = this.data.get('rules');
            validator.validate(formData, (errors, fields) => {
                if (!errors) {
                    this.data.set('errors', null);
                    resolve();
                    return;
                }

                const errorsMap = {};
                for (let i = 0; i < errors.length; i++) {
                    const item = errors[i];
                    errorsMap[item.field] = item.message;
                }
                this.data.set('errors', errorsMap);
                reject(errorsMap);
            });
        });
    },
    inited() {
        this.watch('errors', errors => {
            const defaultSlot = this.slot();
            const children = defaultSlot.length ? defaultSlot[0].children : [];
            for (let i = 0; i < children.length; i++) {
                const formItem = children[i];
                const name = formItem.data && formItem.data.get('name');
                if (!name) {
                    continue;
                }
                formItem.data.set('error', errors ? errors[name] : null);
            }
        });
    }
}));


/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_util__ = __webpack_require__(2);
/**
 * @file forms/FormItem.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__components_util__["f" /* create */])('ui-form-item');

function getEventName(tagName) {
    switch (tagName) {
        case 'select':
            return 'change';
        default:
            return 'input';
    }
}

const template = `<div class="{{mainClass}}">
    <div class="{{labelClass}}" style="{{labelStyle}}" s-if="label"><slot name="label">{{label}}</slot></div>
    <div class="${cx('content')}">
        <slot/>
        <slot name="error"><label class="${cx('invalid-label')}" s-if="error">{{error}}</label></slot>
        <slot name="help"><div class="${cx('help')}" s-if="help">{{help | raw}}</div></slot>
    </div>
</div>`;
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    role: 'FormItem',
    template,
    computed: {
        isRequired() {
            const a = this.data.get('require');
            const b = this.data.get('required');
            return a || b;
        },
        labelClass() {
            const klass = [cx('label')];
            const isRequired = this.data.get('isRequired');
            if (isRequired) {
                klass.push('require-label required-label');
            }
            return klass;
        },
        labelStyle() {
            const style = {};
            const labelWidth = this.data.get('labelWidth');
            if (labelWidth != null) {
                style.width = Object(__WEBPACK_IMPORTED_MODULE_1__components_util__["h" /* hasUnit */])(labelWidth) ? labelWidth : `${labelWidth}px`;
            }
            return style;
        },
        mainClass() {
            const klass = [cx()];
            const name = this.data.get('name');
            const error = this.data.get('error');
            const inline = this.data.get('inline');
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
        'input-comp-value-changed'(arg) {
            const payload = arg.value;
            const name = this.data.get('name');
            this.dispatch('form-element-changed', {name, value: payload.value});
        }
    },
    initData() {
        return {
            labelWidth: null
        };
    },
    attached() {
        const name = this.data.get('name');
        if (!name) {
            return;
        }

        // 如果可能的话，从 form 里面初始化相应的数据
        const labelWidth = this.data.get('labelWidth');
        if (labelWidth == null) {
            const formComp = this._getFormComponent();
            if (formComp) {
                const formLabelWidth = formComp.data.get('labelWidth');
                if (formLabelWidth != null) {
                    this.data.set('labelWidth', formLabelWidth);
                }
            }
        }

        const defaultSlot = this.slot();
        const child = defaultSlot.length ? defaultSlot[0].children[0] : null;
        if (!Object(__WEBPACK_IMPORTED_MODULE_1__components_util__["i" /* isComponent */])(child) && /input|select|textarea/.test(child.tagName)) {
            child._onEl(getEventName(child.tagName), () => {
                this.dispatch('form-element-changed', {
                    name: name,
                    value: child.el.value
                });
            });
        }
    },

    _getFormComponent() {
        if (this._formComponent) {
            return this._formComponent;
        }

        let comp = this.parentComponent;
        while (comp) {
            if (comp.constructor.prototype.roleType === 'Form') {
                this._formComponent = comp;
                return this._formComponent;
            }
            comp = comp.parentComponent;
        }
        return null;
    }
}));



/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = noInvalidChar;
/* harmony export (immutable) */ __webpack_exports__["c"] = password;
/* harmony export (immutable) */ __webpack_exports__["a"] = equals;
/**
 * @file demos/rules.es6
 * @author leeight
 */

function noInvalidChar(label) {
    return {
        validator(rule, value, callback) {
            if (/[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(value)) {
                return callback(label + '不能包含特殊字符');
            }
            callback();
        }
    };
}

function password(label) {
    return {
        validator(rule, value, callback) {
            let a = [/[A-Z]/, /[a-z]/, /\d/];
            let b = true;
            let c = a.length;
            for (;c;) {
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
        validator(rule, value, callback, source) {
            if (value !== source[key]) {
                return callback('两次输入的内容不一致');
            }
            callback();
        }
    };
}



/***/ })

},[445])});;