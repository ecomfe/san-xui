/**
 * @file Filter.es6
 * @author leeight
 */

import _ from 'lodash';
import moment from 'moment';
import {defineComponent} from 'san';

import {create} from 'inf-ui/x/components/util';
import Button from 'inf-ui/x/components/Button';
import Select from 'inf-ui/x/components/Select';
import RangeCalendar from 'inf-ui/x/components/RangeCalendar';
import Calendar from 'inf-ui/x/components/Calendar';

const cx = create('ui-biz-filter');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <dl>
        <dt s-if="title">{{title}}</dt>
        <dd>
            <div class="${cx('form', 'form-inline')}">
                <div class="${cx('form-item')}" s-for="item in controls">
                    <ui-select
                        s-if="item.type === 'select'"
                        datasource="{{item.options}}"
                        on-change="onItemChanged(item.name, $event)"
                        value="{{item.value}}"
                        />
                    <ui-rangecalendar
                        s-if="item.type === 'rangecalendar'"
                        on-change="onItemChanged(item.name, $event)"
                        value="{{item.value}}"
                        />
                    <ui-calendar
                        s-if="item.type === 'calendar'"
                        on-change="onItemChanged(item.name, $event)"
                        prev="{{item.prev}}"
                        next="{{item.next}}"
                        value="{{item.value}}"
                        />
                    <div class="${cx('form-item-plain')}" s-if="item.type === 'plain'">{{item.text | raw}}</div>
                </div>
            </div>
            <ui-button on-click="doFilter" skin="primary" s-if="submitText">{{submitText}}</ui-button>
        </dd>
    </dl>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-select': Select,
        'ui-calendar': Calendar,
        'ui-rangecalendar': RangeCalendar,
        'ui-button': Button
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            title: null,
            submitText: null,
            controls: []
        };
    },
    inited() {
        const controls = this.data.get('controls');
        const formData = {};
        _.each(controls, item => {
            if (item.value != null) {
                if (_.isString(item.name)) {
                    formData[item.name] = item.value;
                }
                else if (_.isPlainObject(item.name) && item.value) {
                    _.each(item.name, (name, valueKey) => {
                        const value = item.value[valueKey];
                        if (value != null) {
                            formData[name] = value;
                        }
                    });
                }
                else if (!item.name && _.isPlainObject(item.value)) {
                    _.extend(formData, item.value);
                }
            }
        });
        this._valueFilter(formData);
        this.data.set('formData', formData);
    },
    _valueFilter(formData) {
        _.each(formData, (v, k) => {
            if (_.isDate(v)) {
                formData[k] = moment(v).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
            }
        });
    },
    onItemChanged(name, {value}) {
        const formData = this.data.get('formData');

        if (!name && _.isPlainObject(value)) {
            _.extend(formData, value);
        }
        else if (_.isString(name)) {
            formData[name] = value;
        }
        else if (_.isPlainObject(name) && value) {
            _.each(name, (n, valueKey) => {
                const v = value[valueKey];
                if (v != null) {
                    formData[n] = v;
                }
            });
        }

        this._valueFilter(formData);
        this.data.set('formData', formData);

        const submitText = this.data.get('submitText');
        if (!submitText) {
            // 如果没有提交按钮，那么就自动过滤
            this.doFilter();
        }
    },
    doFilter() {
        this.fire('submit', this.data.get('formData'));
    }
});