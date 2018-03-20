/**
 * @file TabPanel.js
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-tab-panel');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div s-if="active"><slot/></div>
</div>`;
/* eslint-enable */

export default defineComponent({
    role: 'TabPanel',
    template,
    initData() {
        return {
            active: false
        };
    },
    computed: {
        mainClass() {
            const klass = [cx(), cx('x')];
            return klass;
        }
    }
});
