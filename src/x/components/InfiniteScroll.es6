/**
 * @file InfiniteScroll.es6
 * @author xuli07
 */

import {defineComponent} from 'san';
import Loading from 'inf-ui/x/components/Loading';

export default defineComponent({
    template: `
    <div class="ui-infinite-scroll">
        <slot></slot>
        <slot name="loading">
            <xui-loading s-if="loading && !finished"/>
        </slot>
    </div>
    `,

    components: {
        'xui-loading': Loading
    },

    initData() {
        return {
            loading: false,
            distance: 50
        };
    },

    scrollHandler() {
        if (this.el.scrollHeight - this.el.offsetHeight - this.el.scrollTop < this.data.get('distance')
            && !this.data.get('loading')
            && !this.data.get('finished')
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

