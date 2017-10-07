/**
 * @file CheckBox.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-checkbox');

/* eslint-disable */
const template = `<div class="${cx()}">
    <label>
        <input
            type="checkbox"
            value="on"
            checked="{=selectedValue=}"
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
            selectedValue: [],
            title: null
        };
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    inited() {
        const checkedWatcher = checked => {
            const selectedValue = this.data.get('selectedValue');
            if (selectedValue.length === 1 && checked) {
                return;
            }
            else if (selectedValue.length === 0 && !checked) {
                return;
            }
            this.data.set('selectedValue', checked ? ['on'] : []);
        };
        const valueWatcher = selectedValue => {
            const checked = this.data.get('checked');
            if (checked && selectedValue.length === 1) {
                return;
            }
            else if (!checked && selectedValue.length === 0) {
                return;
            }
            this.data.set('checked', selectedValue.length === 1);
        };
        this.watch('checked', checkedWatcher);
        this.watch('selectedValue', valueWatcher);
        checkedWatcher(this.data.get('checked'));
    }
});

