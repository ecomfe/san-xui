/**
 * @file Switch.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-togglebutton');

/* eslint-disable */
const template = `<div on-click="toggleSwitch" class="{{mainClass}}">
    <span s-if="checked" class="${cx('part-on')}">ON</span>
    <span s-else class="${cx('part-off')}">OFF</span>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            checked: true
        };
    },
    computed: {
        mainClass() {
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const checked = this.data.get('checked');
            const klass = [cx()];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-button');
            }
            if (disabled) {
                klass.push('state-disabled');
                klass.push(cx('disabled'));
            }
            if (checked) {
                klass.push('state-checked');
                klass.push(cx('checked'));
            }
            return klass;
        }
    },
    toggleSwitch() {
        const checked = this.data.get('checked');
        this.data.set('checked', !checked);
        this.fire('change');
    }
});

