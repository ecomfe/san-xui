/**
 * @file Progress.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-viewprogress');

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
    <div class="inner" style="{{barStyle}}"></div>
    <div class="percent">{{value}}%</div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {},
    initData() {
        return {
            value: 0
        };
    },
    dataTypes: {
        /**
         * 取值范围[0 - 100]
         * @default 0
         */
        value: DataTypes.number,

        /**
         * 组件的宽度
         */
        width: DataTypes.number
    },
    computed: {
        barStyle() {
            const value = this.data.get('value');
            return {
                width: `${value}%`
            };
        },
        mainStyle() {
            const width = this.data.get('width');
            if (width == null) {
                return {};
            }
            return {
                width: `${width}px`
            };
        },
        mainClass() {
            return cx.mainClass(this);
        }
    }
});
