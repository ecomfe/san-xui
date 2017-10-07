/**
 * @file components/NumberTextline.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import Button from './Button';
import TextBox from './TextBox';
import {create} from './util';

const cx = create('ui-numbertextline');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-button on-click="onDecrease" skin="primary" disabled="{{decreaseDisabled}}">-</ui-button>
    <ui-textbox on-input="onInput" value="{=value=}" disabled="{{disabled}}" />
    <ui-button on-click="onIncrease" skin="primary" disabled="{{increaseDisabled}}">+</ui-button>
</div>`;
/* eslint-enable */

export default defineComponent({
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
            const value = +this.data.get('value');
            if (value <= min) {
                return true;
            }

            return false;
        },
        increaseDisabled() {
            const disabled = this.data.get('disabled');
            if (disabled) {
                return true;
            }

            const max = this.data.get('max');
            const value = +this.data.get('value');
            if (value >= max) {
                return true;
            }

            return false;
        }
    },
    initData() {
        return {
            value: 0,
            min: 0,
            max: 0
        };
    },
    onInput() {
        const {min, value, max} = this.data.get();
        const numValue = +value;
        if (isNaN(numValue) || numValue < min || numValue > max) {
            // Invalid and Reset
            this.data.set('value', min);
        }
        this.fire('input');
    },
    onDecrease() {
        let {value, min} = this.data.get();
        value = Math.max(min, value - 1);
        this.data.set('value', value);
        this.fire('input');
    },
    onIncrease() {
        let {value, max} = this.data.get();
        value = Math.min(max, value + 1);
        this.data.set('value', value);
        this.fire('input');
    }
});
