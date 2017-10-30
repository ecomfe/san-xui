/**
 * @file forms/FormItem.es6
 * @author leeight
 */

import {nextTick, defineComponent} from 'san';

import {create, isComponent} from '../components/util';

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
    <div class="${cx('label')}" s-if="label">{{label}}</div>
    <div class="${cx('content')}">
        <slot/>
        <slot name="error"><label class="${cx('invalid-label')}" s-if="error">{{error}}</label></slot>
    </div>
</div>`;
export default defineComponent({
    role: 'FormItem',
    template,
    computed: {
        mainClass() {
            const klass = [cx()];
            const name = this.data.get('name');
            const error = this.data.get('error');
            if (name) {
                klass.push(cx(name));
            }
            if (error) {
                klass.push(cx('invalid'));
            }
            return klass;
        }
    },
    attached() {
        const name = this.data.get('name');
        if (!name) {
            return;
        }
        const child = this.slotChilds[0].childs[0];
        if (!isComponent(child) && /input|select|textarea/.test(child.tagName)) {
            child._onEl(getEventName(child.tagName), () => {
                this.dispatch('form-element-changed', {
                    name: name,
                    value: child.el.value
                });
            });
        }
        else if (isComponent(child)) {
            child.on('change', ({value}) => {
                this.dispatch('form-element-changed', {name, value});
            });
            child.on('input', () => {
                nextTick(() => {
                    const value = child.data.get('value');
                    this.dispatch('form-element-changed', {name, value});
                });
            });
        }
    }
});

