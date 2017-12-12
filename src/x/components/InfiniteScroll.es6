/**
 * @file InfiniteScroll.es6
 * @author xuli07
 */

import {defineComponent} from 'san';

export default defineComponent({
    template: `
    <div class="ui-infinite-scroll">
        <slot></slot>
    </div>
    `,

    initData() {
        return {
            busy: false,
            distance: 50
        };
    },

    scrollHandler() {
        if (this.el.scrollHeight - this.el.offsetHeight - this.el.scrollTop < this.data.get('distance')
            && !this.data.get('busy')
        ) {
            this.fire('more');
        }
    },

    attached() {
        this.scrollHandlerBindThis = this.scrollHandler.bind(this);
        this.el.addEventListener('scroll', this.scrollHandlerBindThis);
    },

    dispose() {
        this.el.removeEventListener('scroll', this.scrollHandlerBindThis);
    }
});

