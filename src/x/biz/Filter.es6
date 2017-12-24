/**
 * 内容过滤区域，组件包括
 *
 *   ui-select
 *   ui-textbox
 *   ui-rangecalendar
 *   ui-calendar
 *   plain-text
 *
 * @file inf-ui/x/biz/Filter.es6
 * @author leeight
 */

import _ from 'lodash';
import moment from 'moment';
import {DataTypes, defineComponent} from 'san';

import {create} from 'inf-ui/x/components/util';
import Button from 'inf-ui/x/components/Button';
import Select from 'inf-ui/x/components/Select';
import RangeCalendar from 'inf-ui/x/components/RangeCalendar';
import TextBox from 'inf-ui/x/components/TextBox';
import Calendar from 'inf-ui/x/components/Calendar';

const cx = create('ui-biz-filter');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <dl>
        <dt s-if="title">{{title}}</dt>
        <dd>
            <div class="${cx('form', 'form-inline')}">
                <div class="${cx('form-item')}" s-for="item in controls">
                    <label s-if="item.label" class="${cx('label')}">{{item.label}}</label>
                    <ui-select
                        s-if="item.type === 'select'"
                        value="{{item.value}}"

                        width="{{item.width}}"
                        filter="{{item.filter}}"
                        filter-placeholder="{{item.filterPlaceholder}}"
                        filter-callback="{{item.filterCallback}}"
                        multi="{{item.multi}}"
                        datasource="{{item.options}}"
                        on-change="onItemChanged(item.name, $event)"
                        />

                    <ui-textbox
                        s-if="item.type === 'textbox'"
                        value="{{item.value}}"
                        width="{{item.width}}"
                        placeholder="{{item.placeholder}}"
                        on-input="onItemChanged(item.name, $event, true)"
                        on-enter="doFilter"
                    />

                    <ui-rangecalendar
                        s-if="item.type === 'rangecalendar'"
                        value="{{item.value}}"
                        time="{{item.time}}"
                        width="{{item.width}}"
                        range="{{item.range}}"
                        on-change="onItemChanged(item.name, $event)"
                        />

                    <ui-calendar
                        s-if="item.type === 'calendar'"
                        value="{{item.value}}"

                        width="{{item.width}}"
                        prev="{{item.prev}}"
                        next="{{item.next}}"
                        range="{{item.range}}"
                        on-change="onItemChanged(item.name, $event)"
                        />
                    <div
                        s-if="item.type === 'plain'"
                        class="${cx('form-item-plain')}">{{item.text | raw}}</div>
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
        'ui-button': Button,
        'ui-textbox': TextBox
    },
    dataTypes: {
        title: DataTypes.string,
        submitText: DataTypes.string,
        controls: DataTypes.array
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
    onItemChanged(name, {value}, preventFilterAction) {
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
        if (!submitText && !preventFilterAction) {
            // 如果没有提交按钮，且不是输入框input事件，那么就自动过滤
            this.doFilter();
        }
    },
    doFilter() {
        const formData = _.clone(this.data.get('formData'));
        this.fire('submit', formData);
    }
});
