/**
 * @file components/CheckBox.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import {asInput} from './asInput';

const cx = create('ui-checkbox');

/* eslint-disable */
const template = `<div class="{{mainClass}}" on-click="onClick($event)">
    <label>
        <input
            type="checkbox"
            checked="{=checked=}"
            on-change="onChange($event)"
            disabled="{{disabled}}" />
        <span s-if="title">{{title}}</span>
    </label>
</div>`;
/* eslint-enable */

const CheckBox = defineComponent({
    template,
    initData() {
        return {
            checked: false,
            title: null
        };
    },
    dataTypes: {
        /**
         * 设置或者获取控件的选中状态
         *
         * @bindx
         * @default false
         */
        checked: DataTypes.bool,

        /**
         * 控件的禁用状态
         */
        disabled: DataTypes.bool,

        /**
         * 控件的文案
         */
        title: DataTypes.string
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    onChange(e) {
        this.fire('change', {value: e.target.checked});
    },
    onClick(e) {
        this.fire('click', e);
    }
});


export default asInput(CheckBox);
