/**
 * @file components/Button.es6
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import Loading from './Loading';

const cx = create('ui-button');

/* eslint-disable */
const template = `<div on-click="onClick($event)" class="{{mainClass}}" style="{{mainStyle}}" aria-label="{{ariaLabel}}">
    <i class="{{'iconfont icon-' + icon}}" s-if="icon"></i>
    <span class="${cx('label')}" san-if="label"><ui-loading s-if="loading" size="small" />{{label}}</span>
    <div class="${cx('label')}" san-else><ui-loading s-if="loading" size="small" /><slot /></div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-loading': Loading
    },
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
            loading: false,
            skin: '',
            icon: '',
            label: ''
        };
    },
    dataTypes: {
        disabled: DataTypes.bool,
        ariaLabel: DataTypes.string,
        size: DataTypes.string,
        skin: DataTypes.string,
        icon: DataTypes.string,
        label: DataTypes.string
    },
    onClick(e) {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        this.fire('click', e);
    }
});
