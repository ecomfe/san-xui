/**
 * @file Progress.es6
 * @author leeight
 */

import {defineComponent} from 'san';

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
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const klass = [cx(), cx('x')];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-buybucket');
            }
            if (disabled) {
                klass.push('state-disabled');
                klass.push(cx('disabled'));
            }
            return klass;
        }
    }
});
