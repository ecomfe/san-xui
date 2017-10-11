/**
 * @file components/RadioBox.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

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

export default defineComponent({
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
    onChange(event) {
        const checked = event.target.checked;
        this.data.set('checked', checked);
        this.fire('change', {checked});
    }
});

