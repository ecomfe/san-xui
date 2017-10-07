/**
 * @file Calendar.es6
 * @author leeight
 */
import moment from 'moment';
import {defineComponent} from 'san';

import {create} from './util';
import Layer from './Layer';
import MonthView from './MonthView';

const cx = create('ui-calendar');

/* eslint-disable */
const template = `<div on-click="toggleLayer" class="{{mainClass}}">
    <div class="${cx('text')}">{{text}}</div>
    <div class="${cx('arrow')}"></div>
    <ui-layer open="{=active=}" ref="layer">
        <div class="${cx('layer')}">
            <ui-monthview value="{=value=}" />
        </div>
    </ui-layer>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
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
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        this.data.set('active', !active);
    }
});
