/**
 * @file Ghost.js
 * @author leeight
 */

import {defineComponent} from 'san';

export default defineComponent({
    template: '<div on-click="proxyEvent($event)"><slot/></div>',
    proxyEvent(e) {
        this.fire('click', e);
    }
});


