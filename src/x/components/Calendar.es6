/**
 * @file Calendar.es6
 * @author leeight
 */
import moment from 'moment';
import {defineComponent} from 'san';

import {create} from './util';
import {asInput} from './asInput';
import Layer from './Layer';
import MonthView from './MonthView';
import Button from './Button';

const cx = create('ui-calendar');
const kDefaultRange = {begin: new Date(1982, 10, 4), end: new Date(2046, 10, 4)};

/* eslint-disable */
const template = `<div class="${cx('xx')}">
<ui-button on-click="prevDay" disabled="{{prevDisabled}}" s-if="prev"><</ui-button>
<div on-click="toggleLayer" class="{{mainClass}}">
    <div class="${cx('text')}">{{text}}</div>
    <div class="${cx('arrow')}"></div>
    <ui-layer open="{=active=}" s-ref="layer" follow-scroll="{{false}}">
        <div class="${cx('layer')}">
            <ui-monthview value="{=value=}" time="{{time}}" range="{{range}}" on-change="onChange"/>
        </div>
    </ui-layer>
</div>
<ui-button on-click="nextDay" disabled="{{nextDisabled}}" s-if="next">></ui-button>
</div>
`;
/* eslint-enable */

const Calendar = defineComponent({  // eslint-disable-line
    template,
    components: {
        'ui-button': Button,
        'ui-layer': Layer,
        'ui-monthview': MonthView
    },
    computed: {
        text() {
            const value = this.data.get('value');
            const valueText = moment(value).format(this.data.get('format'));
            return `${valueText}`;
        },
        mainClass() {
            return cx.mainClass(this);
        },
        prevDisabled() {
            const disabled = this.data.get('disabled');
            const range = this.data.get('range');
            const value = this.data.get('value');
            // computed的执行早于了inted，所以需要判断下range
            return disabled || (range && moment(range.begin).unix() >= moment(value).add(-1, 'day').unix());
        },
        nextDisabled() {
            const disabled = this.data.get('disabled');
            const range = this.data.get('range');
            const value = this.data.get('value');
            // computed的执行早于了inted，所以需要判断下range
            return disabled || (range && moment(range.end).unix() <= moment(value).unix());
        }
    },
    initData() {
        return {
            value: new Date(),
            time: null,
            prev: false,
            next: false,
            active: false,
            range: kDefaultRange,
            format: 'YYYY-MM-DD'
        };
    },
    inited() {
        let {value, range} = this.data.get();
        // 外部有可能传过来的range为undefined
        if (!range) {
            this.data.set('range', kDefaultRange);
        }
        if (!value) {
            value = new Date();
        }
        else if (value && typeof value === 'string') {
            value = new Date(value);
        }
        // 只有 new Date(value), 数据才会同步到外部的组件里面去
        this.data.set('value', new Date(value));
        this.watch('value', value => this.fire('change', {value}));
    },
    nextDay() {
        const value = this.data.get('value');
        const newValue = moment(value).add(1, 'day').toDate();
        this.data.set('value', newValue);
    },
    prevDay() {
        const value = this.data.get('value');
        const newValue = moment(value).subtract(1, 'day').toDate();
        this.data.set('value', newValue);
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        this.data.set('active', !active);
    },
    onChange({value}) {
        this.fire('change', {value});
    }
});

export default asInput(Calendar);

