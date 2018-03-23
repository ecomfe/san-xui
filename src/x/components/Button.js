/**
 * @file components/Button.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import Loading from './Loading';

const cx = create('ui-button');

/* eslint-disable */
const template = `
<div on-click="onClick($event)" class="{{mainClass}}" style="{{mainStyle}}" aria-label="{{ariaLabel}}">
    <i class="{{'iconfont icon-' + icon}}" s-if="icon"></i>
    <span class="${cx('label')}" san-if="label"><ui-loading s-if="loading" size="small" />{{label}}</span>
    <div s-ref="slotHost" class="${cx('label')}" san-else><ui-loading s-if="loading" size="small" /><slot /></div>
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
            const withLabel = this.data.get('withLabel');
            if (withLabel) {
                klass.push(cx('with-label'));
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
            withLabel: false,
            skin: '',
            icon: '',
            label: ''
        };
    },
    dataTypes: {
        /**
         * 控制按钮的禁用状态
         *
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 控制是否显示 loading 的 ICON
         *
         * @default false
         */
        loading: DataTypes.bool,

        /**
         * 控制是否展示按钮的 tip 文案
         */
        ariaLabel: DataTypes.string,

        /**
         * 控制按钮的大小，如果需要展示大的按钮，设置 size="large"
         */
        size: DataTypes.string,

        /**
         * 控制按钮的皮肤，默认提供的有 primary, danger
         * 如果设置了其它值，需要自行提供 css 样式
         */
        skin: DataTypes.string,

        /**
         * 控制按钮文字前面的icon
         */
        icon: DataTypes.string,

        /**
         * 控制按钮上的文案
         */
        label: DataTypes.string
    },
    attached() {
        let withLabel = this.data.get('label');
        if (!withLabel) {
            // 好像 this.slot() 无法得到文本类型的 ANode，导致判断失败
            // 所以这里直接访问DOM来检查
            const slotHost = this.ref('slotHost');
            if (slotHost) {
                const minSize = this.data.get('loading') ? 2 : 1;
                withLabel = slotHost.childNodes.length > minSize;
            }
        }
        this.data.set('withLabel', !!withLabel);
    },
    onClick(e) {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        this.fire('click', e);
    }
});
