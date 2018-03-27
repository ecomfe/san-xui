/**
 * @file san-xui/x/components/Row.js
 * @author leeight
 */

import {defineComponent} from 'san';

export default defineComponent({
    template: `<div class="x-row">
        <div class="label" s-if="label">{{label}}</div>
        <div class="content"><slot/></div>
    </div>`
});

