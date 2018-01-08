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
    <dl s-if="!loading">
        <dt s-if="title">{{title}}</dt>
        <dd>
            <div class="${cx('form', 'form-inline')}">
                <div class="${cx('form-item')}" s-for="item in controls">
                    <label s-if="item.label" class="${cx('label')}">{{item.label}}</label>
                    <ui-select
                        s-if="item.type === 'select'"
                        value="{{formData[item.name]}}"

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
                        value="{{formData[item.name]}}"
                        width="{{item.width}}"
                        placeholder="{{item.placeholder}}"
                        on-input="onItemChanged(item.name, $event, true)"
                        on-enter="doFilter"
                    />

                    <ui-rangecalendar
                        s-if="item.type === 'rangecalendar'"
                        value="{{formData[item.name]}}"
                        time="{{item.time}}"
                        width="{{item.width}}"
                        range="{{item.range}}"
                        on-change="onItemChanged(item.name, $event)"
                        />

                    <ui-calendar
                        s-if="item.type === 'calendar'"
                        value="{{formData[item.name]}}"

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
        loading: DataTypes.bool,
        submitText: DataTypes.string,
        controls: DataTypes.array,
        formData: DataTypes.object
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            title: null,
            loading: true,
            submitText: null,
            formData: null,
            controls: []
        };
    },
    inited() {
        const keyMap = [];
        const formData = this.data.get('formData') || {};
        const controls = _.map(this.data.get('controls'), (item, index) => {
            let name = item.name;
            if (!name) {
                // 如果没有设置 name，就用默认值，这样子才能恢复 value
                // XXX(leeight) 如果有这种情况，为什么不直接在 $extraPayload 里面设置过滤参数呢？
                keyMap.push({type: 'p', value: index});
                name = `__key_${keyMap.length - 1}`;
            }
            else if (_.isPlainObject(name)) {
                // 如果设置的是 JSON 格式，转成 string，方便后续使用
                keyMap.push({type: 'j', value: name});
                name = `__key_${keyMap.length - 1}`;
            }

            if (formData[name] == null && item.value != null) {
                formData[name] = item.value;
            }

            return _.extend({}, item, {name});
        });
        if (keyMap.length) {
            formData.__s_key = keyMap; // eslint-disable-line
        }
        this.data.set('formData', formData);
        this.data.set('controls', controls);
        this.data.set('loading', false);
    },
    attached() {
        const formData = this.data.get('formData');
        if (!_.isEmpty(formData)) {
            // 如果有默认值，就自动过滤一下??
            this.doFilter();
        }
    },
    onItemChanged(name, {value}, preventFilterAction) {
        this.data.set(`formData.${name}`, value);

        const submitText = this.data.get('submitText');
        if (!submitText && !preventFilterAction) {
            // 如果没有提交按钮，且不是输入框input事件，那么就自动过滤
            this.doFilter();
        }
    },
    doFilter() {
        if (!this.lifeCycle.attached) {
            return;
        }

        // 在一个渲染周期内，可能会被触发三次
        // RangeCalendar
        // Calendar
        // attached
        const formData = _.clone(this.data.get('formData'));
        this.fire('submit', formData);
    }
});
