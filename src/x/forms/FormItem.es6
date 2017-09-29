/**
 * @file form/FormItem.js
 * @author leeight
 */

import {defineComponent} from 'san';

function isComponent(node) {
    return node && node._type === 'san-cmpt';
}

function getEventName(tagName) {
    switch (tagName) {
        case 'select':
            return 'change';
        default:
            return 'input';
    }
}

const template = '<div class="{{name ? \'san-form-item san-form-item-\' + name : \'san-form-item\'}}">'
    + '<div class="san-form-item-label" s-if="label">{{label}}</div>'
    + '<div class="{{error ? \'san-form-item-content invalid\' : \'san-form-item-content\'}}">'
    + '<slot/>'
    + '<label class="invalid-label" s-if="error">{{error}}</label>'
    + '</div>'
    + '</div>';
export default defineComponent({
    role: 'FormItem',
    template,
    attached() {
        const name = this.data.get('name');
        if (!name) {
            return;
        }
        const child = this.slotChilds[0].childs[0];
        const valueExpr = child.props.get('value');
        if (!valueExpr) {
            return;
        }
        if (!isComponent(child)
            && /input|select|textarea/.test(child.tagName)) {
            child._onEl(getEventName(child.tagName), () => {
                this.dispatch('form-element-changed', {
                    name: name,
                    value: child.evalExpr(valueExpr.expr)
                });
            });
        }
        else if (isComponent(child)) {
            child.on('input', () => {
                this.dispatch('form-element-changed', {
                    name: name,
                    value: child.evalExpr(valueExpr.expr)
                });
            });
        }
    }
});
