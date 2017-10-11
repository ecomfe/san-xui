/**
 * @file components/CheckBox.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-checkbox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <label>
        <input
            type="checkbox"
            checked="{=checked=}"
            on-change="onChange"
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
    onChange() {
        this.fire('change');
    }
});

