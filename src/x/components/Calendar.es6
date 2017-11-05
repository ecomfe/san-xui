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

/* eslint-disable */
const template = `<div class="${cx('xx')}">
<ui-button on-click="prevDay" disabled="{{disabled}}" s-if="prev"><</ui-button>
<div on-click="toggleLayer" class="{{mainClass}}">
    <div class="${cx('text')}">{{text}}</div>
    <div class="${cx('arrow')}"></div>
    <ui-layer open="{=active=}" s-ref="layer">
        <div class="${cx('layer')}">
            <ui-monthview value="{=value=}" time="{{time}}" on-change="onChange"/>
        </div>
    </ui-layer>
</div>
<ui-button on-click="nextDay" disabled="{{disabled}}" s-if="next">></ui-button>
</div>
`;
/* eslint-enable */

const Calendar = defineComponent({
    template,
    components: {
        'ui-button': Button,
        'ui-layer': Layer,
        'ui-monthview': MonthView
    },
    computed: {
        text() {
            const value = this.data.get('value');
            const valueText = moment(value).format('YYYY-MM-DD');
            return `${valueText}`;
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            value: new Date(),
            time: null,
            prev: false,
            next: false,
            active: false
        };
    },
    inited() {
        let value = this.data.get('value');
        if (!value) {
            value = new Date();
        }
        this.data.set('value', value);
    },
    nextDay() {
        const value = this.data.get('value');
        const newValue = moment(value).add(1, 'day').toDate();
        this.data.set('value', newValue);
        this.fire('change', {value: newValue});
    },
    prevDay() {
        const value = this.data.get('value');
        const newValue = moment(value).subtract(1, 'day').toDate();
        this.data.set('value', newValue);
        this.fire('change', {value: newValue});
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        this.data.set('active', !active);
    },
    onChange() {
        this.fire('change', {value: this.data.get('value')});
    }
});

export default asInput(Calendar);

