/**
 * @file components/ViewStep.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

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
    dataTypes: {
        /**
         * 当前属于第几步，从 0 开始
         * @default 0
         */
        stepIndex: DataTypes.number,

        /**
         * 步骤的配置项，每一项的格式如下：
         * <pre><code>{
         *   text: string
         * }</code></pre>
         * @default []
         */
        steps: DataTypes.array
    },
    itemClick(index) {
        if (index <= this.data.get('stepIndex')) {
            this.fire('click', {index});
        }
    }
});
