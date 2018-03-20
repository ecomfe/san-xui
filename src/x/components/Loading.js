/**
 * @file Loading.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-loading');

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}"></div>`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            size: 'normal' // 'normal' | 'middle' | 'small'
        };
    },
    dataTypes: {
        /**
         * 控制元素的大小，可选值有 normal, middle, small
         * @default normal
         */
        size: DataTypes.string
    },
    computed: {
        mainStyle() {
            const size = this.data.get('size');
            const width = 52;
            const height = 52;
            if (size === 'middle') {
                return {
                    width: `${width / 2}px`,
                    height: `${height / 2}px`
                };
            }
            else if (size === 'small') {
                return {
                    width: `${width / 4}px`,
                    height: `${height / 4}px`
                };
            }
            return {
                width: `${width}px`,
                height: `${height}px`
            };
        },
        mainClass() {
            const klass = [cx(), cx('x')];
            return klass;
        }
    }
});
