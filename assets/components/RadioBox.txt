/**
 * @file components/RadioBox.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import {asInput} from './asInput';

const cx = create('ui-radiobox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <label>
        <input
            type="radio"
            checked="{=checked=}"
            name="{{name}}"
            on-change="onChange($event)"
            disabled="{{disabled}}" />
        <span s-if="title">{{title}}</span>
    </label>
</div>`;
/* eslint-enable */

const RadioBox = defineComponent({
    template,
    initData() {
        return {
            checked: false,
            name: '',
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
         * 单选按钮的 name
         */
        name: DataTypes.string,

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
    }
});

export default asInput(RadioBox);
