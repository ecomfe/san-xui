/**
 * @file components/Dragger.js
 * @author leeight
 */

import $ from 'jquery';
import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import TextBox from './TextBox';
import {asInput} from './asInput';

const cx = create('ui-dragger');

function getValue(value, step) {
    if (step === 1) {
        return ~~value;
    }
    value = Math.round(value / step) * step;
    return step < 1 ? parseFloat(value.toFixed(2)) : ~~value;
}

/* eslint-disable */
const template = `<div on-click="onClick" class="{{mainClass}}" style="{{mainStyle}}">
    <div
        class="${cx('control-bar', 'control-bar-horizontal')}"
        s-ref="control-bar"
        style="{{controlBarStyle}}"></div>
    <div class="${cx('bar', 'bar-horizontal')}" s-ref="bar" on-click="onBarClick($event)">
        <div class="${cx('bar-selected', 'bar-selected-horizontal')}" style="{{selectedBarStyle}}"></div>
        <div class="${cx('bar-left')}">{{min}}{{unit}}</div>
        <div class="${cx('bar-middle')}">{{(max - min) / 2}}{{unit}}</div>
        <div class="${cx('bar-right')}">{{max}}{{unit}}</div>
        <div class="${cx('ruling-box')}">
            <div class="${cx('ruling', 'ruling-horizontal')}"></div>
        </div>
    </div>
    <ui-textbox
        addon="{{unit}}"
        addon-position="end"
        type="number"
        width="60px"
        value="{=value=}"
        disabled="{{disabled}}"
        style="{{textboxStyle}}"
        />
</div>`;
/* eslint-enable */

const Dragger = defineComponent({ // eslint-disable-line
    template,
    components: {
        'ui-textbox': TextBox
    },
    initData() {
        return {
            disabled: false,
            length: 350,
            value: 0, // [min, max]
            min: 0,
            max: 100,
            step: 1,
            unit: null,
            skin: ''
        };
    },
    dataTypes: {
        /**
         * 获取或者设置Dragger组件的值
         *
         * @bindx
         * @default 0
         */
        value: DataTypes.number,

        /**
         * 可输入的最小值
         *
         * @default 0
         */
        min: DataTypes.number,

        /**
         * 可输入的最大值
         *
         * @default 100
         */
        max: DataTypes.number,

        /**
         * 步进值，可以设置小数
         *
         * @default 1
         */
        step: DataTypes.number,

        /**
         * 控件的禁用状态
         *
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 控件的宽度
         *
         * @default 350
         */
        length: DataTypes.number,

        /**
         * 控件的单位，例如 Mbps 之类的
         */
        unit: DataTypes.string,

        /**
         * 控件的皮肤
         */
        skin: DataTypes.string
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
            return cx.mainClass(this);
        }
    },
    inited() {
        this.watch('value', value => {
            const {min, step, max} = this.data.get();
            if (value < min || value > max) {
                if (value < min) {
                    value = min;
                }
                else if (value > max) {
                    value = max;
                }
            }
            else {
                value = getValue(value, step);
            }
            this.data.set('value', value);
            this.fire('change', {value});
        });
    },
    attached() {
        const controlBar = this.ref('control-bar');
        if (controlBar) {
            $(controlBar).on('mousedown', e => {
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
        }
    },
    onMoveControlBar(e) {
        const {x, originalValue} = this.startPosition;
        const {min, length, step, max} = this.data.get();
        const deltaX = e.clientX - x;

        let value = originalValue + (deltaX * (max - min) / length);
        if (value <= min) {
            value = min;
        }
        else if (value >= max) {
            value = max;
        }

        this.data.set('value', getValue(value, step));
    },
    onReleaseMouse(e) {
        $(document).off('mousemove.dragger');
        $(document).off('mouseup.dragger');
    },
    onBarClick(e) {
        const {disabled, step, min, length, max} = this.data.get();
        if (disabled) {
            return;
        }

        const bar = this.ref('bar');
        const rect = bar.getBoundingClientRect();
        const deltaX = e.clientX - rect.left;

        let value = deltaX * (max - min) / length;
        if (value <= min) {
            value = min;
        }
        else if (value >= max) {
            value = max;
        }

        this.data.set('value', getValue(value, step));
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
        if (controlBar) {
            $(controlBar).off('mousedown');
        }
        $(document).off('mousemove.dragger');
        $(document).off('mouseup.dragger');
    }
});

export default asInput(Dragger);
