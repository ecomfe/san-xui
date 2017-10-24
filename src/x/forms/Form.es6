/**
 * @file forms/Form.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from '../components/util';
import Promise from 'promise';

const cx = create('ui-form');

export default defineComponent({
    template: '<form class="{{mainClass}}"><slot/></form>',
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    messages: {
        'form-element-changed'(arg) {
            const formItem = arg.target;
            const payload = arg.value;
            this.onFormElementChanged(formItem, payload);
        }
    },
    initData() {
        return {
            errors: null,
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
        return new Promise((resolve, reject) => {
            const formData = this.data.get('formData');
            if (!formData) {
                reject();
                return;
            }
            const validator = this.data.get('rules');
            validator.validate(formData, (errors, fields) => {
                if (!errors) {
                    errors = [];
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
                for (const key in formErrors) {
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
        return new Promise((resolve, reject) => {
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
            const childs = this.slotChilds[0].childs;
            for (let i = 0; i < childs.length; i++) {
                const formItem = childs[i];
                const name = formItem.data.get('name');
                if (!name) {
                    continue;
                }
                formItem.data.set('error', errors ? errors[name] : null);
            }
        });
    }
});
