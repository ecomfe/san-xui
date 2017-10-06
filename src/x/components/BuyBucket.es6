/**
 * @file BuyBucket.es6
 * @author leeight
 */

// import u from 'lodash';
import {defineComponent} from 'san';

import {create} from './util';
import Button from './Button';

const cx = create('ui-buybucket');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div class="${cx('title')}">
        <span>所选配置</span>
        <ui-button on-click="onReset" skin="stringfy" disabled="{{disabled}}">清空配置</ui-button>
    </div>
    <div class="${cx('body')}">
        <div class="${cx('body-item')}" s-for="item in datasource">
            <div s-if="!item.hidden">
                <label class="${cx('body-title')}">{{item.title|raw}}：</label>
                <div class="${cx('body-content')}">{{item.content|raw}}</div>
            </div>
        </div>
    </div>
    <div class="${cx('bottom', 'previous-true')}" s-if="previous">
        <ui-button on-click="onPrevious" disabled="{{disabled}}">上一步</ui-button>
        <ui-button on-click="onConfirm" skin="primary" disabled="{{disabled}}">立即购买</ui-button>
    </div>
    <div class="${cx('bottom')}" s-else>
        <ui-button on-click="onConfirm" skin="primary" disabled="{{disabled}}">立即购买</ui-button>
    </div>
    <div class="${cx('tip')}" s-if="tip">{{tip}}</div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-button': Button
    },
    initData() {
        return {
            previous: false
        };
    },
    computed: {
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
    },
    onConfirm() {
        this.fire('confirm');
    },
    onPrevious() {
        this.fire('previous');
    },
    onReset() {
        this.fire('reset');
    }
});

