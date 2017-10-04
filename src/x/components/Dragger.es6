/**
 * @file Dragger.es6
 * @author leeight
 */

import $ from 'jquery';
import {defineComponent} from 'san';

import {create} from './util';
import TextBox from './TextBox';
import Ghost from './Ghost';

const cx = create('ui-dragger');

/* eslint-disable */
const template = `<div on-click="onClick" class="{{mainClass}}" style="{{mainStyle}}">
    <ui-ghost
        class="${cx('control-bar', 'control-bar-horizontal')}"
        s-ref="control-bar"
        style="{{controlBarStyle}}"></ui-ghost>
    <ui-ghost class="${cx('bar', 'bar-horizontal')}" s-ref="bar" on-click="onBarClick($event)">
        <div class="${cx('bar-selected', 'bar-selected-horizontal')}" style="{{selectedBarStyle}}"></div>
        <div class="${cx('bar-left')}">{{min}}{{unit}}</div>
        <div class="${cx('bar-middle')}">{{(max - min) / 2}}{{unit}}</div>
        <div class="${cx('bar-right')}">{{max}}{{unit}}</div>
        <div class="${cx('ruling-box')}">
            <div class="${cx('ruling', 'ruling-horizontal')}"></div>
        </div>
    </ui-ghost>
    <ui-textbox
        type="number"
        width="60px"
        value="{=value=}"
        disabled="{{disabled}}"
        style="{{textboxStyle}}"
        />
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-textbox': TextBox,
        'ui-ghost': Ghost
    },
    initData() {
        return {
            disabled: false,
            length: 350,
            value: 0,   // [min, max]
            min: 0,
            max: 100,
            unit: 'Mbps',
            skin: ''
        };
    },
    computed: {
        selectedBarStyle() {
            const style = this.data.get('controlBarStyle');
            return {
                width: style.left
            };
        },
        textboxStyle() {
            const length = this.data.get('length');
            return {
                left: `${length + 35}px`
            };
        },
        controlBarStyle() {
            const min = this.data.get('min');
            const max = this.data.get('max');
            if (min >= max) {
                return {};
            }

            const value = this.data.get('value');
            const length = this.data.get('length');
            let left = value * length / (max - min);
            return {
                left: `${left}px`
            };
        },
        mainStyle() {
            const length = this.data.get('length');
            return {
                width: `${length}px`
            };
        },
        mainClass() {
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const klass = [cx()];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-dragger');
            }
            if (disabled) {
                klass.push('state-disabled');
                klass.push(cx('disabled'));
            }
            return klass;
        }
    },
    inited() {
        this.watch('value', value => {
            const {min, max} = this.data.get();
            if (value < min || value > max) {
                if (value < min) {
                    this.data.set('value', min);
                }
                else if (value > max) {
                    this.data.set('value', max);
                }
            }
        });
    },
    attached() {
        const controlBar = this.ref('control-bar');
        $(controlBar.el).on('mousedown', e => {
            const disabled = this.data.get('disabled');
            if (disabled) {
                return false;
            }

            this.startPosition = {
                x: e.clientX,
                y: e.clientY,
                originalValue: this.data.get('value')
            };
            $(document).on('mousemove.dragger', e => this.onMoveControlBar(e));
            $(document).on('mouseup.dragger', e => this.onReleaseMouse(e));
            return false;
        });
    },
    onMoveControlBar(e) {
        const {x, originalValue} = this.startPosition;
        const {min, length, max} = this.data.get();
        const deltaX = e.clientX - x;

        let value = originalValue + (deltaX * (max - min) / length);
        if (value <= min) {
            value = min;
        }
        else if (value >= max) {
            value = max;
        }

        // TODO(leeight) 需要小数的支持
        this.data.set('value', ~~value);
    },
    onReleaseMouse(e) {
        $(document).off('mousemove.dragger');
        $(document).off('mouseup.dragger');
    },
    onBarClick(e) {
        const {disabled, min, length, max} = this.data.get();
        if (disabled) {
            return;
        }

        const bar = this.ref('bar');
        const rect = bar.el.getBoundingClientRect();
        const deltaX = e.clientX - rect.left;

        let value = deltaX * (max - min) / length;
        if (value <= min) {
            value = min;
        }
        else if (value >= max) {
            value = max;
        }
        this.data.set('value', ~~value);
    },
    onClick() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        this.fire('click');
    },
    disposed() {
        const controlBar = this.ref('control-bar');
        $(controlBar.el).off('mousedown');
        $(document).off('mousemove.dragger');
        $(document).off('mouseup.dragger');
    }
});
