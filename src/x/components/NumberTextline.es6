/**
 * @file components/NumberTextline.es6
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';
import Big from 'big.js';
import _ from 'lodash';

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
            if (value === '') {
                return false;
            }
            return +value <= min;
        },
        increaseDisabled() {
            const disabled = this.data.get('disabled');
            if (disabled) {
                return true;
            }

            const max = this.data.get('max');
            const value = this.data.get('value');
            if (value === '') {
                return false;
            }
            return +value >= max;
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
        if (this.data.get('value') === undefined) {
            this.data.set('value', this.data.get('min').toString());
        }
        this.watch('value', value => {
            // 点击加减button后的value是number，其他情况下都是string
            if (_.isNumber(value)) {
                const {min, max} = this.data.get();
                if (value < min) {
                    value = min;
                }
                else if (value > max) {
                    value = max;
                }
                value = value.toString();
                // 转成string
                this.data.set('value', value, {silent: true});
            }
            this.fire('input', {value});
        });
    },
    onDecrease() {
        let {value, min, step} = this.data.get();
        value = value === '' ? min : Number(new Big(value).minus(step));
        this.data.set('value', value);
    },
    onIncrease() {
        let {value, min, step} = this.data.get();
        value = value === '' ? min : Number(new Big(value).add(step));
        this.data.set('value', value);
    }
});

export default asInput(NumberTextline);
