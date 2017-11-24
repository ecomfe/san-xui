/**
 * @file demos/Section.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';

export default defineComponent({
    template: `<fieldset class="x-section">
        <legend s-if="label" on-click="toggleViewport">{{open ? '[-]' : '[+]'}}{{label}}</legend>
        <div style="{{viewportStyle}}"><slot/></div>
        <div s-if="!open" on-click="toggleViewport" class="view-more">View more...</div>
    </fieldset>`,

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

