/**
 * @file forms/FormItem.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create, hasUnit, isComponent} from '../components/util';

const cx = create('ui-form-item');

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
export default defineComponent({
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
                style.width = hasUnit(labelWidth) ? labelWidth : `${labelWidth}px`;
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
        if (!isComponent(child) && /input|select|textarea/.test(child.tagName)) {
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
});

