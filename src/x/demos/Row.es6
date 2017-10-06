/**
 * @file demos/Row.es6
 * @author leeight
 */

import {defineComponent} from 'san';

export default defineComponent({
    template: `<div class="x-row">
        <div class="label" s-if="label">{{label}}</div>
        <div class="content"><slot/></div>
    </div>`
});

