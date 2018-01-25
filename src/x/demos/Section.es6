/**
 * @file demos/Section.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import {Icon} from 'san-xui';

export default defineComponent({
    template: `<fieldset class="x-section">
        <legend s-if="label" on-click="toggleViewport"><ui-icon name="{{open ? 'minus' : 'plus'}}" />{{label}}</legend>
        <div style="{{viewportStyle}}"><slot/></div>
        <div s-if="!open" on-click="toggleViewport" class="view-more">View more...</div>
    </fieldset>`,
    components: {
        'ui-icon': Icon
    },
    computed: {
        viewportStyle() {
            const open = this.data.get('open');
            const display = open ? 'block' : 'none';
            return {display};
        }
    },

    toggleViewport() {
        const open = this.data.get('open');
        this.data.set('open', !open);
    },

    initData() {
        return {
            open: true
        };
    }
});

