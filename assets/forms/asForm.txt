/**
 * @file san-xui/x/forms/asForm.es6
 * @author leeight
 */

import _ from 'lodash';
import moment from 'moment';
import Promise from 'promise';
import * as AsyncValidator from 'async-validator';
import {defineComponent} from 'san';

import {create} from '../components/util';
import {evalExpr} from './ExpressionEvaluator';
import {buildValidator} from './buildValidator';

const cx = create('as-form');
const cx2 = create('ui-form');
const kFormItemComponents = {};
const kFormItemBuilders = {};
const Schema = AsyncValidator.default;

// FIXME(leeight) 如何跟 forms/FormItem.es6 复用呢?
const FormItem = defineComponent({
    template: `<div class="{{mainClass}}">
        <div class="{{labelClass}}" s-if="label">{{label | raw}}：</div>
        <div class="{{contentClass}}">
            <slot />
            <div class="{{errorClass}}" s-if="!preview && error">{{error | raw}}</div>
            <div class="{{helpClass}}" s-if="!preview && help">{{help | raw}}</div>
        </div>
    </div>`,
    messages: {
        'input-comp-value-changed'(arg) {
            const payload = arg.value;
            const name = this.data.get('name');
            this.dispatch('form-element-changed', {name, value: payload.value});
        }
    },
    computed: {
        errorClass() {
            return [cx2('item-invalid-label')];
        },
        helpClass() {
            return [cx2('item-help')];
        },
        mainClass() {
            const klass = [cx2('item')];
            const name = this.data.get('name');
            const inline = this.data.get('inline');
            if (inline) {
                klass.push(cx2('item-inline'));
            }
            if (name) {
                klass.push(cx2(`item-${name}`));
            }
            return klass;
        },
        labelClass() {
            const klass = [cx2('item-label')];
            const required = this.data.get('required');
            if (required) {
                klass.push('required-label');
            }
            return klass;
        },
        contentClass() {
            const klass = [cx2('item-content')];
            return klass;
        }
    },
    initData() {
        return {
            name: null,
            label: null,
            error: null,
            help: null,
            required: false,
            preview: false,
            inline: true
        };
    }
});

function asFormItem(item, prefix, content) {
    return `
    <as-form-item
        inline
        name="${item.name}"
        label="{{${prefix}.label}}"
        help="{{${prefix}.help}}"
        required="{{requiredOn.${item.name}}}"
        error="{{formErrors.${item.name}}}"
        preview="{{preview}}"
    >${content}</as-form-item>
    `;
}

function appendList(root, key, value) {
    if (!root[key]) {
        root[key] = [];
    }
    root[key].push(value);
}

function schemaTraversal(controls, cb) {
    _.each(controls, item => {
        if (_.isArray(item)) {
            _.each(item, colItem => cb(colItem));
        }
        else {
            cb(item);
        }
    });
}

function generateTemplate(controls) {
    const template = [];

    _.each(controls, (item, i) => {
        if (_.isArray(item)) {
            template.push(`<div class="${cx('row')}">`);
            _.each(item, (colItem, j) => {
                const builder = kFormItemBuilders[colItem.type];
                if (typeof builder !== 'function') {
                    throw new Error('invalid control type = ' + colItem.type);
                }
                const prefix = `schema[${i}][${j}]`;
                template.push(`<div class="${cx('col', 'col-' + j)}"
                    s-if="{{!hiddenOn.${colItem.name} && visibleOn.${colItem.name} !== false}}">`);
                template.push(asFormItem(colItem, prefix, builder(colItem, prefix)));
                template.push('</div>');
            });
            template.push('</div>');
        }
        else {
            const builder = kFormItemBuilders[item.type];
            if (typeof builder !== 'function') {
                throw new Error('invalid control type = ' + item.type);
            }
            const prefix = `schema[${i}]`;
            template.push(`<div class="${cx('row')}"
                s-if="{{!hiddenOn.${item.name} && visibleOn.${item.name} !== false}}">`);
            template.push(asFormItem(item, prefix, builder(item, prefix)));
            template.push('</div>');
        }
    });

    return template.join('\n');
}

export function registerFormItem({type, tagName, Component, builder}) {
    if (kFormItemBuilders[type]) {
        throw new Error(`${type} already registered!`);
    }

    const $tagName = tagName || 'ui-' + type;
    kFormItemComponents[$tagName] = Component;
    kFormItemBuilders[type] = builder;
}

