/**
 * @file InfiniteScroll.es6
 * @author xuli07
 */

import {defineComponent} from 'san';
import Loading from 'inf-ui/x/components/Loading';

export default defineComponent({
    template: `
    <div on-scroll="scrollHandler" class="ui-infinite-scroll">
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
        const {scrollHeight, offsetHeight, scrollTop} = this.el;
        if (scrollHeight - offsetHeight - scrollTop < this.data.get('distance')
            && !this.data.get('loading')
            && !this.data.get('finished')
        ) {
            this.fire('more');
        }
    }
});

