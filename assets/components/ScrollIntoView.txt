/**
 * @file ScrollIntoView.js
 * @author leeight
 */

import {defineComponent} from 'san';

export default defineComponent({
    template: '<template><slot /></template>',
    attached() {
        /** FIXME(leeight) 效果不太好，导致页面的滚动条滚动了
        if (this.el.scrollIntoView) {
            this.el.scrollIntoView();
        }
        */
        const element = this.el.parentNode;
        element.parentNode.scrollTop = element.offsetTop;
    }
});
