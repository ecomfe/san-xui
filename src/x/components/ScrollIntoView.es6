/**
 * @file ScrollIntoView.es6
 * @author leeight
 */

import {defineComponent} from 'san';

export default defineComponent({
    template: '<template><slot /></template>',
    attached() {
        if (this.el.scrollIntoView) {
            this.el.scrollIntoView();
        }
    }
});