export function asForm(schema) {
    const controls = schema.controls;
    const components = _.extend({
        'as-form-item': FormItem
    }, kFormItemComponents);

    /* eslint-disable */
    const template = `<template>
    <div class="{{mainClass}}">
        <div class="${cx('title')}" s-if="title">
            <h4>{{title}}</h4>
            <slot name="actions" s-if="editable">
                <div class="${cx('title-actions')}">
                    <ui-button on-click="startEditing" s-if="!editing">编辑</ui-button>
                    <ui-button disabled="{{submitting}}" on-click="submitEditing" skin="primary" s-if="editing">{{submitting ? '保存中...' : '保存'}}</ui-button>
                    <ui-button disabled="{{submitting}}" on-click="cancelEditing" s-if="editing">取消修改</ui-button>
                </div>
            </slot>
        </div>
        <div class="${cx2('x')}">${generateTemplate(controls)}</div>
    </div>
    </template>`;
    /* eslint-enable */

    // text, number, select, switch, calendar, uploader
    const Form = defineComponent({
        template,
        components,
        computed: {
            mainClass() {
                const klass = cx.mainClass(this);
                const size = this.data.get('itemSize');
                klass.push(cx(String(size)));
                return klass;
            }
        },
        filters: {
            filename(url) {
                if (!url) {
                    return '';
                }
                const lastSlashIndex = url.lastIndexOf('/');
                try {
                    return decodeURIComponent(url.substr(lastSlashIndex + 1));
                }
                catch (ex) {
                    return url.substr(lastSlashIndex + 1);
                }
            },
            datetime(value, format) {
                if (!format) {
                    format = 'YYYY-MM-DD';    // eslint-disable-line
                }
                return moment(value).format(format);
            }
        },
        messages: {
            'form-element-changed'(arg) { // eslint-disable-line
                const instantValidation = this.data.get('instantValidation');
                if (instantValidation) {
                    const payload = arg.value;
                    this.validateFormItem(payload.name);
                }
            }
        },
        initData() {
            return {
                title: null,
                instantValidation: true,
                preview: false, // 预览模式
                editing: false, // 编辑状态
                submitting: false, // 提交状态
                editable: false, // 预览模式下是否允许编辑
                schema: controls,
                formData: {},
                formErrors: null,
                visibleOn: {},
                hiddenOn: {},
                requiredOn: {}

                // disabledOn: {},
            };
        },

        inited() {
            // 根据 Name 来快速定位相关的配置
            const itemsMap = {};

            // {
            //   当 formData.a 变化的时候，需要重新计算 hiddenOn.b 和 hiddenOn.c 的值
            //   计算的逻辑就参考 schema 里面配置的内容
            //   1. 如果 hiddenOn 是字符串，就从 formData 中获取对应的值
            //   然后按照 js 里面 value to boolean 的逻辑计算结果，通常是 !!this.data.get('formData.$deps');
            //
            //   2. 如果 hiddenOn 是一个对象，那么就需要考虑多种比较的情况了，比如 $in, $nin, $eq, $ne, $gt, $lt, $gte, $lte 等等
            //   实际上是(MongoDb Comparison Query Operators的语法)
            //
            //   'a': ['b', 'c']
            // }
            const hiddenOn = {};
            const visibleOn = {};
            const requiredOn = {};
            const requiredOnInitValues = {};

            function appendToMap(item) {
                itemsMap[item.name] = item;
                requiredOnInitValues[item.name] = !!item.required;

                if (item.visibleOn) {
                    if (_.isString(item.visibleOn)) {
                        appendList(visibleOn, item.visibleOn, item.name);
                    }
                    else if (_.isPlainObject(item.visibleOn)) {
                        _.each(item.visibleOn, (config, key) => appendList(visibleOn, key, item.name));
                    }
                }

                if (item.hiddenOn) {
                    if (_.isString(item.hiddenOn)) {
                        appendList(hiddenOn, item.hiddenOn, item.name);
                    }
                    else if (_.isPlainObject(item.hiddenOn)) {
                        _.each(item.hiddenOn, (config, key) => appendList(hiddenOn, key, item.name));
                    }
                }

                if (item.requiredOn) {
                    if (_.isString(item.requiredOn)) {
                        appendList(requiredOn, item.requiredOn, item.name);
                    }
                    else if (_.isPlainObject(item.requiredOn)) {
                        _.each(item.requiredOn, (config, key) => appendList(requiredOn, key, item.name));
                    }
                }
            }

            const controls = this.data.get('schema');
            schemaTraversal(controls, item => item.name && appendToMap(item));

            this.itemsMap = itemsMap;
            this.visibleOn = visibleOn;
            this.hiddenOn = hiddenOn;
            this.requiredOn = requiredOn;

            // 监控特定数据项的变化
            const triggerKeys = this.__getTriggerKeys();
            _.each(triggerKeys, name => this.watch(`formData.${name}`, () => this.__refreshRelatedFields(name)));
            this.watch('submitting', submitting => {
                if (!submitting) {
                    this.data.set('editing', false);
                    this.data.set('preview', true);
                }
            });

            // 给 requiredOn 加上默认值，从 config.required 解析出来的
            this.data.set('requiredOn', requiredOnInitValues);
            this.data.set('itemSize', _.size(this.itemsMap));
        },

        attached() {
            const triggerKeys = this.__getTriggerKeys();
            _.each(triggerKeys, name => this.__refreshRelatedFields(name));
        },

        __getTriggerKeys() {
            return _.uniq([
                ..._.keys(this.visibleOn),
                ..._.keys(this.hiddenOn),
                ..._.keys(this.requiredOn)
            ]);
        },

        __refreshRelatedFields(name) {
            this.nextTick(() => {
                const get = name => this.data.get(`formData.${name}`);
                const scope = {get};

                if (this.visibleOn[name]) {
                    _.each(this.visibleOn[name], itemName => {
                        const config = this.itemsMap[itemName];
                        const visible = evalExpr(config.visibleOn, scope);
                        this.data.set(`visibleOn.${itemName}`, visible);
                        if (!visible && config.unsetValueOnInvisible) {
                            this.data.set(`formData.${itemName}`, undefined);
                        }
                    });
                }

                if (this.hiddenOn[name]) {
                    _.each(this.hiddenOn[name], itemName => {
                        const config = this.itemsMap[itemName];
                        const hidden = evalExpr(config.hiddenOn, scope);
                        this.data.set(`hiddenOn.${itemName}`, hidden);
                        if (hidden && config.unsetValueOnInvisible) {
                            this.data.set(`formData.${itemName}`, undefined);
                        }
                    });
                }

                if (this.requiredOn[name]) {
                    _.each(this.requiredOn[name], itemName => {
                        const config = this.itemsMap[itemName];
                        const required = evalExpr(config.requiredOn, scope);
                        this.data.set(`requiredOn.${itemName}`, required);
                    });
                }
            });
        },

        getFormKey() {
            const formKey = this.data.get('formKey');
            if (formKey != null) {
                return formKey;
            }

            const bindExpr = this.aNode.binds.get('formData');
            if (bindExpr && bindExpr.x) {
                // 双绑
                return bindExpr.expr.raw;
            }
            else if (bindExpr) {
                return bindExpr.raw;
            }
            throw new Error('Please specify `form-key` prop');
        },

        startEditing() {
            // 保存一下当前数据的快照，如果 cancelEditing 之后，就恢复当时的数据
            this.dataSnapshot = _.pick(this.data.get('formData'), Form.$fields);

            this.data.set('editing', true);
            this.data.set('preview', false);
            this.data.set('formErrors', null);
        },

        cancelEditing() {
            if (this.dataSnapshot) {
                _.each(Form.$fields, name => {
                    if (this.dataSnapshot[name] != null) {
                        this.data.set(`formData.${name}`, this.dataSnapshot[name]);
                    }
                });
                this.dataSnapshot = null;
            }
            this.nextTick(() => {
                this.data.set('editing', false);
                this.data.set('preview', true);
                this.data.set('formErrors', null);
            });
        },

        submitEditing() {
            this.validateForm().then(() => {
                const formKey = this.getFormKey();
                const formData = this.getFormData();
                this.data.set('submitting', true);
                this.dispatch('submit', {formKey, formData});
            });
        },

        buildFormItemValidator(name, config) {
            const rules = [];
            const {validator, validations, validationErrors} = config;
            if (validator) {
                // 自定义的验证规则
                rules.push({validator});
            }

            if (validations) {
                // amis 的验证规则，转化一下
                rules.push.apply(rules, buildValidator(validations, validationErrors));
            }

            const required = this.data.get(`requiredOn.${name}`);
            if (required) {
                const message = validationErrors && validationErrors.required
                    ? validationErrors.required
                    : `${config.label || name}必填`;

                let type = 'string';
                if (config.requiredRuleType) {
                    // 针对一些自定义的组件，如果设置了 required: true，那么生成验证规则的时候
                    // 需要考虑到 value 的类型
                    type = config.requiredRuleType;
                }
                else {
                    if (config.type === 'select' && config.multi) {
                        type = 'array';
                    }
                    else if (config.type === 'calendar') {
                        type = 'date';
                    }
                    else if (config.type === 'number') {
                        type = 'number';
                    }
                    else if (config.type === 'switch') {
                        type = 'boolean';
                    }
                }
                rules.push({type, required, message});
            }
            // TODO(leeight) max, min, maxLength 等配置的处理
            // TODO(leeight) value 等配置的处理
            return rules;
        },

        buildFormValidator(name) {
            const formValidator = {};
            if (name) {
                const config = this.itemsMap[name];
                const rules = this.buildFormItemValidator(name, config);
                if (rules.length) {
                    formValidator[name] = rules;
                }
            }
            else {
                _.each(this.itemsMap, (config, name) => {
                    const rules = this.buildFormItemValidator(name, config);
                    if (rules.length) {
                        formValidator[name] = rules;
                    }
                });
            }
            return new Schema(formValidator);
        },

        validateFormItem(name) {
            const preview = this.data.get('preview');
            if (preview) {
                return Promise.resolve();
            }

            return new Promise((resolve, reject) => {
                const formData = this.getFormData();
                const validator = this.buildFormValidator(name);
                validator.validate(formData, (errors, fields) => {
                    // 不要改变整个 formErrors ，只修改它特定的 item
                    const key = `formErrors.${name}`;
                    if (!errors) {
                        this.data.set(key, null);
                        resolve();
                    }
                    else {
                        const errorMessages = _.map(errors, e => e.message).join('<br/>');
                        this.data.set(key, errorMessages);
                        reject(errors);
                    }
                });
            });
        },

        validateForm() {
            const preview = this.data.get('preview');
            if (preview) {
                return Promise.resolve();
            }

            return new Promise((resolve, reject) => {
                const formData = this.getFormData();
                const validator = this.buildFormValidator();
                validator.validate(formData, (errors, fields) => {
                    if (!errors) {
                        this.data.set('formErrors', null);
                        resolve();
                        return;
                    }

                    const formErrors = {};
                    for (let i = 0; i < errors.length; i++) {
                        const item = errors[i];
                        const visible = this.data.get(`visibleOn.${item.field}`);
                        const hidden = this.data.get(`hiddenOn.${item.field}`);
                        // TODO(leeight) disable 的情况
                        if (!hidden && visible !== false) {
                            // 如果输入项是可见的，那么才考虑这个错误信息
                            formErrors[item.field] = item.message;
                        }
                    }

                    if (_.isEmpty(formErrors)) {
                        this.data.set('formErrors', null);
                        resolve();
                    }

                    this.data.set('formErrors', formErrors);
                    reject(formErrors);
                });
            });
        },

        getFormData() {
            const formData = _.pick(this.data.get('formData'), Form.$fields);
            // 转化一下类型
            _.each(formData, (value, key) => {
                const config = this.itemsMap[key];
                if (value == null) {
                    return;
                }
                if (config.type === 'number') {
                    // 把 string 类型转化为 number 类型，否则验证的时候会失败
                    formData[key] = parseFloat(value, 10);
                }
                else if (config.type === 'text') {
                    // 把 其它 类型转化为 string 类型，否则验证的时候会失败
                    formData[key] = String(value);
                }
                // TODO(leeight)
                // 其它的类型应该如何处理呢？或许考虑换一个 validator 的库了??
            });
            return formData;
        }
    });

    const $fields = [];
    schemaTraversal(controls, item => {
        if (item.name) {
            $fields.push(item.name);
        }
    });
    Form.$fields = $fields;

    return Form;
}
