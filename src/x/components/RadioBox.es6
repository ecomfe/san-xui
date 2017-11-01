/**
 * @file components/RadioBox.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';
import {asInput} from './asInput';

const cx = create('ui-radiobox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <label>
        <input
            type="radio"
            checked="{=checked=}"
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
            title: null
        };
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    inited() {
    },
    onChange(e) {
        this.fire('change', {value: e.target.checked});
    }
});

export default asInput(RadioBox);
