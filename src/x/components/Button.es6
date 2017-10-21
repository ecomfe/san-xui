/**
 * @file components/Button.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-button');

/* eslint-disable */
const template = `<div on-click="onClick($event)" class="{{mainClass}}" style="{{mainStyle}}" aria-label="{{ariaLabel}}">
    <i class="{{'iconfont icon-' + icon}}" s-if="icon"></i>
    <span class="${cx('label')}" san-if="label">{{label}}</span>
    <div class="${cx('label')}" san-else><slot /></div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const size = this.data.get('size');
            if (size) {
                klass.push(cx(size));
            }
            return klass;
        },
        mainStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            disabled: false,
            skin: '',
            icon: '',
            label: ''
        };
    },
    onClick(e) {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        this.fire('click', e);
    }
});
