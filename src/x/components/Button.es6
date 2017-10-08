/**
 * @file components/Button.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-button');

/* eslint-disable */
const template = `<div on-click="onClick" class="{{mainClass}}" style="{{mainStyle}}">
    <i class="{{'iconfont icon-' + icon}}" s-if="icon"></i>
    <span class="${cx('label')}" san-if="label">{{label}}</span>
    <span class="${cx('label')}" san-else><slot /></span>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
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
    onClick() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        this.fire('click');
    }
});
