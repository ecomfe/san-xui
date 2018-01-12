/**
 * @file components/NumberTextline.es6
 * @author leeight
 */

import Big from 'big.js';
import {DataTypes, defineComponent} from 'san';

import Button from './Button';
import TextBox from './TextBox';
import {create} from './util';
import {asInput} from './asInput';

const cx = create('ui-numbertextline');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-button on-click="onDecrease" skin="primary" disabled="{{decreaseDisabled}}">-</ui-button>
    <ui-textbox type="number" value="{=value=}" min="{{min}}" max="{{max}}" step="{{step}}" disabled="{{disabled}}" width="{{width}}"/>
    <ui-button on-click="onIncrease" skin="primary" disabled="{{increaseDisabled}}">+</ui-button>
</div>`;
/* eslint-enable */

function isValid(value) {
    return /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i.test(value);
}

const NumberTextline = defineComponent({
    template,
    components: {
        'ui-button': Button,
        'ui-textbox': TextBox
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        decreaseDisabled() {
            const disabled = this.data.get('disabled');
            if (disabled) {
                return true;
            }

            const min = this.data.get('min');
            const value = this.data.get('value');
            return !(isValid(value) && +value > min);
        },
        increaseDisabled() {
            const disabled = this.data.get('disabled');
            if (disabled) {
                return true;
            }

            const max = this.data.get('max');
            const value = this.data.get('value');
            return !(isValid(value) && +value < max);
        }
    },
    initData() {
        return {
            disabled: false,
            width: null,
            min: 0,
            max: 0,
            step: 1 // 默认step是1,支持小数
        };
    },
    dataTypes: {
        disabled: DataTypes.bool,
        width: DataTypes.number,
        value: DataTypes.string,
        min: DataTypes.number,
        max: DataTypes.number,
        step: DataTypes.number
    },
    inited() {
        // 如果value没有填默认值，则与min一致
        const {value, min} = this.data.get();
        if (value == null) {
            this.data.set('value', String(min));
        }
        this.watch('value', value => this.fire('input', {value}));
    },
    onDecrease() {
        const {value, min, step} = this.data.get();
        const newValue = isValid(value)
            ? Math.max(min, new Big(value).minus(step))
            : min;
        this.data.set('value', String(newValue));
    },
    onIncrease() {
        const {value, max, step} = this.data.get();
        const newValue = isValid(value)
            ? Math.min(max, new Big(value).add(step))
            : max;
        this.data.set('value', String(newValue));
    }
});

export default asInput(NumberTextline);
