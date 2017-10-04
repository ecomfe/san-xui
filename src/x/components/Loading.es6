/**
 * @file Loading.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-loading');

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}"></div>`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            size: 'normal'    // 'normal' | 'middle' | 'small'
        };
    },
    computed: {
        mainStyle() {
            const size = this.data.get('size');
            const width = 52;
            const height = 52;
            if (size === 'middle') {
                return {
                    'width': `${width / 2}px`,
                    'height': `${height / 2}px`,
                    'background-size': '100%'
                };
            }
            else if (size === 'small') {
                return {
                    'width': `${width / 4}px`,
                    'height': `${height / 4}px`,
                    'background-size': '100%'
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
