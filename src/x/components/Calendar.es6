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
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const klass = [cx(), cx('x')];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-calendar');
            }
            if (disabled) {
                klass.push('state-disabled');
                klass.push(cx('disabled'));
                klass.push(cx('x-disabled'));
            }
            return klass;
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
