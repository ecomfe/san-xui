/**
 * @file components/ViewStep.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-viewstep');

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
    <ul>
        <li class="{{i <= stepIndex ? '${cx('item-active')}' : ''}}"
            s-for="item, i in steps" on-click="itemClick(i)"><i>{{i + 1}}</i><span>{{item.text}}</span></li>
    </ul>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        mainStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            stepIndex: 0,
            steps: []
        };
    },
    itemClick(index) {
        if (index <= this.data.get('stepIndex')) {
            this.fire('click', {index});
        }
    }
});
