/**
 * @file san-xui/x/components/InfiniteScroll.js
 * @author xuli07
 */

import {DataTypes, defineComponent} from 'san';

import Loading from './Loading';

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

    dataTypes: {
        /**
         * 是否展示 loading 的状态
         * @default false
         */
        loading: DataTypes.bool,

        /**
         * 是否所有的数据已经加载完毕。如果 finished 设置成 true，那么滚动的时候，不会触发任何请求
         * @default false
         */
        finished: DataTypes.bool,

        /**
         * 距离底部 distance 的时候，开始加载下一页的数据
         * @default 50
         */
        distance: DataTypes.number
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

